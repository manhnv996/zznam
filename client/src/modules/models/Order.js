/**
 * Created by CPU60133_LOCAL on 11/29/2017.
 */

var Order = cc.Class.extend({

    orderId: 0,
    itemList: [],

    ctor: function (typeProduct, itemList) {
        //
        //this._super();

        this.typeItem = typeProduct;
        this.itemList = itemList;
    },



    getOrderId: function () {
        return this.orderId;
    },
    getItemList: function () {
        //StorageItem
        return this.itemList;
    },

    getItem: function (productType) {
        //return Item of productType in list
        for (var i in this.getItemList()){
            if (this.getItemList()[i].getTypeItem() == productType){
                return this.getItemList()[i];
            }

        }
        return null;
    },

    getOrderPrice: function (){

    },
    getOrderExp: function (){

    }



});