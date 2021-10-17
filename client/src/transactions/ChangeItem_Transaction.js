import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * ChangeItem_Transaction
 * This class represents a transaction that works with changing an item
 */
export default class ChangeItem_Transaction extends jsTPS_Transaction {
    constructor(initStore, initIndex, initOldValue, initNewValue) {
        super();
        this.store = initStore;
        this.oldValue = initOldValue;
        this.newValue = initNewValue;
        this.index = initIndex;
    }

    doTransaction() {
        this.store.changeItem(this.index, this.newValue);
    }
    
    undoTransaction() {
        this.store.changeItem(this.index, this.oldValue);
    }
}