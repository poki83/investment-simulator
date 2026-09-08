const Companies = {
    types: [
        {
            id: 'bank',
            name: 'Bank',
            icon: '🏦',
            description: 'Gründe eine eigene Bank. Hohe Investition, aber regelmäßige Einnahmen durch Kreditvergabe und Gebühren.',
            baseCost: 500000,
            monthlyRevenue: 12000,
            monthlyCosts: 5000,
            employees: 25,
            growthRate: 0.003,
            color: '#1a237e',
            riskLevel: 'Mittel',
            requiredCapital: 200000
        },
        {
            id: 'fashion',
            name: 'Bekleidungsmarke',
            icon: '👗',
            description: 'Starte eine eigene Bekleidungslinie. Trend-basierte Einnahmen mit moderatem Startkapital.',
            baseCost: 150000,
            monthlyRevenue: 8000,
            monthlyCosts: 3500,
            employees: 15,
            growthRate: 0.005,
            color: '#880e4f',
            riskLevel: 'Mittel-Hoch',
            requiredCapital: 50000
        },
        {
            id: 'tech',
            name: 'Tech-Startup',
            icon: '💻',
            description: 'Erstarte ein Technologie-Unternehmen. Hohe Volatilität, aber potentiell sehr profitabel.',
            baseCost: 200000,
            monthlyRevenue: 6000,
            monthlyCosts: 4000,
            employees: 10,
            growthRate: 0.008,
            color: '#006064',
            riskLevel: 'Hoch',
            requiredCapital: 100000
        },
        {
            id: 'restaurant',
            name: 'Restaurantkette',
            icon: '🍽️',
            description: 'Eröffne eine Restaurantkette. Stabile Einnahmen durch Lebensmittelbedarf.',
            baseCost: 300000,
            monthlyRevenue: 15000,
            monthlyCosts: 9000,
            employees: 40,
            growthRate: 0.002,
            color: '#bf360c',
            riskLevel: 'Niedrig-Mittel',
            requiredCapital: 100000
        },
        {
            id: 'realestate_co',
            name: 'Immobilienfirma',
            icon: '🏗️',
            description: 'Gründe eine Baufirma. Profitiert vom Immobilienboom.',
            baseCost: 400000,
            monthlyRevenue: 18000,
            monthlyCosts: 10000,
            employees: 35,
            growthRate: 0.003,
            color: '#4e342e',
            riskLevel: 'Mittel',
            requiredCapital: 150000
        },
        {
            id: 'pharma',
            name: 'Pharma-Unternehmen',
            icon: '💊',
            description: 'Investiere in Forschung und Entwicklung. Lange Laufzeiten, aber hohe Gewinnmargen.',
            baseCost: 600000,
            monthlyRevenue: 10000,
            monthlyCosts: 7000,
            employees: 50,
            growthRate: 0.006,
            color: '#1b5e20',
            riskLevel: 'Sehr Hoch',
            requiredCapital: 250000
        },
        {
            id: 'logistics',
            name: 'Logistikunternehmen',
            icon: '🚛',
            description: 'Aufbau eines Logistiknetzwerks. Stabile Einnahmen durch Warentransport.',
            baseCost: 350000,
            monthlyRevenue: 14000,
            monthlyCosts: 8000,
            employees: 30,
            growthRate: 0.003,
            color: '#37474f',
            riskLevel: 'Niedrig',
            requiredCapital: 120000
        },
        {
            id: 'media',
            name: 'Medienunternehmen',
            icon: '🎬',
            description: 'Starte eine Produktionsfirma. Content ist King - aber teuer.',
            baseCost: 250000,
            monthlyRevenue: 7000,
            monthlyCosts: 4500,
            employees: 20,
            growthRate: 0.004,
            color: '#4a148c',
            riskLevel: 'Hoch',
            requiredCapital: 80000
        }
    ],

    owned: [],

    init() {
        if (GameState.portfolio.companies) {
            this.owned = GameState.portfolio.companies;
        } else {
            GameState.portfolio.companies = [];
            this.owned = GameState.portfolio.companies;
        }
        for (const c of this.owned) {
            if (!c.ups) c.ups = { growth: 0, staff: 0, quality: 0, tech: 0 };
            c.level = 1 + c.ups.growth + c.ups.staff + c.ups.quality + c.ups.tech;
        }
    },

    buyCompany(typeId) {
        const type = this.types.find(t => t.id === typeId);
        if (!type) return null;

        const exists = this.owned.find(c => c.typeId === typeId);
        if (exists) return null;

        if (type.baseCost > GameState.cash) return null;

        GameState.removeCash(type.baseCost);

        const company = {
            id: Date.now(),
            typeId: typeId,
            name: type.name,
            value: type.baseCost,
            revenue: type.monthlyRevenue,
            costs: type.monthlyCosts,
            employees: type.employees,
            satisfaction: 80,
            founded: GameState.week,
            totalProfit: 0,
            level: 1,
            ups: { growth: 0, staff: 0, quality: 0, tech: 0 }
        };

        this.owned.push(company);
        GameState.addTransaction('buy', 'company', type.name, typeId, 1, type.baseCost, 0, type.baseCost);

        return company;
    },

    sellCompany(id) {
        const idx = this.owned.findIndex(c => c.id === id);
        if (idx === -1) return null;

        const company = this.owned[idx];
        const type = this.types.find(t => t.id === company.typeId);
        const sellPrice = Math.round(company.value * 0.8);

        GameState.addCash(sellPrice);
        this.owned.splice(idx, 1);
        GameState.addTransaction('sell', 'company', company.name, company.typeId, 1, sellPrice, 0, sellPrice);

        return { price: sellPrice, name: company.name };
    },

    upgradeCompany(id, investment, kind) {
        const company = this.owned.find(c => c.id === id);
        if (!company || investment <= 0 || investment > GameState.cash) return null;

        GameState.removeCash(investment);

        company.value += investment;
        if (!company.ups) company.ups = { growth: 0, staff: 0, quality: 0, tech: 0 };

        switch (kind) {
            case 'growth':
                company.ups.growth++;
                company.revenue = Math.round(company.revenue * 1.20);
                company.satisfaction = Math.min(100, company.satisfaction - 2);
                break;
            case 'staff':
                company.ups.staff++;
                company.employees += Math.max(1, Math.floor(investment / 3000));
                company.revenue = Math.round(company.revenue * 1.10);
                company.costs = Math.round(company.costs * 1.05);
                company.satisfaction = Math.min(100, company.satisfaction + 3);
                break;
            case 'quality':
                company.ups.quality++;
                company.costs = Math.round(company.costs * 0.92);
                company.revenue = Math.round(company.revenue * 1.03);
                company.satisfaction = Math.min(100, company.satisfaction + 10);
                break;
            case 'tech':
                company.ups.tech++;
                company.costs = Math.round(company.costs * 0.85);
                company.revenue = Math.round(company.revenue * 1.08);
                company.satisfaction = Math.min(100, company.satisfaction + 2);
                const baseEmployees = this.types.find(t => t.id === company.typeId)?.employees || 1;
                company.employees = Math.max(baseEmployees, Math.round(company.employees * 0.95));
                break;
            default:
                return null;
        }

        company.level = 1 + company.ups.growth + company.ups.staff + company.ups.quality + company.ups.tech;
        return company;
    },

    update() {
        for (const company of this.owned) {
            const type = this.types.find(t => t.id === company.typeId);

            const sat = company.satisfaction / 100;

            const revenueGrowth = 1 + (Math.random() - 0.45) * 0.02 + (sat - 0.5) * 0.02;
            company.revenue = Math.round(company.revenue * revenueGrowth);

            const costGrowth = 1 + (Math.random() - 0.4) * 0.01 - (sat - 0.5) * 0.01;
            company.costs = Math.round(company.costs * costGrowth);

            const weeklyProfit = (company.revenue - company.costs) / 4;
            GameState.addCash(weeklyProfit);
            company.totalProfit += weeklyProfit;
            company.value = Math.round(company.value * (1 + company.growthRate * (Math.random() * 0.5 + 0.75)));

            company.satisfaction += (Math.random() - 0.52) * 2;
            company.satisfaction = Math.max(20, Math.min(100, company.satisfaction));
        }
    },

    getMonthlyIncome() {
        let total = 0;
        for (const company of this.owned) {
            total += company.revenue - company.costs;
        }
        return total;
    },

    getTotalValue() {
        let total = 0;
        for (const company of this.owned) {
            total += company.value;
        }
        return total;
    }
};
