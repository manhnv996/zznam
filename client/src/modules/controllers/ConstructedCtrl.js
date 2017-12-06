/**
 * Created by CPU60075_LOCAL on 12/4/2017.
 */
var _loadingBarConstructed = null;

var ConstructedCtrl = cc.Class.extend({

    getBuildTime: function (id) {
        var machineModel = user.asset.getMachineById(id);
        //var machineConfig = getMachineConfigByType(this.machineModel.type);
        var startTime = machineModel.startBuildTime;
        var curTime = new Date().getTime();
        var buildTime = curTime - startTime;
        return buildTime;
    },

    getBuildExpress: function (id, buildTime) {
        var machineModel = user.asset.getMachineById(id);
        var machineConfig = getMachineConfigByType(machineModel.type);

        var reduceRuby = Math.floor(buildTime / 1000 / machineConfig.reduceRubyTime);
        var buildExpress = machineConfig.buildExpress - reduceRuby;
        //cc.log("buildExpress " + (this.buildExpress < 0));
        if (buildExpress < 0) {
            buildExpress = 0;
        }

        return buildExpress;
    },

    //getMachineConfigById: function (id) {
    //
    //},

    checkBuildTime: function (sprite, dt) {
        //cc.log("buildExpress " + sprite.buildExpress);
        switch (sprite.typeBuilding) {
            case MapItemEnum.MACHINE:
                var machineModel = user.asset.getMachineById(sprite.id);
                var machineConfig = getMachineConfigByType(machineModel.type);
                this.totalTime = machineConfig.time * 1000;

                if (!(sprite.buildTime % machineConfig.reduceRubyTime)) {
                    if (sprite.buildExpress > 0) {
                        sprite.buildExpress--;
                    }
                    if (_loadingBarConstructed) {
                        _loadingBarConstructed.rubyNumber.setString(sprite.buildExpress.toString());
                    }
                }
                //if (_loadingBarConstructed) {
                //    _loadingBarConstructed.rubyNumber.setString(sprite.buildExpress);
                //}
                sprite.buildTime += dt;

                if (sprite.buildTime >= sprite.totalTime) {
                    var completedSprite = new ConstructedCompletedSprite(id, machineModel.coordinate.x,
                        machineModel.coordinate.y, sprite.typeBuilding, sprite.typeMapObject);
                    MapLayer.instance.addChild(completedSprite);
                    MapCtrl.instance.addSpriteAlias(completedSprite);
                    completedSprite.setLogicPosition(machineModel.coordinate.x, machineModel.coordinate.y, false);
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
        cc.log("Send Completed Building0");

        testnetwork.connector.sendBuildCompleted(id, typeBuilding);
    },

    selectConstructedObject: function (id, typeBuilding, buildExpress) {
        //cc.log("buildExpress " + buildExpress);
        //if (_loadingBarConstructed) {
        //    //cc.log("!_loadingBarConstructed.parent" + !_loadingBarConstructed.parent);
        //    if (_loadingBarConstructed.parent) {
        //        _loadingBarConstructed.removeFromParent();
        //    }
        //    _loadingBarConstructed = null;
        //}
        switch (typeBuilding) {
            case MapItemEnum.MACHINE:
                //cc.log("Machine constructed");
                var machineModel = user.asset.getMachineById(id);
                //cc.log("machineModel " + id);
                var machineConfig = getMachineConfigByType(machineModel.type);
                _loadingBarConstructed = new LoadingBarLayout(machineConfig.time, machineModel.startBuildTime,
                    fr.Localization.text(machineConfig.name), buildExpress.toString());
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