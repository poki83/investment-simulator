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

    /* --- Roulette: Außenwetten (Auswahl) --------------------- */
    ROULETTE_BETS: [
        { type: 'red', label: 'Rot', payout: 1, icon: '🔴' },
        { type: 'black', label: 'Schwarz', payout: 1, icon: '⚫' },
        { type: 'odd', label: 'Ungerade', payout: 1, icon: '1️⃣3️⃣' },
        { type: 'even', label: 'Gerade', payout: 1, icon: '2️⃣4️⃣' },
        { type: 'low', label: '1–18', payout: 1, icon: '🔽' },
        { type: 'high', label: '19–36', payout: 1, icon: '🔼' },
        { type: 'dozen1', label: '1. Dtz. 1–12', payout: 2, icon: '1️⃣2️⃣' },
        { type: 'dozen2', label: '2. Dtz. 13–24', payout: 2, icon: '1️⃣3️⃣–2️⃣4️⃣' },
        { type: 'dozen3', label: '3. Dtz. 25–36', payout: 2, icon: '2️⃣5️⃣' },
        { type: 'col1', label: 'Kolonne 1', payout: 2, icon: '▮' },
        { type: 'col2', label: 'Kolonne 2', payout: 2, icon: '▮▮' },
        { type: 'col3', label: 'Kolonne 3', payout: 2, icon: '▮▮▮' }
    ],

    BLACKJACK_MIN_BET: 10,

    BLACKJACK: {
        state: null, /* { bet, deck, player:[], dealer:[], status, result, payout, profit } */

        newDeck() {
            const suits = ['♠', '♥', '♦', '♣'];
            const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
            const deck = [];
            for (const s of suits) {
                for (const r of ranks) deck.push({ rank: r, suit: s });
            }
            return this.shuffle(deck);
        },
        shuffle(deck) {
            for (let i = deck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const tmp = deck[i];
                deck[i] = deck[j];
                deck[j] = tmp;
            }
            return deck;
        },
        cardValue(rank) {
            if (rank === 'A') return 11;
            if (rank === 'K' || rank === 'Q' || rank === 'J') return 10;
            return parseInt(rank, 10);
        },
        handValue(hand) {
            let total = 0;
            let aces = 0;
            for (const c of hand) {
                total += this.cardValue(c.rank);
                if (c.rank === 'A') aces++;
            }
            while (total > 21 && aces > 0) {
                total -= 10;
                aces--;
            }
            return total;
        },
        isBlackjack(hand) {
            return hand.length === 2 && this.handValue(hand) === 21;
        },
        isBusted(hand) {
            return this.handValue(hand) > 21;
        },
        dealerShouldHit(hand) {
            return this.handValue(hand) < 17;
        },

        /* Ergebnisfindung (rein, ohne Nebenwirkungen) */
        resolve(player, dealer, bet) {
            const pv = this.handValue(player);
            const dv = this.handValue(dealer);
            const pBJ = this.isBlackjack(player);
            const dBJ = this.isBlackjack(dealer);
            if (pBJ && dBJ) return { result: 'push', payout: bet };
            if (pBJ) return { result: 'blackjack', payout: bet * 2.5 };
            if (dBJ) return { result: 'lose', payout: 0 };
            if (pv > 21) return { result: 'lose', payout: 0 };
            if (dv > 21) return { result: 'win', payout: bet * 2 };
            if (pv === dv) return { result: 'push', payout: bet };
            return pv > dv ? { result: 'win', payout: bet * 2 } : { result: 'lose', payout: 0 };
        },

        startDeal(bet) {
            bet = Math.floor(Number(bet));
            if (!bet || bet < Casino.BLACKJACK_MIN_BET || bet > GameState.cash) return null;
            GameState.removeCash(bet);
            GameState.casinoStats.wagered += bet;
            const deck = this.newDeck();
            this.state = {
                bet,
                deck,
                player: [deck.pop(), deck.pop()],
                dealer: [deck.pop(), deck.pop()],
                status: 'player',
                result: null,
                payout: null,
                profit: null
            };
            if (this.isBlackjack(this.state.player)) return this.stand();
            return this.state;
        },

        hit() {
            const st = this.state;
            if (!st || st.status !== 'player') return null;
            st.player.push(st.deck.pop());
            if (this.isBusted(st.player)) return this.stand();
            return st;
        },

        stand() {
            const st = this.state;
            if (!st || st.status === 'done') return null;
            if (st.status === 'player') st.status = 'dealer';
            while (this.dealerShouldHit(st.dealer)) st.dealer.push(st.deck.pop());
            const r = this.resolve(st.player, st.dealer, st.bet);
            st.status = 'done';
            st.result = r.result;
            st.payout = r.payout;
            st.profit = r.payout - st.bet;
            if (r.result === 'push') {
                GameState.addCash(r.payout); /* Einsatz zurück, net unverändert */
            } else if (r.payout > 0) {
                Casino.addWin(r.payout, st.bet);
            } else {
                Casino.addLoss(st.bet);
            }
            return st;
        },

        cashout() {
            this.state = null;
        }
    },

    init() {
        if (!GameState.casinoStats) {
            GameState.casinoStats = { net: 0, wagered: 0, wins: 0, losses: 0, streak: 0, maxStreak: 0 };
        }
    },

    /* amount = ausgezahlt (brutto inkl. Einsatz), stake = gesetzter Einsatz */
    addWin(amount, stake) {
        GameState.addCash(amount);
        GameState.casinoStats.net += amount - (Number(stake) || 0);
        GameState.casinoStats.wins++;
        GameState.casinoStats.streak = (GameState.casinoStats.streak || 0) + 1;
        GameState.casinoStats.maxStreak = Math.max(GameState.casinoStats.maxStreak || 0, GameState.casinoStats.streak);
    },

    addLoss(amount) {
        GameState.casinoStats.net -= amount;
        GameState.casinoStats.losses++;
        GameState.casinoStats.streak = 0;
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

        switch (bet.type) {
            case 'number':
                if (bet.num === num) { win = true; payout = 35; }
                break;
            case 'red': if (color === 'red') { win = true; payout = 1; } break;
            case 'black': if (color === 'black') { win = true; payout = 1; } break;
            case 'odd': if (num !== 0 && num % 2 === 1) { win = true; payout = 1; } break;
            case 'even': if (num !== 0 && num % 2 === 0) { win = true; payout = 1; } break;
            case 'low': if (num >= 1 && num <= 18) { win = true; payout = 1; } break;
            case 'high': if (num >= 19 && num <= 36) { win = true; payout = 1; } break;
            case 'dozen1': if (num >= 1 && num <= 12) { win = true; payout = 2; } break;
            case 'dozen2': if (num >= 13 && num <= 24) { win = true; payout = 2; } break;
            case 'dozen3': if (num >= 25 && num <= 36) { win = true; payout = 2; } break;
            case 'col1': if (num >= 1 && num <= 36 && num % 3 === 1) { win = true; payout = 2; } break;
            case 'col2': if (num >= 1 && num <= 36 && num % 3 === 2) { win = true; payout = 2; } break;
            case 'col3': if (num >= 1 && num <= 36 && num % 3 === 0) { win = true; payout = 2; } break;
        }

        const winAmount = win ? amount * (payout + 1) : 0;
        const profit = win ? amount * payout : -amount;

        if (win) {
            this.addWin(winAmount, amount);
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
            this.addWin(winAmount, amount);
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
            this.addWin(winAmount, amount);
        } else {
            this.addLoss(amount);
        }

        return { result, side, win, winAmount, profit };
    }
};