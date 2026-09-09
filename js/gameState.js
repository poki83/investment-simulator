const GameState = {
    cash: 10000,
    initialCash: 10000,
    week: 1,
    day: 1,
    month: 1,
    year: 2025,
    dayOfWeek: 3,
    paused: false,
    speed: 1,
    bundesland: 'NRW',
    lastBundeslandChange: 0,
    lastSaveTime: null,

    portfolio: {
        stocks: {},
        etfs: {},
        crypto: {},
        realEstate: []
    },

    taxes: {
        unpaid: 0,
        capitalTax: 0,
        soli: 0,
        grunderwerbsteuer: 0,
        grundsteuer: 0,
        rentalTax: 0,
        lateFees: 0,
        history: [],
        lastPaymentWeek: 0,
        dueWeek: 13,
        capitalNet: 0,
        capitalTaxPaid: 0,
        rentNet: 0,
        rentTaxPaid: 0,
        taxYear: 2025
    },

    underground: {
        blackMoney: 0,
        heat: 0,
        operations: [],
        washedTotal: 0,
        arrests: 0,
        lastWeek: 1,
        heatDecayWeek: 0
    },

    prison: {
        active: false,
        crime: '',
        crimeIcon: '🚔',
        fine: 0,
        seized: 0,
        weeks: 0,
        untilWeek: 0
    },

    transactions: [],
    news: [],
    portfolioHistory: [],
    realEstateState: [],
    tutorialDone: false,
    totalInvested: 0,
    casinoStats: { net: 0, wagered: 0, wins: 0, losses: 0 },

    init() {
        const saved = Storage.load();
        if (saved) {
            Object.assign(this, saved);
            return true;
        }
        this.reset();
        return false;
    },

    reset() {
        this.cash = 10000;
        this.initialCash = 10000;
        this.week = 1;
        this.day = 1;
        this.month = 1;
        this.year = 2025;
        this.dayOfWeek = 3;
        this.paused = false;
        this.speed = 1;
        this.bundesland = 'NRW';
        this.lastBundeslandChange = 0;
        this.lastSaveTime = null;
        this.portfolio = { stocks: {}, etfs: {}, crypto: {}, realEstate: [], companies: [], luxury: [] };
        this.taxes = {
            unpaid: 0, capitalTax: 0, soli: 0, grunderwerbsteuer: 0,
            grundsteuer: 0, rentalTax: 0, lateFees: 0, history: [],
            lastPaymentWeek: 0, dueWeek: 13,
            capitalNet: 0, capitalTaxPaid: 0,
            rentNet: 0, rentTaxPaid: 0, taxYear: 2025
        };
        this.underground = {
            blackMoney: 0,
            heat: 0,
            operations: [],
            washedTotal: 0,
            arrests: 0,
            lastWeek: 1,
            heatDecayWeek: 0
        };
        this.prison = {
            active: false,
            crime: '',
            crimeIcon: '🚔',
            fine: 0,
            seized: 0,
            weeks: 0,
            untilWeek: 0
        };
        this.transactions = [];
        this.news = [];
        this.portfolioHistory = [];
        this.realEstateState = [];
        this.tutorialDone = false;
        this.totalInvested = 0;
        this.casinoStats = { net: 0, wagered: 0, wins: 0, losses: 0 };
    },

    save() {
        this.lastSaveTime = Date.now();
        Storage.save(this);
    },

    addCash(amount) {
        this.cash += amount;
    },

    removeCash(amount) {
        if (this.cash >= amount) {
            this.cash -= amount;
            return true;
        }
        return false;
    },

    addTransaction(type, assetType, name, symbol, amount, price, fee, total) {
        this.transactions.unshift({
            week: this.week,
            type, assetType, name, symbol,
            amount, price, fee, total,
            date: this.getDateString()
        });
        if (this.transactions.length > 100) {
            this.transactions.pop();
        }
    },

    addNews(title, body, category, impacts) {
        this.news.unshift({
            title, body, category, impacts,
            week: this.week,
            date: this.getDateString()
        });
        if (this.news.length > 200) {
            this.news.pop();
        }
    },

    getDateString() {
        const m = this.month < 10 ? '0' + this.month : this.month;
        const d = this.day < 10 ? '0' + this.day : this.day;
        return `${d}.${m}.${this.year}`;
    },

    advanceDay() {
        this.dayOfWeek = (this.dayOfWeek + 1) % 7;
        this.day++;
        const daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
        if (this.day > daysInMonth[this.month - 1]) {
            this.day = 1;
            this.month++;
            if (this.month > 12) {
                this.month = 1;
                this.year++;
            }
        }
        if (this.dayOfWeek === 0) {
            this.week++;
        }
    },

    isWeekday() {
        return this.dayOfWeek >= 1 && this.dayOfWeek <= 5;
    },

    getPortfolioValue() {
        let value = 0;
        for (const [symbol, holding] of Object.entries(this.portfolio.stocks)) {
            if (holding.shares > 0 && StockMarket.data[symbol]) {
                value += holding.shares * StockMarket.data[symbol].price;
            }
        }
        for (const [symbol, holding] of Object.entries(this.portfolio.etfs)) {
            if (holding.shares > 0 && ETFMarket.data[symbol]) {
                value += holding.shares * ETFMarket.data[symbol].price;
            }
        }
        for (const [symbol, holding] of Object.entries(this.portfolio.crypto)) {
            if (holding.amount > 0 && CryptoMarket.data[symbol]) {
                value += holding.amount * CryptoMarket.data[symbol].price;
            }
        }
        for (const prop of RealEstate.properties) {
            if (prop.owned) {
                value += prop.currentValue;
            }
        }
        if (Companies && Companies.owned) {
            for (const company of Companies.owned) {
                value += company.value;
            }
        }
        if (Luxury && Luxury.owned) {
            for (const owned of Luxury.owned) {
                value += owned.currentValue;
            }
        }
        return value;
    },

    getRealEstateValue() {
        let value = 0;
        for (const prop of RealEstate.properties) {
            if (prop.owned) {
                value += prop.currentValue;
            }
        }
        return value;
    },

    getMonthlyRent() {
        let rent = 0;
        for (const prop of RealEstate.properties) {
            if (prop.owned) {
                if (prop.renovated) {
                    rent += prop.monthlyRent * 1.3;
                } else {
                    rent += prop.monthlyRent;
                }
            }
        }
        return rent;
    },

    getTotalTaxOwed() {
        return this.taxes.unpaid + this.taxes.lateFees;
    },

    isInPrison() {
        return !!(this.prison && this.prison.active && this.week < this.prison.untilWeek);
    },

    prisonWeeksLeft() {
        return this.isInPrison() ? this.prison.untilWeek - this.week : 0;
    }
};
