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
        // Change to lodge id
        var lodge = id + '_habitat';
        var listLodge = user.getAsset().getAnimalLodgeList();
        for(var i = 0; i < listLodge.length; i++){
            if(listLodge[i].getType() == lodge)
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
    },

    buyMapObjectByRuby: function (id, typeObject, lx, ly, ruby) {
        var userRuby = user.ruby;
        if (userRuby < ruby) {
            BaseGUILayer.instance.notifyNotEnoughRuby(ruby - userRuby);
        } else {
            //Tao Sprite --> Model --> trừ ruby --> send server
            this._sprite = null;
            //switch (typeObject) {
            //    case "field":
            //        break;
            //    case "chicken_habitat":
            //    case "cow_habitat":
            //        break;
            //    case "chicken":
            //    case "cow":
            //        break;
            //    case "bakery_machine":
            //    case "food_machine":
            //    case "butter_machine":
            //    case "sugar_machine":
            //    case "popcorn_machine":
            //        break;
            //}
            if (typeObject == "field") {
                cc.log("Buy field By Ruby");
                    ////Sprite
                    //this._sprite = new FieldSprite(user.getAsset().getFieldList().length + 1, lx, ly);
                    ////this._sprite.setLocalZOrder(10000);
                    //
                    //var fieldModel = new Field(new Coordinate(this._sprite.lx, this._sprite.ly), this._sprite.fieldId);
                    //user.getAsset().addField(fieldModel);
                    //MapLayer.instance.fieldList.push(this._sprite);
                    //this._sprite.field = fieldModel;
                    //// Send server
                    //testnetwork.connector.sendBuyMapObjectRequest(this._sprite.fieldId,
                    //    typeObject, this._sprite.lx, this._sprite.ly);
                this.buyField(id, typeObject, lx, ly, ruby);
                GameShopLayout.instance._gameShop._lodgeTable._tableView.reloadData();
            } else if (typeObject == "chicken_habitat") {

            } else if (typeObject == "cow_habitat") {

            } else if (typeObject == "chicken") {

            } else if (typeObject == "cow") {

            } else {
                this.buyMachine(id, typeObject, lx, ly, ruby);
                GameShopLayout.instance._gameShop._machineTable._tableView.reloadData();
            }
            user.reduceRuby(ruby);

            MapLayer.instance.addChild(this._sprite);
            this._sprite.setLogicPosition(this._sprite.lx, this._sprite.ly, false);
        }
    },

    buyField: function (id, typeObject, lx, ly, ruby) {
        //Sprite
        this._sprite = new FieldSprite(user.getAsset().getFieldList().length + 1, lx, ly);
        //this._sprite.setLocalZOrder(10000);

        //Model
        var fieldModel = new Field(new Coordinate(lx, ly), this._sprite.fieldId);
        user.getAsset().addField(fieldModel);
        MapLayer.instance.fieldList.push(this._sprite);
        this._sprite.field = fieldModel;

        // Send server
        testnetwork.connector.sendBuyMapObjectByRuby(id, typeObject,
            lx, ly, ruby);
    },

    buyMachine: function (id, typeObject, lx, ly, ruby) {
        //Sprite
        switch (typeObject) {
            case "bakery_machine":
                this._sprite = new BakerySprite(id, lx, ly);
                break;
            case "food_machine":
                break;
            case "butter_machine":
                break;
            case "sugar_machine":
                break;
            case "popcorn_machine":
                break;
        }

        //Model
        var machineModel = new Machine(id, typeObject, 0, 0, null, false,
            0, new Coordinate(lx, ly));
        user.asset.addMachine(machineModel);

        //Send server
        testnetwork.connector.sendBuyMapObjectByRuby(id, typeObject,
            lx, ly, ruby);
    }
});

// Moved to MainScene.js
// GameShopController.instance = new GameShopController();