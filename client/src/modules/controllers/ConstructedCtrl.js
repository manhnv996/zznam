/**
 * Created by CPU60075_LOCAL on 12/4/2017.
 */
var ConstructedCtrl = cc.Class.extend({

    getBuildExpress: function (id) {
        var machineModel = user.asset.getMachineById(id);
        cc.log("machineType", machineModel.machineType);
        var machineConfig = getMachineConfigByType(machineModel.machineType);

        var buildTime = machineConfig.time - machineModel.remainBuildTime;
        var reduceRuby = Math.floor(buildTime / machineConfig.reduceRubyTime);
        var buildExpress = machineConfig.buildExpress - reduceRuby;
        if (buildExpress < 0) {
            buildExpress = 0;
        }
        return buildExpress;
    },

    checkBuildTime: function (sprite, dt) {
        switch (sprite.typeBuilding) {
            case MapItemEnum.MACHINE:
                var machineModel = user.asset.getMachineById(sprite.id);
                var machineConfig = getMachineConfigByType(machineModel.machineType);
                machineModel.reduceRemainBuildTime(dt);

                if (machineModel.remainBuildTime <= 0) {
                    sprite.progressBar = null;
                    sprite.unschedule(sprite.updateTime);
                    sprite.removeFromParent(true);
                    this.addCompletedBuildSprite(machineModel, sprite.typeBuilding, sprite.blockSizeX, sprite.blockSizeY);
                    return;
                }

                var buildTime = machineConfig.time - machineModel.remainBuildTime;
                if (!(buildTime % machineConfig.reduceRubyTime)) {
                    if (sprite.buildExpress > 0) {
                        sprite.buildExpress--;
                    }

                    if (sprite.progressBar) {
                        sprite.progressBar.rubyNumber.setString(sprite.buildExpress.toString());
                    }
                }
        }
    },

    addCompletedBuildSprite: function (model, typeBuilding, blockSizeX, blockSizeY) {
        var completedSprite = new ConstructedCompletedSprite(model.machineId, model.coordinate.x,
            model.coordinate.y, typeBuilding, blockSizeX, blockSizeY);
        MapLayer.instance.addChild(completedSprite);
        //completedSprite = MapLayer.instance.debugSprite;
        //MapCtrl.instance.addSpriteAlias(completedSprite);
        completedSprite.setLogicPosition(model.coordinate.x, model.coordinate.y, true);
    },

    completedBuild: function (id, typeBuilding) {
        var machineSprite;
        var machineModel;
        switch (typeBuilding) {
            case MapItemEnum.MACHINE:
                machineModel = user.asset.getMachineById(id);
                machineSprite = new MachineSprite(id);
                MapLayer.instance.machineSpriteList.push(machineSprite);
            //switch (machineModel.type) {
                //    case "bakery_machine":
                //        machineSprite = new BakerySprite(id, machineModel.coordinate.x,
                //            machineModel.coordinate.y);
                //        break;
                //    case "food_machine":
                //        machineSprite = new FoodMachineSprite(id, machineModel.coordinate.x,
                //            machineModel.coordinate.y);
                //        break;
                //    case "butter_machine":
                //        machineSprite = new ButterMachineSprite(id, machineModel.coordinate.x,
                //            machineModel.coordinate.y);
                //        break;
                //    case "sugar_machine":
                //        machineSprite = new SugarCaneSprite(id, machineModel.coordinate.x,
                //            machineModel.coordinate.y);
                //        break;
                //    case "popcorn_machine":
                //        machineSprite = new PopcornMachineSprite(id, machineModel.coordinate.x,
                //            machineModel.coordinate.y);
                //        break;
                //}
                //break;
        }
        var p = MapValues.logicToScreenPosition(machineModel.coordinate.x, machineModel.coordinate.y);
        AnimateEventLayer.instance.animateExp(p.x, p.y, getMachineConfigByType(machineModel.machineType).buildExp);
        user.addExp(getMachineConfigByType(machineModel.machineType).buildExp);
        machineModel.completed = true;
        MapLayer.instance.addChild(machineSprite);
        MapLayer.instance.machineSpriteList.push(machineSprite);
        //MapCtrl.instance.addSpriteAlias(machineSprite);

        machineSprite.setLogicPosition(machineModel.coordinate.x, machineModel.coordinate.y, true);

        //send server
        testnetwork.connector.sendBuildCompleted(id, typeBuilding);
    },

    boostBuild: function (sprite) {
        SoundCtrl.instance.playSoundEffect(res.func_click_button_mp3, false);
        var ruby = parseInt(sprite.progressBar.rubyNumber.getString());
        if (ruby > user.ruby) {
            BaseGUILayer.instance.notifyNotEnoughRuby(ruby - user.ruby, true);
        } else {
            user.reduceRuby(ruby);
            var machineModel = user.asset.getMachineById(sprite.id);
            machineModel.setBoostBuild();
            this.addCompletedBuildSprite(machineModel, sprite.typeBuilding, sprite.blockSizeX, sprite.blockSizeY);
            sprite.removeFromParent(true);
            //Send server
            testnetwork.connector.sendBoostBuild(sprite.id, sprite.typeBuilding);
        }
    }

});