const Luxury = {
    SHOP_RESAEL_FACTOR: 0.6,

    categories: [
        {
            id: 'cars',
            name: 'Auto-Haus',
            shopDesc: 'Autos & Sportwagen - vom Alltag bis zur Ikone',
            icon: '🚗',
            items: [
                { id: 'vw_golf', name: 'VW Golf 8', brand: 'Volkswagen', price: 35000, monthlyCost: 350, value: 35000, depreciation: 0.003, emoji: '🚗', speed: '180 km/h', ps: '150 PS' },
                { id: 'bmw_3', name: 'BMW 3er', brand: 'BMW', price: 52000, monthlyCost: 450, value: 52000, depreciation: 0.004, emoji: '🚙', speed: '250 km/h', ps: '258 PS' },
                { id: 'merc_e', name: 'Mercedes E-Klasse', brand: 'Mercedes', price: 62000, monthlyCost: 520, value: 62000, depreciation: 0.004, emoji: '🚘', speed: '250 km/h', ps: '330 PS' },
                { id: 'audi_a6', name: 'Audi A6', brand: 'Audi', price: 58000, monthlyCost: 480, value: 58000, depreciation: 0.004, emoji: '🚗', speed: '250 km/h', ps: '340 PS' },
                { id: 'porsche_911', name: 'Porsche 911', brand: 'Porsche', price: 145000, monthlyCost: 800, value: 145000, depreciation: 0.002, emoji: '🏎️', speed: '308 km/h', ps: '480 PS' },
                { id: 'tesla_m3', name: 'Tesla Model 3', brand: 'Tesla', price: 45000, monthlyCost: 200, value: 45000, depreciation: 0.005, emoji: '⚡', speed: '225 km/h', ps: '498 PS' },
                { id: 'tesla_ms', name: 'Tesla Model S', brand: 'Tesla', price: 95000, monthlyCost: 300, value: 95000, depreciation: 0.005, emoji: '⚡', speed: '262 km/h', ps: '680 PS' },
                { id: 'ferrari', name: 'Ferrari 488', brand: 'Ferrari', price: 280000, monthlyCost: 1500, value: 280000, depreciation: 0.001, emoji: '🏎️', speed: '330 km/h', ps: '670 PS' },
                { id: 'lamborghini', name: 'Lamborghini Huracan', brand: 'Lamborghini', price: 220000, monthlyCost: 1200, value: 220000, depreciation: 0.002, emoji: '🏎️', speed: '325 km/h', ps: '640 PS' },
                { id: 'rolls', name: 'Rolls-Royce Ghost', brand: 'Rolls-Royce', price: 350000, monthlyCost: 2000, value: 350000, depreciation: 0.001, emoji: '🚗', speed: '250 km/h', ps: '571 PS' }
            ]
        },
        {
            id: 'boats',
            name: 'Yacht-Club',
            shopDesc: 'Yachten & Boote für das exklusive Leben am Wasser',
            icon: '🛥️',
            items: [
                { id: 'boot_klein', name: 'Motorboot 8m', brand: 'Bayliner', price: 45000, monthlyCost: 500, value: 45000, depreciation: 0.005, emoji: '🚤', speed: '45 kn', ps: '300 PS' },
                { id: 'yacht_mid', name: 'Yacht 15m', brand: 'Sunseeker', price: 450000, monthlyCost: 3000, value: 450000, depreciation: 0.003, emoji: '🛥️', speed: '35 kn', ps: '1200 PS' },
                { id: 'yacht_large', name: 'Superyacht 30m', brand: 'Lürssen', price: 3500000, monthlyCost: 15000, value: 3500000, depreciation: 0.002, emoji: '🛳️', speed: '22 kn', ps: '3000 PS' }
            ]
        },
        {
            id: 'planes',
            name: 'Jet-Port',
            shopDesc: 'Flugzeuge & Privatjets für maximale Freiheit in der Luft',
            icon: '✈️',
            items: [
                { id: 'cessna', name: 'Cessna 172', brand: 'Cessna', price: 80000, monthlyCost: 1500, value: 80000, depreciation: 0.004, emoji: '🛩️', speed: '226 km/h', ps: '180 PS' },
                { id: 'piper', name: 'Piper M600', brand: 'Piper', price: 1200000, monthlyCost: 8000, value: 1200000, depreciation: 0.003, emoji: '✈️', speed: '530 km/h', ps: '600 PS' },
                { id: 'citation', name: 'Cessna Citation X+', brand: 'Cessna', price: 5000000, monthlyCost: 25000, value: 5000000, depreciation: 0.002, emoji: '✈️', speed: '972 km/h', ps: '7520 PS' },
                { id: 'gulfstream', name: 'Gulfstream G700', brand: 'Gulfstream', price: 55000000, monthlyCost: 80000, value: 55000000, depreciation: 0.001, emoji: '✈️', speed: '982 km/h', ps: '13850 PS' }
            ]
        },
        {
            id: 'watches',
            name: 'Uhren-Boutique',
            shopDesc: 'Premium-Uhren, die an Wert gewinnen können',
            icon: '⌚',
            items: [
                { id: 'rolex_sub', name: 'Rolex Submariner', brand: 'Rolex', price: 12000, monthlyCost: 50, value: 12000, depreciation: -0.001, emoji: '⌚' },
                { id: 'rolex_daytona', name: 'Rolex Daytona', brand: 'Rolex', price: 28000, monthlyCost: 50, value: 28000, depreciation: -0.002, emoji: '⌚' },
                { id: 'ap_royal', name: 'AP Royal Oak', brand: 'Audemars Piguet', price: 45000, monthlyCost: 80, value: 45000, depreciation: -0.001, emoji: '⌚' },
                { id: 'pp_nautilus', name: 'PP Nautilus', brand: 'Patek Philippe', price: 120000, monthlyCost: 100, value: 120000, depreciation: -0.003, emoji: '⌚' }
            ]
        }
    ],

    owned: [],

    init() {
        if (GameState.portfolio.luxury) {
            this.owned = GameState.portfolio.luxury;
        } else {
            GameState.portfolio.luxury = [];
            this.owned = GameState.portfolio.luxury;
        }
    },

    buyItem(itemId) {
        const item = this.findItem(itemId);
        if (!item) return null;

        const alreadyOwned = this.owned.find(i => i.itemId === itemId);
        if (alreadyOwned) return null;

        if (item.price > GameState.cash) return null;

        GameState.removeCash(item.price);

        const purchase = {
            id: Date.now(),
            itemId: itemId,
            name: item.name,
            brand: item.brand,
            category: this.categories.find(c => c.items.some(i => i.id === itemId))?.id,
            purchasePrice: item.price,
            currentValue: item.price,
            monthlyCost: item.monthlyCost,
            purchaseWeek: GameState.week
        };

        this.owned.push(purchase);
        GameState.addTransaction('buy', 'luxury', item.name, itemId, 1, item.price, 0, item.price);

        return purchase;
    },

    sellItem(id) {
        const idx = this.owned.findIndex(i => i.id === id);
        if (idx === -1) return null;

        const owned = this.owned[idx];
        const sellPrice = this.getResaleValue(owned);

        GameState.addCash(sellPrice);
        this.owned.splice(idx, 1);
        GameState.addTransaction('sell', 'luxury', owned.name, owned.itemId, 1, sellPrice, 0, sellPrice);

        return { price: sellPrice, name: owned.name };
    },

    getResaleValue(owned) {
        return Math.round(owned.currentValue * this.SHOP_RESAEL_FACTOR);
    },

    getCategory(id) {
        return this.categories.find(c => c.id === id);
    },

    findItem(itemId) {
        for (const cat of this.categories) {
            const item = cat.items.find(i => i.id === itemId);
            if (item) return item;
        }
        return null;
    },

    update() {
        for (const owned of this.owned) {
            const item = this.findItem(owned.itemId);
            if (item) {
                owned.currentValue = Math.round(owned.currentValue * (1 - item.depreciation / 30));
                owned.currentValue = Math.max(owned.currentValue, item.price * 0.1);
            }

            GameState.removeCash(owned.monthlyCost / 30);
        }
    },

    getMonthlyCosts() {
        let total = 0;
        for (const owned of this.owned) {
            total += owned.monthlyCost;
        }
        return total;
    },

    getTotalValue() {
        let total = 0;
        for (const owned of this.owned) {
            total += owned.currentValue;
        }
        return total;
    }
};
