/**
 * Created by CPU60075_LOCAL on 12/4/2017.
 */
var _loadingBarConstructed = null;

var ConstructedCtrl = cc.Class.extend({

    checkBuildTime: function (sprite, dt) {
        switch (sprite.typeBuilding) {
            case MapItemEnum.MACHINE:
                if (!(sprite.buildTime % sprite.reduceRubyTime)) {
                    if (sprite.buildExpress > 0) {
                        sprite.buildExpress--;
                    }
                    if (_loadingBarConstructed) {
                        _loadingBarConstructed.rubyNumber.setString(sprite.buildExpress);
                    }
                }
                sprite.buildTime += dt;

                if (sprite.buildTime >= sprite.totalTime) {
                    var completedSprite = new ConstructedCompletedSprite(id, sprite.machineModel.coordinate.x,
                        sprite.machineModel.coordinate.y, sprite.typeBuilding, sprite.typeMapObject);
                    MapLayer.instance.addChild(completedSprite);
                    MapCtrl.instance.addSpriteAlias(completedSprite);
                    completedSprite.setLogicPosition(sprite.machineModel.coordinate.x, sprite.machineModel.coordinate.y, false);
                    return true;
                } else {
                    return false;
                }
        }
    },

    completedBuild: function (id, typeBuilding) {
        //cc.log("Completed Build");
        var machineSprite;
        var machineModel;
        switch (typeBuilding) {
            case MapItemEnum.MACHINE:
                //cc.log("machineModel " + user.asset.machineList);
                machineModel = user.asset.getMachineById(id);
                switch (machineModel.type) {
                    case "bakery_machine":
                        machineSprite = new BakerySprite(id, machineModel.coordinate.x,
                            machineModel.coordinate.y);
                        //cc.log("machineSprite " + machineSprite);
                        break;
                    //case "food_machine":
                    //    break;
                    //case "butter_machine":
                    //    break;
                    //case "sugar_machine":
                    //    break;
                    //case "popcorn_machine":
                    //    break;
                }
                break;
        }
        machineModel.completed = true;
        //cc.log("machineSprite " + machineSprite);
        MapLayer.instance.addChild(machineSprite);
        MapCtrl.instance.addSpriteAlias(machineSprite);

        machineSprite.setLogicPosition(machineModel.coordinate.x, machineModel.coordinate.y, true);

        //send server
        testnetwork.connector.sendBuildCompleted(id, typeBuilding);
    },

    selectConstructedObject: function (id, typeBuilding, buildExpress) {
        switch (typeBuilding) {
            case MapItemEnum.MACHINE:
                //cc.log("Machine constructed");
                var machineModel = user.asset.getMachineById(id);
                this.machineConfig = getMachineConfigByType(machineModel.type);
                _loadingBarConstructed = new LoadingBarLayout(this.machineConfig.time, machineModel.startBuildTime,
                    fr.Localization.text(this.machineConfig.name), buildExpress);
                var py = machineModel.coordinate.y;
                var px = machineModel.coordinate.x;
                var p = MapValues.logicToScreenPosition(px, py);
                _loadingBarConstructed.setPosition(p.x, p.y);
                //cc.log("LoadingBar position " + machineModel.coordinate.x + " " + machineModel.coordinate.y);
                BaseGUILayer.instance.addChild(_loadingBarConstructed);
                break;
        }
    }

});