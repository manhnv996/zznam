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

    // //
    // sell: function (intSlot, productSale) {
    //     if (this.productList.length < this.maxSlot){
    //         if (user.getAsset().getQuantityOfTwoStorageByProductId(productSale.product.typeItem) >= productSale.product.quantity){
    //
    //             this.productList.push(productSale);
    //             productSale.setIntSlot(intSlot);
    //
    //             user.getAsset().takeItemToStorageById(productSale.product.typeItem, productSale.product.quantity);
    //
    //             return true;
    //         }
    //     }
    //     return false;
    // },
//
    sell: function (intSlot, product, price) {
        var index = this.getProductIdBySlot(intSlot);
        if (index != null){
            if (product == null){
                return false;
            }
            if (user.getAsset().getQuantityOfTwoStorageByProductId(product.typeItem) >= product.quantity){

                user.getAsset().takeItemToStorageById(product.typeItem, product.quantity);
                this.productList[index].updateProductSale(product, price);

                return true;
            }
        }
        return false;
    },

    buy: function (userSell, intSlot) {
        // var productSale = this.getProductBySlot(intSlot);
        var productSale = userSell.getAsset().getMyShop().getProductBySlot(intSlot);    //inprogress
        //
        if (productSale != null){
            if (productSale.product != null){
                if (user.reduceGold(productSale.price)){
                    if (user.getAsset().addItemToStorageById(productSale.product.typeItem, productSale.product.quantity)){

                        productSale.updateProductSale(null, 0);
                        return true;
                    }
                    user.addGold(productSale.price);
                }
            }
        }
        return false;
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

    cancelSell: function (intSlot) {
        var productSale = this.getProductBySlot(intSlot);
        if (productSale != null){
            if (productSale.product != null){

                if (user.reduceRuby(1)){
                    productSale.updateProductSale(null, 0);
                    return true;
                }

                //if (user.getAsset().addItemToStorageById(productSale.product.typeItem, productSale.product.quantity)){
                //
                //    productSale.updateProductSale(null, 0);
                //    return true;
                //}
            }
        }
        return false;
    },

    unlockSlot: function () {
        if (user.reduceRuby(5)){
            this.maxSlot ++;

            var productSale = new ProductSale(this.maxSlot - 1, null, 0);
            this.productList.push(productSale);

            return true;
        }
        return false;
    }

});
