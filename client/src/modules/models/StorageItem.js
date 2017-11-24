
var StorageItem = cc.Class.extend({

    typeItem: null,
    quantity: 0,

    ctor: function (typeProduct, quantity) {
        //
        //this._super();

    //     this.render(typeProduct, quantity);

    // },
    // render: function (typeProduct, quantity) {

        this.typeItem = typeProduct;
        this.quantity = quantity;
    },

    addQuantity: function (number) {
        this.quantity += number;

    },
    reduceQuantity: function (number) {
        this.quantity -= number;
    },

    getTypeItem: function () {
        return this.typeItem;
    },
    getQuantityItem: function () {
        return this.quantity;
    },

    //
    getLevelUnlock: function () {
        return getProductObjByType(this.typeItem).level;
    }

});