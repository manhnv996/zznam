/**
 * Created by CPU60075_LOCAL on 19/11/2017.
 */

var GameShopController = cc.Class.extend({

    getMaxField: function () {
        var gameShop = new GameShop();
        return gameShop.getMaxField();
    },

    getNumberLodge: function (id) {
        var number = 0;
        var listLodge = user.getAsset().getAnimalLodgeList();
        for(var i = 0; i < listLodge.length; i++){
            if(listLodge[i].getType() == id) number++;
        }
        return number;
    },

    getNumberAnimal: function (id) {
        var number = 0;
        var listLodge = user.getAsset().getAnimalLodgeList();
        for(var i = 0; i < listLodge.length; i++){
            if(listLodge[i].getType() == id)
                number += listLodge[i].getCurrentSlot();
        }
        return number;
    },

    getNumberMachine: function (id) {
        var number = 0;
        var listMachine = user.getAsset().getMachineList();
        for(var i = 0; i < listMachine.length; i++){
            if(listMachine[i].getType() == id) number++;
        }
        return number;
    },

    checkBorder: function (lx, ly) {
        if(lx < 0 || ly < 0)
            return false;
        return true;
    },

    checkGold: function (price) {
        var gold = user.getGold();
        if (price <= gold)
            return true;
        return false;
    }
});

GameShopController.instance = new GameShopController();