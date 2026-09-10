const UI = {
    currentPage: 'dashboard',
    detailOpen: null,
    tradeAction: 'buy',
    tutorialStep: 0,
    portfolioFilter: 'all',

    tutorialSteps: [
        { icon: '🚀', title: 'Willkommen bei InvestSim!', text: 'Du startest mit <strong>€10.000</strong> Startguthaben. Dein Ziel: Aus diesem kleinen Budget ein echtes Vermögen aufzubauen – wie ein echter Investor mit echten Entscheidungen, Risiken und <strong>Steuern</strong>.<br><br>💡 <strong>Tipp:</strong> Das Spiel läuft in Echtzeit weiter, während du dich umschaust. Du kannst mit ⏸ pausieren.' },
        { icon: '📊', title: 'Dashboard', text: 'Hier siehst du deine <strong>Gesamtperformance</strong>: verfügbares Guthaben, Portfoliowert und Gewinne. Der <strong>Chart</strong> zeigt den Verlauf deines Vermögens.<br><br>💡 <strong>Tipp:</strong> Je grüner dein Verlauf, desto besser – aber auch Verluste lehren dich, worin du besser nicht investierst.' },
        { icon: '📈', title: 'Aktienmarkt', text: 'Der <strong>Aktienmarkt</strong> bietet <strong>20 Aktien</strong> – von deutschen Klassikern wie SAP und BMW bis zu US-Tech-Werten wie Apple und NVIDIA.<br><br>Klicke auf eine Aktie, um den Kursverlauf zu sehen und über den <strong>Buy/Sell-Slider</strong> zu kaufen oder verkaufen.<br><br>💡 <strong>Tipp:</strong> Kaufe günstig ein und verkaufe nicht sofort beim ersten Kursrutsch – Kurse schwanken täglich.' },
        { icon: '🌊', title: 'ETFs & Krypto', text: '<strong>ETFs</strong> streuen dein Risiko über viele Werte – ideal für Anfänger, die Ruhe bewahren wollen.<br><br><strong>Kryptowährungen</strong> (Bitcoin, Ethereum, …) sind gnadenlos volatil: 💎 hohe Gewinne, aber auch harte Verluste.<br><br>💡 <strong>Tipp:</strong> Eine Mischung aus ETFs (stabil) und einem kleinen Krypto-Anteil (Chance) ist eine solide Strategie.' },
        { icon: '🏠', title: 'Immobilien', text: 'Kaufe <strong>Immobilien</strong> in verschiedenen deutschen Städten – jede Stadt hat ihre eigenen <strong>Preise und Mieten</strong>.<br><br>Du kannst Objekte <strong>renovieren</strong> und so Wert &amp; Miete steigern.<br><br>💡 <strong>Tipp:</strong> Achte auf die <strong>Grunderwerbsteuer</strong>: 3,5% bis 6,5% je nach Bundesland – die zahlt beim Kauf sofort mit. Mieteinnahmen werden monatlich versteuert.' },
        { icon: '🏢', title: 'Unternehmen', text: 'Gründe dein eigenes <strong>Unternehmen</strong> – von der Bank über eine Bekleidungsmarke bis zum Tech-Startup und zur Restaurantkette.<br><br>Unternehmen generieren <strong>monatliche Gewinne</strong>, wenn sie laufen – und du kannst sie später wieder verkaufen.<br><br>💡 <strong>Tipp:</strong> Größere Unternehmen kosten mehr, zahlen aber auch stabiler aus.' },
        { icon: '🛍️', title: 'Shops & Garage', text: 'In den <strong>Shops</strong> kaufst du Lifestyle-Güter: Auto-Haus, Yacht-Club, Jet-Port und Uhren-Boutique.<br><br>In der <strong>Garage</strong> kannst du sie jederzeit wieder verkaufen – aber nur zum <strong>Gebrauchtpreis</strong> (ca. 60%).<br><br>⚠️ <strong>Wichtig:</strong> Autos, Yachten und Jets verlieren an Wert. Uhren können sogar im Wert steigen!' },
        { icon: '🎰', title: 'Casino, aber clever', text: 'Im <strong>Casino</strong> kannst du mit deinem Geld spielen: Roulette (auch Zahlen, 35:1), <strong>Blackjack 21</strong>, Spielautomat und Münzwurf.<br><br>⚠️ <strong>Tipp:</strong> Der Hausvorteil ist immer auf Seiten des Casinos. Spiele nur mit Geld, das du verschmerzen kannst – echte Vermögen entstehen an den Märkten, nicht am Spieltisch.' },
        { icon: '🏆', title: 'Reichtumsliste', text: 'Die <strong>Reichtumsliste</strong> zeigt die reichsten Menschen Deutschlands.<br><br>Dein Rang berechnet sich automatisch aus deinem <strong>gesamten Vermögen</strong> (Guthaben + Portfoliowert).<br><br>💡 <strong>Ziel:</strong> Schaff es in die Top 3 – dann bist du offiziell ein InvestSim-Vermögen.' },
        { icon: '🧾', title: 'Steuern leicht erklärt', text: 'In Deutschland zahlt man <strong>Steuern</strong> – auch hier im Spiel:<br><br>• <strong>Kapitalertragsteuer (26,375%)</strong> wird automatisch bei Verkaufsgewinnen einbehalten wie im echten Depot<br>• <strong>Sparerpauschbetrag:</strong> die ersten <strong>1.000 € Gewinn pro Jahr sind steuerfrei</strong><br>• <strong>Verluste verrechnen</strong> sich mit Gewinnen – zu viel bezahlte Steuer wird sogar erstattet<br>• <strong>Mieteinnahmen</strong> &amp; <strong>Grunderwerbsteuer</strong> laufen automatisch<br><br>⚠️ Bezahle offene Steuerschulden <strong>fristgerecht</strong> – sonst gibt es 1% Verspätungszuschlag pro Monat.' },
        { icon: '⏱️', title: 'Echtzeit & Speichern', text: 'Das Spiel läuft <strong>in Echtzeit</strong>: 1 echte Sekunde = 1 Spieltag. Der grüne Punkt heißt <strong>LIVE</strong>.<br><br>• ⏸ <strong>Pause</strong> zum entspannten Investieren<br>• ▶ <strong>Play</strong> lässt die Zeit weiterlaufen<br>• 💾 <strong>Speichern</strong> jederzeit möglich – unterwegs wird automatisch gespeichert' },
        { icon: '📰', title: 'Nachrichten & Start', text: '<strong>Marktnachrichten</strong> beeinflussen die Kurse live – Zinsänderungen, Unternehmensmeldungen, Crashs.<br><br>Halte die Ohren offen, dann investierst du zur richtigen Zeit am richtigen Ort.<br><br>🚀 <strong>Viel Erfolg! Du bist bereit.</strong>' }
    ],

    init() {
        this.bindNavigation();
        this.bindSpeedControls();
        this.bindSettings();
        this.bindCheatCode();
        this.bindSaveButton();
        this.bindDetailPanels();
        this.bindAssetPage();
        this.bindTaxPage();
        this.bindTutorial();
        this.bindSellModal();
        this.bindPortfolio();
        this.bindCasino();
        this.updateAll();
    },

    bindNavigation() {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.navigateTo(btn.dataset.page);
            });
        });
    },

    navigateTo(page) {
        this.currentPage = page;
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById('page-' + page).classList.add('active');
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelector(`.nav-btn[data-page="${page}"]`).classList.add('active');
        this.closeDetailPanels();
        this.updatePage(page);
    },

    bindSpeedControls() {
        document.getElementById('btn-speed-pause').addEventListener('click', () => {
            GameState.paused = true;
            GameState.speed = 0;
            this.updateSpeedDisplay();
        });
        document.getElementById('btn-speed-normal').addEventListener('click', () => {
            GameState.paused = false;
            GameState.speed = 1;
            this.updateSpeedDisplay();
        });
    },

    updateSpeedDisplay() {
        document.querySelectorAll('.btn-speed').forEach(b => b.classList.remove('active'));
        const el = document.getElementById('game-speed');
        if (GameState.paused) {
            document.getElementById('btn-speed-pause').classList.add('active');
            el.textContent = '⏸ Pause';
            el.classList.add('paused');
            el.classList.remove('live');
        } else {
            document.getElementById('btn-speed-normal').classList.add('active');
            el.textContent = '● LIVE';
            el.classList.add('live');
            el.classList.remove('paused');
        }
        this.updateLiveClock();
    },

    canAct() {
        return true;
    },

    updateLiveClock() {
        const el = document.getElementById('game-clock');
        if (!el) return;
        const now = new Date();
        const t = now.toTimeString().slice(0, 8);
        const running = !GameState.paused;
        el.innerHTML = ` · <span class="${running ? 'clock-live' : 'clock-paused'}">${t}</span>`;
    },

    bindSettings() {
        document.getElementById('btn-settings').addEventListener('click', () => {
            document.getElementById('settings-modal').classList.remove('hidden');
            document.getElementById('settings-bundesland').value = GameState.bundesland;
        });
        document.getElementById('settings-close').addEventListener('click', () => {
            document.getElementById('settings-modal').classList.add('hidden');
        });
        document.getElementById('settings-bundesland').addEventListener('change', (e) => {
            if (GameState.lastBundeslandChange && (GameState.week - GameState.lastBundeslandChange) < 1) {
                this.showToast('Bundesland kann nur 1x pro Woche geändert werden!', '⚠️');
                document.getElementById('settings-bundesland').value = GameState.bundesland;
                return;
            }
            GameState.bundesland = e.target.value;
            GameState.lastBundeslandChange = GameState.week;
            this.showToast(`Bundesland geändert zu ${e.target.value}`, '📍');
        });
        document.getElementById('settings-reset').addEventListener('click', () => {
            if (confirm('Möchtest du das Spiel wirklich zurücksetzen? Alle Fortschritte gehen verloren!')) {
                Storage.delete();
                GameState.reset();
                location.reload();
            }
        });
        const tutorialBtn = document.getElementById('settings-tutorial');
        if (tutorialBtn) tutorialBtn.addEventListener('click', () => this.restartTutorial());
    },

    bindCheatCode() {
        const input = document.getElementById('cheat-input');
        if (!input) return;
        input.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter') return;
            const code = input.value.trim();
            if (code === 'richardpit1213') {
                GameState.cash += 1000000000000000;
                RealEstate.syncState();
                GameState.save();
                input.value = '';
                this.showToast('Cheatcode aktiviert! 💰 Unbegrenztes Geld!', '💰');
                this.updateAll();
            } else {
                this.showToast('Ungültiger Cheatcode!', '❌');
            }
        });
    },

    bindSaveButton() {
        document.getElementById('btn-save').addEventListener('click', () => {
            RealEstate.syncState();
            GameState.save();
            this.showToast('Spielstand gespeichert!', '💾');
        });
    },

    bindDetailPanels() {
        document.getElementById('re-detail-close').addEventListener('click', () => this.closeDetailPanels());
        document.getElementById('cd-detail-close').addEventListener('click', () => this.closeDetailPanels());
    },

    closeDetailPanels() {
        document.querySelectorAll('.detail-panel').forEach(p => p.classList.add('hidden'));
        this.detailOpen = null;
    },

    bindAssetPage() {
        document.getElementById('asset-detail-back').addEventListener('click', () => {
            const back = this.assetBack || 'dashboard';
            this.closeDetailPanels();
            this.navigateTo(back);
        });

        document.querySelectorAll('#page-asset-detail .trade-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('#page-asset-detail .trade-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.tradeAction = tab.dataset.action;
                this.updateAssetTradeForm();
            });
        });

        document.getElementById('asset-trade-amount').addEventListener('input', () => this.updateAssetTradeForm());
        document.querySelectorAll('#page-asset-detail .trade-quick').forEach(btn => {
            btn.addEventListener('click', () => this.applyQuickAmount(btn.dataset.pct));
        });
        document.getElementById('asset-trade-btn').addEventListener('click', () => this.executeAssetTrade());
    },

    bindTaxPage() {
        document.getElementById('tax-pay-btn').addEventListener('click', () => {
            const amount = parseFloat(document.getElementById('tax-payment-amount').value) || 0;
            if (amount <= 0) return;
            const paid = Taxes.payTaxes(amount);
            if (paid > 0) {
                this.showToast(`€${this.fmt(paid)} Steuern gezahlt!`, '✅');
                this.updateAll();
            }
        });
        document.getElementById('tax-pay-all-btn').addEventListener('click', () => {
            const total = GameState.getTotalTaxOwed();
            if (total <= 0) {
                this.showToast('Keine offenen Steuern!', 'ℹ️');
                return;
            }
            const paid = Taxes.payTaxes(total);
            if (paid > 0) {
                this.showToast(`€${this.fmt(paid)} Steuern gezahlt!`, '✅');
                this.updateAll();
            } else {
                this.showToast('Nicht genug Guthaben!', '⚠️');
            }
        });
    },

    bindTutorial() {
        const overlay = document.getElementById('tutorial-overlay');
        const skipBtn = document.getElementById('tutorial-skip');
        const nextBtn = document.getElementById('tutorial-next');
        const prevBtn = document.getElementById('tutorial-prev');

        if (GameState.tutorialDone) {
            overlay.classList.add('hidden');
            return;
        }

        this.showTutorialStep(0);

        nextBtn.addEventListener('click', () => {
            this.tutorialStep++;
            if (this.tutorialStep >= this.tutorialSteps.length) {
                this.finishTutorial();
                return;
            }
            this.showTutorialStep(this.tutorialStep);
        });

        prevBtn.addEventListener('click', () => {
            if (this.tutorialStep <= 0) return;
            this.tutorialStep--;
            this.showTutorialStep(this.tutorialStep);
        });

        skipBtn.addEventListener('click', () => {
            this.finishTutorial();
        });
    },

    finishTutorial() {
        document.getElementById('tutorial-overlay').classList.add('hidden');
        GameState.tutorialDone = true;
        GameState.paused = true;
        RealEstate.syncState();
        GameState.save();
    },

    restartTutorial() {
        GameState.tutorialDone = false;
        this.tutorialStep = 0;
        GameState.paused = true;
        document.getElementById('tutorial-overlay').classList.remove('hidden');
        this.showTutorialStep(0);
        GameState.save();
        this.showToast('Tutorial neu gestartet! 🚀', '🚀');
    },

    showTutorialStep(step) {
        const s = this.tutorialSteps[step];
        document.getElementById('tutorial-icon').textContent = s.icon;
        document.getElementById('tutorial-title').textContent = s.title;
        document.getElementById('tutorial-text').innerHTML = s.text;
        const progress = ((step + 1) / this.tutorialSteps.length) * 100;
        document.getElementById('tutorial-progress-bar').style.width = progress + '%';
        document.getElementById('tutorial-count').textContent =
            `Schritt ${step + 1} von ${this.tutorialSteps.length}`;
        const dots = document.getElementById('tutorial-dots');
        dots.innerHTML = this.tutorialSteps.map((t, i) =>
            `<span class="tutorial-dot ${i === step ? 'active' : ''}${i < step ? ' done' : ''}" title="${t.title}"></span>`
        ).join('');
        document.getElementById('tutorial-prev').disabled = step === 0;
        const nextBtn = document.getElementById('tutorial-next');
        nextBtn.textContent = step === this.tutorialSteps.length - 1 ? 'Loslegen! 🚀' : 'Weiter ▶';
    },

    updateAll() {
        this.updateDashboard();
        this.updateStocksList();
        this.updateETFsList();
        this.updateCryptoList();
        this.updateRealEstate();
        this.updateCompanies();
        this.updateLuxury();
        this.updateGarage();
        this.updatePortfolio();
        if (this.detailOpen && this.detailOpen.type === 'company') {
            this.renderCompanyDetail(this.detailOpen.id);
        }
        this.updateLeaderboard();
        this.updateTaxes();
        this.updateNewsList();
        this.updateCasino();
        this.updateDate();
        this.updateSpeedDisplay();
        if (this.detailOpen && ['stock', 'etf', 'crypto'].indexOf(this.detailOpen.type) !== -1) {
            this.updateAssetOverview();
        }
    },

    updatePage(page) {
        switch (page) {
            case 'dashboard': this.updateDashboard(); break;
            case 'portfolio': this.updatePortfolio(); break;
            case 'stocks': this.updateStocksList(); break;
            case 'etfs': this.updateETFsList(); break;
            case 'crypto': this.updateCryptoList(); break;
            case 'realestate': this.updateRealEstate(); break;
            case 'companies': this.updateCompanies(); break;
            case 'luxury': this.updateLuxury(); break;
            case 'garage': this.updateGarage(); break;
            case 'casino': this.updateCasino(); break;
            case 'leaderboard': this.updateLeaderboard(); break;
            case 'taxes': this.updateTaxes(); break;
            case 'news': this.updateNewsList(); break;
        }
    },

    updateDate() {
        document.getElementById('game-date').textContent = GameState.getDateString() + ' (Woche ' + GameState.week + ')';
    },

    updateDashboard() {
        const totalValue = GameState.getPortfolioValue();
        const totalAll = totalValue + GameState.cash;
        const profit = totalAll - GameState.initialCash;
        const profitPercent = (profit / GameState.initialCash) * 100;

        document.getElementById('total-portfolio').textContent = '€' + this.fmt(totalAll);
        document.getElementById('cash-balance').textContent = '€' + this.fmt(GameState.cash);

        const changeEl = document.getElementById('portfolio-change');
        changeEl.textContent = `${profit >= 0 ? '+' : ''}€${this.fmt(Math.abs(profit))} (${profit >= 0 ? '+' : ''}${profitPercent.toFixed(2)}%)`;
        changeEl.className = 'change ' + (profit >= 0 ? 'positive' : 'negative');

        const profitEl = document.getElementById('total-profit');
        profitEl.textContent = `${profit >= 0 ? '+' : ''}€${this.fmt(Math.abs(profit))}`;
        profitEl.className = 'hero-stat-value ' + (profit >= 0 ? 'text-green' : 'text-red');

        const sl = {
            statStocks: 0, statEtfs: 0, statCrypto: 0, statRealestate: 0,
            statCompanies: 0, statLuxury: 0
        };
        for (const [symbol, holding] of Object.entries(GameState.portfolio.stocks)) {
            if (holding.shares > 0 && StockMarket.data[symbol]) sl.statStocks += holding.shares * StockMarket.data[symbol].price;
        }
        for (const [symbol, holding] of Object.entries(GameState.portfolio.etfs)) {
            if (holding.shares > 0 && ETFMarket.data[symbol]) sl.statEtfs += holding.shares * ETFMarket.data[symbol].price;
        }
        for (const [symbol, holding] of Object.entries(GameState.portfolio.crypto)) {
            if (holding.amount > 0 && CryptoMarket.data[symbol]) sl.statCrypto += holding.amount * CryptoMarket.data[symbol].price;
        }
        for (const prop of RealEstate.properties) {
            if (prop.owned) sl.statRealestate += prop.currentValue;
        }
        sl.statCompanies = Companies.getTotalValue();
        sl.statLuxury = Luxury.getTotalValue();

        document.getElementById('stat-stocks').textContent = '€' + this.fmt(sl.statStocks);
        document.getElementById('stat-etfs').textContent = '€' + this.fmt(sl.statEtfs);
        document.getElementById('stat-crypto').textContent = '€' + this.fmt(sl.statCrypto);
        document.getElementById('stat-realestate').textContent = '€' + this.fmt(sl.statRealestate);
        document.getElementById('stat-companies').textContent = '€' + this.fmt(sl.statCompanies);
        document.getElementById('stat-luxury').textContent = '€' + this.fmt(sl.statLuxury);

        GameState.portfolioHistory.push(totalAll);
        if (GameState.portfolioHistory.length > 100) GameState.portfolioHistory.shift();

        const portfolioChart = document.getElementById('portfolio-chart');
        Charts.drawLineChart(portfolioChart, GameState.portfolioHistory);

        this.updateHoldingsList();
        this.updateTransactionsList();
    },

    updateHoldingsList() {
        const container = document.getElementById('holdings-list');
        let html = '';
        let hasHoldings = false;

        for (const [symbol, holding] of Object.entries(GameState.portfolio.stocks)) {
            if (holding.shares > 0) {
                hasHoldings = true;
                const stock = StockMarket.data[symbol];
                const value = holding.shares * stock.price;
                const pnl = value - holding.invested;
                const pnlPercent = ((value / holding.invested) - 1) * 100;
                html += `<div class="holding-item" onclick="UI.openStockDetail('${symbol}')">
                    <div class="holding-left">
                        <div class="holding-icon" style="background:${stock.color}22;color:${stock.color}">${symbol.substring(0,2)}</div>
                        <div><div class="holding-name">${stock.name}</div><div class="holding-type">${holding.shares}x Aktie</div></div>
                    </div>
                    <div class="holding-right">
                        <div class="holding-value">€${this.fmt(value)}</div>
                        <div class="holding-pnl change ${pnl >= 0 ? 'positive' : 'negative'}">${pnl >= 0 ? '+' : ''}€${this.fmt(Math.abs(pnl))} (${pnlPercent.toFixed(1)}%)</div>
                    </div>
                </div>`;
            }
        }

        for (const [symbol, holding] of Object.entries(GameState.portfolio.etfs)) {
            if (holding.shares > 0) {
                hasHoldings = true;
                const etf = ETFMarket.data[symbol];
                const value = holding.shares * etf.price;
                const pnl = value - holding.invested;
                const pnlPercent = ((value / holding.invested) - 1) * 100;
                html += `<div class="holding-item" onclick="UI.openETFDetail('${symbol}')">
                    <div class="holding-left">
                        <div class="holding-icon" style="background:${etf.color}22;color:${etf.color}">${symbol.substring(0,3)}</div>
                        <div><div class="holding-name">${etf.name}</div><div class="holding-type">${holding.shares.toFixed(2)}x ETF</div></div>
                    </div>
                    <div class="holding-right">
                        <div class="holding-value">€${this.fmt(value)}</div>
                        <div class="holding-pnl change ${pnl >= 0 ? 'positive' : 'negative'}">${pnl >= 0 ? '+' : ''}€${this.fmt(Math.abs(pnl))} (${pnlPercent.toFixed(1)}%)</div>
                    </div>
                </div>`;
            }
        }

        for (const [symbol, holding] of Object.entries(GameState.portfolio.crypto)) {
            if (holding.amount > 0) {
                hasHoldings = true;
                const coin = CryptoMarket.data[symbol];
                const value = holding.amount * coin.price;
                const pnl = value - holding.invested;
                const pnlPercent = ((value / holding.invested) - 1) * 100;
                html += `<div class="holding-item" onclick="UI.openCryptoDetail('${symbol}')">
                    <div class="holding-left">
                        <div class="holding-icon" style="background:${coin.color}22;color:${coin.color}">${symbol}</div>
                        <div><div class="holding-name">${coin.name}</div><div class="holding-type">${holding.amount.toFixed(4)} ${symbol}</div></div>
                    </div>
                    <div class="holding-right">
                        <div class="holding-value">€${this.fmt(value)}</div>
                        <div class="holding-pnl change ${pnl >= 0 ? 'positive' : 'negative'}">${pnl >= 0 ? '+' : ''}€${this.fmt(Math.abs(pnl))} (${pnlPercent.toFixed(1)}%)</div>
                    </div>
                </div>`;
            }
        }

        for (const prop of RealEstate.properties) {
            if (!prop.owned) continue;
            hasHoldings = true;
            const pnl = prop.currentValue - prop.currentPrice;
            html += `<div class="holding-item" onclick="UI.openRealEstateDetail(${prop.id})">
                <div class="holding-left">
                    <div class="holding-icon" style="background:var(--purple-bg);color:var(--purple)">${prop.emoji}</div>
                    <div><div class="holding-name">${prop.name}</div><div class="holding-type">${prop.city} | Miete: €${prop.monthlyRent}/Mo</div></div>
                </div>
                <div class="holding-right">
                    <div class="holding-value">€${this.fmt(prop.currentValue)}</div>
                    <div class="holding-pnl change ${pnl >= 0 ? 'positive' : 'negative'}">${pnl >= 0 ? '+' : ''}€${this.fmt(Math.abs(pnl))}</div>
                </div>
            </div>`;
        }

        for (const company of Companies.owned) {
            hasHoldings = true;
            const type = Companies.types.find(t => t.id === company.typeId);
            html += `<div class="holding-item">
                <div class="holding-left">
                    <div class="holding-icon" style="background:var(--green-bg);color:var(--green)">${type.icon}</div>
                    <div><div class="holding-name">${company.name}</div><div class="holding-type">${company.revenue - company.costs > 0 ? '+' : ''}€${this.fmt(Math.abs(company.revenue - company.costs))}/Mo</div></div>
                </div>
                <div class="holding-right">
                    <div class="holding-value">€${this.fmt(company.value)}</div>
                    <div class="holding-pnl change positive">Gewinn: +€${this.fmt(company.totalProfit)}</div>
                </div>
            </div>`;
        }

        for (const owned of Luxury.owned) {
            hasHoldings = true;
            const item = Luxury.findItem(owned.itemId);
            html += `<div class="holding-item">
                <div class="holding-left">
                    <div class="holding-icon" style="background:var(--yellow-bg);color:var(--yellow)">${item?.emoji || '💎'}</div>
                    <div><div class="holding-name">${owned.name}</div><div class="holding-type">Luxusgüter</div></div>
                </div>
                <div class="holding-right">
                    <div class="holding-value">€${this.fmt(owned.currentValue)}</div>
                    <div class="holding-pnl change ${owned.currentValue >= owned.purchasePrice ? 'positive' : 'negative'}">${owned.currentValue >= owned.purchasePrice ? '+' : ''}€${this.fmt(Math.abs(owned.currentValue - owned.purchasePrice))}</div>
                </div>
            </div>`;
        }

        if (!hasHoldings) {
            html = '<div class="empty-state"><div class="empty-state-icon">📦</div><div class="empty-state-text">Noch keine Bestände.<br>Beginne zu investieren!</div></div>';
        }

        container.innerHTML = html;
    },

    updateTransactionsList() {
        const container = document.getElementById('transactions-list');
        let html = '';

        const recent = GameState.transactions.slice(0, 15);
        if (recent.length === 0) {
            html = '<div class="empty-state"><div class="empty-state-icon">📝</div><div class="empty-state-text">Noch keine Transaktionen</div></div>';
        } else {
            for (const t of recent) {
                const isBuy = t.type === 'buy';
                const icon = isBuy ? '🟢' : '🔴';
                const label = isBuy ? 'Kauf' : 'Verkauf';
                html += `<div class="transaction-item">
                    <div class="transaction-left">
                        <span class="transaction-icon">${icon}</span>
                        <span class="transaction-text">${label}: <strong>${t.symbol}</strong> x${t.amount}</span>
                    </div>
                    <div class="transaction-right">
                        <div class="change ${isBuy ? 'negative' : 'positive'}">${isBuy ? '-' : '+'}€${this.fmt(t.total || t.net)}</div>
                        <div class="transaction-date">${t.date}</div>
                    </div>
                </div>`;
            }
        }

        container.innerHTML = html;
    },

    updateStocksList() {
        const container = document.getElementById('stocks-list');
        let html = '';

        const search = (document.getElementById('stock-search')?.value || '').toLowerCase();

        for (const [symbol, stock] of Object.entries(StockMarket.data)) {
            if (search && !stock.name.toLowerCase().includes(search) && !symbol.toLowerCase().includes(search) && !stock.sector.toLowerCase().includes(search)) continue;

            const holding = GameState.portfolio.stocks[symbol];
            const owned = holding ? holding.shares : 0;

            html += `<div class="asset-item" onclick="UI.openStockDetail('${symbol}')">
                <div class="asset-item-left">
                    <div class="asset-icon" style="background:${stock.color}22;color:${stock.color}">${symbol.substring(0,3)}</div>
                    <div>
                        <div class="asset-name">${stock.name}</div>
                        <div class="asset-symbol">${symbol} · ${stock.sector} · ${stock.country}</div>
                    </div>
                </div>
                <div class="asset-price">
                    <div class="asset-price-value">€${this.fmtPrice(stock.price)}</div>
                    <div class="asset-price-change change ${stock.weekChange >= 0 ? 'positive' : 'negative'}">${stock.weekChange >= 0 ? '+' : ''}${stock.weekChange.toFixed(2)}%</div>
                </div>
                <div class="asset-chart-mini"><canvas id="mini-stock-${symbol}"></canvas></div>
                <div class="asset-owned">
                    ${owned > 0 ? `<div class="asset-owned-amount">${owned}x</div><div class="asset-owned-value text-green">€${this.fmt(owned * stock.price)}</div>` : '<div class="asset-owned-amount text-muted">—</div>'}
                </div>
            </div>`;
        }

        container.innerHTML = html;

        // Draw mini charts
        requestAnimationFrame(() => {
            for (const [symbol] of Object.entries(StockMarket.data)) {
                const canvas = document.getElementById('mini-stock-' + symbol);
                if (canvas) {
                    const history = StockMarket.history[symbol];
                    Charts.drawMiniChart(canvas, history.slice(-30));
                }
            }
        });

        document.getElementById('stock-search').oninput = () => this.updateStocksList();
    },

    openStockDetail(symbol) {
        this.assetBack = 'stocks';
        this.openAssetOverview('stock', symbol);
    },

    openAssetOverview(type, symbol) {
        this.closeDetailPanels();
        this.detailOpen = { type, symbol };
        this.tradeAction = 'buy';

        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById('page-asset-detail').classList.add('active');
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        const srcBtn = document.querySelector(`.nav-btn[data-page="${this.assetBack}"]`);
        if (srcBtn) srcBtn.classList.add('active');
        this.currentPage = 'asset-detail';

        this.renderAssetOverview();
    },

    assetCtx() {
        if (!this.detailOpen || ['stock', 'etf', 'crypto'].indexOf(this.detailOpen.type) === -1) return null;
        const t = this.detailOpen.type;
        const symbol = this.detailOpen.symbol;
        return {
            t,
            symbol,
            asset: t === 'stock' ? StockMarket.data[symbol] : t === 'etf' ? ETFMarket.data[symbol] : CryptoMarket.data[symbol],
            history: t === 'stock' ? StockMarket.history[symbol] : t === 'etf' ? ETFMarket.history[symbol] : CryptoMarket.history[symbol],
            portKey: t === 'stock' ? 'stocks' : t === 'etf' ? 'etfs' : 'crypto',
            holdingKey: t === 'crypto' ? 'amount' : 'shares',
            market: t === 'stock' ? StockMarket : t === 'etf' ? ETFMarket : CryptoMarket
        };
    },

    renderAssetOverview() {
        const ctx = this.assetCtx();
        if (!ctx) return;
        const { t, symbol, asset } = ctx;

        document.getElementById('asset-detail-name').textContent = asset.name;
        document.getElementById('asset-detail-symbol').textContent = symbol;
        const icon = document.getElementById('asset-detail-icon');
        icon.textContent = symbol.substring(0, 3);
        icon.style.background = asset.color + '22';
        icon.style.color = asset.color;
        document.getElementById('asset-detail-subtext').textContent = asset.description || '';
        document.getElementById('asset-position-type').textContent = t === 'stock' ? 'Aktie' : t === 'etf' ? 'ETF' : 'Krypto';

        document.getElementById('asset-trade-label').textContent = t === 'stock' ? 'Anzahl:' : t === 'etf' ? 'Anteile:' : 'Betrag (in Coins):';
        document.getElementById('asset-trade-fee-label').textContent = 'Gebühr (' + (t === 'crypto' ? '0,5%' : '0,1%') + '):';

        const input = document.getElementById('asset-trade-amount');
        if (t === 'stock') { input.min = 1; input.step = 1; input.value = 1; }
        else if (t === 'crypto') { input.min = 0.0001; input.step = 0.0001; input.value = symbol === 'BTC' ? '0.01' : symbol === 'ETH' ? '0.1' : '1'; }
        else { input.min = 0.01; input.step = 0.01; input.value = 1; }

        this.tradeAction = 'buy';
        document.querySelectorAll('#page-asset-detail .trade-tab').forEach(tb => {
            tb.classList.toggle('active', tb.dataset.action === 'buy');
        });

        this.updateAssetOverview();
    },

    updateAssetOverview() {
        const ctx = this.assetCtx();
        if (!ctx) return;
        const asset = ctx.asset;

        document.getElementById('asset-detail-price').textContent = '€' + this.fmtPrice(asset.price);
        const chEl = document.getElementById('asset-detail-change');
        chEl.textContent = `${asset.weekChange >= 0 ? '+' : ''}${asset.weekChange.toFixed(2)}%`;
        chEl.className = 'change ' + (asset.weekChange >= 0 ? 'positive' : 'negative');

        let stats = '';
        if (ctx.t === 'stock') {
            stats = `<div class="stat"><span>Eröffnung</span><span>€${this.fmtPrice(asset.openPrice)}</span></div>
                <div class="stat"><span>Hoch</span><span>€${this.fmtPrice(asset.high)}</span></div>
                <div class="stat"><span>Tief</span><span>€${this.fmtPrice(asset.low)}</span></div>
                <div class="stat"><span>Volumen</span><span>${this.fmt(asset.volume)}</span></div>
                <div class="stat"><span>52W Hoch</span><span>€${this.fmtPrice(asset.allTimeHigh)}</span></div>
                <div class="stat"><span>52W Tief</span><span>€${this.fmtPrice(asset.allTimeLow)}</span></div>
                <div class="stat"><span>KGV</span><span>${asset.pe}</span></div>
                <div class="stat"><span>Dividende</span><span>${asset.dividend}</span></div>`;
        } else if (ctx.t === 'etf') {
            stats = `<div class="stat"><span>TER</span><span>${asset.ter}</span></div>
                <div class="stat"><span>Auflagevolumen</span><span>${asset.aum}</span></div>
                <div class="stat"><span>Tracking Error</span><span>${asset.trackingError}</span></div>
                <div class="stat"><span>Dividenden-Rendite</span><span>${asset.dividend}</span></div>`;
        } else {
            stats = `<div class="stat"><span>Marktkapitalisierung</span><span>${asset.marketCap}</span></div>
                <div class="stat"><span>24h Volumen</span><span>${asset.volume}</span></div>
                <div class="stat"><span>Circulating Supply</span><span>${asset.supply}</span></div>
                <div class="stat"><span>ATH</span><span>${asset.ath}</span></div>`;
        }
        document.getElementById('asset-detail-stats').innerHTML = stats;

        if (ctx.history && ctx.history.length >= 2) {
            Charts.drawLineChart(document.getElementById('asset-detail-chart'), ctx.history.slice(-52));
        }

        this.updatePositionCard(ctx);
        this.updateAssetTradeForm();
    },

    updatePositionCard(ctx) {
        const holding = GameState.portfolio[ctx.portKey][ctx.symbol];
        const el = document.getElementById('asset-position-content');
        if (!holding || !(holding[ctx.holdingKey] > 0)) {
            el.innerHTML = '<div class="empty-state"><div class="empty-state-text">Du hältst noch keine Position in diesem Asset.</div></div>';
            return;
        }
        const units = holding[ctx.holdingKey];
        const value = units * ctx.asset.price;
        const unrealized = value - holding.invested;
        const unrealizedPct = holding.invested > 0 ? (unrealized / holding.invested) * 100 : 0;
        const sign = unrealized >= 0 ? '+' : '';
        el.innerHTML = `<div class="position-grid">
            <div class="mini-stat"><span class="mini-label">${ctx.t === 'crypto' ? 'Bestand' : 'Anteile'}</span><span class="mini-value">${ctx.t === 'crypto' ? units.toFixed(4) : units}</span></div>
            <div class="mini-stat"><span class="mini-label">Ø-Einstand</span><span class="mini-value">€${this.fmtPrice(holding.avgPrice)}</span></div>
            <div class="mini-stat"><span class="mini-label">Investiert</span><span class="mini-value">€${this.fmt(holding.invested)}</span></div>
            <div class="mini-stat"><span class="mini-label">Aktueller Wert</span><span class="mini-value">€${this.fmt(value)}</span></div>
            <div class="mini-stat"><span class="mini-label">Unrealisiert</span><span class="mini-value ${unrealized >= 0 ? 'text-green' : 'text-red'}">${sign}€${this.fmt(Math.abs(unrealized))} (${sign}${unrealizedPct.toFixed(2)}%)</span></div>
            <div class="mini-stat"><span class="mini-label">Realisierter Gewinn</span><span class="mini-value ${holding.profit >= 0 ? 'text-green' : 'text-red'}">${holding.profit >= 0 ? '+' : ''}€${this.fmt(holding.profit)}</span></div>
        </div>`;
    },

    updateAssetTradeForm() {
        const ctx = this.assetCtx();
        if (!ctx) return;
        const amount = parseFloat(document.getElementById('asset-trade-amount').value) || 0;
        const holding = GameState.portfolio[ctx.portKey][ctx.symbol];
        const note = document.getElementById('asset-trade-tax-note');

        if (this.tradeAction === 'buy') {
            const result = ctx.market.buy(ctx.symbol, amount, Infinity);
            document.getElementById('asset-trade-amount').removeAttribute('max');
            document.getElementById('asset-trade-cost-label').textContent = 'Gesamtkosten:';
            document.getElementById('asset-trade-fee-label').textContent = 'Gebühr (' + (ctx.t === 'crypto' ? '0,5%' : '0,1%') + '):';
            note.innerHTML = '';
            if (result) {
                document.getElementById('asset-trade-cost').textContent = '€' + this.fmt(result.total);
                document.getElementById('asset-trade-fee').textContent = '€' + this.fmt(result.fee);
            }
            const btn = document.getElementById('asset-trade-btn');
            btn.textContent = 'Kaufen';
            btn.className = 'btn btn-success btn-block';
            btn.disabled = !result || result.total > GameState.cash;
        } else {
            const maxHeld = holding ? holding[ctx.holdingKey] : 0;
            document.getElementById('asset-trade-amount').max = maxHeld;
            document.getElementById('asset-trade-cost-label').textContent = 'Netto-Auszahlung:';
            document.getElementById('asset-trade-fee-label').textContent = 'Gebühr (' + (ctx.t === 'crypto' ? '0,5%' : '0,1%') + '):';
            note.innerHTML = '⚠️ Bei Verkaufsgewinn werden 26,375% (KapESt + Soli) automatisch einbehalten. 1.000 € Sparerpauschbetrag &amp; Verlustverrechnung werden berücksichtigt.';
            const result = ctx.market.sell(ctx.symbol, amount);
            if (result) {
                const profit = this.realizedProfit(ctx, result, amount);
                const applied = Taxes.previewCapitalGain(profit);
                document.getElementById('asset-trade-cost').textContent = '€' + this.fmt(result.net - applied.delta);
                document.getElementById('asset-trade-fee').textContent = '€' + this.fmt(result.fee);
            }
            const btn = document.getElementById('asset-trade-btn');
            btn.textContent = 'Verkaufen';
            btn.className = 'btn btn-danger btn-block';
            btn.disabled = amount <= 0 || amount > maxHeld;
        }
    },

    realizedProfit(ctx, result, amount) {
        const holding = GameState.portfolio[ctx.portKey][ctx.symbol];
        if (!holding) return 0;
        return (result.price - holding.avgPrice * amount) - result.fee;
    },

    projectedProfit(type, symbol, amount, result) {
        const portKey = type === 'stock' ? 'stocks' : type === 'etf' ? 'etfs' : 'crypto';
        const holding = GameState.portfolio[portKey][symbol];
        if (!holding) return 0;
        return (result.price - holding.avgPrice * amount) - result.fee;
    },

    applyQuickAmount(pct) {
        const ctx = this.assetCtx();
        if (!ctx) return;
        const input = document.getElementById('asset-trade-amount');
        if (this.tradeAction === 'buy') {
            const feeRate = ctx.t === 'crypto' ? 0.005 : 0.001;
            const afford = GameState.cash / (ctx.asset.price * (1 + feeRate));
            const units = pct === 'max' ? afford : afford * (parseInt(pct, 10) / 100);
            input.value = this.roundAmount(ctx, units);
        } else {
            const holding = GameState.portfolio[ctx.portKey][ctx.symbol];
            const maxHeld = holding ? holding[ctx.holdingKey] : 0;
            const units = pct === 'max' ? maxHeld : maxHeld * (parseInt(pct, 10) / 100);
            input.value = this.roundAmount(ctx, units);
        }
        this.updateAssetTradeForm();
    },

    roundAmount(ctx, units) {
        if (ctx.t === 'stock') return Math.max(1, Math.floor(units || 0));
        if (ctx.t === 'crypto') return Math.max(0.0001, Math.round(units * 10000) / 10000);
        return Math.max(0.01, Math.round(units * 100) / 100);
    },

    executeAssetTrade() {
        if (!this.canAct()) return;
        const ctx = this.assetCtx();
        if (!ctx) return;
        const amount = parseFloat(document.getElementById('asset-trade-amount').value) || 0;
        if (amount <= 0) return;

        const symbol = ctx.symbol;
        const holding = GameState.portfolio[ctx.portKey][symbol];

        if (this.tradeAction === 'buy') {
            const result = ctx.market.buy(symbol, amount, GameState.cash);
            if (!result) { this.showToast('Nicht genug Guthaben!', '⚠️'); return; }
            GameState.removeCash(result.total);

            if (!holding) {
                GameState.portfolio[ctx.portKey][symbol] = { [ctx.holdingKey]: 0, invested: 0, avgPrice: 0, profit: 0 };
            }
            const h = GameState.portfolio[ctx.portKey][symbol];
            h[ctx.holdingKey] += amount;
            h.invested += result.total;
            h.avgPrice = h.invested / h[ctx.holdingKey];

            GameState.addTransaction('buy', ctx.t, ctx.asset.name, symbol, amount, result.price, result.fee, result.total);
            this.showToast(`${amount}${ctx.t === 'crypto' ? ' ' : 'x '}${symbol} gekauft!`, '🟢');
        } else {
            if (!holding || holding[ctx.holdingKey] < amount) {
                this.showToast('Nicht genug Anteile!', '⚠️');
                return;
            }
            const result = ctx.market.sell(symbol, amount);
            const profit = this.realizedProfit(ctx, result, amount);

            let net = result.net;
            let taxMsg = '';
            const applied = Taxes.applyCapitalGain(profit);
            if (applied.delta > 0) {
                net -= applied.delta;
                GameState.addTransaction('tax', ctx.t, 'Kapitalertragsteuer', symbol, 0, 0, 0, applied.delta);
                taxMsg = ` (Steuer €${this.fmt(applied.delta)} einbehalten)`;
            } else if (applied.delta < 0) {
                net += -applied.delta;
                GameState.addTransaction('taxrefund', ctx.t, 'Steuererstattung (Freibetrag/Verluste)', symbol, 0, 0, 0, -applied.delta);
                taxMsg = ` (Steuererstattung €${this.fmt(-applied.delta)})`;
            }
            GameState.addCash(net);

            holding.profit += profit;
            holding[ctx.holdingKey] -= amount;
            if (holding[ctx.holdingKey] <= 0 || (ctx.t === 'crypto' && holding[ctx.holdingKey] <= 0.00001)) {
                holding[ctx.holdingKey] = 0;
            }

            GameState.addTransaction('sell', ctx.t, ctx.asset.name, symbol, amount, result.price, result.fee, result.net);
            this.showToast(`${amount}${ctx.t === 'crypto' ? ' ' : 'x '}${symbol} verkauft!${taxMsg}`, '🔴');
        }

        this.renderAssetOverview();
        this.updateAll();
    },

    executeHoldingSale(type, symbol, amount) {
        if (!this.canAct()) return null;
        const market = type === 'stock' ? StockMarket : type === 'etf' ? ETFMarket : CryptoMarket;
        const data = type === 'stock' ? StockMarket.data : type === 'etf' ? ETFMarket.data : CryptoMarket.data;
        const portKey = type === 'stock' ? 'stocks' : type === 'etf' ? 'etfs' : 'crypto';
        const holdingKey = type === 'crypto' ? 'amount' : 'shares';
        const holding = GameState.portfolio[portKey][symbol];
        if (!holding || holding[holdingKey] < amount) return null;

        const result = market.sell(symbol, amount);
        if (!result) return null;

        const profit = (result.price - holding.avgPrice * amount) - result.fee;
        let net = result.net;
        const applied = Taxes.applyCapitalGain(profit);
        if (applied.delta > 0) {
            net -= applied.delta;
            GameState.addTransaction('tax', type, 'Kapitalertragsteuer', symbol, 0, 0, 0, applied.delta);
        } else if (applied.delta < 0) {
            net += -applied.delta;
            GameState.addTransaction('taxrefund', type, 'Steuererstattung (Freibetrag/Verluste)', symbol, 0, 0, 0, -applied.delta);
        }

        holding.profit += profit;
        holding[holdingKey] -= amount;
        if (holding[holdingKey] <= 0 || (type === 'crypto' && holding[holdingKey] <= 0.00001)) {
            holding[holdingKey] = 0;
        }
        GameState.addCash(net);
        GameState.addTransaction('sell', type, data[symbol].name, symbol, amount, result.price, result.fee, result.net);
        this.showToast(`${data[symbol].name}: ${amount}${type === 'crypto' ? ' ' : 'x '}verkauft für €${this.fmt(net)}${applied.delta !== 0 ? ' (inkl. Steuer)' : ''}`, '💸');
        return result;
    },

    updateETFsList() {
        const container = document.getElementById('etfs-list');
        let html = '';
        const search = (document.getElementById('etf-search')?.value || '').toLowerCase();

        for (const [symbol, etf] of Object.entries(ETFMarket.data)) {
            if (search && !etf.name.toLowerCase().includes(search) && !symbol.toLowerCase().includes(search) && !etf.description.toLowerCase().includes(search)) continue;

            const holding = GameState.portfolio.etfs[symbol];
            const owned = holding ? holding.shares : 0;

            html += `<div class="asset-item" onclick="UI.openETFDetail('${symbol}')">
                <div class="asset-item-left">
                    <div class="asset-icon" style="background:${etf.color}22;color:${etf.color}">${symbol.substring(0,3)}</div>
                    <div>
                        <div class="asset-name">${etf.name}</div>
                        <div class="asset-symbol">${symbol} · ${etf.description}</div>
                    </div>
                </div>
                <div class="asset-price">
                    <div class="asset-price-value">€${this.fmtPrice(etf.price)}</div>
                    <div class="asset-price-change change ${etf.weekChange >= 0 ? 'positive' : 'negative'}">${etf.weekChange >= 0 ? '+' : ''}${etf.weekChange.toFixed(2)}%</div>
                </div>
                <div class="asset-chart-mini"><canvas id="mini-etf-${symbol}"></canvas></div>
                <div class="asset-owned">
                    ${owned > 0 ? `<div class="asset-owned-amount">${owned.toFixed(2)}x</div><div class="asset-owned-value text-green">€${this.fmt(owned * etf.price)}</div>` : '<div class="asset-owned-amount text-muted">—</div>'}
                </div>
            </div>`;
        }

        container.innerHTML = html;
        requestAnimationFrame(() => {
            for (const [symbol] of Object.entries(ETFMarket.data)) {
                const canvas = document.getElementById('mini-etf-' + symbol);
                if (canvas) Charts.drawMiniChart(canvas, ETFMarket.history[symbol].slice(-30));
            }
        });
        document.getElementById('etf-search').oninput = () => this.updateETFsList();
    },

    openETFDetail(symbol) {
        this.assetBack = 'etfs';
        this.openAssetOverview('etf', symbol);
    },

    openCryptoDetail(symbol) {
        this.assetBack = 'crypto';
        this.openAssetOverview('crypto', symbol);
    },

    updateCryptoList() {
        const container = document.getElementById('crypto-list');
        let html = '';
        const search = (document.getElementById('crypto-search')?.value || '').toLowerCase();

        for (const [symbol, coin] of Object.entries(CryptoMarket.data)) {
            if (search && !coin.name.toLowerCase().includes(search) && !symbol.toLowerCase().includes(search)) continue;

            const holding = GameState.portfolio.crypto[symbol];
            const owned = holding ? holding.amount : 0;

            html += `<div class="asset-item" onclick="UI.openCryptoDetail('${symbol}')">
                <div class="asset-item-left">
                    <div class="asset-icon" style="background:${coin.color}22;color:${coin.color}">${symbol}</div>
                    <div>
                        <div class="asset-name">${coin.name}</div>
                        <div class="asset-symbol">${symbol}</div>
                    </div>
                </div>
                <div class="asset-price">
                    <div class="asset-price-value">€${this.fmtPrice(coin.price)}</div>
                    <div class="asset-price-change change ${coin.weekChange >= 0 ? 'positive' : 'negative'}">${coin.weekChange >= 0 ? '+' : ''}${coin.weekChange.toFixed(2)}%</div>
                </div>
                <div class="asset-chart-mini"><canvas id="mini-crypto-${symbol}"></canvas></div>
                <div class="asset-owned">
                    ${owned > 0 ? `<div class="asset-owned-amount">${owned.toFixed(4)} ${symbol}</div><div class="asset-owned-value text-green">€${this.fmt(owned * coin.price)}</div>` : '<div class="asset-owned-amount text-muted">—</div>'}
                </div>
            </div>`;
        }

        container.innerHTML = html;
        requestAnimationFrame(() => {
            for (const [symbol] of Object.entries(CryptoMarket.data)) {
                const canvas = document.getElementById('mini-crypto-' + symbol);
                if (canvas) Charts.drawMiniChart(canvas, CryptoMarket.history[symbol].slice(-30));
            }
        });
        document.getElementById('crypto-search').oninput = () => this.updateCryptoList();
    },

    updateRealEstate() {
        const container = document.getElementById('realestate-list');
        let html = '';

        const filterCity = document.getElementById('re-filter-city')?.value || 'all';
        const filterType = document.getElementById('re-filter-type')?.value || 'all';

        // Populate city filter
        const citySelect = document.getElementById('re-filter-city');
        if (citySelect && citySelect.options.length <= 1) {
            for (const city of Object.keys(RealEstate.cities)) {
                citySelect.innerHTML += `<option value="${city}">${city}</option>`;
            }
            citySelect.onchange = () => this.updateRealEstate();
            document.getElementById('re-filter-type').onchange = () => this.updateRealEstate();
        }

        let ownedCount = 0;
        let totalRent = 0;
        let totalValue = 0;

        for (const prop of RealEstate.properties) {
            if (filterCity !== 'all' && prop.city !== filterCity) continue;
            if (filterType !== 'all' && prop.type !== filterType) continue;

            if (prop.owned) {
                ownedCount++;
                totalRent += RealEstate.getMonthlyRentIncome(prop.id);
                totalValue += prop.currentValue;
            }

            const conditionColors = { 'Neuwertig': 'var(--green)', 'Gut': 'var(--blue)', 'Mittel': 'var(--yellow)' };
            const cityColor = RealEstate.cities[prop.city]?.color || '#666';
            const buildingSvg = this.renderBuilding(prop);

            html += `<div class="realestate-card" onclick="UI.openRealEstateDetail(${prop.id})">
                <div class="re-card-image">
                    ${buildingSvg}
                    <span class="re-card-badge ${prop.owned ? 'owned' : 'available'}">${prop.owned ? 'Im Besitz' : 'Verfügbar'}</span>
                </div>
                <div class="re-card-body">
                    <div class="re-card-title">${prop.name}</div>
                    <div class="re-card-location">📍 ${prop.city}</div>
                    <div class="re-card-details">
                        <span class="re-card-detail"><strong>${prop.area}m²</strong></span>
                        <span class="re-card-detail"><strong>${prop.rooms} Zi.</strong></span>
                        <span class="re-card-detail">Bj. ${prop.year}</span>
                        <span class="re-card-detail">🏗️ ${prop.condition}</span>
                    </div>
                    <div class="re-card-price">
                        <span class="re-card-price-value">€${this.fmt(prop.currentPrice)}</span>
                        <span class="re-card-rent">Miete: €${prop.monthlyRent}/Mo</span>
                    </div>
                </div>
            </div>`;
        }

        container.innerHTML = html;

        document.getElementById('re-owned-count').textContent = ownedCount;
        document.getElementById('re-monthly-rent').textContent = '€' + this.fmt(totalRent) + '/Mo';
        document.getElementById('re-total-value').textContent = '€' + this.fmt(totalValue);
    },

    openRealEstateDetail(id) {
        this.closeDetailPanels();
        this.detailOpen = { type: 'realestate', id };

        const prop = RealEstate.properties[id];
        document.getElementById('re-detail-name').textContent = prop.name;
        document.getElementById('re-detail-location').textContent = prop.city;
        document.getElementById('re-detail-type').textContent = prop.type === 'wohnung' ? 'Wohnung' : prop.type === 'haus' ? 'Haus' : 'Gewerbe';
        document.getElementById('re-detail-area').textContent = prop.area + ' m²';
        document.getElementById('re-detail-rooms').textContent = prop.rooms;
        document.getElementById('re-detail-year').textContent = prop.year;
        document.getElementById('re-detail-condition').textContent = prop.condition + (prop.renovated ? ` (Renoviert Stufe ${prop.renovationLevel})` : '');
        document.getElementById('re-detail-rent').textContent = '€' + this.fmt(RealEstate.getMonthlyRentIncome(id)) + '/Monat';
        document.getElementById('re-detail-tax').textContent = '€' + this.fmt(prop.grundsteuer);

        const actionsContainer = document.getElementById('re-detail-actions');
        let actionsHtml = '';

        if (!prop.owned) {
            const getreSt = RealEstate.getGrunderwerbsteuer(prop.currentPrice);
            const total = prop.currentPrice + getreSt;
            actionsHtml = `
                <div class="stat"><span>Grunderwerbsteuer (${GameState.bundesland})</span><span>€${this.fmt(getreSt)}</span></div>
                <div class="stat"><span>Gesamtkosten</span><span><strong>€${this.fmt(total)}</strong></span></div>
                <button id="re-buy-btn" class="btn btn-primary btn-block" onclick="UI.buyRealEstate(${id})" ${total > GameState.cash ? 'disabled' : ''}>
                    Immobilie kaufen (€${this.fmt(total)})
                </button>`;
        } else {
            const sellValue = prop.currentValue;
            const sellGain = sellValue - prop.currentPrice;
            const sellTax = Taxes.calculateCapitalGainsTax(Math.max(0, sellGain));

            actionsHtml = `
                <div class="stat"><span>Aktueller Wert</span><span>€${this.fmt(sellValue)}</span></div>
                <div class="stat"><span>Gewinn/Verlust</span><span class="${sellGain >= 0 ? 'text-green' : 'text-red'}">${sellGain >= 0 ? '+' : ''}€${this.fmt(sellGain)}</span></div>
                <div class="stat"><span>Miete/Monat</span><span>€${this.fmt(RealEstate.getMonthlyRentIncome(id))}</span></div>
                <button class="btn btn-success btn-block" onclick="UI.sellRealEstate(${id})">Verkaufen</button>
                <div class="renovation-options">
                    <h4 style="margin-top:12px;font-size:0.85rem;color:var(--text-secondary);">Renovierung</h4>
                    ${prop.renovationLevel < 1 ? `<div class="reno-option" onclick="UI.renovateProperty(${id}, 1)">
                        <span class="reno-label">🏷️ Einfach</span><span class="reno-cost">€${this.fmt(Math.round(prop.currentValue * 0.08))}</span>
                    </div>` : ''}
                    ${prop.renovationLevel < 2 ? `<div class="reno-option" onclick="UI.renovateProperty(${id}, 2)">
                        <span class="reno-label">🔨 Mittel</span><span class="reno-cost">€${this.fmt(Math.round(prop.currentValue * 0.15))}</span>
                    </div>` : ''}
                    ${prop.renovationLevel < 3 ? `<div class="reno-option" onclick="UI.renovateProperty(${id}, 3)">
                        <span class="reno-label">💎 Premium</span><span class="reno-cost">€${this.fmt(Math.round(prop.currentValue * 0.25))}</span>
                    </div>` : ''}
                    ${prop.renovationLevel >= 3 ? '<p style="color:var(--green);font-size:0.85rem;margin-top:8px;">Vollständig renoviert! ✨</p>' : ''}
                </div>`;
        }

        actionsContainer.innerHTML = actionsHtml;
        document.getElementById('realestate-detail').classList.remove('hidden');
    },

    buyRealEstate(id) {
        if (!this.canAct()) return;
        const result = RealEstate.buyProperty(id);
        if (!result) {
            this.showToast('Nicht genug Guthaben!', '⚠️');
            return;
        }
        GameState.removeCash(result.total);
        GameState.taxes.grunderwerbsteuer += result.purchaseTax;
        GameState.addTransaction('buy', 'realestate', RealEstate.properties[id].name, 'RE', 1, RealEstate.properties[id].currentPrice, result.purchaseTax, result.total);
        this.showToast(`Immobilie gekauft! Grunderwerbsteuer: €${this.fmt(result.purchaseTax)}`, '🏠');
        this.openRealEstateDetail(id);
        this.updateAll();
    },

    sellRealEstate(id) {
        if (!this.canAct()) return;
        const result = RealEstate.sellProperty(id);
        if (!result) return;

        const applied = Taxes.applyCapitalGain(result.capitalGain);
        let net = result.price;
        if (applied.delta > 0) {
            net -= applied.delta;
            GameState.addTransaction('tax', 'realestate', 'Kapitalertragsteuer (Immobilie)', 'RE', 0, 0, 0, applied.delta);
        } else if (applied.delta < 0) {
            net += -applied.delta;
            GameState.addTransaction('taxrefund', 'realestate', 'Steuererstattung (Immobilie)', 'RE', 0, 0, 0, -applied.delta);
        }
        GameState.addCash(net);
        GameState.addTransaction('sell', 'realestate', RealEstate.properties[id].name, 'RE', 1, result.price, 0, result.price);
        this.showToast(`Immobilie verkauft für €${this.fmt(net)}${applied.delta !== 0 ? ' (inkl. Steuer)' : ''}!`, '🏠');
        this.closeDetailPanels();
        this.updateAll();
    },

    renovateProperty(id, level) {
        if (!this.canAct()) return;
        const result = RealEstate.renovate(id, level);
        if (!result) {
            this.showToast('Nicht genug Guthaben!', '⚠️');
            return;
        }
        GameState.removeCash(result.cost);
        this.showToast(`Renovierung abgeschlossen! Neuer Wert: €${this.fmt(result.newValue)}`, '🔨');
        this.openRealEstateDetail(id);
        this.updateAll();
    },

    updateTaxes() {
        const summary = Taxes.getSummary();
        document.getElementById('tax-capital').textContent = '€' + this.fmt(summary.capitalTax);
        document.getElementById('tax-soli').textContent = '€' + this.fmt(summary.soli);
        document.getElementById('tax-realestate').textContent = '€' + this.fmt(GameState.taxes.grunderwerbsteuer);
        document.getElementById('tax-property').textContent = '€' + this.fmt(summary.grundsteuer);
        document.getElementById('tax-rental').textContent = '€' + this.fmt(summary.rentalTax);
        document.getElementById('tax-late-fee').textContent = '€' + this.fmt(summary.lateFees);
        document.getElementById('tax-late-fee').className = summary.lateFees > 0 ? 'tax-value warning' : 'tax-value';
        document.getElementById('tax-total').textContent = '€' + this.fmt(summary.total);

        const pauschEl = document.getElementById('tax-pausch');
        if (pauschEl) pauschEl.textContent = `€${this.fmt(summary.freibetragUsed)} / €${this.fmt(summary.pauschbetrag)}`;
        const netEl = document.getElementById('tax-capital-net');
        if (netEl) {
            const v = summary.capitalNet;
            netEl.textContent = (v >= 0 ? '+' : '−') + '€' + this.fmt(Math.abs(v));
            netEl.className = 'tax-value' + (v >= 0 ? '' : ' warning');
        }
        const rentEl = document.getElementById('tax-rent-net');
        if (rentEl) rentEl.textContent = '€' + this.fmt(summary.rentNet);
        const yearEl = document.getElementById('tax-year');
        if (yearEl) yearEl.textContent = 'Wirtschaftsjahr ' + summary.taxYear;

        const weeksUntilDue = summary.nextDue - GameState.week;
        if (weeksUntilDue > 0) {
            document.getElementById('tax-next-due').textContent = `In ${weeksUntilDue} Wochen`;
            document.getElementById('tax-next-due').className = '';
        } else {
            document.getElementById('tax-next-due').textContent = `Überfällig! (+${Math.abs(weeksUntilDue)} Wochen)`;
            document.getElementById('tax-next-due').className = 'warning';
        }

        document.getElementById('tax-payment-amount').value = '';
        document.getElementById('tax-payment-amount').placeholder = `Max: €${this.fmt(summary.total)}`;

        const histContainer = document.getElementById('tax-history-list');
        let histHtml = '';
        const recentPayments = GameState.taxes.history.slice(-10).reverse();
        for (const p of recentPayments) {
            histHtml += `<div class="tax-history-item"><span>${p.date}</span><span class="text-green">-€${this.fmt(p.amount)}</span></div>`;
        }
        if (!histHtml) histHtml = '<div class="empty-state" style="padding:10px"><div class="empty-state-text">Noch keine Zahlungen</div></div>';
        histContainer.innerHTML = histHtml;
    },

    updateNewsList() {
        const container = document.getElementById('news-list');
        let html = '';

        if (GameState.news.length === 0) {
            html = '<div class="empty-state"><div class="empty-state-icon">📰</div><div class="empty-state-text">Noch keine Nachrichten.<br>Spiele weiter, um Marktereignisse zu erleben!</div></div>';
        } else {
            for (const news of GameState.news) {
                html += `<div class="news-item">
                    <div class="news-item-header">
                        <span class="news-item-category news-category-${news.category}">${news.category.toUpperCase()}</span>
                        <span class="news-item-time">${news.date} · Woche ${news.week}</span>
                    </div>
                    <div class="news-item-title">${news.title}</div>
                    <div class="news-item-body">${news.body}</div>
                    ${news.impacts ? `<div class="news-item-impact">${news.impacts.map(i => `<span class="news-impact-tag" style="background:var(--blue-bg);color:var(--blue)">${i}</span>`).join('')}</div>` : ''}
                </div>`;
            }
        }

        container.innerHTML = html;
    },

    updateCompanies() {
        const availableContainer = document.getElementById('companies-available');
        const ownedContainer = document.getElementById('companies-owned');

        let availableHtml = '<h3 style="margin-bottom:12px;color:var(--text-secondary);font-size:0.9rem;">UNTERNEHMEN GRÜNDEN</h3>';
        for (const type of Companies.types) {
            const owned = Companies.owned.find(c => c.typeId === type.id);
            availableHtml += `<div class="company-card ${owned ? 'owned' : ''}">
                <div class="company-card-header">
                    <span class="company-icon" style="background:${type.color}22;color:${type.color}">${type.icon}</span>
                    <div>
                        <div class="company-name">${type.name}</div>
                        <div class="company-risk">${type.riskLevel} Risiko</div>
                    </div>
                </div>
                <p class="company-desc">${type.description}</p>
                <div class="company-stats-row">
                    <span>Kosten: €${this.fmt(type.baseCost)}</span>
                    <span>Umsatz: €${this.fmt(type.monthlyRevenue)}/Mo</span>
                </div>
                ${owned ? `<div class="company-owned-badge">✅ Gegründet</div>` :
                    `<button class="btn btn-primary btn-block btn-sm" onclick="UI.foundCompany('${type.id}')" ${type.baseCost > GameState.cash ? 'disabled' : ''}>Gründen (€${this.fmt(type.baseCost)})</button>`}
            </div>`;
        }
        availableContainer.innerHTML = availableHtml;

        let ownedHtml = '';
        if (Companies.owned.length === 0) {
            ownedHtml = '<div class="empty-state"><div class="empty-state-icon">🏢</div><div class="empty-state-text">Noch keine Unternehmen gegründet</div></div>';
        } else {
            for (const company of Companies.owned) {
                const type = Companies.types.find(t => t.id === company.typeId);
                ownedHtml += `<div class="company-card owned" onclick="UI.openCompanyDetail(${company.id})">
                    <div class="company-card-header">
                        <span class="company-icon" style="background:${type.color}22;color:${type.color}">${type.icon}</span>
                        <div>
                            <div class="company-name">${company.name} (Lv. ${company.level})</div>
                            <div class="company-profit change ${company.revenue > company.costs ? 'positive' : 'negative'}">
                                Gewinn: €${this.fmt(company.revenue - company.costs)}/Mo
                            </div>
                        </div>
                    </div>
                    <div class="company-stats-grid">
                        <div class="stat"><span>Mitarbeiter</span><span>${company.employees}</span></div>
                        <div class="stat"><span>Zufriedenheit</span><span>${Math.round(company.satisfaction)}%</span></div>
                        <div class="stat"><span>Unternehmenswert</span><span>€${this.fmt(company.value)}</span></div>
                        <div class="stat"><span>Gesamtgewinn</span><span class="text-green">€${this.fmt(company.totalProfit)}</span></div>
                    </div>
                    <div class="company-actions">
                        <button class="btn btn-success btn-sm" onclick="event.stopPropagation(); UI.openCompanyDetail(${company.id})">Verwalten</button>
                        <button class="btn btn-danger btn-sm" onclick="event.stopPropagation(); UI.sellCompany(${company.id})">Verkaufen</button>
                    </div>
                </div>`;
            }
        }
        ownedContainer.innerHTML = ownedHtml;

        document.getElementById('company-count').textContent = Companies.owned.length;
        document.getElementById('company-profit').textContent = '€' + this.fmt(Companies.getMonthlyIncome());
        document.getElementById('company-value').textContent = '€' + this.fmt(Companies.getTotalValue());
    },

    foundCompany(typeId) {
        if (!this.canAct()) return;
        const result = Companies.buyCompany(typeId);
        if (result) {
            this.showToast(`${result.name} gegründet!`, '🏢');
            this.updateAll();
        } else {
            this.showToast('Nicht genug Guthaben!', '⚠️');
        }
    },

    openCompanyDetail(id) {
        const company = Companies.owned.find(c => c.id === id);
        if (!company) return;
        this.closeDetailPanels();
        this.detailOpen = { type: 'company', id };
        this.renderCompanyDetail(id);
        document.getElementById('company-detail').classList.remove('hidden');
    },

    renderCompanyDetail(id) {
        const company = Companies.owned.find(c => c.id === id);
        if (!company) return;
        const type = Companies.types.find(t => t.id === company.typeId);
        const profit = company.revenue - company.costs;

        document.getElementById('cd-icon').textContent = type ? type.icon : '🏢';
        document.getElementById('cd-name').textContent = company.name;
        const pEl = document.getElementById('cd-profit');
        pEl.textContent = (profit >= 0 ? '+' : '') + '€' + this.fmt(profit) + '/Mo';
        pEl.className = 'symbol-badge ' + (profit >= 0 ? 'change positive' : 'change negative');

        document.getElementById('cd-stats').innerHTML = `
            <div class="stat"><span>Unternehmenswert</span><span>€${this.fmt(company.value)}</span></div>
            <div class="stat"><span>Umsatz/Monat</span><span>€${this.fmt(company.revenue)}</span></div>
            <div class="stat"><span>Kosten/Monat</span><span>€${this.fmt(company.costs)}</span></div>
            <div class="stat"><span>Mitarbeiter</span><span>${company.employees}</span></div>
            <div class="stat"><span>Zufriedenheit</span><span>${Math.round(company.satisfaction)}%</span></div>
            <div class="stat"><span>Gesamtgewinn</span><span class="text-green">€${this.fmt(company.totalProfit)}</span></div>
            <div class="stat"><span>Gegründet</span><span>Woche ${company.founded}</span></div>
        `;

        const ups = company.ups || { growth: 0, staff: 0, quality: 0, tech: 0 };
        const cost = Math.round(company.value * 0.2);
        const tracks = [
            { k: 'growth', icon: '📈', name: 'Marketing & Vertrieb', desc: '+20% Umsatz · −2% Zufriedenheit' },
            { k: 'staff', icon: '👥', name: 'Neue Mitarbeiter', desc: '+10% Umsatz · +5% Kosten · +3% Zufriedenheit' },
            { k: 'quality', icon: '⭐', name: 'Qualität & Service', desc: '−8% Kosten · +3% Umsatz · +10% Zufriedenheit' },
            { k: 'tech', icon: '🤖', name: 'Automatisierung', desc: '−15% Kosten · +8% Umsatz · −5% Personal' }
        ];
        document.getElementById('cd-upgrades').innerHTML = tracks.map(t => `
            <div class="cd-upgrade-card">
                <div class="cd-upgrade-top">
                    <span class="cd-upgrade-icon">${t.icon}</span>
                    <div class="cd-upgrade-meta">
                        <div class="cd-upgrade-name">${t.name}</div>
                        <div class="cd-upgrade-desc">${t.desc}</div>
                    </div>
                    <span class="cd-upgrade-level">Stufe ${ups[t.k]}</span>
                </div>
                <button class="btn btn-success btn-block btn-sm" onclick="UI.companyUpgrade(${id},'${t.k}')" ${cost > GameState.cash ? 'disabled' : ''}>Ausbauen (€${this.fmt(cost)})</button>
            </div>
        `).join('');

        document.getElementById('cd-sell-btn').textContent = `Verkaufen (€${this.fmt(Math.round(company.value * 0.8))})`;
        document.getElementById('cd-sell-btn').onclick = () => this.sellCompany(id);
    },

    companyUpgrade(id, kind) {
        const company = Companies.owned.find(c => c.id === id);
        if (!company) return;
        const cost = Math.round(company.value * 0.2);
        if (cost > GameState.cash) {
            this.showToast('Nicht genug Guthaben!', '⚠️');
            return;
        }
        const names = { growth: 'Marketing ausgebaut', staff: 'Mitarbeiter eingestellt', quality: 'Qualität verbessert', tech: 'Automatisiert' };
        const result = Companies.upgradeCompany(id, cost, kind);
        if (result) {
            this.showToast(`${company.name}: ${names[kind] || 'ausgebaut'}!`, '🔨');
            this.renderCompanyDetail(id);
            this.updateAll();
        }
    },

    sellCompany(id) {
        const result = Companies.sellCompany(id);
        if (result) {
            this.showToast(`${result.name} verkauft für €${this.fmt(result.price)}!`, '💰');
            if (this.detailOpen && this.detailOpen.type === 'company') {
                this.closeDetailPanels();
            }
            this.updateAll();
        }
    },

    updateLuxury() {
        const container = document.getElementById('luxury-list');
        const filter = document.getElementById('luxury-filter')?.value || 'all';

        let html = '';
        for (const cat of Luxury.categories) {
            if (filter !== 'all' && cat.id !== filter) continue;

            html += `<div class="luxury-category-header">
                <span>${cat.icon} ${cat.name}</span>
                <span class="luxury-shop-desc">${cat.shopDesc}</span>
            </div>`;

            for (const item of cat.items) {
                const owned = Luxury.owned.find(i => i.itemId === item.id);
                html += `<div class="luxury-card ${owned ? 'owned' : ''}">
                    <div class="luxury-card-icon">${item.emoji}</div>
                    <div class="luxury-card-info">
                        <div class="luxury-card-name">${item.name}</div>
                        <div class="luxury-card-brand">${item.brand}</div>
                        ${item.ps ? `<div class="luxury-card-specs">${item.ps} · ${item.speed}</div>` : ''}
                    </div>
                    <div class="luxury-card-price">
                        €${this.fmt(item.price)}
                    </div>
                    <div class="luxury-card-cost">
                        ${item.monthlyCost > 0 ? `€${this.fmt(item.monthlyCost)}/Mo` : 'Keine Kosten'}
                    </div>
                    ${owned ?
                        `<span class="company-owned-badge">✓ Besessen</span>` :
                        `<button class="btn btn-primary btn-sm" onclick="UI.buyLuxury('${item.id}')" ${item.price > GameState.cash ? 'disabled' : ''}>Kaufen</button>`}
                </div>`;
            }
        }

        container.innerHTML = html;

        document.getElementById('luxury-count').textContent = Luxury.owned.length;
        document.getElementById('luxury-costs').textContent = '€' + this.fmt(Luxury.getMonthlyCosts()) + '/Mo';
        document.getElementById('luxury-value').textContent = '€' + this.fmt(Luxury.getTotalValue());

        document.getElementById('luxury-filter').onchange = () => this.updateLuxury();
    },

    updateGarage() {
        const container = document.getElementById('garage-list');
        const owned = Luxury.owned;

        let html = '';
        let totalPurchase = 0;
        let totalResale = 0;

        if (owned.length === 0) {
            html = '<div class="garage-empty"><div class="garage-empty-icon">🚗</div><div>Deine Garage ist leer.<br>Kaufe dir etwas in den Shops!</div></div>';
        } else {
            for (const ownedItem of owned) {
                const item = Luxury.findItem(ownedItem.itemId);
                const cat = Luxury.getCategory(ownedItem.category);
                const resale = Luxury.getResaleValue(ownedItem);
                totalPurchase += ownedItem.purchasePrice;
                totalResale += resale;

                html += `<div class="garage-card">
                    <div class="garage-icon" style="background:var(--yellow-bg);color:var(--yellow)">${item?.emoji || '💎'}</div>
                    <div class="garage-info">
                        <div class="garage-name">${ownedItem.name}</div>
                        <div class="garage-brand">${ownedItem.brand} · ${cat?.icon || ''} ${cat?.name || ''}</div>
                        <div class="garage-meta">
                            <span>Wert: <strong>€${this.fmt(ownedItem.currentValue)}</strong></span>
                            <span>Kosten: <strong>€${this.fmt(ownedItem.monthlyCost)}/Mo</strong></span>
                        </div>
                    </div>
                    <div class="garage-actions">
                        <div class="garage-resale">
                            <span>Gebrauchtpreis</span>
                            <strong>€${this.fmt(resale)}</strong>
                        </div>
                        <button class="btn btn-danger btn-sm" onclick="UI.sellLuxury(${ownedItem.id})">Verkaufen</button>
                    </div>
                </div>`;
            }
        }

        container.innerHTML = html;

        document.getElementById('garage-count').textContent = owned.length;
        document.getElementById('garage-purchase-value').textContent = '€' + this.fmt(totalPurchase);
        document.getElementById('garage-resale-value').textContent = '€' + this.fmt(totalResale);
    },

    buyLuxury(itemId) {
        if (!this.canAct()) return;
        const result = Luxury.buyItem(itemId);
        if (result) {
            this.showToast(`${result.name} gekauft!`, '💎');
            this.updateAll();
        } else {
            this.showToast('Nicht genug Guthaben!', '⚠️');
        }
    },

    sellLuxury(id) {
        const result = Luxury.sellItem(id);
        if (result) {
            this.showToast(`${result.name} für €${this.fmt(result.price)} verkauft (Gebrauchtpreis)!`, '💸');
            this.updateAll();
        }
    },

    updatePortfolio() {
        const container = document.getElementById('portfolio-groups');
        const meta = {
            stocks:     { title: '📈 Aktien', color: '#2563eb', count: 0, value: 0, invested: 0, income: 0, rows: '' },
            etfs:       { title: '📊 ETFs', color: '#0891b2', count: 0, value: 0, invested: 0, income: 0, rows: '' },
            crypto:     { title: '🪙 Kryptowährungen', color: '#f59e0b', count: 0, value: 0, invested: 0, income: 0, rows: '' },
            realestate: { title: '🏠 Immobilien', color: '#7c3aed', count: 0, value: 0, invested: 0, income: 0, rows: '' },
            companies:  { title: '🏢 Unternehmen', color: '#16a34a', count: 0, value: 0, invested: 0, income: 0, rows: '' },
            luxury:     { title: '💎 Luxusgüter', color: '#ca8a04', count: 0, value: 0, invested: 0, income: 0, rows: '' }
        };
        const order = ['stocks', 'etfs', 'crypto', 'realestate', 'companies', 'luxury'];
        const sparkCanvas = (src) => `<canvas class="p-spark" data-src="${src}"></canvas>`;

        for (const [symbol, holding] of Object.entries(GameState.portfolio.stocks)) {
            if (!holding.shares || holding.shares <= 0) continue;
            const stock = StockMarket.data[symbol];
            if (!stock) continue;
            const val = holding.shares * stock.price;
            const pnl = val - holding.invested;
            const pnlPct = holding.invested ? (val / holding.invested - 1) * 100 : 0;
            meta.stocks.rows += `<div class="p-row clickable" onclick="UI.openStockDetail('${symbol}')">
                <div class="p-icon" style="background:${stock.color}22;color:${stock.color}">${symbol.substring(0,2)}</div>
                <div class="p-info"><div class="p-name">${stock.name}</div><div class="p-sub">${holding.shares}x · €${this.fmtPrice(stock.price)}</div></div>
                ${sparkCanvas('stock:' + symbol)}
                <div class="p-nums"><div class="p-value">€${this.fmt(val)}</div><div class="p-pnl ${pnl >= 0 ? 'positive' : 'negative'}">${pnl >= 0 ? '+' : '−'}€${this.fmt(Math.abs(pnl))} (${pnlPct.toFixed(1)}%)</div></div>
                <button class="btn btn-danger btn-sm" onclick="event.stopPropagation(); UI.openSellModal('stock','${symbol}')">Verkaufen</button>
                <span class="p-chevron">›</span>
            </div>`;
            meta.stocks.count++; meta.stocks.value += val; meta.stocks.invested += holding.invested;
        }
        for (const [symbol, holding] of Object.entries(GameState.portfolio.etfs)) {
            if (!holding.shares || holding.shares <= 0) continue;
            const etf = ETFMarket.data[symbol];
            if (!etf) continue;
            const val = holding.shares * etf.price;
            const pnl = val - holding.invested;
            const pnlPct = holding.invested ? (val / holding.invested - 1) * 100 : 0;
            meta.etfs.rows += `<div class="p-row clickable" onclick="UI.openETFDetail('${symbol}')">
                <div class="p-icon" style="background:${etf.color}22;color:${etf.color}">${symbol.substring(0,3)}</div>
                <div class="p-info"><div class="p-name">${etf.name}</div><div class="p-sub">${holding.shares.toFixed(4)}x · €${this.fmtPrice(etf.price)}</div></div>
                ${sparkCanvas('etf:' + symbol)}
                <div class="p-nums"><div class="p-value">€${this.fmt(val)}</div><div class="p-pnl ${pnl >= 0 ? 'positive' : 'negative'}">${pnl >= 0 ? '+' : '−'}€${this.fmt(Math.abs(pnl))} (${pnlPct.toFixed(1)}%)</div></div>
                <button class="btn btn-danger btn-sm" onclick="event.stopPropagation(); UI.openSellModal('etf','${symbol}')">Verkaufen</button>
                <span class="p-chevron">›</span>
            </div>`;
            meta.etfs.count++; meta.etfs.value += val; meta.etfs.invested += holding.invested;
        }
        for (const [symbol, holding] of Object.entries(GameState.portfolio.crypto)) {
            if (!holding.amount || holding.amount <= 0) continue;
            const coin = CryptoMarket.data[symbol];
            if (!coin) continue;
            const val = holding.amount * coin.price;
            const pnl = val - holding.invested;
            const pnlPct = holding.invested ? (val / holding.invested - 1) * 100 : 0;
            meta.crypto.rows += `<div class="p-row clickable" onclick="UI.openCryptoDetail('${symbol}')">
                <div class="p-icon" style="background:${coin.color}22;color:${coin.color}">${symbol.substring(0,3)}</div>
                <div class="p-info"><div class="p-name">${coin.name}</div><div class="p-sub">${holding.amount.toFixed(4)} ${symbol} · €${this.fmtPrice(coin.price)}</div></div>
                ${sparkCanvas('crypto:' + symbol)}
                <div class="p-nums"><div class="p-value">€${this.fmt(val)}</div><div class="p-pnl ${pnl >= 0 ? 'positive' : 'negative'}">${pnl >= 0 ? '+' : '−'}€${this.fmt(Math.abs(pnl))} (${pnlPct.toFixed(1)}%)</div></div>
                <button class="btn btn-danger btn-sm" onclick="event.stopPropagation(); UI.openSellModal('crypto','${symbol}')">Verkaufen</button>
                <span class="p-chevron">›</span>
            </div>`;
            meta.crypto.count++; meta.crypto.value += val; meta.crypto.invested += holding.invested;
        }
        for (const prop of RealEstate.properties) {
            if (!prop.owned) continue;
            const val = prop.currentValue;
            const invest = prop.currentPrice;
            const pnl = val - invest;
            const rent = prop.renovated ? prop.monthlyRent * 1.3 : prop.monthlyRent;
            meta.realestate.rows += `<div class="p-row clickable" onclick="UI.openRealEstateDetail(${prop.id})">
                <div class="p-icon" style="background:var(--purple-bg);color:var(--purple)">${prop.emoji}</div>
                <div class="p-info"><div class="p-name">${prop.name}</div><div class="p-sub">${prop.city} · €${this.fmt(rent)}/Mo Miete</div></div>
                <div class="p-nums"><div class="p-value">€${this.fmt(val)}</div><div class="p-pnl ${pnl >= 0 ? 'positive' : 'negative'}">${pnl >= 0 ? '+' : '−'}€${this.fmt(Math.abs(pnl))}</div></div>
                <button class="btn btn-danger btn-sm" onclick="event.stopPropagation(); UI.openSellModal('realestate',${prop.id})">Verkaufen</button>
                <span class="p-chevron">›</span>
            </div>`;
            meta.realestate.count++; meta.realestate.value += val; meta.realestate.invested += invest;
            meta.realestate.income += rent;
        }
        for (const company of Companies.owned) {
            const type = Companies.types.find(t => t.id === company.typeId);
            const val = company.value;
            const invest = type ? type.baseCost : val;
            const pnl = val - invest;
            const monthly = (company.revenue || 0) - (company.costs || 0);
            meta.companies.rows += `<div class="p-row clickable" onclick="UI.openCompanyDetail(${company.id})">
                <div class="p-icon" style="background:var(--green-bg);color:var(--green)">${type?.icon || '🏢'}</div>
                <div class="p-info"><div class="p-name">${company.name}</div><div class="p-sub">${type?.name || ''} · ${monthly >= 0 ? '+' : '−'}€${this.fmt(Math.abs(monthly))}/Mo</div></div>
                <div class="p-nums"><div class="p-value">€${this.fmt(val)}</div><div class="p-pnl ${pnl >= 0 ? 'positive' : 'negative'}">${pnl >= 0 ? '+' : '−'}€${this.fmt(Math.abs(pnl))}</div></div>
                <button class="btn btn-danger btn-sm" onclick="event.stopPropagation(); UI.openSellModal('company',${company.id})">Verkaufen</button>
                <span class="p-chevron">›</span>
            </div>`;
            meta.companies.count++; meta.companies.value += val; meta.companies.invested += invest;
            meta.companies.income += monthly;
        }
        for (const owned of Luxury.owned) {
            const item = Luxury.findItem(owned.itemId);
            const val = Luxury.getResaleValue(owned);
            const invest = owned.purchasePrice;
            const pnl = val - invest;
            meta.luxury.rows += `<div class="p-row clickable" onclick="UI.navigateTo('garage')">
                <div class="p-icon" style="background:var(--yellow-bg);color:var(--yellow)">${item?.emoji || '💎'}</div>
                <div class="p-info"><div class="p-name">${owned.name}</div><div class="p-sub">${owned.brand} · €${this.fmt(owned.monthlyCost)}/Mo</div></div>
                <div class="p-nums"><div class="p-value">€${this.fmt(val)}</div><div class="p-pnl ${pnl >= 0 ? 'positive' : 'negative'}">${pnl >= 0 ? '+' : '−'}€${this.fmt(Math.abs(pnl))}</div></div>
                <button class="btn btn-danger btn-sm" onclick="event.stopPropagation(); UI.openSellModal('luxury',${owned.id})">Verkaufen</button>
                <span class="p-chevron">›</span>
            </div>`;
            meta.luxury.count++; meta.luxury.value += val; meta.luxury.invested += invest;
        }

        let html = '';
        let totalValue = 0, totalInvested = 0, totalIncome = 0;
        for (const key of order) {
            const m = meta[key];
            if (!m.rows) continue;
            totalValue += m.value; totalInvested += m.invested; totalIncome += m.income;
            const pnl = m.value - m.invested;
            const pnlPct = m.invested ? (pnl / m.invested) * 100 : 0;
            const hidden = this.portfolioFilter !== 'all' && this.portfolioFilter !== key;
            html += `<div class="card portfolio-group" data-group="${key}" ${hidden ? 'style="display:none"' : ''}>
                <div class="portfolio-group-head">
                    <div class="portfolio-group-title">
                        <span class="portfolio-group-dot" style="background:${m.color}"></span>
                        <h3>${m.title}</h3>
                        <span class="portfolio-group-count">${m.count} Position(en)</span>
                    </div>
                    <div class="portfolio-group-meta">
                        <span class="portfolio-group-value">€${this.fmt(m.value)}</span>
                        <span class="portfolio-group-pnl ${pnl >= 0 ? 'positive' : 'negative'}">${pnl >= 0 ? '+' : '−'}€${this.fmt(Math.abs(pnl))} (${pnlPct.toFixed(1)}%)</span>
                    </div>
                </div>
                <div class="p-rows">${m.rows}</div>
            </div>`;
        }
        if (!html) {
            html = '<div class="garage-empty"><div class="garage-empty-icon">💼</div><div>Dein Portfolio ist leer.<br>Investiere in Aktien, ETFs, Krypto, Immobilien oder Unternehmen!</div></div>';
        }
        container.innerHTML = html;
        this.drawPortfolioSparks();

        const pnlTotal = totalValue - totalInvested;
        const pnlPctTotal = totalInvested ? (pnlTotal / totalInvested) * 100 : 0;
        document.getElementById('portfolio-total').textContent = '€' + this.fmt(totalValue + GameState.cash);
        document.getElementById('portfolio-cash').textContent = '€' + this.fmt(GameState.cash);
        document.getElementById('portfolio-invested').textContent = '€' + this.fmt(totalInvested);
        const pnlEl = document.getElementById('portfolio-pnl');
        pnlEl.textContent = (pnlTotal >= 0 ? '+' : '−') + '€' + this.fmt(Math.abs(pnlTotal)) + ` (${pnlPctTotal.toFixed(1)}%)`;
        pnlEl.style.color = pnlTotal >= 0 ? 'var(--green)' : 'var(--red)';
        this.renderAllocation(meta, totalValue, totalInvested, totalIncome);
    },

    drawPortfolioSparks() {
        document.querySelectorAll('#portfolio-groups .p-spark').forEach(cv => {
            if (!cv.getBoundingClientRect || !cv.getBoundingClientRect().width) return;
            const [type, id] = cv.dataset.src.split(':');
            let hist = [];
            if (type === 'stock' && StockMarket.history[id]) hist = StockMarket.history[id].slice(-30);
            else if (type === 'etf' && ETFMarket.history[id]) hist = ETFMarket.history[id].slice(-30);
            else if (type === 'crypto' && CryptoMarket.history[id]) hist = CryptoMarket.history[id].slice(-30);
            Charts.drawMiniChart(cv, hist);
        });
    },

    renderAllocation(meta, totalValue, totalInvested, totalIncome) {
        const totalAll = totalValue + GameState.cash;
        const seg = [];
        const legend = [];
        const add = (title, color, value, pct) => {
            if (!value || value <= 0) return;
            pct = pct !== undefined ? pct : (value / totalAll) * 100;
            seg.push({ value, color });
            legend.push(`<div class="alloc-item"><span class="alloc-dot" style="background:${color}"></span><span class="alloc-name">${title}</span><span class="alloc-vol">€${this.fmt(value)}</span><span class="alloc-pct">${pct.toFixed(1)}%</span></div>`);
        };
        add('📈 Aktien', meta.stocks.color, meta.stocks.value);
        add('📊 ETFs', meta.etfs.color, meta.etfs.value);
        add('🪙 Krypto', meta.crypto.color, meta.crypto.value);
        add('🏠 Immobilien', meta.realestate.color, meta.realestate.value);
        add('🏢 Unternehmen', meta.companies.color, meta.companies.value);
        add('💎 Luxus', meta.luxury.color, meta.luxury.value);
        add('💵 Guthaben', '#94a3b8', GameState.cash);

        const canvas = document.getElementById('portfolio-allocation');
        if (canvas) {
            let centerSub = '';
            if (totalAll > 0 && GameState.cash > 0) {
                const cashPct = (GameState.cash / totalAll) * 100;
                centerSub = cashPct < 1 ? '<1% Cash' : cashPct.toFixed(0) + '% Cash';
            }
            Charts.drawDonutChart(canvas, seg.length ? seg : [{ value: 1, color: '#e2e8f0' }], {
                centerText: this.fmtCompact(totalAll),
                centerSub
            });
        }
        document.getElementById('portfolio-allocation-legend').innerHTML = legend.join('') || '<div class="alloc-empty">Noch keine Anlagen</div>';
        document.getElementById('portfolio-overview-stats').innerHTML = `
            <div class="ov-stat"><span>Anlageklassen</span><strong>${seg.length}</strong></div>
            <div class="ov-stat"><span>Investiert</span><strong>${totalInvested > 0 ? (totalInvested / totalAll * 100).toFixed(0) + '%' : '0%'}</strong></div>
            <div class="ov-stat"><span>Einkommen/Monat</span><strong class="${totalIncome >= 0 ? 'positive' : 'negative'}">${totalIncome >= 0 ? '+' : '−'}€${this.fmt(Math.abs(totalIncome))}</strong></div>
            <div class="ov-stat"><span>Gewinn/Verlust</span><strong class="${totalValue - totalInvested >= 0 ? 'positive' : 'negative'}">${totalValue - totalInvested >= 0 ? '+' : '−'}€${this.fmt(Math.abs(totalValue - totalInvested))}</strong></div>
        `;
    },

    fmtCompact(num) {
        const abs = Math.abs(num);
        if (abs >= 1000000000) return (num / 1000000000).toFixed(1) + ' Mrd';
        if (abs >= 1000000) return (num / 1000000).toFixed(1) + ' Mio';
        if (abs >= 1000) return (num / 1000).toFixed(1) + 'k';
        return this.fmt(num);
    },

    bindPortfolio() {
        document.querySelectorAll('#portfolio-filters .chip').forEach(chip => {
            chip.addEventListener('click', () => {
                this.portfolioFilter = chip.dataset.filter;
                document.querySelectorAll('#portfolio-filters .chip').forEach(c => c.classList.toggle('active', c === chip));
                this.updatePortfolio();
            });
        });
    },

    bindSellModal() {
        document.getElementById('sell-modal-close').addEventListener('click', () => this.closeSellModal());
        document.getElementById('sell-modal-amount').addEventListener('input', () => this.updateSellModalTotal());
        document.getElementById('sell-modal-confirm').addEventListener('click', () => this.confirmSell());
        document.getElementById('sell-modal').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) this.closeSellModal();
        });
    },

    closeSellModal() {
        document.getElementById('sell-modal').classList.add('hidden');
        this.sellContext = null;
    },

    openSellModal(type, id) {
        this.sellContext = { type, id };
        const titleEl = document.getElementById('sell-modal-title');
        const infoEl = document.getElementById('sell-modal-info');
        const labelEl = document.getElementById('sell-modal-label');
        const amountEl = document.getElementById('sell-modal-amount');
        let title = '', info = '', max = 1, step = 1;

        if (type === 'stock' || type === 'etf') {
            const market = type === 'stock' ? StockMarket.data[id] : ETFMarket.data[id];
            const holdings = type === 'stock' ? GameState.portfolio.stocks : GameState.portfolio.etfs;
            const holding = holdings[id];
            if (!market || !holding) { this.showToast('Bestand nicht gefunden!', '⚠️'); return; }
            max = holding.shares;
            title = `${market.name} verkaufen`;
            info = `<div class="sell-modal-price">Kurs: <strong>€${this.fmtPrice(market.price)}</strong> · Bestand: <strong>${max} Stück</strong></div>`;
        } else if (type === 'crypto') {
            const market = CryptoMarket.data[id];
            const holding = GameState.portfolio.crypto[id];
            if (!market || !holding) { this.showToast('Bestand nicht gefunden!', '⚠️'); return; }
            max = holding.amount; step = 0.0001;
            title = `${market.name} verkaufen`;
            info = `<div class="sell-modal-price">Kurs: <strong>€${this.fmtPrice(market.price)}</strong> · Bestand: <strong>${holding.amount.toFixed(4)} ${id}</strong></div>`;
        } else if (type === 'realestate') {
            const prop = RealEstate.properties.find(p => p.id === id);
            if (!prop) { this.showToast('Immobilie nicht gefunden!', '⚠️'); return; }
            const gain = prop.currentValue - prop.currentPrice;
            max = 1;
            title = `${prop.name} verkaufen`;
            info = `<div class="sell-modal-price">Verkaufswert: <strong>€${this.fmt(prop.currentValue)}</strong> · Gewinn: <span class="${gain >= 0 ? 'positive' : 'negative'}">${gain >= 0 ? '+' : '−'}€${this.fmt(Math.abs(gain))}</span></div>`;
        } else if (type === 'company') {
            const company = Companies.owned.find(c => c.id === id);
            if (!company) { this.showToast('Unternehmen nicht gefunden!', '⚠️'); return; }
            max = 1;
            title = `${company.name} verkaufen`;
            info = `<div class="sell-modal-price">Verkaufswert: <strong>€${this.fmt(Math.round(company.value * 0.8))}</strong> (80% des Firmenwerts)</div>`;
        } else if (type === 'luxury') {
            const owned = Luxury.owned.find(o => o.id === id);
            if (!owned) { this.showToast('Gegenstand nicht gefunden!', '⚠️'); return; }
            max = 1;
            title = `${owned.name} verkaufen`;
            info = `<div class="sell-modal-price">Gebrauchtpreis: <strong>€${this.fmt(Luxury.getResaleValue(owned))}</strong> (60% des Werts)</div>`;
        } else {
            return;
        }

        if (max <= 0) { this.showToast('Kein Bestand vorhanden!', '⚠️'); return; }

        titleEl.textContent = title;
        infoEl.innerHTML = info;
        labelEl.textContent = (type === 'stock' || type === 'etf') ? 'Anzahl:' : (type === 'crypto' ? 'Menge:' : '');
        amountEl.value = (type === 'realestate' || type === 'company' || type === 'luxury') ? 1 : max;
        amountEl.max = max;
        amountEl.step = step;
        amountEl.disabled = (type === 'realestate' || type === 'company' || type === 'luxury');
        this.updateSellModalTotal();
        document.getElementById('sell-modal').classList.remove('hidden');
    },

    updateSellModalTotal() {
        const ctx = this.sellContext;
        if (!ctx) return;
        const amount = parseFloat(document.getElementById('sell-modal-amount').value) || 0;
        const totalEl = document.getElementById('sell-modal-total');
        let total = 0;
        if (ctx.type === 'stock') { const r = StockMarket.sell(ctx.id, amount); if (r) { const p = this.projectedProfit('stock', ctx.id, amount, r); total = r.net - Taxes.previewCapitalGain(p).delta; } }
        else if (ctx.type === 'etf') { const r = ETFMarket.sell(ctx.id, amount); if (r) { const p = this.projectedProfit('etf', ctx.id, amount, r); total = r.net - Taxes.previewCapitalGain(p).delta; } }
        else if (ctx.type === 'crypto') { const r = CryptoMarket.sell(ctx.id, amount); if (r) { const p = this.projectedProfit('crypto', ctx.id, amount, r); total = r.net - Taxes.previewCapitalGain(p).delta; } }
        else if (ctx.type === 'realestate') {
            const p = RealEstate.properties.find(x => x.id === ctx.id);
            total = p ? p.currentValue - Math.max(0, Taxes.previewCapitalGain(p.currentValue - p.currentPrice).delta) : 0;
        }
        else if (ctx.type === 'company') { const c = Companies.owned.find(x => x.id === ctx.id); total = c ? Math.round(c.value * 0.8) : 0; }
        else if (ctx.type === 'luxury') { const o = Luxury.owned.find(x => x.id === ctx.id); total = o ? Luxury.getResaleValue(o) : 0; }
        totalEl.textContent = '€' + this.fmt(total);
    },

    confirmSell() {
        if (!this.canAct()) return;
        const ctx = this.sellContext;
        if (!ctx) return;
        const amount = parseFloat(document.getElementById('sell-modal-amount').value) || 0;
        let result = null;

        if (ctx.type === 'stock') {
            result = this.executeHoldingSale('stock', ctx.id, amount);
        } else if (ctx.type === 'etf') {
            result = this.executeHoldingSale('etf', ctx.id, amount);
        } else if (ctx.type === 'crypto') {
            result = this.executeHoldingSale('crypto', ctx.id, amount);
        } else if (ctx.type === 'realestate') {
            result = RealEstate.sellProperty(ctx.id);
            if (result) {
                const applied = Taxes.applyCapitalGain(result.capitalGain);
                let net = result.price;
                if (applied.delta > 0) {
                    net -= applied.delta;
                    GameState.addTransaction('tax', 'realestate', 'Kapitalertragsteuer (Immobilie)', 'RE', 0, 0, 0, applied.delta);
                } else if (applied.delta < 0) {
                    net += -applied.delta;
                    GameState.addTransaction('taxrefund', 'realestate', 'Steuererstattung (Immobilie)', 'RE', 0, 0, 0, -applied.delta);
                }
                GameState.addCash(net);
                GameState.addTransaction('sell', 'realestate', result.name, 'RE', 1, result.price, 0, result.price);
                this.showToast(`${result.name} für €${this.fmt(net)} verkauft${applied.delta !== 0 ? ' (inkl. Steuer)' : ''}!`, '🏠');
            }
        } else if (ctx.type === 'company') {
            result = Companies.sellCompany(ctx.id);
            if (result) {
                this.showToast(`${result.name} für €${this.fmt(result.price)} verkauft!`, '🏢');
            }
        } else if (ctx.type === 'luxury') {
            result = Luxury.sellItem(ctx.id);
            if (result) {
                this.showToast(`${result.name} für €${this.fmt(result.price)} verkauft (Gebrauchtpreis)!`, '💎');
            }
        }

        if (result) {
            this.closeSellModal();
            this.updateAll();
        } else {
            this.showToast('Verkauf fehlgeschlagen!', '⚠️');
        }
    },

    renderRouletteBoard() {
        const grid = document.getElementById('roulette-number-grid');
        let html = '<button class="roulette-num roulette-green" onclick="UI.selectRouletteBet(\'number\',0)">0</button>';
        for (let n = 1; n <= 36; n++) {
            const color = Casino.ROUGE.includes(n) ? 'roulette-red' : 'roulette-black';
            html += `<button class="roulette-num ${color}" onclick="UI.selectRouletteBet('number',${n})">${n}</button>`;
        }
        grid.innerHTML = html;
        this.renderOutsideBets();
        this.selectRouletteBet(this.rouletteBet ? this.rouletteBet.type : 'red', this.rouletteBet ? this.rouletteBet.num : undefined);
    },

    /* Außenwetten als Chips (Dutzende, Kolonnen, Farben, etc.) */
    renderOutsideBets() {
        const el = document.getElementById('roulette-bet-options');
        if (!el) return;
        el.innerHTML = Casino.ROULETTE_BETS.map(b =>
            `<button class="casino-bet-btn" data-bet="${b.type}" data-payout="${b.payout}" onclick="UI.selectRouletteBet('${b.type}')">
                <span class="bet-chip-icon">${b.icon}</span>
                <span class="bet-chip-label">${b.label}</span>
                <span class="bet-chip-odds">${b.payout}:1</span>
            </button>`
        ).join('');
    },

    bindCasino() {
        this.renderRouletteBoard();
        this.renderSlotPaytable();
        document.getElementById('roulette-bet-amount').addEventListener('input', () => this.updateCasinoButtons());
        document.getElementById('coin-bet-amount').addEventListener('input', () => this.updateCasinoButtons());
        document.getElementById('bj-bet-amount').addEventListener('input', () => this.updateCasinoButtons());
        document.getElementById('roulette-spin-btn').addEventListener('click', () => this.spinRoulette());
        document.getElementById('slot-spin-btn').addEventListener('click', () => this.spinSlot());
        document.getElementById('coin-flip-btn').addEventListener('click', () => this.flipCoin());
        document.getElementById('bj-deal-btn').addEventListener('click', () => this.bjDeal());
        document.getElementById('bj-hit-btn').addEventListener('click', () => this.bjHit());
        document.getElementById('bj-stand-btn').addEventListener('click', () => this.bjStand());
        document.querySelectorAll('.coin-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.coinSide = btn.dataset.side;
                document.querySelectorAll('.coin-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.updateCasinoButtons();
            });
        });
        /* Schnell-Einsatz-Chips */
        document.querySelectorAll('.quick-bet').forEach(chip => {
            chip.addEventListener('click', () => this.setQuickBet(chip.dataset.target, chip.dataset.amount));
        });
        setInterval(() => {
            if (this.slotBusy || Casino.SLOTS.msLeft() > 0) {
                this.updateCasinoButtons();
            }
        }, 200);
        this.coinSide = 'kopf';
        this.rouletteBet = { type: 'red' };
        this.updateCasino();
    },

    setQuickBet(targetId, amount) {
        const input = document.getElementById(targetId);
        if (!input) return;
        if (amount === 'max') {
            input.value = Math.max(Casino.BLACKJACK_MIN_BET, Math.floor(GameState.cash));
        } else {
            input.value = amount;
        }
        this.updateCasinoButtons();
    },

    renderSlotPaytable() {
        const tiers = Casino.SLOTS.TIERS;
        document.getElementById('slot-paytable').innerHTML = tiers.map(t =>
            `<div class="slot-pay-row" data-combo="${t.symbols.join('')}"><span class="slot-pay-symbols">${t.symbols.join(' ')}</span>` +
            `<span class="slot-pay-name">${t.name}</span>` +
            `<span class="slot-pay-amount">€${this.fmt(t.pay)}</span></div>`
        ).join('');
    },

    switchCasinoGame(game) {
        document.querySelectorAll('.casino-tab').forEach(t => t.classList.toggle('active', t.dataset.game === game));
        document.getElementById('casino-roulette').classList.toggle('hidden', game !== 'roulette');
        document.getElementById('casino-slot').classList.toggle('hidden', game !== 'slot');
        document.getElementById('casino-coin').classList.toggle('hidden', game !== 'coin');
        document.getElementById('casino-blackjack').classList.toggle('hidden', game !== 'blackjack');
        if (game === 'roulette' && this.rouletteBet) this.renderRouletteBoard();
        this.updateCasino();
        GameState.save();
    },

    updateCasino() {
        const stats = GameState.casinoStats || { net: 0, wagered: 0, wins: 0, losses: 0 };
        document.getElementById('casino-cash').textContent = '€' + this.fmt(GameState.cash);
        const netEl = document.getElementById('casino-net');
        netEl.textContent = (stats.net >= 0 ? '+' : '−') + '€' + this.fmt(Math.abs(stats.net));
        netEl.style.color = stats.net >= 0 ? 'var(--green)' : 'var(--red)';
        document.getElementById('casino-wagered').textContent = '€' + this.fmt(stats.wagered);
        document.getElementById('casino-wins').textContent = stats.wins;
        this.renderBlackjack();
        this.updateCasinoButtons();
    },

    updateCasinoButtons() {
        const btnR = document.getElementById('roulette-spin-btn');
        const btnS = document.getElementById('slot-spin-btn');
        const btnC = document.getElementById('coin-flip-btn');
        if (btnR && btnC) {
            const rouletteAmt = parseFloat(document.getElementById('roulette-bet-amount').value) || 0;
            const coinAmt = parseFloat(document.getElementById('coin-bet-amount').value) || 0;
            btnR.textContent = `🎡 Drehen (Einsatz €${this.fmt(rouletteAmt)})`;
            btnC.textContent = `🪙 Werfen (Einsatz €${this.fmt(coinAmt)})`;
            btnR.disabled = rouletteAmt <= 0 || rouletteAmt > GameState.cash;
            btnC.disabled = coinAmt <= 0 || coinAmt > GameState.cash;
        }

        const slotLeft = Math.ceil(Casino.SLOTS.msLeft() / 1000);
        const slotLocked = this.slotBusy || slotLeft > 0;
        btnS.disabled = GameState.cash < Casino.SLOT_TICKET || slotLocked;
        btnS.textContent = slotLocked
            ? (this.slotBusy ? '🎰 Läuft…' : `🎰 Ticket kaufen & Drehen (€100) · ${slotLeft}s`)
            : '🎰 Ticket kaufen & Drehen (€100)';

        const bjSt = Casino.BLACKJACK.state;
        const btnDeal = document.getElementById('bj-deal-btn');
        const btnHit = document.getElementById('bj-hit-btn');
        const btnStand = document.getElementById('bj-stand-btn');
        if (btnDeal) {
            const bjAmt = parseFloat(document.getElementById('bj-bet-amount').value) || 0;
            const playing = bjSt && bjSt.status !== 'done';
            btnDeal.hidden = playing;
            btnHit.hidden = !playing;
            btnStand.hidden = !playing;
            btnDeal.disabled = bjAmt < Casino.BLACKJACK_MIN_BET || bjAmt > GameState.cash;
            btnDeal.textContent = `🃏 Karten teilen (Einsatz €${this.fmt(bjAmt)})`;
        }
    },

    selectRouletteBet(type, num) {
        this.rouletteBet = { type, num };
        document.querySelectorAll('#roulette-bet-options .casino-bet-btn').forEach(b => b.classList.toggle('selected', b.dataset.bet === type));
        document.querySelectorAll('.roulette-num').forEach(b => b.classList.toggle('selected', type === 'number' && parseInt(b.textContent) === num));
        const label = document.getElementById('roulette-active-bet');
        if (label) {
            const entry = Casino.ROULETTE_BETS.find(b => b.type === type);
            if (entry) {
                label.textContent = `${entry.icon} ${entry.label} · Auszahlung ${entry.payout}:1`;
            } else {
                label.textContent = `🎯 Direkte Zahl ${num} · Auszahlung 35:1`;
            }
        }
    },

    showRouletteResult(result) {
        const el = document.getElementById('roulette-result');
        if (!result) { el.innerHTML = '<span class="casino-message empty">Zahl deinen Einsatz oder wähle zuerst ein Spiel!</span>'; return; }
        document.querySelectorAll('.roulette-num').forEach(b => {
            b.classList.toggle('roulette-hit', parseInt(b.textContent) === result.num);
        });
        const colorName = result.color === 'red' ? '🔴 Rot' : result.color === 'black' ? '⚫ Schwarz' : '🟢 Grün';
        let betName = 'Deposit';
        const entry = this.rouletteBet ? Casino.ROULETTE_BETS.find(b => b.type === this.rouletteBet.type) : null;
        if (entry) betName = `${entry.icon} ${entry.label}`;
        else if (this.rouletteBet && this.rouletteBet.type === 'number') betName = `Zahl ${this.rouletteBet.num}`;
        el.innerHTML = `<div class="casino-ball ${result.color}">${result.num}</div>
            <div class="casino-message ${result.win ? 'message-win' : 'message-lose'}">
                ${result.color === 'green' ? 'Die Kugel fiel auf die 0 (Grün) – Haus gewinnt!' : `Die Kugel fiel auf <strong>${result.num}</strong> (${colorName}).`}
                <br>${result.win
                    ? `Wette <strong>${betName}</strong> gewinnt! <span class="positive">+€${this.fmt(result.profit)}</span>`
                    : `<span class="negative">Leider verloren. −€${this.fmt(Math.abs(result.profit))}</span>`}
            </div>`;
    },

    spinRoulette() {
        if (!this.canAct()) return;
        const amount = parseFloat(document.getElementById('roulette-bet-amount').value) || 0;
        const result = Casino.spinRoulette(this.rouletteBet || { type: 'red' }, amount);
        if (!result) { this.showToast('Ungültiger Einsatz oder zu wenig Guthaben!', '⚠️'); this.updateCasino(); return; }
        this.showRouletteResult(result);
        this.updateCasino();
        GameState.save();
    },

    spinSlot() {
        if (!this.canAct()) return;
        if (this.slotBusy || !Casino.SLOTS.canSpin()) return;
        if (GameState.cash < Casino.SLOT_TICKET) {
            this.showToast('Nicht genug Guthaben für ein Ticket!', '⚠️');
            this.updateCasino();
            return;
        }

        const result = Casino.spinSlot();
        if (!result) { this.updateCasino(); return; }

        this.slotBusy = true;
        document.getElementById('slot-result').innerHTML = '';
        this.updateCasinoButtons();
        this.updateCasino();

        this.animateSlotReels(result.symbols).then(() => {
            this.slotBusy = false;
            this.showSlotResult(result);
            this.updateCasino();
            GameState.save();
        });
    },

    animateSlotReels(finalSymbols) {
        return new Promise((resolve) => {
            const symbols = Casino.SLOTS.SYMBOLS;
            const reels = [0, 1, 2].map(i => document.getElementById('slot-reel-' + i));
            const timers = [];

            reels.forEach(reel => reel.classList.remove('slot-stop'));
            reels.forEach(reel => reel.classList.add('spinning'));

            for (let r = 0; r < 3; r++) {
                const iv = setInterval(() => {
                    reels[r].textContent = symbols[Math.floor(Math.random() * symbols.length)];
                }, 65 + r * 15);
                timers.push(iv);
            }

            const stops = [700, 1250, 1750];
            stops.forEach((ms, r) => {
                setTimeout(() => {
                    clearInterval(timers[r]);
                    reels[r].textContent = finalSymbols[r];
                }, ms);
            });
            setTimeout(() => {
                reels.forEach(reel => reel.classList.remove('spinning'));
                reels.forEach(reel => reel.classList.add('slot-stop'));
                setTimeout(resolve, 250);
            }, 1900);
        });
    },

    showSlotResult(result) {
        const el = document.getElementById('slot-result');
        document.querySelectorAll('.slot-pay-row').forEach(row => {
            row.classList.toggle('pay-hit', result.winAmount > 0 && row.dataset.combo === result.symbols.join(''));
        });
        if (result.jackpot) {
            el.innerHTML = `<div class="slot-jackpot">💰💰💰 JACKPOT! 💰💰💰</div>
                <div class="casino-message message-win">Du hast <strong>€1.000.000</strong> gewonnen!</div>`;
        } else if (result.winAmount > 0) {
            el.innerHTML = `<div class="casino-message message-win">
                ${result.symbols.join(' ')} · <strong>${result.combo}</strong>
                <br><span class="positive">+€${this.fmt(result.winAmount)}</span>
            </div>`;
        } else {
            el.innerHTML = `<div class="casino-message message-lose">
                ${result.symbols.join(' ')} · <span class="negative">Kein Gewinn. −€${this.fmt(Math.abs(result.profit))}</span>
            </div>`;
        }
    },

    flipCoin() {
        if (!this.canAct()) return;
        const amount = parseFloat(document.getElementById('coin-bet-amount').value) || 0;
        const side = this.coinSide || 'kopf';
        const result = Casino.flipCoin(side, amount);
        if (!result) { this.showToast('Ungültiger Einsatz oder zu wenig Guthaben!', '⚠️'); this.updateCasino(); return; }
        const face = result.result === 'kopf' ? '👑' : '🪙';
        const coin = document.getElementById('coin-show');
        coin.textContent = face;
        coin.classList.remove('flip-anim');
        void coin.offsetWidth;
        coin.classList.add('flip-anim');
        const el = document.getElementById('coin-result');
        el.innerHTML = `<div class="casino-message ${result.win ? 'message-win' : 'message-lose'}">
            Ergebnis: <strong>${result.result.charAt(0).toUpperCase() + result.result.slice(1)}</strong> ${face}
            <br>${result.win ? `<span class="positive">GEWONNEN! +€${this.fmt(result.profit)}</span>` : `<span class="negative">Leider verloren. −€${this.fmt(Math.abs(result.profit))}</span>`}
        </div>`;
        this.updateCasino();
        GameState.save();
    },

    /* --- Blackjack 21 ---------------------------------------- */
    cardHtml(card) {
        if (!card) return '';
        const red = (card.suit === '♥' || card.suit === '♦');
        return `<span class="bj-card ${red ? 'red' : 'dark'}"><span class="bj-rank">${card.rank}</span><span class="bj-suit">${card.suit}</span></span>`;
    },
    cardBack() {
        return '<span class="bj-card bj-card-back">?</span>';
    },
    handSumHtml(hand) {
        const v = Casino.BLACKJACK.handValue(hand);
        return `<span class="bj-hand-sum">${v > 21 ? '<span class="negative">' + v + '</span>' : v}</span>`;
    },
    renderBlackjack() {
        const st = Casino.BLACKJACK.state;
        const dealer = document.getElementById('bj-dealer-hand');
        const player = document.getElementById('bj-player-hand');
        const deckEl = document.getElementById('bj-deck-count');
        if (!dealer || !player) return;
        const deckCount = st ? st.deck.length : 52;
        if (deckEl) deckEl.textContent = deckCount;

        if (!st) {
            dealer.innerHTML = '<span class="bj-placeholder">Warte auf Einsatz…</span>';
            player.innerHTML = '<span class="bj-placeholder">Karten werden geteilt.</span>';
            this.renderBlackjackResult(null);
            return;
        }
        const hideHole = st.status === 'player';
        dealer.innerHTML = this.cardBack() + this.cardHtml(st.dealer[1]) + this.handSumHtml(hideHole ? [st.dealer[1]] : st.dealer);
        player.innerHTML = st.player.map(c => this.cardHtml(c)).join('') + this.handSumHtml(st.player);
        this.renderBlackjackResult(st.status === 'done' ? st : null);
    },
    renderBlackjackResult(st) {
        const el = document.getElementById('bj-result');
        if (!el) return;
        if (!st) {
            el.innerHTML = '';
            return;
        }
        const labels = {
            blackjack: 'BLACKJACK! 🎉 21 auf den ersten beiden Karten!',
            win: 'Du gewinnst! 🥳',
            push: 'Unentschieden – Einsatz zurück.',
            lose: 'Bank gewinnt. 😔'
        };
        const payText = st.result === 'push'
            ? 'Einsatz zurück.'
            : (st.profit >= 0 ? `+€${this.fmt(st.profit)}` : `−€${this.fmt(Math.abs(st.profit))}`);
        el.innerHTML = `<div class="bj-result-line">${st.player.map(c => this.cardHtml(c)).join(' ') || ''} vs. ${st.dealer.map(c => this.cardHtml(c)).join(' ') || ''}</div>
            <div class="casino-message ${st.result === 'lose' ? 'message-lose' : 'message-win'}">
                <strong>${labels[st.result] || st.result}</strong>
                <br><span class="${st.profit >= 0 ? 'positive' : 'negative'}">${payText}</span>
            </div>`;
    },
    bjDeal() {
        if (!this.canAct()) return;
        const amount = parseFloat(document.getElementById('bj-bet-amount').value) || 0;
        const st = Casino.BLACKJACK.startDeal(amount);
        if (!st) { this.showToast('Mindesteinsatz €' + Casino.BLACKJACK_MIN_BET + ' – oder zu wenig Guthaben!', '⚠️'); this.updateCasino(); return; }
        this.renderBlackjack();
        if (st.status === 'done') {
            this.bjFinish();
        }
        this.updateCasino();
        GameState.save();
    },
    bjHit() {
        if (!this.canAct()) return;
        const st = Casino.BLACKJACK.hit();
        if (!st) return;
        this.renderBlackjack();
        if (st.status === 'done') this.bjFinish();
        this.updateCasino();
        GameState.save();
    },
    bjStand() {
        if (!this.canAct()) return;
        const st = Casino.BLACKJACK.stand();
        if (!st) return;
        this.renderBlackjack();
        this.bjFinish();
        this.updateCasino();
        GameState.save();
    },
    bjFinish() {
        const st = Casino.BLACKJACK.state;
        if (!st) return;
        this.renderBlackjackResult(st);
        if (st.result === 'blackjack') this.showToast('BLACKJACK! 🎉 +€' + this.fmt(st.profit), '🎉');
    },

    updateLeaderboard() {
        const container = document.getElementById('leaderboard-list');
        const ranking = Leaderboard.getRanking();

        let html = '';
        for (const entry of ranking) {
            const isTop3 = entry.rank <= 3;
            const medalEmoji = entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : '';
            html += `<div class="leaderboard-entry ${entry.isPlayer ? 'player-entry' : ''}">
                <div class="leaderboard-rank ${isTop3 ? 'top3' : ''}">${medalEmoji} #${entry.rank}</div>
                <div class="leaderboard-avatar" style="background:${entry.bg}">${entry.avatar}</div>
                <div class="leaderboard-info">
                    <div class="leaderboard-name">${entry.name}</div>
                </div>
                <div class="leaderboard-worth">${Leaderboard.formatNetWorth(entry.netWorth)}</div>
            </div>`;
        }

        container.innerHTML = html;
    },

    renderBuilding(prop) {
        const cityColor = RealEstate.cities[prop.city]?.color || '#666';
        const isHouse = prop.type === 'haus';
        const isGewerbe = prop.type === 'gewerbe';
        const renovated = prop.renovationLevel || 0;
        const baseColor = isGewerbe ? '#8d9aa5' : isHouse ? '#d4a373' : '#a8b8c4';
        const roofColor = isGewerbe ? '#6b7b88' : isHouse ? '#7f5539' : '#5c6f7f';
        const wallColor = renovated > 0 ? this.lighten(baseColor, renovated * 12) : baseColor;
        const skyTop = this.lighten(cityColor, 45);
        const skyBottom = '#dcecf8';

        if (isHouse) {
            return `<svg class="re-building-svg" viewBox="0 0 400 180" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <linearGradient id="sky${prop.id}" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="${skyTop}"/>
                        <stop offset="100%" stop-color="${skyBottom}"/>
                    </linearGradient>
                    <linearGradient id="wall${prop.id}" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stop-color="${this.darken(wallColor, 10)}"/>
                        <stop offset="60%" stop-color="${wallColor}"/>
                        <stop offset="100%" stop-color="${this.lighten(wallColor, 8)}"/>
                    </linearGradient>
                </defs>
                <rect width="400" height="180" fill="url(#sky${prop.id})"/>
                <circle cx="340" cy="35" r="18" fill="#f5d76e" opacity="0.9"/>
                <polygon points="200,25 80,75 320,75" fill="${roofColor}"/>
                <rect x="80" y="75" width="240" height="80" fill="url(#wall${prop.id})"/>
                <rect x="90" y="85" width="40" height="35" rx="2" fill="#2c3e50"/>
                <rect x="105" y="85" width="25" height="35" rx="2" fill="#d35400"/>
                <rect x="200" y="85" width="40" height="35" rx="2" fill="#2c3e50"/>
                <rect x="215" y="85" width="25" height="35" rx="2" fill="#d35400"/>
                <rect x="280" y="85" width="26" height="35" rx="2" fill="#2c3e50"/>
                <rect x="293" y="85" width="13" height="35" rx="2" fill="#d35400"/>
                <rect x="98" y="120" width="60" height="35" rx="3" fill="#7f5539"/>
                <rect x="110" y="128" width="36" height="22" rx="2" fill="#f39c12" opacity="0.8"/>
                <circle cx="190" cy="45" r="3" fill="#fff" opacity="0.4"/>
                <rect x="0" y="150" width="400" height="30" fill="#2d2d2d"/>
                ${this.renderGarden(prop)}
            </svg>`;
        }

        if (isGewerbe) {
            return `<svg class="re-building-svg" viewBox="0 0 400 180" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <linearGradient id="sky${prop.id}" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="${skyTop}"/>
                        <stop offset="100%" stop-color="${skyBottom}"/>
                    </linearGradient>
                    <linearGradient id="glass${prop.id}" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#87ceeb"/>
                        <stop offset="100%" stop-color="#5a8db8"/>
                    </linearGradient>
                </defs>
                <rect width="400" height="180" fill="url(#sky${prop.id})"/>
                <circle cx="340" cy="40" r="20" fill="#f5d76e" opacity="0.9"/>
                <rect x="50" y="30" width="300" height="130" fill="${wallColor}"/>
                <rect x="50" y="30" width="300" height="130" fill="url(#glass${prop.id})" opacity="0.35"/>
                <rect x="70" y="45" width="50" height="60" fill="url(#glass${prop.id})"/>
                <rect x="70" y="115" width="50" height="30" fill="url(#glass${prop.id})"/>
                <rect x="135" y="45" width="50" height="60" fill="url(#glass${prop.id})"/>
                <rect x="135" y="115" width="50" height="30" fill="url(#glass${prop.id})"/>
                <rect x="200" y="45" width="50" height="60" fill="url(#glass${prop.id})"/>
                <rect x="200" y="115" width="50" height="30" fill="url(#glass${prop.id})"/>
                <rect x="265" y="45" width="50" height="60" fill="url(#glass${prop.id})"/>
                <rect x="265" y="115" width="50" height="30" fill="url(#glass${prop.id})"/>
                <rect x="310" y="30" width="30" height="20" rx="2" fill="#34495e"/>
                <rect x="0" y="160" width="400" height="20" fill="#333"/>
            </svg>`;
        }

        // Wohnung (alt / apartment block)
        const floors = this.darken(wallColor, 20);
        return `<svg class="re-building-svg" viewBox="0 0 400 180" preserveAspectRatio="xMidYMid slice">
            <defs>
                <linearGradient id="wall${prop.id}" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="${this.darken(wallColor, 15)}"/>
                    <stop offset="50%" stop-color="${wallColor}"/>
                    <stop offset="100%" stop-color="${this.lighten(wallColor, 10)}"/>
                </linearGradient>
            </defs>
            <rect width="400" height="180" fill="${skyTop}22"/>
            <rect x="60" y="15" width="280" height="150" fill="url(#wall${prop.id})"/>
            <rect x="60" y="15" width="280" height="7" fill="${this.darken(wallColor, 30)}"/>
            <rect x="60" y="75" width="280" height="3" fill="${this.darken(wallColor, 30)}"/>
            <rect x="60" y="135" width="280" height="3" fill="${this.darken(wallColor, 30)}"/>
            <rect x="80" y="28" width="60" height="40" rx="2" fill="#2c3e50"/>
            <rect x="88" y="35" width="24" height="26" rx="1" fill="#e8d8a9" opacity="0.7"/>
            <rect x="122" y="28" width="60" height="40" rx="2" fill="#2c3e50"/>
            <rect x="130" y="35" width="24" height="26" rx="1" fill="#e8d8a9" opacity="0.7"/>
            <rect x="192" y="28" width="60" height="40" rx="2" fill="#2c3e50"/>
            <rect x="200" y="35" width="24" height="26" rx="1" fill="#e8d8a9" opacity="0.7"/>
            <rect x="262" y="28" width="60" height="40" rx="2" fill="#2c3e50"/>
            <rect x="270" y="35" width="24" height="26" rx="1" fill="#e8d8a9" opacity="0.7"/>

            <rect x="80" y="88" width="60" height="40" rx="2" fill="#2c3e50"/>
            <rect x="88" y="95" width="24" height="26" rx="1" fill="#e8d8a9" opacity="0.7"/>
            <rect x="122" y="88" width="60" height="40" rx="2" fill="#2c3e50"/>
            <rect x="130" y="95" width="24" height="26" rx="1" fill="#e8d8a9" opacity="0.7"/>
            <rect x="192" y="88" width="60" height="40" rx="2" fill="#2c3e50"/>
            <rect x="200" y="95" width="24" height="26" rx="1" fill="#e8d8a9" opacity="0.3"/>
            <rect x="262" y="88" width="60" height="40" rx="2" fill="#2c3e50"/>
            <rect x="270" y="95" width="24" height="26" rx="1" fill="#e8d8a9" opacity="0.7"/>

            <rect x="0" y="160" width="400" height="20" fill="#2d2d2d"/>
            <rect x="176" y="140" width="32" height="20" rx="1" fill="${this.darken(wallColor, 30)}"/>
            <rect x="120" y="145" width="40" height="15" rx="10" fill="#3a3a3a"/>
            <rect x="240" y="145" width="40" height="15" rx="10" fill="#3a3a3a"/>
            ${this.renderWindowsTrees()}
        </svg>`;
    },

    renderGarden(prop) {
        let plants = '';
        const colors = ['#2e8b57', '#3cb371', '#228b22', '#556b2f', '#6b8e23'];
        for (let i = 0; i < 5; i++) {
            const x = 20 + i * 75;
            const h = 12 + (i % 3) * 8;
            plants += `<circle cx="${x}" cy="${178 - h}" r="${h}" fill="${colors[i % 5]}"/>
                <rect x="${x - 2}" y="${178 - h}" width="4" height="${h}" fill="#5d4037"/>`;
        }
        return `<g opacity="0.9">${plants}
            <rect x="10" y="176" width="150" height="2" fill="#413f3f"/>
            <rect x="230" y="176" width="160" height="2" fill="#413f3f"/>
        </g>`;
    },

    renderWindowsTrees() {
        let trees = '';
        for (let i = 0; i < 4; i++) {
            const x = 30 + i * 90;
            trees += `<rect x="${x}" y="150" width="8" height="20" fill="#5d4037"/>
                <circle cx="${x + 4}" cy="145" r="${10 + i * 2}" fill="#1b5e20" opacity="0.8"/>
                <circle cx="${x - 3}" cy="148" r="${7 + i}" fill="#2e7d32" opacity="0.7"/>`;
        }
        return `<g opacity="0.8">${trees}</g>`;
    },

    darken(hex, amount) {
        const h = hex.replace('#', '');
        const r = Math.max(0, parseInt(h.substring(0, 2), 16) - amount);
        const g = Math.max(0, parseInt(h.substring(2, 4), 16) - amount);
        const b = Math.max(0, parseInt(h.substring(4, 6), 16) - amount);
        return `rgb(${r},${g},${b})`;
    },

    lighten(hex, amount) {
        const h = hex.replace('#', '');
        const r = Math.min(255, parseInt(h.substring(0, 2), 16) + amount);
        const g = Math.min(255, parseInt(h.substring(2, 4), 16) + amount);
        const b = Math.min(255, parseInt(h.substring(4, 6), 16) + amount);
        return `rgb(${r},${g},${b})`;
    },

    showToast(text, icon = 'ℹ️') {
        const toast = document.getElementById('news-toast');
        document.getElementById('news-toast-title').textContent = icon + ' Benachrichtigung';
        document.getElementById('news-toast-body').textContent = text;
        toast.classList.remove('hidden');
        clearTimeout(this._toastTimer);
        this._toastTimer = setTimeout(() => toast.classList.add('hidden'), 3000);
    },

    showNewsToast(event) {
        if (!event) return;
        const toast = document.getElementById('news-toast');
        document.getElementById('news-toast-title').textContent = '📰 ' + event.title;
        document.getElementById('news-toast-body').textContent = event.body;
        toast.classList.remove('hidden');
        clearTimeout(this._newsTimer);
        this._newsTimer = setTimeout(() => toast.classList.add('hidden'), 5000);
    },

    fmt(num) {
        return num.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    },

    fmtPrice(price) {
        if (price >= 10000) return price.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        if (price >= 100) return price.toFixed(2);
        if (price >= 1) return price.toFixed(2);
        return price.toFixed(4);
    }
};
