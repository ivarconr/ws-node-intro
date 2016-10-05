'use strict';

module.exports = class MessagesCache {
    constructor ({ forceLength, resetLengthOn } = {}) {
        this.store = {};
        this.forceLength = forceLength || 100;
        this.resetLengthOn = resetLengthOn || 120;
    }

    pushTo (k, value) {
        const list = this.store[k];
        if (list) {
            list.push(value);
            if (list.length > this.resetLengthOn) {
                this.store[k] = list.splice(list.length - this.forceLength);
            }
        } else {
            this.store[k] = [value];
        }
    }

    get (k) {
        return this.store[k];
    }
};
