const shortid = require('shortid');

module.exports = class Store {
    constructor() {
        this.list = [];
    }
    save(store) {
        const storeWithId = Object.assign({}, store);
        storeWithId._id = shortid.generate();
        this.list.push(storeWithId);
        return storeWithId;
    }
    get(id) {
        const result = this.list.find(store => store._id === id);
        if(result) return result;
        else return null;
    }
    getAll() {
        return this.list.slice();
    }
    remove(id) {
        const indexOf = this.list.indexOf(this.list.find(store => store._id === id));
        if(indexOf !== -1) {
            this.list.splice(indexOf, 1);
            return { remove: true };
        } else return { remove: false };
    }


};