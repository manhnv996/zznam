/**
 * Created by CPU60133_LOCAL on 12/20/2017.
 */

var MyShopCtrl = cc.Class.extend({

    MAX_SLOT: 12,

    onSell: function (slot, product, price) {
        if (user.getAsset().getMyShop().sell(slot, product, price)){
            testnetwork.connector.sendSellProduct(slot, product.typeItem, product.quantity, price);

            BaseGUILayer.instance.removeBlockListener();
            BaseGUILayer.instance.showMyShop();
        }
    },

    onBuy: function (userSell, slot) {
        if (user.getAsset().getMyShop().buy(userSell, slot)){
            testnetwork.connector.sendBuyProduct(userSell, slot);

            return true;
        }
        return false;
    },

    onReceiveMoney: function (slot) {
        if (user.getAsset().getMyShop().receiveMoneyFromSoldProduct(slot)){
            testnetwork.connector.sendReceiveMoneyFromProduct(slot);

            return true;
        }
        return false;
    },

    onCancelSell: function (slot) {
        if (user.getAsset().getMyShop().cancelSell(slot)){
            testnetwork.connector.sendCancelSellProduct(slot);

            BaseGUILayer.instance.removeBlockListener();
            BaseGUILayer.instance.showMyShop();
        }
    },

    onUnlockSlot: function () {
        if (this.maxSlot >= this.MAX_SLOT){
            return false;
        }
        if (user.getAsset().getMyShop().unlockSlot()){
            testnetwork.connector.sendUnlockSlotMyShop();

            return true;
        }
        return false;
    }

});
