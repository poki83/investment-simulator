/* =========================================================
   DAS MARKT-ORAKEL "Q" – einzigartige Spielfunktion
   ---------------------------------------------------------
   Einmal pro Spielwoche stellt Q eine Kurs-Prognosefrage zu einem
   echten Marktwert (Aktie/ETF/Krypto). Deine Antwort wird am Ende
   der Woche gegen die ECHTE Kurs-Simulation gewertet.

   Richtig  → 7-Tage-Boost (Aktien-Rally / ETF-Boom / Krypto-Rally
              oder +500 € Sparerpauschbetrag)
   Falsch   → Marktkorrektur (3 % Wertverlust in diesem Segment)
   Passen   → keine Wirkung

   Jede richtige Prognose steigert dein Prestige – vom "Unbekannten
   Signal" bis zur "Legende des Orakels".
   ========================================================= */

const Oracle = {
    RATES: {
        boost: { aktien: 0.02, etf: 0.02, krypto: 0.04 },
        penalty: 0.03
    },
    STEUER_BOOST: 500,

    TITLES: [
        { min: 60, title: 'Legende des Orakels', emoji: '🏛️' },
        { min: 40, title: 'Q-Vertrauter', emoji: '🌌' },
        { min: 25, title: 'Zyklen-Meister', emoji: '🌀' },
        { min: 15, title: 'Orakel-Geselle', emoji: '🔮' },
        { min: 8,  title: 'Trend-Späher', emoji: '📡' },
        { min: 3,  title: 'Kurs-Adept', emoji: '📈' },
        { min: 1,  title: 'Markt-Flüsterer', emoji: '🌬️' },
        { min: 0,  title: 'Unbekanntes Signal', emoji: '❓' }
    ],

    ensureState() {
        const g = GameState;
        if (!g.oracle) g.oracle = {};
        const o = g.oracle;
        o.question = o.question || null;
        o.locked = o.locked || false;
        o.predict = o.predict || null;
        if (typeof o.correct !== 'number') o.correct = 0;
        if (typeof o.wrong !== 'number') o.wrong = 0;
        if (typeof o.skipped !== 'number') o.skipped = 0;
        if (typeof o.streak !== 'number') o.streak = 0;
        if (typeof o.bestStreak !== 'number') o.bestStreak = 0;
        o.history = o.history || [];
        o.buff = o.buff || null;
        o.penalty = o.penalty || null;
        return o;
    },

    /* Kandidaten aus den Live-Märkten sammeln */
    candidates() {
        const list = [];
        for (const s of Object.values(StockMarket.data)) {
            list.push({ type: 'stock', symbol: s.symbol, name: s.name, price: s.price, seg: 'aktien' });
        }
        for (const e of Object.values(ETFMarket.data)) {
            list.push({ type: 'etf', symbol: e.symbol, name: e.name, price: e.price, seg: 'etf' });
        }
        for (const c of Object.values(CryptoMarket.data)) {
            list.push({ type: 'crypto', symbol: c.symbol, name: c.name, price: c.price, seg: 'krypto' });
        }
        return list;
    },

    /* Momentanen Preis eines Assets aus dem Markt lesen */
    currentPrice(q) {
        if (!q) return null;
        const asset =
            q.assetType === 'crypto' ? CryptoMarket.data[q.symbol] :
            q.assetType === 'etf' ? ETFMarket.data[q.symbol] :
            StockMarket.data[q.symbol];
        return asset ? asset.price : null;
    },

    /* Neue Wochenfrage erzeugen (falls keine offen) */
    ask() {
        const o = this.ensureState();
        if (o.question) return o.question;
        const pool = this.candidates();
        if (!pool.length) return null;
        const asset = pool[Math.floor(Math.random() * pool.length)];
        const side = Math.random() < 0.5 ? 'up' : 'down';
        o.question = {
            assetType: asset.type,
            symbol: asset.symbol,
            name: asset.name,
            seg: asset.seg,
            price: asset.price,
            side,
            askWeek: GameState.week
        };
        o.locked = false;
        o.predict = null;
        return o.question;
    },

    /* Spieler-Prognose abgeben: 'up' | 'down' | 'pass' */
    answer(prediction) {
        const o = this.ensureState();
        if (!o.question || o.locked) return false;
        if (prediction !== 'up' && prediction !== 'down' && prediction !== 'pass') return false;
        o.predict = prediction;
        o.locked = true;
        return true;
    },

    /* Segment-Portfoliowert (für Boosts/Strafen) */
    segmentValue(seg) {
        const p = GameState.portfolio;
        let value = 0;
        if (seg === 'aktien') {
            for (const [symbol, h] of Object.entries(p.stocks || {})) {
                if (h.shares > 0 && StockMarket.data[symbol]) value += h.shares * StockMarket.data[symbol].price;
            }
        } else if (seg === 'etf') {
            for (const [symbol, h] of Object.entries(p.etfs || {})) {
                if (h.shares > 0 && ETFMarket.data[symbol]) value += h.shares * ETFMarket.data[symbol].price;
            }
        } else if (seg === 'krypto') {
            for (const [symbol, h] of Object.entries(p.crypto || {})) {
                if (h.amount > 0 && CryptoMarket.data[symbol]) value += h.amount * CryptoMarket.data[symbol].price;
            }
        }
        return value;
    },

    title() {
        const o = this.ensureState();
        const correct = o.correct || 0;
        for (const t of this.TITLES) {
            if (correct >= t.min) return t;
        }
        return this.TITLES[this.TITLES.length - 1];
    },

    /* Wochenende: offene Frage auflösen, Boosts/Strafen anwenden,
       neue Woche starten. Liefert Event-Text für Toast oder null. */
    weekEnded() {
        const o = this.ensureState();
        let event = null;
        const endedWeek = GameState.week - 1; /* die Woche, die gerade zu Ende ging */

        /* 1) Wirkung aktiver Boosts/Strafen aus der VERGANGENEN Woche */
        if (o.buff && o.buff.untilWeek === endedWeek) {
            this.applyBuffEffect(o.buff);
        } else if (o.buff && o.buff.untilWeek < endedWeek) {
            o.buff = null;
        }
        if (o.penalty && o.penalty.untilWeek === endedWeek) {
            this.applyPenaltyEffect(o.penalty);
        } else if (o.penalty && o.penalty.untilWeek < endedWeek) {
            o.penalty = null;
        }

        /* 2) Auflösung der letzten offenen Frage */
        if (o.question) {
            const q = o.question;
            const nowPrice = this.currentPrice(q);
            /* Wenn der Preis nicht lesbar ist (kein Markt), fragen wir einfach neu */
            if (nowPrice === null) {
                o.question = null;
                o.locked = false;
                o.predict = null;
            } else {
                const moved = nowPrice - q.price;
                const up = moved > 0;
                const down = moved < 0;
                const resolvedQ = Object.assign({}, q, { moved: Math.round((moved / q.price) * 10000) / 100 });
                const answered = o.locked;

                let outcome = null; // 'correct' | 'wrong' | 'pass' | 'skipped'
                let correct = null;

                if (answered) {
                    if (o.predict === 'pass') {
                        outcome = 'pass';
                        correct = false;
                    } else {
                        correct = (o.predict === 'up' && up) || (o.predict === 'down' && down);
                        outcome = correct ? 'correct' : 'wrong';
                    }
                } else {
                    outcome = 'skipped';
                    correct = false;
                }

                if (outcome === 'correct') {
                    o.correct++;
                    o.streak++;
                    o.bestStreak = Math.max(o.bestStreak, o.streak);
                    this.scheduleBuff(q.seg);
                    event = { type: 'correct', correct, outcome, q: resolvedQ };
                } else if (outcome === 'wrong') {
                    o.wrong++;
                    o.streak = 0;
                    this.schedulePenalty(q.seg);
                    event = { type: 'wrong', correct, outcome, q: resolvedQ };
                } else if (outcome === 'pass') {
                    o.streak = 0;
                    event = { type: 'pass', correct, outcome, q: resolvedQ };
                } else {
                    o.skipped++;
                    o.streak = 0;
                    event = { type: 'skipped', correct, outcome, q: resolvedQ };
                }

                o.history.unshift({
                    week: q.askWeek,
                    symbol: q.symbol,
                    name: q.name,
                    seg: q.seg,
                    side: q.side,
                    price: q.price,
                    endPrice: nowPrice,
                    prediction: o.predict,
                    outcome
                });
                if (o.history.length > 60) o.history.pop();
                o.question = null;
                o.locked = false;
                o.predict = null;
            }
        }

        /* 3) Neue Frage für die neue Woche */
        this.ask();
        return event;
    },

    /* Boost für nächste Woche planen (nach richtiger Antwort) */
    scheduleBuff(seg) {
        const o = this.ensureState();
        const type = seg === 'krypto' && Math.random() < 0.5 ? 'krypto' : seg;
        /* zufällig kann Q auch den Steuer-Freibetrag schenken */
        if (Math.random() < 0.22) {
            o.buff = { type: 'steuer', untilWeek: GameState.week };
        } else {
            o.buff = { type, untilWeek: GameState.week };
        }
    },

    schedulePenalty(seg) {
        const o = this.ensureState();
        o.penalty = { type: seg, untilWeek: GameState.week };
    },

    applyBuffEffect(buff) {
        const o = this.ensureState();
        if (buff.type === 'steuer') {
            if (!GameState.taxes) GameState.taxes = {};
            GameState.taxes.oracleFreibetrag = (GameState.taxes.oracleFreibetrag || 0) + this.STEUER_BOOST;
            GameState.addTransaction ? GameState.addTransaction('oracle', 'boost', 'Orakel-Steuerbonus', 'Q', 1, this.STEUER_BOOST, 0, this.STEUER_BOOST) : null;
        } else {
            const value = this.segmentValue(buff.type);
            const gain = Math.round(value * this.RATES.boost[buff.type] * 100) / 100;
            if (gain > 0) {
                GameState.addCash(gain);
                GameState.addTransaction ? GameState.addTransaction('oracle', 'boost', this.boostName(buff.type), 'Q', 1, gain, 0, gain) : null;
            }
        }
        o.buff = null;
    },

    applyPenaltyEffect(penalty) {
        const o = this.ensureState();
        const value = this.segmentValue(penalty.type);
        const loss = Math.round(Math.min(value * this.RATES.penalty, GameState.cash) * 100) / 100;
        if (loss > 0) {
            GameState.addCash(-loss);
            GameState.addTransaction ? GameState.addTransaction('oracle', 'penalty', this.penaltyName(penalty.type), 'Q', 1, loss, 0, loss) : null;
        }
        o.penalty = null;
    },

    boostName(type) {
        return {
            steuer: 'Orakel-Steuerbonus',
            aktien: 'Orakel: Aktien-Rally',
            etf: 'Orakel: ETF-Boom',
            krypto: 'Orakel: Krypto-Rally'
        }[type] || 'Orakel-Boost';
    },

    penaltyName(seg) {
        return {
            aktien: 'Orakel: Aktien-Korrektur',
            etf: 'Orakel: ETF-Korrektur',
            krypto: 'Orakel: Krypto-Korrektur'
        }[seg] || 'Orakel-Korrektur';
    },

    questionText(q) {
        const verb = q.side === 'up' ? 'steigen' : 'fallen';
        return `Wird <strong>${q.name}</strong> (${q.symbol}) bis zum Wochenende ${verb}?`;
    },

    outcomeLabel(outcome) {
        return {
            correct: '✔ Richtig',
            wrong: '✘ Falsch',
            pass: '— Gepasst',
            skipped: '⊙ Unbeantwortet'
        }[outcome] || '';
    }
};