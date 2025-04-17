var Storage = {
    db: window.localStorage,
    set: function(key, value) {
        value = JSON.stringify(value);
        this.db.setItem(key, value);
    },
    get: function(key) {
        var value = this.db.getItem(key);
        try {
            return JSON.parse(value);
        } catch(e) {
            return;
        }
    },
};