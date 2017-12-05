/**
 * Created by CPU60075_LOCAL on 12/4/2017.
 */

var ConstructedCtrl = cc.Class.extend({

    checkBuildTime: function (id, typeBuilding) {
        switch (typeBuilding) {
            case MapItemEnum.MACHINE:
                var machineModel = user.asset.getMachineById(id);
                var machineConfig = getMachineConfigByType(machineModel.type);

                var startTime = machineModel.startBuildTime;
                var totalTime = machineConfig.time * 1000;
                var curTime = new Date().getTime();

                if ((curTime - startTime) >= totalTime) {
                    var completedSprite = new ConstructedCompletedSprite(id, machineModel.coordinate.x,
                                                            machineModel.coordinate.y, typeBuilding);
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

        machineSprite.setLogicPosition(machineModel.coordinate.x, machineModel.coordinate.y, false);

        //send server
        testnetwork.connector.sendBuildCompleted(id, typeBuilding);
    },

    selectConstructedObject: function (id, typeBuilding) {
        switch (typeBuilding) {
            case MapItemEnum.MACHINE:
                //cc.log("Machine constructed");
                var machineModel = user.asset.getMachineById(id);
                var machineConfig = getMachineConfigByType(machineModel.type);
                this.loadingBar = new LoadingBarLayout(machineConfig.time, machineModel.startBuildTime,
                    fr.Localization.text(machineConfig.name), machineConfig.buildExpress);
                var py = machineModel.coordinate.y;
                var px = machineModel.coordinate.x;
                var p = MapValues.logicToScreenPosition(px, py);
                this.loadingBar.setPosition(p.x, p.y);
                //cc.log("LoadingBar position " + machineModel.coordinate.x + " " + machineModel.coordinate.y);
                BaseGUILayer.instance.addChild(this.loadingBar);
                this._isHasLoadingBar = true;
                break;
        }
    }

});