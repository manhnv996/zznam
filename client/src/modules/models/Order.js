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



});