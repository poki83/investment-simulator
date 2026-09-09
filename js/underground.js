/* =========================================================
   Unterwelt – illegale Geschäfte (rein fiktiv!)
   Schwarzgeld, Fahndungslevel und Gefängnisstrafen.
   ========================================================= */
const Underground = {
    WASH_FEE: 0.15,
    HEAT_PER_EURO: 5000,
    MAX_HEAT: 10,

    activities: [
        { id: 'strassenhandel', name: 'Straßenhandel', icon: '🥡', invest: 500,   min: 180,  max: 320,  risk: 0.025, esc: 0.005, jail: 4,  danger: 'Niedrig', desc: 'Schwarzmarkt-Ware an den Metropolen-Rändern verschieben – klein, aber solide.' },
        { id: 'faelschungen', name: 'Marken-Fälschungen', icon: '👕', invest: 1500,  min: 380,  max: 640,  risk: 0.030, esc: 0.006, jail: 8,  danger: 'Mittel', desc: 'Designer-Plagiate aus dem Hinterhof. Der Zoll mag das gar nicht.' },
        { id: 'geldwaesche', name: 'Geldwäsche-Service', icon: '💰', invest: 5000,  min: 900,  max: 1500, risk: 0.035, esc: 0.008, jail: 12, danger: 'Mittel', desc: 'Provisionsgeschäft für schmutziges Vermögen – du bist Mittelsmann.' },
        { id: 'darknet', name: 'Darknet-Plattform', icon: '🖥️', invest: 20000, min: 4500, max: 7000, risk: 0.055, esc: 0.010, jail: 18, danger: 'Hoch', desc: 'Anonyme Marktplätze mit Verschlüsselung. Bis das BKA mitliest.' },
        { id: 'drogen', name: 'Drogenhandel', icon: '💊', invest: 10000, min: 2600, max: 4200, risk: 0.070, esc: 0.012, jail: 20, danger: 'Hoch', desc: 'Riesige Margen, riesiges Risiko. Die Polizei hat hier lange Fühler.' },
        { id: 'waffen', name: 'Waffenschmuggel', icon: '🔫', invest: 50000, min: 9000, max: 14000, risk: 0.090, esc: 0.015, jail: 28, danger: 'Sehr hoch', desc: 'Nur für ganz Skrupellose. Der Abschuss ist fast programmiert.' }
    ],

    round2(n) { return Math.round(n * 100) / 100; },

    fmt(n) {
        if (typeof UI !== 'undefined' && UI && UI.fmt) return UI.fmt(n);
        return Number(n).toLocaleString('de-DE');
    },

    ensureState() {
        if (!GameState.underground) {
            GameState.underground = { blackMoney: 0, heat: 0, operations: [], washedTotal: 0, arrests: 0, lastWeek: GameState.week, heatDecayWeek: 0 };
        }
        const u = GameState.underground;
        if (typeof u.blackMoney !== 'number') u.blackMoney = 0;
        if (typeof u.heat !== 'number') u.heat = 0;
        if (!Array.isArray(u.operations)) u.operations = [];
        if (typeof u.arrests !== 'number') u.arrests = 0;
        if (!u.lastWeek) u.lastWeek = GameState.week;
    },

    init() {
        this.ensureState();
        if (!GameState.prison) {
            GameState.prison = { active: false, crime: '', crimeIcon: '🚔', fine: 0, seized: 0, weeks: 0, untilWeek: 0 };
        }
    },

    getDef(opId) {
        return this.activities.find(a => a.id === opId);
    },

    getOperation(opId) {
        return (GameState.underground.operations || []).find(o => o.opId === opId);
    },

    get active() {
        return GameState.underground ? GameState.underground.operations : [];
    },

    start(opId) {
        this.ensureState();
        if (GameState.isInPrison()) return { error: 'gefängnis' };
        const def = this.getDef(opId);
        if (!def) return { error: 'unbekannt' };
        if (this.getOperation(opId)) return { error: 'aktiv' };
        if (def.invest > GameState.cash) return { error: 'guthaben' };

        GameState.removeCash(def.invest);
        GameState.underground.operations.push({
            opId,
            startWeek: GameState.week,
            invested: def.invest,
            profit: 0
        });
        GameState.addTransaction('buy', 'underground', 'Operation: ' + def.name, def.id, 0, def.invest, 0, def.invest);
        return { ok: true };
    },

    stop(opId) {
        this.ensureState();
        const op = this.getOperation(opId);
        if (!op) return null;
        const def = this.getDef(opId);
        const resale = this.round2(op.invested * 0.4);
        if (resale > 0) {
            GameState.underground.blackMoney += resale;
        }
        GameState.underground.operations = GameState.underground.operations.filter(o => o.opId !== opId);
        return { ok: true, resale, value: resale };
    },

    weeklyIncome(op) {
        const def = this.getDef(op.opId);
        if (!def) return 0;
        return Math.round(def.min + Math.random() * (def.max - def.min));
    },

    activeRisk(op) {
        const def = this.getDef(op.opId);
        if (!def) return 0;
        const activeWeeks = Math.max(0, GameState.week - op.startWeek);
        const heat = GameState.underground.heat || 0;
        return def.risk + def.esc * activeWeeks + heat * 0.004;
    },

    /* Wöchentliche Verarbeitung (XY dedupliziert über lastWeek). */
    processWeek() {
        this.ensureState();
        const u = GameState.underground;
        if (u.lastWeek === GameState.week) return;
        u.lastWeek = GameState.week;

        if (GameState.isInPrison()) return;

        /* Fahndung kühlt ab, wenn keine Operationen laufen */
        if (u.operations.length === 0) {
            if (u.heat > 0) {
                if (!u.heatDecayWeek) u.heatDecayWeek = GameState.week;
                if (GameState.week - u.heatDecayWeek >= 4) {
                    u.heat = Math.max(0, u.heat - 1);
                    u.heatDecayWeek = GameState.week;
                }
            }
            return;
        }
        u.heatDecayWeek = GameState.week;

        for (const op of [...u.operations]) {
            const def = this.getDef(op.opId);
            if (!def) continue;
            const income = this.weeklyIncome(op);
            u.blackMoney = this.round2(u.blackMoney + income);
            op.profit += income;

            const risk = this.activeRisk(op);
            if (Math.random() < risk) {
                this.arrest(op);
                break;
            }
        }
    },

    arrest(op) {
        this.ensureState();
        const def = this.getDef(op.opId);
        const u = GameState.underground;
        const name = def ? def.name : 'Unbekannte Operation';
        const icon = def ? def.icon : '🚔';

        const fine = Math.round(GameState.cash * 0.2);
        GameState.cash = Math.max(0, GameState.cash - fine);
        const seized = this.round2(u.blackMoney);
        u.blackMoney = 0;
        u.operations = [];
        u.heat = 0;
        u.arrests++;

        const sentence = def ? def.jail : 4;
        GameState.prison = {
            active: true,
            crime: name,
            crimeIcon: icon,
            fine,
            seized,
            weeks: sentence,
            untilWeek: GameState.week + sentence
        };

        GameState.addTransaction('prison', 'underground', 'Verhaftung – ' + name, def ? def.id : '?', 0, fine, 0, -fine);
        GameState.addNews('🚔 RAZZIA: ' + name.toUpperCase() + ' hochgenommen!',
            `Die Polizei hat deine Operation ${name} ausgehoben. Geldstrafe: €${this.fmt(fine)}. Beschlagnahmt: €${this.fmt(seized)} Schwarzgeld. Haft: ${sentence} Wochen.`,
            'crime', ['Geldstrafe: €' + this.fmt(fine), 'Haft: ' + sentence + ' Wochen']);
    },

    /* Entlassung prüfen; true, wenn freigelassen. */
    checkRelease() {
        const p = GameState.prison;
        if (!p || !p.active) return false;
        if (GameState.week >= p.untilWeek) {
            p.active = false;
            GameState.addNews('⚖️ Entlassen!',
                'Deine Haftzeit ist abgelaufen. Schweren Herzens zurück in die Legalität?',
                'crime', null);
            return true;
        }
        return false;
    },

    /* Schwarzgeld in legalen Cash umwandeln (Gebühr + Fahndung). */
    wash(amount) {
        this.ensureState();
        const u = GameState.underground;
        if (GameState.isInPrison()) return null;
        amount = Math.min(Math.max(0, Math.floor(amount)), u.blackMoney);
        if (amount <= 0) return null;

        const fee = this.round2(amount * this.WASH_FEE);
        const netto = this.round2(amount - fee);
        u.blackMoney = this.round2(u.blackMoney - amount);
        GameState.addCash(netto);
        u.washedTotal = this.round2(u.washedTotal + amount);
        u.heat = Math.min(this.MAX_HEAT, u.heat + Math.max(1, Math.floor(amount / this.HEAT_PER_EURO)));
        return { amount, fee, netto, heat: u.heat };
    },

    /* Risiko für Anzeige (pro Woche, in %). */
    displayRisk(op) {
        return Math.min(99.9, Math.round(this.activeRisk(op) * 1000) / 10);
    }
};