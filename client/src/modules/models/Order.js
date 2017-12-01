/**
 * Created by CPU60133_LOCAL on 11/29/2017.
 */

var Order = cc.Class.extend({

    orderId: 0,
    itemList: [],
    orderPrice: 0,
    orderExp: 0,
    waittingTime: null,

    ctor: function (orderId, itemList, orderPrice, orderExp) {
        //
        //this._super();

        this.orderId = orderId;

        this.createOrder(itemList, orderPrice, orderExp);
    },


    createOrder: function (itemList, orderPrice, orderExp) {
        this.itemList = itemList;
        this.orderPrice = orderPrice;
        this.orderExp = orderExp;

        this.waittingTime = null;
    },

    getOrderId: function () {
        return this.orderId;
    },
    getItemList: function () {
        //StorageItem
        return this.itemList;
    },

    //
    getRemainTime: function (level) {
        if (level < 11){
            return 3;
        } else if (level < 16){
            return 5;
        } else if (level < 21){
            return 10;
        } else if (level < 27){
            return 15;
        } else {
            return 30;
        }
    },

    checkStatus: function () {
        if (this.itemList.length > 0){
            return OrderStatusTypes.REALIZABLE;
        } else {
            return OrderStatusTypes.WAITTING;
        }
    },

    //
    checkCondition: function () {
        var missingItem = [];
        for (var i = 0; i < this.itemList.length; i++){
            if (this.itemList[i].quantity > user.getAsset().getQuantityOfTwoStorageByProductId(this.itemList[i].typeItem)){
                missingItem.push(new StorageItem(this.itemList[i].typeItem,
                    this.itemList[i].quantity - user.getAsset().getQuantityOfTwoStorageByProductId(this.itemList[i].typeItem)));

            }
        }
        // return true;
        return (missingItem.length == 0) ? true : missingItem;
    },

    makeOrder: function () {
        if (this.checkCondition() == true){
            for (var i = 0; i < this.itemList.length; i++){
                user.getAsset().getFoodStorage().takeItem(this.itemList[i].typeItem, this.itemList[i].quantity);
                user.getAsset().getWarehouse().takeItem(this.itemList[i].typeItem, this.itemList[i].quantity);
            }
        }
    },

    cancelOrder: function () {
        //
        this.itemList = [];
        this.orderPrice = 0;
        this.orderExp = 0;

        this.waittingTime = new Date();
    },


});