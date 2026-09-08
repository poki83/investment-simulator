const StockMarket = {
    data: {},
    history: {},

    definitions: [
        { symbol: 'SAP', name: 'SAP SE', sector: 'Technologie', country: 'DE', basePrice: 132.50, drift: 0.03, volatility: 0.22, marketCap: '154 Mrd', pe: 28.5, dividend: '0.95 €', color: '#0070f2' },
        { symbol: 'SIE', name: 'Siemens AG', sector: 'Industrie', country: 'DE', basePrice: 118.30, drift: 0.025, volatility: 0.20, marketCap: '94 Mrd', pe: 18.2, dividend: '4.25 €', color: '#009999' },
        { symbol: 'BMW', name: 'BMW AG', sector: 'Automobil', country: 'DE', basePrice: 95.40, drift: 0.02, volatility: 0.24, marketCap: '62 Mrd', pe: 5.8, dividend: '6.80 €', color: '#1c69d4' },
        { symbol: 'ADS', name: 'Adidas AG', sector: 'Konsum', country: 'DE', basePrice: 215.80, drift: 0.04, volatility: 0.28, marketCap: '42 Mrd', pe: 42.1, dividend: '3.30 €', color: '#000000' },
        { symbol: 'DB', name: 'Deutsche Bank', sector: 'Finanzen', country: 'DE', basePrice: 14.25, drift: 0.015, volatility: 0.35, marketCap: '28 Mrd', pe: 6.2, dividend: '0.21 €', color: '#d50032' },
        { symbol: 'ALV', name: 'Allianz SE', sector: 'Versicherung', country: 'DE', basePrice: 245.60, drift: 0.025, volatility: 0.18, marketCap: '102 Mrd', pe: 12.8, dividend: '11.40 €', color: '#0066b3' },
        { symbol: 'BAS', name: 'BASF SE', sector: 'Chemie', country: 'DE', basePrice: 48.90, drift: 0.015, volatility: 0.22, marketCap: '43 Mrd', pe: 22.5, dividend: '3.40 €', color: '#004a96' },
        { symbol: 'AIR', name: 'Airbus SE', sector: 'Industrie', country: 'EU', basePrice: 156.20, drift: 0.035, volatility: 0.25, marketCap: '122 Mrd', pe: 24.1, dividend: '1.80 €', color: '#0033a0' },
        { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technologie', country: 'US', basePrice: 189.50, drift: 0.05, volatility: 0.22, marketCap: '2.95 Bio', pe: 30.2, dividend: '$0.96', color: '#555555' },
        { symbol: 'MSFT', name: 'Microsoft Corp.', sector: 'Technologie', country: 'US', basePrice: 415.20, drift: 0.055, volatility: 0.20, marketCap: '3.08 Bio', pe: 35.8, dividend: '$3.00', color: '#00a4ef' },
        { symbol: 'TSLA', name: 'Tesla Inc.', sector: 'Automobil', country: 'US', basePrice: 248.90, drift: 0.06, volatility: 0.50, marketCap: '792 Mrd', pe: 62.5, dividend: '-', color: '#cc0000' },
        { symbol: 'AMZN', name: 'Amazon.com', sector: 'Handel', country: 'US', basePrice: 185.60, drift: 0.05, volatility: 0.28, marketCap: '1.92 Bio', pe: 58.2, dividend: '-', color: '#ff9900' },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', sector: 'Technologie', country: 'US', basePrice: 172.40, drift: 0.045, volatility: 0.24, marketCap: '2.12 Bio', pe: 25.1, dividend: '$0.80', color: '#4285f4' },
        { symbol: 'META', name: 'Meta Platforms', sector: 'Technologie', country: 'US', basePrice: 542.30, drift: 0.06, volatility: 0.32, marketCap: '1.37 Bio', pe: 28.9, dividend: '$2.00', color: '#0668e1' },
        { symbol: 'NVDA', name: 'NVIDIA Corp.', sector: 'Technologie', country: 'US', basePrice: 128.50, drift: 0.08, volatility: 0.45, marketCap: '3.16 Bio', pe: 65.2, dividend: '$0.04', color: '#76b900' },
        { symbol: 'JPM', name: 'JPMorgan Chase', sector: 'Finanzen', country: 'US', basePrice: 205.80, drift: 0.03, volatility: 0.20, marketCap: '596 Mrd', pe: 11.5, dividend: '$4.60', color: '#005eb8' },
        { symbol: 'NESN', name: 'Nestlé SA', sector: 'Konsum', country: 'CH', basePrice: 92.40, drift: 0.02, volatility: 0.14, marketCap: '221 Mrd', pe: 22.8, dividend: 'CHF 3.00', color: '#8b0000' },
        { symbol: 'ASML', name: 'ASML Holding', sector: 'Technologie', country: 'NL', basePrice: 885.20, drift: 0.07, volatility: 0.30, marketCap: '356 Mrd', pe: 38.5, dividend: '€6.10', color: '#0066cc' },
        { symbol: 'SRT', name: 'Scout24 AG', sector: 'Technologie', country: 'DE', basePrice: 82.60, drift: 0.035, volatility: 0.26, marketCap: '6.2 Mrd', pe: 45.2, dividend: '€1.50', color: '#ff6600' },
        { symbol: 'VOW', name: 'Volkswagen AG', sector: 'Automobil', country: 'DE', basePrice: 112.40, drift: 0.012, volatility: 0.28, marketCap: '68 Mrd', pe: 3.5, dividend: '€9.06', color: '#002a5f' }
    ],

    init() {
        for (const def of this.definitions) {
            if (this.data[def.symbol]) continue;
            this.data[def.symbol] = {
                ...def,
                price: def.basePrice * (0.9 + Math.random() * 0.2),
                openPrice: def.basePrice,
                high: def.basePrice * 1.02,
                low: def.basePrice * 0.98,
                volume: Math.floor(Math.random() * 5000000) + 500000,
                weekChange: 0,
                allTimeHigh: def.basePrice * (1.1 + Math.random() * 0.3),
                allTimeLow: def.basePrice * (0.5 + Math.random() * 0.3)
            };
            if (!this.history[def.symbol]) {
                this.history[def.symbol] = [];
                for (let i = 0; i < 52; i++) {
                    const variance = def.basePrice * def.volatility * 0.01;
                    this.history[def.symbol].push(
                        def.basePrice * (0.85 + Math.random() * 0.3)
                    );
                }
            }
        }
    },

    update() {
        for (const symbol in this.data) {
            const stock = this.data[symbol];
            const prevPrice = stock.price;

            const dt = 1 / 365;
            const randomNormal = this.boxMuller();
            const change = stock.drift * dt + stock.volatility * Math.sqrt(dt) * randomNormal;
            let newPrice = stock.price * (1 + change);

            if (Events.activeEffects) {
                for (const effect of Events.activeEffects) {
                    if (effect.type === 'stock' && (effect.target === symbol || effect.target === stock.sector || effect.target === stock.country)) {
                        newPrice *= (1 + effect.magnitude * dt);
                    }
                }
            }

            if (newPrice - prevPrice > 1) {
                newPrice = prevPrice + 1;
            } else if (prevPrice - newPrice > 1) {
                newPrice = prevPrice - 1;
            }

            newPrice = Math.max(newPrice, 0.01);
            stock.price = Math.round(newPrice * 100) / 100;
            stock.openPrice = prevPrice;
            stock.high = Math.max(stock.high, stock.price);
            stock.low = Math.min(stock.low, stock.price);
            stock.volume += Math.floor((Math.random() - 0.5) * 500000);
            stock.volume = Math.max(stock.volume, 100000);
            stock.weekChange = ((stock.price - prevPrice) / prevPrice) * 100;
            stock.allTimeHigh = Math.max(stock.allTimeHigh, stock.price);
            stock.allTimeLow = Math.min(stock.allTimeLow, stock.price);

            this.history[symbol].push(stock.price);
            if (this.history[symbol].length > 100) {
                this.history[symbol].shift();
            }
        }
    },

    boxMuller() {
        let u = 0, v = 0;
        while (u === 0) u = Math.random();
        while (v === 0) v = Math.random();
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    },

    buy(symbol, shares, cash) {
        const stock = this.data[symbol];
        if (!stock || shares <= 0) return null;
        const price = stock.price * shares;
        const fee = Math.max(price * 0.001, 1);
        const total = price + fee;
        if (total > cash) return null;
        return { price, fee, total };
    },

    sell(symbol, shares) {
        const stock = this.data[symbol];
        if (!stock || shares <= 0) return null;
        const price = stock.price * shares;
        const fee = Math.max(price * 0.001, 1);
        const net = price - fee;
        return { price, fee, net };
    },

    getChangePercent(symbol) {
        const stock = this.data[symbol];
        if (!stock) return 0;
        return stock.weekChange;
    }
};
