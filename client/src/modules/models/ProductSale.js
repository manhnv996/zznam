/**
 * Created by CPU60133_LOCAL on 12/15/2017.
 */

var ProductSale = StorageItem.extend({

    slot: 0,
    product: null,
    price: 0,
    isSold: false,

    ctor: function (storageItem, price) {

        this.product = storageItem;
        this.price = price;

        this.isSold = false;
    },

    setIntSlot: function (intSlot) {
        this.slot = intSlot;
    }

});
