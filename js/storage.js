const Storage = {
    KEY: 'investsim_save',

    save(gameState) {
        try {
            const data = JSON.stringify(gameState);
            localStorage.setItem(this.KEY, data);
            return true;
        } catch (e) {
            console.error('Speicherfehler:', e);
            return false;
        }
    },

    load() {
        try {
            const data = localStorage.getItem(this.KEY);
            if (!data) return null;
            return JSON.parse(data);
        } catch (e) {
            console.error('Ladefehler:', e);
            return null;
        }
    },

    delete() {
        localStorage.removeItem(this.KEY);
    },

    exists() {
        return localStorage.getItem(this.KEY) !== null;
    }
};
