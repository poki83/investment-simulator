const Game = {
    tickInterval: null,
    tickRate: 1000,
    lastTick: 0,
    tickAccumulator: 0,
    dividentWeek: 26,
    lastProcessedMonth: 1,
    lastMarketMinute: 0,
    taxWarningShown: false,

    init() {
        const loaded = GameState.init();

        StockMarket.init();
        ETFMarket.init();
        CryptoMarket.init();
        RealEstate.init();
        Companies.init();
        Luxury.init();
        Leaderboard.init();
        Casino.init();
        Events.init();

        if (loaded) {
            this.lastProcessedMonth = GameState.month;
            const offlineDays = this.processOfflineProgress();
            UI.init();
            if (offlineDays > 0) {
                UI.showToast(`Offline-Fortschritt: ${offlineDays} Tage simuliert!`, '⏲️');
            } else {
                UI.showToast('Spielstand geladen!', '💾');
            }
        } else {
            this.lastProcessedMonth = GameState.month;
            UI.init();
        }

        document.getElementById('tax-notification-close').addEventListener('click', () => {
            document.getElementById('tax-notification').classList.add('hidden');
        });

        GameState.paused = false;
        GameState.speed = 1;

        this.start();

        setInterval(() => UI.updateLiveClock(), 1000);
    },

    processOfflineProgress() {
        const lastTime = GameState.lastSaveTime;
        if (!lastTime) return 0;

        const elapsedMinutes = Math.floor((Date.now() - lastTime) / 60000);
        if (elapsedMinutes <= 0) return 0;

        const days = Math.min(30, elapsedMinutes);
        for (let i = 0; i < days; i++) {
            GameState.advanceDay();
            if (GameState.isWeekday()) {
                StockMarket.update();
                ETFMarket.update();
                CryptoMarket.update();
            }
            RealEstate.update();
            Companies.update();
            Luxury.update();
            Events.update();
            if (GameState.month !== this.lastProcessedMonth) {
                this.processMonthly();
                this.lastProcessedMonth = GameState.month;
            }
            Taxes.processWeeklyTaxes();
        }
        RealEstate.syncState();
        GameState.save();
        return days;
    },

    start() {
        this.lastTick = performance.now();
        this.tickAccumulator = 0;
        this.lastMarketMinute = Math.floor(Date.now() / 60000);
        requestAnimationFrame((t) => this.gameLoop(t));
    },

    gameLoop(timestamp) {
        const delta = timestamp - this.lastTick;
        this.lastTick = timestamp;

        if (!GameState.paused) {
            this.tickAccumulator += delta * GameState.speed;

            while (this.tickAccumulator >= this.tickRate) {
                this.tickAccumulator -= this.tickRate;
                this.tick();
            }
        }

        requestAnimationFrame((t) => this.gameLoop(t));
    },

    tick() {
        GameState.advanceDay();

        const nowMinute = Math.floor(Date.now() / 60000);
        if (nowMinute !== this.lastMarketMinute) {
            this.lastMarketMinute = nowMinute;
            if (GameState.isWeekday()) {
                StockMarket.update();
                ETFMarket.update();
                CryptoMarket.update();
            }
        }

        RealEstate.update();
        Companies.update();
        Luxury.update();
        Leaderboard.updateNpcs();
        Events.update();

        if (GameState.month !== this.lastProcessedMonth) {
            this.processMonthly();
            this.lastProcessedMonth = GameState.month;
        }

        if (GameState.week >= this.dividentWeek) {
            this.processDividends();
            this.dividentWeek += 26;
        }

        Taxes.processWeeklyTaxes();

        this.checkTaxNotification();

        UI.updateAll();

        if (GameState.week % 10 === 0 && Math.random() < 0.2) {
            const event = Events.triggerRandomEvent();
            if (event) {
                UI.showNewsToast(event);
            }
        }

        if (GameState.week % 12 === 0) {
            RealEstate.syncState();
            GameState.save();
        }
    },

    processMonthly() {
        const monthlyRent = GameState.getMonthlyRent();
        if (monthlyRent > 0) {
            GameState.addCash(monthlyRent);
            GameState.addTransaction('rent', 'realestate', 'Mieteinnahmen', 'RENT', 1, monthlyRent, 0, monthlyRent);
            const rentTax = Taxes.withholdRent(monthlyRent);
            if (rentTax > 0) {
                GameState.addCash(-rentTax);
                GameState.addTransaction('tax', 'realestate', 'Steuer auf Mieteinnahmen', 'TAX', 0, 0, 0, rentTax);
            }
        }

        const grundsteuer = Taxes.calculateGrundsteuer();
        const monthlyGrundsteuer = grundsteuer / 12;
        if (monthlyGrundsteuer > 0) {
            Taxes.addTaxDebt(monthlyGrundsteuer);
        }

        for (const prop of RealEstate.properties) {
            if (!prop.owned) continue;
            const growth = 0.001 + (Math.random() - 0.5) * 0.002;
            prop.currentValue = Math.round(prop.currentValue * (1 + growth));
        }
        RealEstate.syncState();
    },

    processDividends() {
        for (const [symbol, holding] of Object.entries(GameState.portfolio.stocks)) {
            if (holding.shares > 0) {
                const stock = StockMarket.data[symbol];
                if (stock && stock.dividend !== '-') {
                    const dividendStr = stock.dividend.replace(/[^0-9.,]/g, '').replace(',', '.');
                    const dividendPerShare = parseFloat(dividendStr);
                    if (!isNaN(dividendPerShare) && dividendPerShare > 0) {
                        const totalDividend = dividendPerShare * holding.shares;
                        GameState.addCash(totalDividend);
                        GameState.addTransaction('dividend', 'stock', stock.name, symbol, holding.shares, dividendPerShare, 0, totalDividend);
                    }
                }
            }
        }

        for (const [symbol, holding] of Object.entries(GameState.portfolio.etfs)) {
            if (holding.shares > 0) {
                const etf = ETFMarket.data[symbol];
                if (etf && etf.dividend) {
                    const divStr = etf.dividend.replace('%', '').replace(',', '.');
                    const divRate = parseFloat(divStr) / 100;
                    if (!isNaN(divRate)) {
                        const totalDividend = holding.invested * divRate / 2;
                        GameState.addCash(totalDividend);
                        GameState.addTransaction('dividend', 'etf', etf.name, symbol, holding.shares, 0, 0, totalDividend);
                    }
                }
            }
        }
    },

    checkTaxNotification() {
        const summary = Taxes.getSummary();
        const el = document.getElementById('tax-notification');
        const overdue = summary.total > 50 && summary.weeksOverdue > 0;

        if (overdue && !this.taxWarningShown) {
            this.taxWarningShown = true;
            document.getElementById('tax-notification-text').textContent =
                `⚠️ Steuerschuld: €${UI.fmt(summary.total)}! ${summary.lateFees > 0 ? `Verspätungszuschlag: €${UI.fmt(summary.lateFees)}` : 'Zahle jetzt, um Zuschläge zu vermeiden!'}`;
            el.classList.remove('hidden');
        } else if (!overdue) {
            el.classList.add('hidden');
        }

        if (summary.total <= 0) {
            this.taxWarningShown = false;
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Game.init();
});
