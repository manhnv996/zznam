/**
 * Created by CPU60075_LOCAL on 12/4/2017.
 */
var _loadingBarConstructed = null;

var ConstructedCtrl = cc.Class.extend({

    //getBuildTime: function (id) {
    //    var machineModel = user.asset.getMachineById(id);
    //    var machineConfig = getMachineConfigByType(machineModel.type);
    //    //var startTime = machineModel.startBuildTime;
    //    //var curTime = getTime();
    //    var buildTime = machineConfig.time - machineModel.remainBuildTime;
    //    return buildTime;
    //},

    getBuildExpress: function (id) {
        var machineModel = user.asset.getMachineById(id);
        var machineConfig = getMachineConfigByType(machineModel.type);

        var buildTime = machineConfig.time - machineModel.remainBuildTime;
        cc.log("machineModel.remainBuildTime", machineModel.remainBuildTime);

        var reduceRuby = Math.floor(buildTime / machineConfig.reduceRubyTime);
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
                //this.totalTime = machineConfig.time * 1000;
                machineModel.reduceRemainBuildTime(dt);

                var buildTime = machineConfig.time - machineModel.remainBuildTime;

                //cc.log("machineConfig.reduceRubyTime ", machineConfig.reduceRubyTime);
                //cc.log("machineModel.remainBuildTime", machineModel.remainBuildTime);
                //cc.log("buildTime % machineConfig.reduceRubyTime", (buildTime % machineConfig.reduceRubyTime));
                if (!(buildTime % machineConfig.reduceRubyTime)) {
                    if (sprite.buildExpress > 0) {
                        sprite.buildExpress--;
                    }
                    if (_loadingBarConstructed) {
                        _loadingBarConstructed.rubyNumber.setString(sprite.buildExpress.toString());
                    }
                }

                if (machineModel.remainBuildTime === 0) {
                    sprite.unschedule(sprite.updateTime);
                    //var completedSprite = new ConstructedCompletedSprite(id, machineModel.coordinate.x,
                    //    machineModel.coordinate.y, sprite.typeBuilding, sprite.typeMapObject);
                    //MapLayer.instance.addChild(completedSprite);
                    //MapCtrl.instance.addSpriteAlias(completedSprite);
                    //completedSprite.setLogicPosition(machineModel.coordinate.x, machineModel.coordinate.y, true);
                    this.addCompletedBuildSprite(machineModel, sprite.typeBuilding, sprite.blockSizeX);
                    return true;
                } else {
                    return false;
                }
        }
    },

    addCompletedBuildSprite: function (model, typeBuilding, blockSize) {
        var completedSprite = new ConstructedCompletedSprite(model.id, model.coordinate.x,
            model.coordinate.y, typeBuilding, blockSize);
        MapLayer.instance.addChild(completedSprite);
        //completedSprite = MapLayer.instance.debugSprite;
        MapCtrl.instance.addSpriteAlias(completedSprite);
        completedSprite.setLogicPosition(model.coordinate.x, model.coordinate.y, true);
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
                        break;
                    case "food_machine":
                        machineSprite = new FoodMachineSprite(id, machineModel.coordinate.x,
                            machineModel.coordinate.y);
                        break;
                    case "butter_machine":
                        machineSprite = new ButterMachineSprite(id, machineModel.coordinate.x,
                            machineModel.coordinate.y);
                        break;
                    case "sugar_machine":
                        machineSprite = new SugarCaneSprite(id, machineModel.coordinate.x,
                            machineModel.coordinate.y);
                        break;
                    case "popcorn_machine":
                        machineSprite = new PopcornMachineSprite(id, machineModel.coordinate.x,
                            machineModel.coordinate.y);
                        break;
                }
                break;
        }
        var p = MapValues.logicToScreenPosition(machineModel.coordinate.x, machineModel.coordinate.y);

        AnimateEventLayer.instance.animateExp(p.x, p.y, getMachineConfigByType(machineModel.type).buildExp);
        user.addExp(getMachineConfigByType(machineModel.type).buildExp);
        machineModel.completed = true;
        MapLayer.instance.addChild(machineSprite);
        MapCtrl.instance.addSpriteAlias(machineSprite);

        machineSprite.setLogicPosition(machineModel.coordinate.x, machineModel.coordinate.y, true);

        //send server

        testnetwork.connector.sendBuildCompleted(id, typeBuilding);
    },

    selectConstructedObject: function (sprite) {
        switch (sprite.typeBuilding) {
            case MapItemEnum.MACHINE:
                //cc.log("Machine constructed");
                var machineModel = user.asset.getMachineById(sprite.id);

                //cc.log("machineModel " + id);
                var machineConfig = getMachineConfigByType(machineModel.type);
                _loadingBarConstructed = new LoadingBarLayout(machineConfig.time,
                                                            machineModel.startBuildTime,
                                                            machineConfig.name,
                                                            sprite.buildExpress.toString(),
                                                            machineModel.remainBuildTime);
                var py = machineModel.coordinate.y;
                var px = machineModel.coordinate.x;
                var p = MapValues.logicToScreenPosition(px, py);
                _loadingBarConstructed.setPosition(p.x, p.y);
                //cc.log("LoadingBar position " + machineModel.coordinate.x + " " + machineModel.coordinate.y);
                BaseGUILayer.instance.addChild(_loadingBarConstructed);

                _loadingBarConstructed.sprite = sprite;
                _loadingBarConstructed.boostBtn.addTouchEventListener(this.boostBuild, this);

                break;
        }
    },

    boostBuild: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                var scaleDown = cc.scaleTo(0.1, 0.9);
                sender.runAction(scaleDown);
                break;
            case ccui.Widget.TOUCH_ENDED:
            case ccui.Widget.TOUCH_CANCELED:
                var scaleUp = cc.scaleTo(0.1, 1.0);
                sender.runAction(scaleUp);
                //var curPercent = _loadingBarConstructed.progress.getPercent();
                //
                //for (var i = curPercent; i <= 100; i++) {
                //    _loadingBarConstructed.progress.setPercent(i);
                //    cc.log("i " + i);
                //}
                //Check ruby ---> send server --> set completed build
                var ruby = parseInt(_loadingBarConstructed.rubyNumber.getString());
                if (ruby > user.ruby) {
                    BaseGUILayer.instance.notifyNotEnoughRuby(ruby - user.ruby, true);
                } else {
                    user.reduceRuby(ruby);
                    testnetwork.connector.sendBoostBuild(_loadingBarConstructed.sprite.id,
                                                        _loadingBarConstructed.sprite.typeBuilding);


                    var machineModel = user.asset.getMachineById(_loadingBarConstructed.sprite.id);
                    machineModel.setBoostBuild();
                    this.addCompletedBuildSprite(machineModel, _loadingBarConstructed.sprite.typeBuilding,
                         _loadingBarConstructed.sprite.blockSizeX);

                    _loadingBarConstructed.sprite.removeFromParent(true);
                    //this.completedBuild(_loadingBarConstructed.id,
                    //    _loadingBarConstructed.typeBuilding);
                }

                _loadingBarConstructed.closeLoadingBar();

                //cc.log("id " +  _loadingBarConstructed.id);

                break;
        }
    }

});