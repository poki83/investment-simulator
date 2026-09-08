const Events = {
    activeEffects: [],
    eventPool: [],
    lastEventWeek: 0,

    stockEvents: [
        { title: 'SAP übertrifft Erwartungen', body: 'SAP meldet bettere Quartalszahlen als erwartet. Cloud-Geschäft wächst stark.', category: 'markets', targets: ['SAP'], type: 'stock', magnitude: 0.05 },
        { title: 'Siemens gewinnt Großauftrag', body: 'Siemens erhält Auftrag über 2,3 Milliarden Euro für Infrastrukturprojekt.', category: 'markets', targets: ['SIE'], type: 'stock', magnitude: 0.04 },
        { title: 'Tesla Autopilot Update', body: 'Tesla kündigt neues Vollautosystem an. Aktie reagiert positiv.', category: 'markets', targets: ['TSLA'], type: 'stock', magnitude: 0.06 },
        { title: 'NVIDIA profitiert von KI-Boom', body: 'NVIDIA-Chips weiter gefragt. Umsatzprognose wird angehoben.', category: 'markets', targets: ['NVDA'], type: 'stock', magnitude: 0.07 },
        { title: 'Deutsche Bank unter Druck', body: 'Regulierungsbehörden prüfen Geschäftspraktiken der Deutschen Bank.', category: 'markets', targets: ['DB'], type: 'stock', magnitude: -0.06 },
        { title: 'BMW Elektroauto-S strategisch', body: 'BMW kündigt neue E-Auto-Plattform an. Investoren zeigen sich begeistert.', category: 'markets', targets: ['BMW', 'VOW'], type: 'stock', magnitude: 0.03 },
        { title: 'Adidas Marken-Revival', body: 'Adidas meldet Rekordumsätze durch neue Lifestyle-Kollektion.', category: 'markets', targets: ['ADS'], type: 'stock', magnitude: 0.05 },
        { title: 'Apple Vision Pro Ausweitung', body: 'Apple erweitert Vision Pro auf weitere Märkte. Technologie-Sektor profitiert.', category: 'markets', targets: ['AAPL', 'MSFT', 'META'], type: 'stock', magnitude: 0.03 },
        { title: 'Allianz Versicherungsschaden', body: 'Allianz meldet höhere Schadensfälle durch Naturkatastrophen.', category: 'markets', targets: ['ALV'], type: 'stock', magnitude: -0.04 },
        { title: 'ASML Auftragsboom', body: 'ASML erhält Bestellungen für neueste Chipfertigungsanlagen.', category: 'markets', targets: ['ASML', 'NVDA'], type: 'stock', magnitude: 0.05 },
        { title: 'JPMorgan Zinsprognose', body: 'JPMorgan erwartet EZB-Zinssenkung. Finanzwerte reagiert gemischt.', category: 'markets', targets: ['JPM', 'DB'], type: 'stock', magnitude: -0.02 },
        { title: 'Volkswagen Restrukturierung', body: 'VW kündigt umfangreiche Kosteneinsparungen an.', category: 'markets', targets: ['VOW'], type: 'stock', magnitude: -0.03 },
        { title: 'Meta KI-Investitionen zahlen sich aus', body: 'Meta meldet steigende Werbeeinnahmen dank KI-verbesserter Algorithmen.', category: 'markets', targets: ['META'], type: 'stock', magnitude: 0.04 },
        { title: 'BASF Chemiepreise steigen', body: 'Globale Chemiepreise erholen sich. BASF profitiert.', category: 'markets', targets: ['BAS'], type: 'stock', magnitude: 0.03 },
        { title: 'Amazon AWS expandiert', body: 'Amazon erweitert Rechenzentren in Europa.', category: 'markets', targets: ['AMZN'], type: 'stock', magnitude: 0.04 },
    ],

    marketEvents: [
        { title: 'EZB senkt Leitzins', body: 'Die Europäische Zentralbank senkt den Leitzins um 0,25%. Aktienmarkt reagiert positiv.', category: 'economy', type: 'etf', target: 'all', magnitude: 0.02 },
        { title: 'EZB hebt Leitzins an', body: 'Die EZB erhöht den Leitzins um 0,25% zur Inflationsbekämpfung.', category: 'economy', type: 'etf', target: 'all', magnitude: -0.02 },
        { title: 'Inflation steigt über Erwartung', body: 'Die Inflation in der Eurozone liegt bei 3,2%. Märkte reagieren nervös.', category: 'economy', type: 'etf', target: 'all', magnitude: -0.015 },
        { title: 'BIP-Wachstum stabil', body: 'Das deutsche BIP wächst um 0,3% im Quartal. Konjunktur zeigt Stabilität.', category: 'economy', type: 'etf', target: 'DAX', magnitude: 0.01 },
        { title: 'Handelskonflikte eskalieren', body: 'Neue Zölle zwischen USA und China belasten den Welthandel.', category: 'economy', type: 'stock', target: 'all', magnitude: -0.02 },
        { title: 'Arbeitsmarkt stabil', body: 'Die Arbeitslosenquote bleibt bei 5,7%. Konsumkraft bleibt erhalten.', category: 'economy', type: 'etf', target: 'all', magnitude: 0.005 },
        { title: 'Energiepreise fallen', body: 'Gas- und Ölpreise gehen zurück. Energie- und Industriewerte profitieren.', category: 'economy', type: 'stock', target: 'Industrie', magnitude: 0.03 },
        { title: 'Technologie-Sektor führt Aufschwung', body: 'Wachstumsaktien aus dem Technologiesektor verzeichnen deutliche Zuwächse.', category: 'markets', type: 'etf', target: 'QQQ', magnitude: 0.03 },
    ],

    cryptoEvents: [
        { title: 'Bitcoin Halving Erwartung', body: 'Das nächste Bitcoin Halving rückt näher. Historisch steigen Kurse danach.', category: 'crypto', type: 'crypto', target: 'BTC', magnitude: 0.08 },
        { title: 'Ethereum Upgrade', body: 'Ethereum successfully upgrades network. Scalability improves.', category: 'crypto', type: 'crypto', target: 'ETH', magnitude: 0.06 },
        { title: 'Krypto-Regulierung', body: 'EU verabschiedet neue Krypto-Regulierung. Markt reagiert verhalten.', category: 'crypto', type: 'crypto', target: 'all', magnitude: -0.04 },
        { title: 'Solana NFT-Boom', body: 'Solana-Netzwerk verzeichnet Rekord-NFT-Transaktionen.', category: 'crypto', type: 'crypto', target: 'SOL', magnitude: 0.10 },
        { title: 'Börsen-Trust Issues', body: 'Größte Krypto-Börse meldet Sicherheitsvorfall. Markt unter Druck.', category: 'crypto', type: 'crypto', target: 'all', magnitude: -0.06 },
        { title: 'Adoption durch Institutionen', body: 'Große Banken erwägen Bitcoin-Custody-Angebote.', category: 'crypto', type: 'crypto', target: 'BTC', magnitude: 0.05 },
        { title: 'Mining-Schwierigkeit steigt', body: 'Bitcoin-Mining wird schwieriger. Langfristig bullish bewertet.', category: 'crypto', type: 'crypto', target: 'BTC', magnitude: 0.02 },
        { title: 'Smart Contract Exploit', body: 'DeFi-Protokoll auf Ethereum gehackt. Kurzfristige Verkaufsdruck.', category: 'crypto', type: 'crypto', target: 'ETH', magnitude: -0.04 },
    ],

    realEstateEvents: [
        { title: 'Bauzinsen steigen', body: 'Höhere Bauzinsen belasten den Immobilienmarkt. Preise unter Druck.', category: 'realestate', type: 'realestate', magnitude: -0.01 },
        { title: 'Wohnraummangel', body: 'Mietpreise in Großstädten steigen weiter. Nachfrage übersteigt Angebot.', category: 'realestate', type: 'realestate', magnitude: 0.015 },
        { title: 'Neubauförderung', body: 'Bund regt Wohnungsbau mit steuerlichen Anreizen an.', category: 'realestate', type: 'realestate', magnitude: 0.008 },
        { title: 'Energieeffizienz Vorschrift', body: 'Neue Energieeffizienzvorschriften erhöhen Renovierungskosten.', category: 'realestate', type: 'realestate', magnitude: -0.005 },
    ],

    init() {
        this.eventPool = [
            ...this.stockEvents,
            ...this.marketEvents,
            ...this.cryptoEvents,
            ...this.realEstateEvents
        ];
    },

    update() {
        this.activeEffects = this.activeEffects.filter(e => e.duration > 0);
        for (const effect of this.activeEffects) {
            effect.duration--;
        }

        if (GameState.week - this.lastEventWeek >= 4 + Math.floor(Math.random() * 4)) {
            if (Math.random() < 0.25) {
                this.triggerRandomEvent();
            }
        }
    },

    triggerRandomEvent() {
        if (this.eventPool.length === 0) return;

        const event = this.eventPool[Math.floor(Math.random() * this.eventPool.length)];

        GameState.addNews(event.title, event.body, event.category,
            event.targets ? event.targets : [event.target]);

        if (event.type && event.target) {
            this.activeEffects.push({
                type: event.type,
                target: event.target,
                magnitude: event.magnitude,
                duration: 3 + Math.floor(Math.random() * 5)
            });
        }

        this.lastEventWeek = GameState.week;
        return event;
    },

    triggerManualEvent(category) {
        const pool = this.eventPool.filter(e => e.category === category);
        if (pool.length === 0) return;
        const event = pool[Math.floor(Math.random() * pool.length)];
        GameState.addNews(event.title, event.body, event.category,
            event.targets ? event.targets : [event.target]);
        if (event.type && event.target) {
            this.activeEffects.push({
                type: event.type,
                target: event.target,
                magnitude: event.magnitude,
                duration: 3 + Math.floor(Math.random() * 5)
            });
        }
        return event;
    }
};
