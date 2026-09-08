const RealEstate = {
    properties: [],
    cities: {
        'Berlin': { factor: 1.0, rentFactor: 1.0, color: '#3f51b5' },
        'München': { factor: 1.45, rentFactor: 1.35, color: '#795548' },
        'Hamburg': { factor: 1.20, rentFactor: 1.15, color: '#607d8b' },
        'Frankfurt': { factor: 1.15, rentFactor: 1.10, color: '#ff9800' },
        'Köln': { factor: 1.10, rentFactor: 1.05, color: '#e91e63' },
        'Stuttgart': { factor: 1.12, rentFactor: 1.08, color: '#9c27b0' },
        'Düsseldorf': { factor: 1.08, rentFactor: 1.02, color: '#009688' },
        'Leipzig': { factor: 0.65, rentFactor: 0.70, color: '#8bc34a' },
        'Dresden': { factor: 0.60, rentFactor: 0.65, color: '#00bcd4' },
        'Hannover': { factor: 0.75, rentFactor: 0.78, color: '#ff5722' }
    },

    definitions: [
        { name: 'Wohnung Alt-Bau', type: 'wohnung', city: 'Berlin', area: 65, rooms: 2, year: 1905, basePrice: 285000, baseRent: 950, condition: 'Mittel', emoji: '🏢' },
        { name: 'Moderne 3Z-Wohnung', type: 'wohnung', city: 'Berlin', area: 82, rooms: 3, year: 2018, basePrice: 420000, baseRent: 1450, condition: 'Gut', emoji: '🏙️' },
        { name: 'Altbau Wohnung', type: 'wohnung', city: 'München', area: 78, rooms: 3, year: 1920, basePrice: 680000, baseRent: 1850, condition: 'Mittel', emoji: '🏠' },
        { name: 'Penthouse', type: 'wohnung', city: 'München', area: 140, rooms: 4, year: 2020, basePrice: 1250000, baseRent: 3200, condition: 'Neuwertig', emoji: '🌆' },
        { name: 'Reihenhaus', type: 'haus', city: 'Hamburg', area: 120, rooms: 4, year: 1995, basePrice: 520000, baseRent: 1600, condition: 'Gut', emoji: '🏡' },
        { name: 'Einfamilienhaus', type: 'haus', city: 'Hamburg', area: 165, rooms: 5, year: 2010, basePrice: 780000, baseRent: 2200, condition: 'Gut', emoji: '🏠' },
        { name: 'Loft Wohnung', type: 'wohnung', city: 'Frankfurt', area: 95, rooms: 2, year: 2015, basePrice: 480000, baseRent: 1650, condition: 'Gut', emoji: '🏙️' },
        { name: 'Büroflächen', type: 'gewerbe', city: 'Frankfurt', area: 200, rooms: 8, year: 2005, basePrice: 850000, baseRent: 3500, condition: 'Mittel', emoji: '🏢' },
        { name: 'Wohnung Südstadt', type: 'wohnung', city: 'Köln', area: 72, rooms: 2, year: 1988, basePrice: 320000, baseRent: 1100, condition: 'Mittel', emoji: '🏢' },
        { name: 'Doppelhaushälfte', type: 'haus', city: 'Köln', area: 145, rooms: 4, year: 2002, basePrice: 580000, baseRent: 1800, condition: 'Gut', emoji: '🏡' },
        { name: 'Junge Wohnung', type: 'wohnung', city: 'Stuttgart', area: 58, rooms: 2, year: 2019, basePrice: 340000, baseRent: 1050, condition: 'Neuwertig', emoji: '🏢' },
        { name: 'Haus mit Garten', type: 'haus', city: 'Stuttgart', area: 180, rooms: 5, year: 1990, basePrice: 720000, baseRent: 2100, condition: 'Mittel', emoji: '🏡' },
        { name: 'Junggesellenwohnung', type: 'wohnung', city: 'Düsseldorf', area: 48, rooms: 1, year: 2021, basePrice: 265000, baseRent: 850, condition: 'Neuwertig', emoji: '🏢' },
        { name: 'Studio Apartment', type: 'wohnung', city: 'Leipzig', area: 35, rooms: 1, year: 2017, basePrice: 125000, baseRent: 450, condition: 'Gut', emoji: '🏢' },
        { name: 'Familienhaus', type: 'haus', city: 'Leipzig', area: 155, rooms: 5, year: 2000, basePrice: 285000, baseRent: 900, condition: 'Gut', emoji: '🏡' },
        { name: 'Altbau Charme', type: 'wohnung', city: 'Dresden', area: 85, rooms: 3, year: 1910, basePrice: 195000, baseRent: 650, condition: 'Mittel', emoji: '🏠' },
        { name: 'Gewerbeobjekt', type: 'gewerbe', city: 'Dresden', area: 350, rooms: 12, year: 1998, basePrice: 450000, baseRent: 2200, condition: 'Mittel', emoji: '🏢' },
        { name: 'Stadthaus', type: 'haus', city: 'Hannover', area: 130, rooms: 4, year: 2008, basePrice: 380000, baseRent: 1250, condition: 'Gut', emoji: '🏡' },
        { name: 'Maisonette', type: 'wohnung', city: 'Hannover', area: 110, rooms: 3, year: 2014, basePrice: 310000, baseRent: 1000, condition: 'Gut', emoji: '🏠' },
        { name: 'Luxus Penthouse', type: 'wohnung', city: 'Frankfurt', area: 200, rooms: 5, year: 2022, basePrice: 1800000, baseRent: 5500, condition: 'Neuwertig', emoji: '🌆' }
    ],

    init() {
        if (this.properties.length > 0) return;
        for (let i = 0; i < this.definitions.length; i++) {
            const def = this.definitions[i];
            const cityInfo = this.cities[def.city];
            const price = Math.round(def.basePrice * cityInfo.factor / 1000) * 1000;
            const rent = Math.round(def.baseRent * cityInfo.rentFactor / 10) * 10;
            const grundsteuer = Math.round(price * 0.0035);

            this.properties.push({
                id: i,
                ...def,
                currentPrice: price,
                currentValue: price,
                monthlyRent: rent,
                grundsteuer: grundsteuer,
                owned: false,
                renovated: false,
                renovationLevel: 0,
                purchaseWeek: 0,
                grunderwerbsteuer: 0,
                appreciation: 0
            });
        }
        this.restoreState();
    },

    syncState() {
        const ownedProps = [];
        for (const prop of this.properties) {
            if (prop.owned) {
                ownedProps.push({
                    id: prop.id,
                    currentValue: prop.currentValue,
                    renovationLevel: prop.renovationLevel,
                    renovated: prop.renovated,
                    purchaseWeek: prop.purchaseWeek,
                    grunderwerbsteuer: prop.grunderwerbsteuer
                });
            }
        }
        GameState.realEstateState = ownedProps;
    },

    restoreState() {
        if (!Array.isArray(GameState.realEstateState) || GameState.realEstateState.length === 0) return;
        for (const saved of GameState.realEstateState) {
            const prop = this.properties[saved.id];
            if (!prop) continue;
            prop.owned = true;
            prop.currentValue = saved.currentValue;
            prop.renovationLevel = saved.renovationLevel || 0;
            prop.renovated = saved.renovated || false;
            prop.purchaseWeek = saved.purchaseWeek || 0;
            prop.grunderwerbsteuer = saved.grunderwerbsteuer || 0;
        }
    },

    getGrunderwerbsteuer(price) {
        const rates = {
            'Bayern': 0.035, 'Hamburg': 0.055, 'Hessen': 0.06,
            'Berlin': 0.06, 'NRW': 0.065, 'BaWü': 0.05,
            'Niedersachsen': 0.05, 'Sachsen': 0.055,
            'Thüringen': 0.05, 'Brandenburg': 0.065
        };
        return Math.round(price * (rates[GameState.bundesland] || 0.065));
    },

    buyProperty(id) {
        const prop = this.properties[id];
        if (!prop || prop.owned) return null;

        const purchaseTax = this.getGrunderwerbsteuer(prop.currentPrice);
        const totalCost = prop.currentPrice + purchaseTax;

        if (totalCost > GameState.cash) return null;

        prop.owned = true;
        prop.purchaseWeek = GameState.week;
        prop.grunderwerbsteuer = purchaseTax;

        this.syncState();

        return { total: totalCost, purchaseTax };
    },

    sellProperty(id) {
        const prop = this.properties[id];
        if (!prop || !prop.owned) return null;

        const sellPrice = prop.currentValue;
        const capitalGain = sellPrice - prop.currentPrice;

        prop.owned = false;
        prop.renovated = false;
        prop.renovationLevel = 0;

        this.syncState();

        return { price: sellPrice, capitalGain };
    },

    renovate(id, level) {
        const prop = this.properties[id];
        if (!prop || !prop.owned || prop.renovationLevel >= level) return null;

        const costs = {
            1: Math.round(prop.currentValue * 0.08),
            2: Math.round(prop.currentValue * 0.15),
            3: Math.round(prop.currentValue * 0.25)
        };

        const cost = costs[level];
        if (cost > GameState.cash) return null;

        prop.renovationLevel = level;
        prop.renovated = true;
        prop.currentValue = Math.round(prop.currentValue * (1 + level * 0.06));

        this.syncState();

        return { cost, newValue: prop.currentValue };
    },

    update() {
        for (const prop of this.properties) {
            const weeklyGrowth = 0.0002 + (Math.random() - 0.5) * 0.001;
            prop.currentValue = Math.round(prop.currentValue * (1 + weeklyGrowth));
            prop.currentValue = Math.max(prop.currentValue, prop.basePrice * 0.5);
        }
    },

    getMonthlyRentIncome(id) {
        const prop = this.properties[id];
        if (!prop || !prop.owned) return 0;
        return prop.renovated ? Math.round(prop.monthlyRent * 1.3) : prop.monthlyRent;
    }
};
