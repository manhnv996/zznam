/**
 * Created by CPU60133_LOCAL on 12/15/2017.
 */

var ProductSale = StorageItem.extend({

    slot: 0,
    product: null,
    price: 0,
    isSold: false,

    ctor: function (intSlot, storageItem, price) {

        this.slot = intSlot;
        this.product = storageItem;
        this.price = price;

        this.isSold = false;
    },

    setIntSlot: function (intSlot) {
        this.slot = intSlot;
    },


    updateProductSale: function (storageItem, price) {
        this.product = storageItem;
        this.price = price < 0 ? 0 : price;
        this.isSold = false;
    }

});
