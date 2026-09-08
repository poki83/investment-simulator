const Taxes = {
    calculateCapitalGainsTax(profit) {
        if (profit <= 0) return 0;
        const capitalTax = Math.round(profit * 0.25 * 100) / 100;
        const soli = Math.round(capitalTax * 0.055 * 100) / 100;
        return { capitalTax, soli, total: Math.round((capitalTax + soli) * 100) / 100 };
    },

    calculateRentalIncomeTax(annualRent) {
        if (annualRent <= 0) return 0;
        const taxBrackets = [
            { limit: 11604, rate: 0 },
            { limit: 17005, rate: 0.14 },
            { limit: 66760, rate: 0.24 },
            { limit: 277825, rate: 0.42 },
            { limit: Infinity, rate: 0.45 }
        ];

        const taxableIncome = annualRent;
        let tax = 0;
        let prevLimit = 11604;

        for (const bracket of taxBrackets) {
            if (taxableIncome > prevLimit) {
                const taxable = Math.min(taxableIncome, bracket.limit) - prevLimit;
                tax += taxable * bracket.rate;
            }
            prevLimit = bracket.limit;
        }
        return Math.round(tax * 100) / 100;
    },

    calculateGrundsteuer() {
        let total = 0;
        for (const prop of RealEstate.properties) {
            if (prop.owned) {
                total += prop.grundsteuer;
            }
        }
        return total;
    },

    calculateGrunderwerbsteuer(purchasePrice) {
        return RealEstate.getGrunderwerbsteuer(purchasePrice);
    },

    addTaxDebt(amount) {
        GameState.taxes.unpaid += Math.round(amount * 100) / 100;
    },

    addLateFee() {
        if (GameState.taxes.unpaid > 0 && GameState.week >= GameState.taxes.dueWeek) {
            const weeksOverdue = GameState.week - GameState.taxes.dueWeek;
            const monthsOverdue = Math.floor(weeksOverdue / 4);
            if (monthsOverdue > 0) {
                const feeRate = Math.min(monthsOverdue * 0.01, 0.10);
                const fee = Math.max(GameState.taxes.unpaid * feeRate, 25);
                GameState.taxes.lateFees += Math.round(fee * 100) / 100;
            }
        }
    },

    payTaxes(amount) {
        const totalOwed = GameState.taxes.unpaid + GameState.taxes.lateFees;
        const payment = Math.min(amount, totalOwed, GameState.cash);

        if (payment <= 0) return 0;

        GameState.cash -= payment;

        if (GameState.taxes.lateFees > 0) {
            const lateFeePayment = Math.min(payment, GameState.taxes.lateFees);
            GameState.taxes.lateFees -= lateFeePayment;
            const remaining = payment - lateFeePayment;
            GameState.taxes.unpaid -= remaining;
        } else {
            GameState.taxes.unpaid -= payment;
        }

        GameState.taxes.unpaid = Math.max(0, Math.round(GameState.taxes.unpaid * 100) / 100);
        GameState.taxes.lateFees = Math.max(0, Math.round(GameState.taxes.lateFees * 100) / 100);

        GameState.taxes.history.push({
            week: GameState.week,
            amount: payment,
            date: GameState.getDateString()
        });

        GameState.taxes.lastPaymentWeek = GameState.week;
        GameState.taxes.dueWeek = GameState.week + 13;

        return payment;
    },

    withholdRent(monthlyRent) {
        if (monthlyRent <= 0) return 0;
        const annualRent = monthlyRent * 12;
        const yearTax = this.calculateRentalIncomeTax(annualRent);
        const monthTax = Math.round(yearTax / 12 * 100) / 100;
        if (monthTax > 0) {
            GameState.taxes.rentalTax += monthTax;
        }
        return monthTax;
    },

    processWeeklyTaxes() {
        const grundsteuer = this.calculateGrundsteuer();
        const weeklyGrundsteuer = grundsteuer / 52;
        if (weeklyGrundsteuer > 0) {
            this.addTaxDebt(weeklyGrundsteuer);
            GameState.taxes.grundsteuer += weeklyGrundsteuer;
        }

        this.addLateFee();
    },

    getSummary() {
        return {
            unpaid: Math.round(GameState.taxes.unpaid * 100) / 100,
            lateFees: Math.round(GameState.taxes.lateFees * 100) / 100,
            total: Math.round((GameState.taxes.unpaid + GameState.taxes.lateFees) * 100) / 100,
            capitalTax: Math.round(GameState.taxes.capitalTax * 100) / 100,
            soli: Math.round(GameState.taxes.soli * 100) / 100,
            grundsteuer: Math.round(GameState.taxes.grundsteuer * 100) / 100,
            rentalTax: Math.round(GameState.taxes.rentalTax * 100) / 100,
            nextDue: GameState.taxes.dueWeek,
            weeksOverdue: Math.max(0, GameState.week - GameState.taxes.dueWeek)
        };
    }
};
