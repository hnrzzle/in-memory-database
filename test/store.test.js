const assert = require('assert');
const Store = require('../lib/store');

describe('store', () => {
    let newStore;
    beforeEach(() => {
        newStore = new Store();
    });

    const details = { name: 'tesla', model: 'S' };
    const details2 = { name: 'ford', model: 'focus' };
    
    it('save generates an id', () => {
        const tesla = newStore.save(details);
        const checkIfId = () => {
            if(tesla._id) {
                const idCheck = true;
                return idCheck;
            }
            else return false;
        };
        assert.deepEqual(checkIfId(), true);
    });
    it('get returns the object with that id', () => {
        const tesla = newStore.save(details);
        const ford = newStore.save(details2); // eslint-disable-line

        const got = newStore.get(tesla._id);

        assert.deepEqual(got, { name: 'tesla', model: 'S', _id: tesla._id });
    });
    it('returns null when id DNE', () => {
        const got = newStore.get(1234);
        assert.deepEqual(got, null);
    });
    it('getAll returns all objects', () => {
        const tesla = newStore.save(details);
        const ford = newStore.save(details2);
        const allObj = newStore.getAll();

        assert.deepEqual(allObj, [{ name: 'tesla', model: 'S', _id: tesla._id }, { name: 'ford', model: 'focus', _id: ford._id }]);
    });
    it('getAll returns empty array if no objects', () => {
        const allObj = newStore.getAll();
        assert.deepEqual(allObj, []);
    });
    it('.remove(<id>) removes object from array matching id', () => {
        const tesla = newStore.save(details); // eslint-disable-line
        const ford = newStore.save(details2);

        const removeFord = newStore.remove(ford._id);

        assert.deepEqual(removeFord, { remove: true });
    });
    it('.remove(<id>) returns { remove: false } if id DNE', () => {
        const tesla = newStore.save(details); // eslint-disable-line
        const ford = newStore.save(details2); // eslint-disable-line

        const tryRemove = newStore.remove(234);

        assert.deepEqual(tryRemove, { remove: false });
    });
});