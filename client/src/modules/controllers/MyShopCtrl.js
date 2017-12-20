/**
 * Created by CPU60133_LOCAL on 12/20/2017.
 */

var MyShopCtrl = cc.Class.extend({

    onSell: function (slot, product, price) {
        if (user.getAsset().getMyShop().sell(slot, product, price)){
            testnetwork.connector.sendSellProduct(slot, product, price);
        }
    },

    onBuy: function (userSell, slot) {

    },

    onReceiveMoney: function (slot) {

    },

    onCancelSell: function (slot) {

    },

    onUnlockSlot: function () {

    }

});
