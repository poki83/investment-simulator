const ETFMarket = {
    data: {},
    history: {},

    definitions: [
        { symbol: 'MSCI', name: 'iShares MSCI World', description: 'Globaler Aktienindex', ter: '0,20%', aum: '520 Mrd €', trackingError: '0,05%', basePrice: 95.40, drift: 0.07, volatility: 0.14, dividend: '1,3%', color: '#0055a5' },
        { symbol: 'SP500', name: 'Vanguard S&P 500', description: 'US-Aktienmarkt', ter: '0,07%', aum: '380 Mrd €', trackingError: '0,02%', basePrice: 425.80, drift: 0.09, volatility: 0.16, dividend: '1,4%', color: '#960018' },
        { symbol: 'DAX', name: 'iShares Core DAX', description: 'Deutsche Aktien', ter: '0,16%', aum: '12 Mrd €', trackingError: '0,03%', basePrice: 142.60, drift: 0.06, volatility: 0.18, dividend: '2,8%', color: '#000000' },
        { symbol: 'QQQ', name: 'Invesco NASDAQ 100', description: 'Technologie-Werte', ter: '0,20%', aum: '245 Mrd €', trackingError: '0,08%', basePrice: 458.90, drift: 0.11, volatility: 0.20, dividend: '0,6%', color: '#0078d4' },
        { symbol: 'EM', name: 'iShares EM Markets', description: 'Schwellenländer', ter: '0,22%', aum: '18 Mrd €', trackingError: '0,10%', basePrice: 42.80, drift: 0.05, volatility: 0.22, dividend: '2,9%', color: '#e67e22' },
        { symbol: 'AGG', name: 'iShares Core Agg Bond', description: 'Anleihen-Korb', ter: '0,07%', aum: '85 Mrd €', trackingError: '0,03%', basePrice: 98.50, drift: 0.03, volatility: 0.05, dividend: '3,1%', color: '#27ae60' },
        { symbol: 'REIT', name: 'iShares Developed REIT', description: 'Immobilien-ETF', ter: '0,24%', aum: '32 Mrd €', trackingError: '0,12%', basePrice: 112.30, drift: 0.05, volatility: 0.16, dividend: '3,5%', color: '#8e44ad' },
        { symbol: 'DIV', name: 'iSTOXX Global Select Div', description: 'Dividenden-ETF', ter: '0,32%', aum: '8 Mrd €', trackingError: '0,15%', basePrice: 58.70, drift: 0.05, volatility: 0.12, dividend: '4,2%', color: '#c0392b' }
    ],

    init() {
        for (const def of this.definitions) {
            if (this.data[def.symbol]) continue;
            this.data[def.symbol] = {
                ...def,
                price: def.basePrice * (0.92 + Math.random() * 0.16),
                weekChange: 0,
                high: def.basePrice * 1.02,
                low: def.basePrice * 0.98
            };
            if (!this.history[def.symbol]) {
                this.history[def.symbol] = [];
                for (let i = 0; i < 52; i++) {
                    this.history[def.symbol].push(
                        def.basePrice * (0.88 + Math.random() * 0.24)
                    );
                }
            }
        }
    },

    update() {
        for (const symbol in this.data) {
            const etf = this.data[symbol];
            const prevPrice = etf.price;

            const dt = 1 / 365;
            const randomNormal = StockMarket.boxMuller();
            let change = etf.drift * dt + etf.volatility * Math.sqrt(dt) * randomNormal;

            if (Events.activeEffects) {
                for (const effect of Events.activeEffects) {
                    if (effect.type === 'etf') {
                        if (effect.target === symbol || effect.target === 'all') {
                            change += effect.magnitude * dt;
                        }
                    }
                }
            }

            let newPrice = etf.price * (1 + change);
            newPrice = Math.max(newPrice, 0.01);
            etf.price = Math.round(newPrice * 100) / 100;
            etf.weekChange = ((etf.price - prevPrice) / prevPrice) * 100;
            etf.high = Math.max(etf.high, etf.price);
            etf.low = Math.min(etf.low, etf.price);

            this.history[symbol].push(etf.price);
            if (this.history[symbol].length > 100) {
                this.history[symbol].shift();
            }
        }
    },

    buy(symbol, shares, cash) {
        const etf = this.data[symbol];
        if (!etf || shares <= 0) return null;
        const price = etf.price * shares;
        const fee = Math.max(price * 0.001, 1);
        const total = price + fee;
        if (total > cash) return null;
        return { price, fee, total };
    },

    sell(symbol, shares) {
        const etf = this.data[symbol];
        if (!etf || shares <= 0) return null;
        const price = etf.price * shares;
        const fee = Math.max(price * 0.001, 1);
        const net = price - fee;
        return { price, fee, net };
    }
};
