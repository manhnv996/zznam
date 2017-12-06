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
    getFinishWaittingTime: function () {
        if (this.itemList == []){
            return null;
        }
        if (this.waittingTime == null){
            return null;
        }

        var parseTime = this.waittingTime.getTime();
        var finishTime = new Date();
        finishTime.setTime(parseTime + this.getRemainTime(user.getLevel()) * 60 * 1000);
        //finishTime.setTime(parseTime + 6000);     //HERE IS TEST

        return finishTime;
    },

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
        if (this.checkStatus() == OrderStatusTypes.WAITTING){
            return false;
        }

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

    checkRemainItem: function () {
        var remainItem = [];
        for (var i = 0; i < this.itemList.length; i++){
            if (this.itemList[i].quantity <= user.getAsset().getQuantityOfTwoStorageByProductId(this.itemList[i].typeItem)){
                remainItem.push(new StorageItem(this.itemList[i].typeItem, this.itemList[i].quantity));
            } else if (user.getAsset().getQuantityOfTwoStorageByProductId(this.itemList[i].typeItem) > 0){
                remainItem.push(new StorageItem(this.itemList[i].typeItem, user.getAsset().getQuantityOfTwoStorageByProductId(this.itemList[i].typeItem)));
            }
        }

        return remainItem;
    },

//
    makeOrder: function () {
        if (this.checkCondition() == true){
            for (var i = 0; i < this.itemList.length; i++){
                user.getAsset().getFoodStorage().takeItem(this.itemList[i].typeItem, this.itemList[i].quantity);
                user.getAsset().getWarehouse().takeItem(this.itemList[i].typeItem, this.itemList[i].quantity);
            }

            //user.addGold(this.orderPrice);
            //user.addExp(this.orderExp);
            user.getAsset().getCar().updateDelivery(this.orderPrice, this.orderExp);

            return true;
        }
        return false;
    },

    makeOrderByRuby: function (rubyBuy) {

        if (!user.reduceRuby(rubyBuy)){
            return false;
        }

        var remainItem = this.checkRemainItem();
        for (var i = 0; i < remainItem.length; i++){
            user.getAsset().getFoodStorage().takeItem(remainItem[i].typeItem, remainItem[i].quantity);
            user.getAsset().getWarehouse().takeItem(remainItem[i].typeItem, remainItem[i].quantity);
        }

        //user.addGold(this.orderPrice);
        //user.addExp(this.orderExp);
        user.getAsset().getCar().updateDelivery(this.orderPrice, this.orderExp);

        return true;

    },


    cancelOrder: function () {
        //
        if (this.checkStatus() == OrderStatusTypes.REALIZABLE){
            this.itemList = [];
            this.orderPrice = 0;
            this.orderExp = 0;

            this.waittingTime = new Date();

            //
            return true;
        }
        return false;
    },

    boostWait: function () {
        if (user.reduceRuby(3)){
            return true;
        }
        return false;
    }


});