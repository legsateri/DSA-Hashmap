class _Node {
    constructor(value, next) {
        this.value = value;
        this.next = null;
    }
}

class HashMap {
    constructor(initialCapacity = 8) {
        this.length = 0;
        this._hashTable = [];
        this._capacity = initialCapacity;
        this.deleted = 0;
    }

    static _hashString(string) {
        let hash = 5381;
        for (let i = 0; i < string.length; i++) {
            hash = (hash << 5) + hash + string.charCodeAt(i);
            hash = hash & hash;
        }
        return hash >>> 0;
    }

    get(key) {
        const index = this._findSlot(key);
        if (this._hashTable[index] === undefined) {
            throw new Error('Key error');
        }
        return this._hashTable[index].value;
    }

    set(key, value) {
        const loadRatio = (this.length + this._deleted + 1) / this._capacity;
        if (loadRatio > HashMap.MAX_LOAD_RATIO) {
            this._resize(this._capacity * HashMap.SIZE_RATIO);
        }
        const index = this._findSlot(key);

        if (!this._hashTable[index]) {
            this.length++;
        }
        this._hashTable[index] = {
            key,
            value,
            DELETED: false
        };
    }

    put(item) {

    }

    _resize(size) {
        const oldSlots = this._hashTable;
        this._capacity = size;
        this.length = 0;
        this._deleted = 0;
        this._hashTable = [];
        for (const slot of oldSlots) {
            if (slot !== undefined && !slot.DELETED) {
                this.set(slot.key, slot.value);
            }
        }
    }

    delete(key) {
        const index = this._findSlot(key);
        const slot = this._hashTable[index];
        if (slot === undefined) {
            throw new Error('Key error');
        }
        slot.DELETED = true;
        this.length--;
        this._deleted++;
    }
}

module.exports = HashMap;