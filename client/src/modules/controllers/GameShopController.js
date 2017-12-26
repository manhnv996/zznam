/**
 * Created by CPU60075_LOCAL on 19/11/2017.
 */

var GameShopController = cc.Class.extend({

    getMaxLodge: function (id) {
        var config = getLodgeConfigById(id);
        var length = config.level.length;
        var maxslot = 0;
        if (user.level >= config.level[length - 1]) {
            maxslot = config.number[length - 1];
        } else {
            for (var i = 0; i < length - 1; i++) {
                if (config.level[i] <= user.level && user.level < config.level[i + 1]) {
                    maxslot = config.number[i];
                    break;
                }
            }
        }
        return maxslot;
    },

    getLodgeSlotByType: function (type) {
        return getLodgeConfigById(type).capacity;
    },

    getNumberLodge: function (id) {
        var number = 0;
        var listLodge = user.getAsset().getAnimalLodgeList();
        for(var i = 0; i < listLodge.length; i++){
            if(listLodge[i].getType() === id) number++;
        }
        return number;
    },

    getNumberAnimal: function (id) {
        var number = 0;
        // Change to lodge id
        var lodge = id + '_habitat';
        var listLodge = user.getAsset().getAnimalLodgeList();
        for(var i = 0; i < listLodge.length; i++){
            if(listLodge[i].getType() === lodge)
                number += listLodge[i].getCurrentSlot();
        }
        return number;
    },

    getNumberMachine: function (type) {
        var number = 0;
        var listMachine = user.getAsset().getMachineList();
        for(var i = 0; i < listMachine.length; i++){
            if(listMachine[i].machineType === type) number++;
        }
        return number;
    },

    getMaxMachine: function (type) {
        var machineConfig = getMachineConfigByType(type);
        var lenghtLv = machineConfig.level.length;
        var max = 0;
        if (user.level >= machineConfig.level[lenghtLv - 1]) {
            return lenghtLv;
        } else {
            for (var i = 0; i < lenghtLv - 1; i++) {
                if (machineConfig.level[i] <= user.level && user.level < machineConfig.level[i + 1] ) {
                    return i + 1;
                    //break;
                }
            }
        }
        return max;
    },

    getPriceMachine: function (type) {
        var machineConfig = getMachineConfigByType(type);
        var idx = this.getNumberMachine(type);
        if(idx) {
            return machineConfig.price[idx];
        }
        return machineConfig.price[0];
    },
    //checkBorder: function (lx, ly) {
    //    if(lx < 0 || ly < 0)
    //        return false;
    //    return true;
    //},

    checkGold: function (price) {
        // cc.log(price);
        var gold = user.getGold();
        var missGold = 0;
        if (price > gold)
            missGold = price - gold;
        return missGold;
    },

    buyMapObjectByRuby: function (typeObject, lx, ly, ruby, lodgeId) {
        var userRuby = user.ruby;

        if (userRuby < ruby) {
            BaseGUILayer.instance.notifyNotEnoughRuby(ruby - userRuby, false);
        } else {
            //chicken --- cow -->> function #
            this._sprite = null;
            if (lodgeId) {
                this.buyAnimalByRuby(lodgeId, typeObject, lx, ly);
            } else {
                switch (typeObject) {
                    case "field":
                        this.buyField(typeObject, lx, ly, ruby);
                        break;
                    case "chicken_habitat":
                    case "cow_habitat":
                        this.buyLodge(typeObject, lx, ly, ruby);
                        break;
                    case "chicken":
                    case "cow":
                        break;
                    case "bakery_machine":
                    case "food_machine":
                    case "butter_machine":
                    case "sugar_machine":
                    case "popcorn_machine":
                        this.buyMachine(typeObject, lx, ly, ruby);
                        break;
                }
                MapLayer.instance.addChild(this._sprite);
                MapCtrl.instance.addSpriteAlias(this._sprite);
                this._sprite.setLogicPosition(this._sprite.lx, this._sprite.ly, false);
            }
            user.reduceRuby(ruby);
        }
    },

    buyField: function (typeObject, lx, ly) {
        //Sprite
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
            false, getTime(), machineConfig.time, new Coordinate(lx, ly));
        user.asset.addMachine(machineModel);

        //Sprite
        switch (typeObject) {
            case "bakery_machine":
                this._sprite = new ConstructedSprite(machineModel.machineId,
                    MapConfigs.BakeryMachine.size.width, MapConfigs.BakeryMachine.size.height,
                    lx, ly, MapItemEnum.MACHINE);
                break;
            case "food_machine":
                this._sprite = new ConstructedSprite(machineModel.machineId,
                    MapConfigs.FoodMachine.size.width, MapConfigs.FoodMachine.size.height,
                    lx, ly, MapItemEnum.MACHINE);
                break;
            case "butter_machine":
                this._sprite = new ConstructedSprite(machineModel.machineId,
                    MapConfigs.ButterMachine.size.width, MapConfigs.ButterMachine.size.height,
                    lx, ly, MapItemEnum.MACHINE);
                break;
            case "sugar_machine":
                this._sprite = new ConstructedSprite(machineModel.machineId,
                    MapConfigs.SugarMachine.size.width, MapConfigs.SugarMachine.size.height,
                    lx, ly, MapItemEnum.MACHINE);
                break;
            case "popcorn_machine":
                this._sprite = new ConstructedSprite(machineModel.machineId,
                    MapConfigs.PopcornMachine.size.width, MapConfigs.PopcornMachine.size.height,
                    lx, ly, MapItemEnum.MACHINE);
                break;
        }
        GameShopLayout.instance._gameShop._machineTable._tableView.reloadData();

        //Send server
        testnetwork.connector.sendBuyMapObjectByRuby(machineModel.machineId, typeObject,
            lx, ly);
    },

    buyLodge: function (typeObject, lx, ly) {
        //Model
        var lodgeModel = new AnimalLodge(new Coordinate(lx, ly),
            typeObject, 0, null);
        user.asset.addAnimalLodge(lodgeModel);
        //Sprite
        switch (typeObject) {
            case AnimalLodgeType.chicken_habitat:
                this._sprite = new ChickenLodgeSprite(lx, ly);
                break;
            case AnimalLodgeType.cow_habitat:
                this._sprite = new CowLodgeSprite(lx, ly);
                break;
        }
        this._sprite.tag = TagClusters.Lodge + lodgeModel.id;
        this._sprite.setId(lodgeModel.id);
        GameShopLayout.instance._gameShop._lodgeTable._tableView.reloadData();
        GameShopLayout.instance._gameShop._animalTable._tableView.reloadData();

        //Send server
        testnetwork.connector.sendBuyMapObjectByRuby(lodgeModel.id, typeObject,
            lx, ly);
    },

    buyAnimalByRuby: function (lodgeId, typeObject, lx, ly) {
        //model
        var lodgeModel = user.asset.getLodgeById(lodgeId);
        var animalModel = new Animal(typeObject, 0, false, 0);
        lodgeModel.addAnimal(animalModel);

        //sprite
        switch (typeObject) {
            case "chicken":
                this._sprite = new ChickenSprite();
                break;
            case "cow":
                this._sprite = new CowSprite();
                break;
        }
        var lodgeSprite = MapLayer.instance.getChildByTag(TagClusters.Lodge + lodgeModel.id);
        this._sprite.setId(animalModel.id);
        lodgeSprite.addAnimalSprite(this._sprite);
        this._sprite.hungry();
        GameShopLayout.instance._gameShop._animalTable._tableView.reloadData();
        //Send server
        testnetwork.connector.sendBuyAnimalByRuby(lodgeModel.id, animalModel.id,
            animalModel.type, lx, ly);
    }
});

// Moved to MainScene.js
// GameShopController.instance = new GameShopController();