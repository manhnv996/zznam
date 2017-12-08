/**
 * Created by CPU60133_LOCAL on 12/4/2017.
 */

var OrderNPC = Order.extend({

    // orderId: 0,
    orderItem: null,    //storage item

    // orderPrice: 0,
    // orderExp: 0,
    // waittingTime: null,

    npc_res: null,  // NOT YET STARTED

    ctor: function (orderId, orderItem, orderPrice, orderExp, npc_res) {
        //
        this._super(orderId, [], orderPrice, orderExp);

        //
        // this.orderItem = null;
        // this.waittingTime = new Date();
        this.createOrder(orderItem, orderPrice, orderExp, npc_res)
    },


    //
    createOrder: function (orderItem, orderPrice, orderExp, npc_res) {
        this.orderItem = orderItem;
        this.orderPrice = orderPrice;
        this.orderExp = orderExp;

        this.npc_res = npc_res;

        this.waittingTime = null;
    },



    setOrderItem: function (orderItem) {
        this.orderItem = orderItem;
    },

    getOrderItem: function () {
        return this.orderItem;
    },


    setNpcRes: function () {

    },


    //
    getFinishWaittingTime: function () {
        // if (this.orderItem == null){
        //     return null;
        // }
        if (this.waittingTime == null){
            return null;
        }

        var parseTime = this.waittingTime.getTime();
        var finishTime = new Date();
        //finishTime.setTime(parseTime + this.getRemainTime(user.getLevel()) * 60 * 1000);
        finishTime.setTime(parseTime + this.getRemainTime(user.getLevel()) * 5 * 1000);
        //finishTime.setTime(parseTime + 6000);     //HERE IS TEST

        /*
        INPROGRESS
         */
        return finishTime;
    },

    getRemainTime: function (level) {
        /*
        NOT YET STARTED
         */
        if (level < 11){
            return 2;
        } else if (level < 16){
            return 4;
        } else if (level < 21){
            return 4;
        } else if (level < 26){
            return 4;
        } else if (level < 31){
            return 6;
        } else if (level < 36){
            return 6;
        } else if (level < 41){
            return 6;
        } else {
            return 8;
        }
    },

    checkStatus: function () {
        if (this.orderItem != null){
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
        if (this.orderItem.quantity > user.getAsset().getQuantityOfTwoStorageByProductId(this.orderItem.typeItem)){

            //return false;
            missingItem.push(new StorageItem(this.orderItem.typeItem,
                this.orderItem.quantity - user.getAsset().getQuantityOfTwoStorageByProductId(this.orderItem.typeItem)));
            return missingItem;
        }

        return true;
        //return (missingItem.length == 0) ? true : missingItem;
    },

    makeOrder: function () {
        if (this.checkCondition() == true){
            user.getAsset().getFoodStorage().takeItem(this.orderItem.typeItem, this.orderItem.quantity);
            user.getAsset().getWarehouse().takeItem(this.orderItem.typeItem, this.orderItem.quantity);

            user.addGold(this.orderPrice);
            user.addExp(this.orderExp);

            return true;
        }
        return false;
    },


    makeOrderByRuby: function (rubyBuy) {
        if (this.checkStatus() == OrderStatusTypes.WAITTING){
            return false;
        }

        if (this.checkCondition() == true){
            return this.makeOrder();

        } else {
            if (!user.reduceRuby(rubyBuy)){
                return false;
            }

            user.getAsset().getFoodStorage().takeItem(this.orderItem.typeItem, user.getAsset().getQuantityOfTwoStorageByProductId(this.orderItem.typeItem));
            user.getAsset().getWarehouse().takeItem(this.orderItem.typeItem, user.getAsset().getQuantityOfTwoStorageByProductId(this.orderItem.typeItem));


            user.addGold(this.orderPrice);
            user.addExp(this.orderExp);

            return true;
        }

    },


    cancelOrder: function () {
        //
        if (this.checkStatus() == OrderStatusTypes.REALIZABLE){
            this.orderItem = null;
            this.orderPrice = 0;
            this.orderExp = 0;

            this.waittingTime = new Date();

            //
            return true;
        }
        return false;
    },

    boostWait: function () {    //not use
        return false;
    }


});