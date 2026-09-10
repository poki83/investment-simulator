const Taxes = {
    /* Sparerpauschbetrag: 1.000 € pro Jahr steuerfreie Kapitalerträge.
       Verluste werden automatisch mit Gewinnen verrechnet (Verlustverrechnung). */
    PAUSCHBETRAG: 1000,

    round2(n) {
        return Math.round(n * 100) / 100;
    },

    ensureState() {
        const t = GameState.taxes;
        if (typeof t.capitalNet !== 'number') t.capitalNet = 0;
        if (typeof t.capitalTaxPaid !== 'number') t.capitalTaxPaid = 0;
        if (typeof t.rentNet !== 'number') t.rentNet = 0;
        if (typeof t.rentTaxPaid !== 'number') t.rentTaxPaid = 0;
        if (typeof t.taxYear !== 'number') t.taxYear = GameState.year;
    },

    /* Jahreswechsel: Freibeträge & Verlustverrechnungstopfe werden erneuert. */
    rollTaxYear() {
        this.ensureState();
        const t = GameState.taxes;
        if (t.taxYear !== GameState.year) {
            t.capitalNet = 0;
            t.capitalTaxPaid = 0;
            t.rentNet = 0;
            t.rentTaxPaid = 0;
            t.oracleFreibetrag = 0;
            t.taxYear = GameState.year;
        }
    },

    calculateCapitalGainsTax(profit) {
        if (profit <= 0) return { capitalTax: 0, soli: 0, total: 0 };
        const capitalTax = Math.round(profit * 0.25 * 100) / 100;
        const soli = Math.round(capitalTax * 0.055 * 100) / 100;
        return { capitalTax, soli, total: Math.round((capitalTax + soli) * 100) / 100 };
    },

    /* Jahresziel-Steuer auf den Netto-Kapitalertrag (nach Sparerpauschbetrag). */
    capitalTarget(net) {
        const pausch = this.PAUSCHBETRAG + (GameState.taxes.oracleFreibetrag || 0);
        const taxable = Math.max(0, net - pausch);
        const t = this.calculateCapitalGainsTax(taxable);
        return { target: t.total, taxable: this.round2(taxable) };
    },

    /* Simulation für UI-Vorschau OHNE Zustandsänderung. */
    previewCapitalGain(profit) {
        this.rollTaxYear();
        const t = GameState.taxes;
        const net = this.round2(t.capitalNet + profit);
        const r = this.capitalTarget(net);
        return { delta: this.round2(r.target - t.capitalTaxPaid), net, taxable: r.taxable };
    },

    /* Rechnung bei JEDEM realisierten Kapitalgewinn/-verlust.
       Delta>0 = einbehalten, Delta<0 = Gutschrift (Verlustverrechnung/Freibetrag). */
    applyCapitalGain(profit) {
        this.rollTaxYear();
        const t = GameState.taxes;
        t.capitalNet = this.round2(t.capitalNet + profit);
        const r = this.capitalTarget(t.capitalNet);
        const delta = this.round2(r.target - t.capitalTaxPaid);
        if (delta < 0 && Math.abs(delta) < 0.005) delta = 0;
        if (delta !== 0) {
            const capTax = this.round2(delta / 1.055);
            const soliTax = this.round2(delta - capTax);
            t.capitalTax += capTax;
            t.soli += soliTax;
            t.capitalTaxPaid = r.target;
        }
        return { delta, net: t.capitalNet, taxable: r.taxable };
    },

    incomeTarget(net) {
        return this.calculateRentalIncomeTax(net);
    },

    /* Mieteinnahmen: progressiv nach kumulativem Jahres-Netto,
       mit Delta-Methode (wie ein echtes Finanzamt). */
    applyRentIncome(monthlyRent) {
        if (monthlyRent <= 0) return 0;
        this.rollTaxYear();
        const t = GameState.taxes;
        t.rentNet = this.round2(t.rentNet + monthlyRent);
        const target = this.round2(this.incomeTarget(t.rentNet));
        let delta = this.round2(target - t.rentTaxPaid);
        if (delta < 0 && Math.abs(delta) < 0.005) delta = 0;
        t.rentTaxPaid = target;
        if (delta !== 0) {
            t.rentTax = Math.max(0, this.round2(t.rentTax + delta));
        }
        return delta;
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
        return this.applyRentIncome(monthlyRent);
    },

    processWeeklyTaxes() {
        this.rollTaxYear();
        const grundsteuer = this.calculateGrundsteuer();
        const weeklyGrundsteuer = grundsteuer / 52;
        if (weeklyGrundsteuer > 0) {
            this.addTaxDebt(weeklyGrundsteuer);
            GameState.taxes.grundsteuer += weeklyGrundsteuer;
        }

        this.addLateFee();
    },

    getSummary() {
        this.rollTaxYear();
        const t = GameState.taxes;
        const pausch = this.PAUSCHBETRAG + (t.oracleFreibetrag || 0);
        const freibetragUsed = Math.min(pausch, Math.max(0, this.round2(t.capitalNet)));
        return {
            unpaid: Math.round(t.unpaid * 100) / 100,
            lateFees: Math.round(t.lateFees * 100) / 100,
            total: Math.round((t.unpaid + t.lateFees) * 100) / 100,
            capitalTax: Math.round(t.capitalTax * 100) / 100,
            soli: Math.round(t.soli * 100) / 100,
            grundsteuer: Math.round(t.grundsteuer * 100) / 100,
            rentalTax: Math.round(t.rentTax * 100) / 100,
            nextDue: t.dueWeek,
            weeksOverdue: Math.max(0, GameState.week - t.dueWeek),
            taxYear: t.taxYear,
            pauschbetrag: pausch,
            freibetragUsed: Math.round(freibetragUsed * 100) / 100,
            capitalNet: Math.round(t.capitalNet * 100) / 100,
            rentNet: Math.round(t.rentNet * 100) / 100
        };
    }
};