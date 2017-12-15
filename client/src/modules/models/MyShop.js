/**
 * Created by CPU60133_LOCAL on 12/15/2017.
 */


var MyShop = cc.Class.extend({

    maxSlot: 0,
    productList: [],
    lastTimeNpcCome: null,

    ctor: function (maxSlot, productList, lastTimeNpcCome) {

        this.maxSlot = maxSlot;
        this.productList = (productList == null) ? [] : productList;
        this.lastTimeNpcCome = lastTimeNpcCome;
    },

    //
    sell: function (intSlot, productSale) {
        if (this.productList.length < this.maxSlot){
            if (user.getAsset().getQuantityOfTwoStorageByProductId(productSale.product.typeItem) >= productSale.product.quantity){

                this.productList.push(productSale);
                productSale.setIntSlot(intSlot);

                user.getAsset().takeItemToStorageById(productSale.product.typeItem, productSale.product.quantity);

                return true;
            }
        }
        return false;
    },
    
    buy: function (intSlot) {
        
    },

    getProductBySlot: function (intSlot) {
        for (var i = 0; i < this.productList.length; i++){
            if (this.productList[i].slot == intSlot){
                return this.productList[i];
            }
        }
        return null;
    },


    getProductIdBySlot: function (intSlot) {
        for (var i = 0; i < this.productList.length; i++){
            if (this.productList[i].slot == intSlot){
                return i;
            }
        }
        return null;
    },


    receiveMoneyFromSoldProduct: function (intSlot) {
        var product = this.getProductBySlot(intSlot);
        if (product == null){
            return false;
        }
        if (product.isSold){
            user.addGold(product.price);

            this.productList.slice(this.getProductIdBySlot(intSlot), 1);
            return true;
        }
        return false;
    },

    unlockSlot: function () {
        
    }

});
