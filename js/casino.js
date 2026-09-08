const Casino = {
    ROUGE: [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36],

    SLOT_TICKET: 100,
    SLOT_JACKPOT: 1000000,
    SLOTS: {
        lastSpin: null,
        SPIN_INTERVAL: 5000,
        SYMBOLS: ['🍒', '🍋', '🍇', '💎', '7️⃣', '💰'],
        TIERS: [
            { p: 0.14,    pay: 150,    symbols: ['🍒','🍒','🍒'],   name: 'DREI KIRSCHEN' },
            { p: 0.12,    pay: 200,    symbols: ['🍋','🍋','🍋'],   name: 'DREI ZITRONEN' },
            { p: 0.10,    pay: 250,    symbols: ['🍇','🍇','🍇'],   name: 'DREI TRAUBEN' },
            { p: 0.03,    pay: 400,    symbols: ['🍒','🍋','🍇'],   name: 'FRUCHTMIX' },
            { p: 0.015,   pay: 600,    symbols: ['💎','💎','🍇'],   name: 'DIAMANTEN-PAIR' },
            { p: 0.003,   pay: 1000,   symbols: ['💎','💎','💎'],   name: 'DREI DIAMANTEN' },
            { p: 0.0003,  pay: 5000,   symbols: ['7️⃣','7️⃣','💎'], name: 'LUCKY SEVEN' },
            { p: 0.00003, pay: 25000,  symbols: ['7️⃣','7️⃣','7️⃣'], name: 'TRIPLE SEVEN' },
            { p: 0.000007,pay: 100000, symbols: ['7️⃣','7️⃣','💰'], name: 'MEGA SEVEN' },
            { p: 0.000001,pay: 1000000,symbols: ['💰','💰','💰'],  name: 'JACKPOT!' }
        ],
        canSpin() {
            return !this.lastSpin || (Date.now() - this.lastSpin) >= this.SPIN_INTERVAL;
        },
        msLeft() {
            return this.lastSpin ? Math.max(0, this.SPIN_INTERVAL - (Date.now() - this.lastSpin)) : 0;
        },
        roll() {
            const r = Math.random();
            let acc = 0;
            for (const tier of this.TIERS) {
                acc += tier.p;
                if (r <= acc) {
                    return { winAmount: tier.pay, symbols: tier.symbols.slice(), combo: tier.name };
                }
            }
            return { winAmount: 0, symbols: this.randomSymbols(), combo: null };
        },
        randomSymbols() {
            const weights = [0.30, 0.25, 0.20, 0.12, 0.08, 0.05];
            const pick = () => {
                let r = Math.random();
                let acc = 0;
                for (let k = 0; k < weights.length; k++) {
                    acc += weights[k];
                    if (r <= acc) return this.SYMBOLS[k];
                }
                return this.SYMBOLS[0];
            };
            const s = [pick(), pick(), pick()];
            if (s[0] === s[1] && s[1] === s[2]) {
                s[2] = this.SYMBOLS[(this.SYMBOLS.indexOf(s[2]) + 1) % this.SYMBOLS.length];
            }
            return s;
        },
        resetSpin() {
            this.lastSpin = null;
        }
    },

    init() {
        if (!GameState.casinoStats) {
            GameState.casinoStats = { net: 0, wagered: 0, wins: 0, losses: 0 };
        }
    },

    addWin(amount) {
        GameState.addCash(amount);
        GameState.casinoStats.net += amount;
        GameState.casinoStats.wins++;
    },

    addLoss(amount) {
        GameState.casinoStats.net -= amount;
        GameState.casinoStats.losses++;
    },

    redBlack(num) {
        if (num === 0) return 'green';
        return this.ROUGE.includes(num) ? 'red' : 'black';
    },

    spinRoulette(bet, amount) {
        amount = Number(amount);
        if (!amount || amount <= 0 || amount > GameState.cash) return null;
        if (!bet || !bet.type) return null;

        GameState.removeCash(amount);
        GameState.casinoStats.wagered += amount;

        const num = Math.floor(Math.random() * 37);
        const color = this.redBlack(num);

        let win = false;
        let payout = 0;

        if (bet.type === 'number') {
            if (bet.num === num) { win = true; payout = 35; }
        } else if (bet.type === 'red') {
            if (color === 'red') { win = true; payout = 1; }
        } else if (bet.type === 'black') {
            if (color === 'black') { win = true; payout = 1; }
        } else if (bet.type === 'odd') {
            if (num !== 0 && num % 2 === 1) { win = true; payout = 1; }
        } else if (bet.type === 'even') {
            if (num !== 0 && num % 2 === 0) { win = true; payout = 1; }
        } else if (bet.type === 'low') {
            if (num >= 1 && num <= 18) { win = true; payout = 1; }
        } else if (bet.type === 'high') {
            if (num >= 19 && num <= 36) { win = true; payout = 1; }
        }

        const winAmount = win ? amount * (payout + 1) : 0;
        const profit = win ? amount * payout : -amount;

        if (win) {
            this.addWin(winAmount);
        } else {
            this.addLoss(amount);
        }

        return { num, color, win, payout, winAmount, profit };
    },

    spinSlot() {
        if (!this.SLOTS.canSpin()) return null;
        const amount = Number(this.SLOT_TICKET);
        if (amount <= 0 || amount > GameState.cash) return null;

        GameState.removeCash(amount);
        GameState.casinoStats.wagered += amount;
        this.SLOTS.lastSpin = Date.now();

        const outcome = this.SLOTS.roll();
        const { winAmount, symbols, combo } = outcome;
        const profit = winAmount - amount;

        if (winAmount > 0) {
            this.addWin(winAmount);
        } else {
            this.addLoss(amount);
        }

        return {
            symbols,
            combo,
            winAmount,
            profit,
            jackpot: winAmount === this.SLOT_JACKPOT
        };
    },

    flipCoin(side, amount) {
        amount = Number(amount);
        if (!amount || amount <= 0 || amount > GameState.cash) return null;
        if (side !== 'kopf' && side !== 'zahl') return null;

        GameState.removeCash(amount);
        GameState.casinoStats.wagered += amount;

        const result = Math.random() < 0.5 ? 'kopf' : 'zahl';
        const win = result === side;
        const winAmount = win ? amount * 2 : 0;
        const profit = win ? amount : -amount;

        if (win) {
            this.addWin(winAmount);
        } else {
            this.addLoss(amount);
        }

        return { result, side, win, winAmount, profit };
    }
};