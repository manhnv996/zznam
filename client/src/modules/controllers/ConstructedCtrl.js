/**
 * Created by CPU60075_LOCAL on 12/4/2017.
 */
var _loadingBarConstructed = null;

var ConstructedCtrl = cc.Class.extend({

    //getBuildTime: function (id) {
    //    var machineModel = user.asset.getMachineById(id);
    //    var machineConfig = getMachineConfigByType(machineModel.type);
    //    //var startTime = machineModel.startBuildTime;
    //    //var curTime = new Date().getTime();
    //    var buildTime = machineConfig.time - machineModel.retainBuildTime;
    //    return buildTime;
    //},

    getBuildExpress: function (id) {
        var machineModel = user.asset.getMachineById(id);
        var machineConfig = getMachineConfigByType(machineModel.type);

        var buildTime = machineConfig.time - machineModel.retainBuildTime;

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
                machineModel.reduceRetainBuildTime(dt);

                var buildTime = machineConfig.time - machineModel.retainBuildTime;

                if (!(buildTime % machineConfig.reduceRubyTime)) {
                    if (sprite.buildExpress > 0) {
                        sprite.buildExpress--;
                    }
                    if (_loadingBarConstructed) {
                        _loadingBarConstructed.rubyNumber.setString(sprite.buildExpress.toString());
                    }
                }

                if (machineModel.retainBuildTime === 0) {
                    //var completedSprite = new ConstructedCompletedSprite(id, machineModel.coordinate.x,
                    //    machineModel.coordinate.y, sprite.typeBuilding, sprite.typeMapObject);
                    //MapLayer.instance.addChild(completedSprite);
                    //MapCtrl.instance.addSpriteAlias(completedSprite);
                    //completedSprite.setLogicPosition(machineModel.coordinate.x, machineModel.coordinate.y, true);
                    this.addCompletedBuildSprite(machineModel, sprite.typeBuilding, sprite.typeMapObject);
                    return true;
                } else {
                    return false;
                }
        }
    },

    addCompletedBuildSprite: function (model, typeBuilding, typeMapObject) {
        var completedSprite = new ConstructedCompletedSprite(model.id, model.coordinate.x,
            model.coordinate.y, typeBuilding, typeMapObject);
        MapLayer.instance.addChild(completedSprite);
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
                                                            fr.Localization.text(machineConfig.name),
                                                            sprite.buildExpress.toString());
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
                    BaseGUILayer.instance.notifyNotEnoughRuby(user.ruby - ruby);
                } else {
                    user.reduceRuby(ruby);
                    testnetwork.connector.sendBoostBuild(_loadingBarConstructed.sprite.id,
                                                        _loadingBarConstructed.sprite.typeBuilding);


                    var machineModel = user.asset.getMachineById(_loadingBarConstructed.sprite.id);
                    machineModel.setBoostBuild();
                    this.addCompletedBuildSprite(machineModel, _loadingBarConstructed.sprite.typeBuilding,
                        _loadingBarConstructed.sprite.typeMapObject);

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