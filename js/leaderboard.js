const Leaderboard = {
    npcs: [
        { name: 'Klaus Müller', netWorth: 100000000000, avatar: '👨‍💼', bg: '#1a237e' },
        { name: 'Sandra Schneider', netWorth: 80000000000, avatar: '👩‍💼', bg: '#880e4f' },
        { name: 'Thomas Fischer', netWorth: 62000000000, avatar: '👨‍💻', bg: '#006064' },
        { name: 'Anna Weber', netWorth: 45000000000, avatar: '👩‍🔬', bg: '#4e342e' },
        { name: 'Michael Becker', netWorth: 30000000000, avatar: '👨‍🏭', bg: '#37474f' },
        { name: 'Julia Hoffmann', netWorth: 18000000000, avatar: '👩‍🎓', bg: '#4a148c' },
        { name: 'Stefan Wagner', netWorth: 12000000000, avatar: '👨‍⚕️', bg: '#1b5e20' },
        { name: 'Laura Braun', netWorth: 8500000000, avatar: '👩‍🏫', bg: '#bf360c' },
        { name: 'Markus Zimmermann', netWorth: 5000000000, avatar: '👨‍🍳', bg: '#00695c' },
        { name: 'Sabine Koch', netWorth: 2800000000, avatar: '👩‍✈️', bg: '#311b92' },
        { name: 'Andreas Wolf', netWorth: 1500000000, avatar: '👨‍🚒', bg: '#b71c1c' },
        { name: 'Claudia Richter', netWorth: 850000000, avatar: '👩‍🔧', bg: '#01579b' },
        { name: 'Peter Klein', netWorth: 420000000, avatar: '👨‍🌾', bg: '#33691e' },
        { name: 'Monika Schwarz', netWorth: 180000000, avatar: '👩‍🎤', bg: '#827717' },
        { name: 'Frank Neumann', netWorth: 95000000, avatar: '👨‍🎨', bg: '#e65100' }
    ],

    getPlayerEntry() {
        const total = GameState.getPortfolioValue() + GameState.cash;
        return {
            name: 'DU',
            netWorth: total,
            avatar: '🧑',
            bg: '#d50000',
            isPlayer: true
        };
    },

    getRanking() {
        const player = this.getPlayerEntry();
        const all = [...this.npcs, player];
        all.sort((a, b) => b.netWorth - a.netWorth);
        return all.map((entry, i) => ({ ...entry, rank: i + 1 }));
    },

    formatNetWorth(value) {
        if (value >= 1000000000) return (value / 1000000000).toFixed(2) + ' Mrd €';
        if (value >= 1000000) return (value / 1000000).toFixed(2) + ' Mio €';
        if (value >= 1000) return (value / 1000).toFixed(1) + 'k €';
        return value.toFixed(0) + ' €';
    },

    init() {
    },

    updateNpcs() {
        // NPCs machen kein Plus: ihr Vermögen bleibt stabil (max ~100 Mrd.).
        // Der Spieler kann sie überholen.
    }
};
