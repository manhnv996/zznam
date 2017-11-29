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

    getNumberMachine: function (type) {
        var number = 0;
        var listMachine = user.getAsset().getMachineList();
        for(var i = 0; i < listMachine.length; i++){
            if(listMachine[i].type == type) number++;
        }
        return number;
    },

    checkBorder: function (lx, ly) {
        if(lx < 0 || ly < 0)
            return false;
        return true;
    },

    checkGold: function (price) {
        // cc.log(price);
        var gold = user.getGold();
        var missGold = 0;
        if (price > gold)
            missGold = price - gold;
        return missGold;
    },

    fromGoldToRuby: function (gold) {
        var ruby = gold / 15;
        if(gold % 15) ruby++;
        ruby = Math.floor(ruby);
        return ruby;
    }
});

// Moved to MainScene.js
// GameShopController.instance = new GameShopController();