const CryptoMarket = {
    data: {},
    history: {},

    definitions: [
        { symbol: 'BTC', name: 'Bitcoin', basePrice: 62500, drift: 0.15, volatility: 0.65, marketCap: '1.23 Bio $', volume: '28 Mrd $', supply: '19.7 Mio', ath: '73.750 $', color: '#f7931a' },
        { symbol: 'ETH', name: 'Ethereum', basePrice: 3420, drift: 0.18, volatility: 0.72, marketCap: '411 Mrd $', volume: '14 Mrd $', supply: '120.2 Mio', ath: '4.878 $', color: '#627eea' },
        { symbol: 'SOL', name: 'Solana', basePrice: 148.50, drift: 0.25, volatility: 0.85, marketCap: '65 Mrd $', volume: '2.8 Mrd $', supply: '440 Mio', ath: '260 $', color: '#00ffa3' },
        { symbol: 'ADA', name: 'Cardano', basePrice: 0.58, drift: 0.12, volatility: 0.78, marketCap: '20.5 Mrd $', volume: '420 Mio $', supply: '35.5 Mrd', ath: '3,09 $', color: '#0033ad' },
        { symbol: 'XRP', name: 'Ripple', basePrice: 0.62, drift: 0.10, volatility: 0.70, marketCap: '34 Mrd $', volume: '1.1 Mrd $', supply: '54.8 Mrd', ath: '3,40 $', color: '#00aae4' },
        { symbol: 'DOT', name: 'Polkadot', basePrice: 7.85, drift: 0.14, volatility: 0.80, marketCap: '10.8 Mrd $', volume: '280 Mio $', supply: '1.4 Mrd', ath: '55 $', color: '#e6007a' }
    ],

    init() {
        for (const def of this.definitions) {
            if (this.data[def.symbol]) continue;
            this.data[def.symbol] = {
                ...def,
                price: def.basePrice * (0.85 + Math.random() * 0.30),
                weekChange: 0,
                high: def.basePrice * 1.05,
                low: def.basePrice * 0.95
            };
            if (!this.history[def.symbol]) {
                this.history[def.symbol] = [];
                for (let i = 0; i < 52; i++) {
                    this.history[def.symbol].push(
                        def.basePrice * (0.6 + Math.random() * 0.8)
                    );
                }
            }
        }
    },

    update() {
        for (const symbol in this.data) {
            const coin = this.data[symbol];
            const prevPrice = coin.price;

            const dt = 1 / 365;
            const randomNormal = StockMarket.boxMuller();
            let change = coin.drift * dt + coin.volatility * Math.sqrt(dt) * randomNormal;

            if (Math.random() < 0.03) {
                change += (Math.random() - 0.5) * 0.03;
            }

            if (Events.activeEffects) {
                for (const effect of Events.activeEffects) {
                    if (effect.type === 'crypto') {
                        if (effect.target === symbol || effect.target === 'all') {
                            change += effect.magnitude * dt;
                        }
                    }
                }
            }

            let newPrice = coin.price * (1 + change);
            newPrice = Math.max(newPrice, coin.basePrice * 0.05);
            coin.price = Math.round(newPrice * 100) / 100;
            coin.weekChange = ((coin.price - prevPrice) / prevPrice) * 100;
            coin.high = Math.max(coin.high, coin.price);
            coin.low = Math.min(coin.low, coin.price);

            this.history[symbol].push(coin.price);
            if (this.history[symbol].length > 100) {
                this.history[symbol].shift();
            }
        }
    },

    buy(symbol, amount, cash) {
        const coin = this.data[symbol];
        if (!coin || amount <= 0) return null;
        const price = coin.price * amount;
        const fee = Math.max(price * 0.005, 0.50);
        const total = price + fee;
        if (total > cash) return null;
        return { price, fee, total };
    },

    sell(symbol, amount) {
        const coin = this.data[symbol];
        if (!coin || amount <= 0) return null;
        const price = coin.price * amount;
        const fee = Math.max(price * 0.005, 0.50);
        const net = price - fee;
        return { price, fee, net };
    }
};
