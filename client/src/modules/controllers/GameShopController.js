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

    buyMapObjectByRuby: function (typeObject, lx, ly, ruby) {
        var userRuby = user.ruby;

        if (userRuby < ruby) {
            BaseGUILayer.instance.notifyNotEnoughRuby(ruby - userRuby, false);
        } else {
            this._sprite = null;
            if (typeObject == "field") {
                cc.log("Buy field By Ruby");
                this.buyField(typeObject, lx, ly, ruby);
            } else if (typeObject == "chicken_habitat") {

            } else if (typeObject == "cow_habitat") {

            } else if (typeObject == "chicken") {

            } else if (typeObject == "cow") {

            } else {
                this.buyMachine(typeObject, lx, ly, ruby);
            }
            user.reduceRuby(ruby);

            MapLayer.instance.addChild(this._sprite);
            MapCtrl.instance.addSpriteAlias(this._sprite);
            this._sprite.setLogicPosition(this._sprite.lx, this._sprite.ly, false);
        }
    },

    buyField: function (typeObject, lx, ly) {
        //Sprite
        //this._sprite = null;
        this._sprite = new FieldSprite(user.getAsset().getFieldList().length + 1, lx, ly);

        //Model
        var fieldModel = new Field(new Coordinate(lx, ly), this._sprite.fieldId);
        user.getAsset().addField(fieldModel);
        MapLayer.instance.fieldList.push(this._sprite);
        this._sprite.field = fieldModel;
        GameShopLayout.instance._gameShop._lodgeTable._tableView.reloadData();

        // Send server
        testnetwork.connector.sendBuyMapObjectByRuby(this._sprite.fieldId, typeObject,
            lx, ly);
    },

    buyMachine: function (typeObject, lx, ly) {
        //Model
        var machineConfig = getMachineConfigByType(typeObject);
        var machineModel = new Machine(0, typeObject, machineConfig.slot, 0, null, false,
            false, new Date().getTime(), machineConfig.time, new Coordinate(lx, ly));
        user.asset.addMachine(machineModel);

        //Sprite
        //this._sprite = null;
        switch (typeObject) {
            case "bakery_machine":
                this._sprite = new ConstructedSprite(machineModel.id,
                    MapConfigs.BakeryMachine.size.width, MapConfigs.BakeryMachine.size.height,
                    lx, ly, MapItemEnum.MACHINE, MapItemEnum.BAKERY);
                break;
            case "food_machine":
                this._sprite = new ConstructedSprite(machineModel.id,
                    MapConfigs.FoodMachine.size.width, MapConfigs.FoodMachine.size.height,
                    lx, ly, MapItemEnum.MACHINE, MapItemEnum.FOOD_GRINDER);
                break;
            case "butter_machine":
                this._sprite = new ConstructedSprite(machineModel.id,
                    MapConfigs.ButterMachine.size.width, MapConfigs.ButterMachine.size.height,
                    lx, ly, MapItemEnum.MACHINE, MapItemEnum.BUTTER);
                break;
            case "sugar_machine":
                this._sprite = new ConstructedSprite(machineModel.id,
                    MapConfigs.SugarMachine.size.width, MapConfigs.SugarMachine.size.height,
                    lx, ly, MapItemEnum.MACHINE, MapItemEnum.SUGAR_MAKER);
                break;
            case "popcorn_machine":
                this._sprite = new ConstructedSprite(machineModel.id,
                    MapConfigs.PopcornMachine.size.width, MapConfigs.PopcornMachine.size.height,
                    lx, ly, MapItemEnum.MACHINE, MapItemEnum.POPCORN_MAKER);
                break;
        }
        GameShopLayout.instance._gameShop._machineTable._tableView.reloadData();

        //Send server
        testnetwork.connector.sendBuyMapObjectByRuby(this._sprite.id, typeObject,
            lx, ly);
    }
});

// Moved to MainScene.js
// GameShopController.instance = new GameShopController();