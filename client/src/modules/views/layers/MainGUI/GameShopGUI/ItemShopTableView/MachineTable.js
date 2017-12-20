/**
 * Created by CPU60075_LOCAL on 20/11/2017.
 */

var MachineTable = cc.Layer.extend({
    //_isHide: false,
    _sprite: null,
    _check: null,
    _tableView: null,
    lstP : {x: 0, y : 0},
    autoMoveHor: 0,
    autoMoveVer: 0,

    ctor: function () {
        this._super();
        //cc.log("Machine Table");
        this.init();
    },

    init:function () {
        var winSize = cc.director.getWinSize();

        this._tableView = new cc.TableView(this, cc.size(363, cc.winSize.height / 9 * 8));
        this._tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this._tableView.x = 0;
        this._tableView.y = 0;
        this._tableView.setDelegate(this);
        this._tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.addChild(this._tableView);
        this._tableView.reloadData();

        return true;
    },

    scrollViewDidScroll:function (view) {

    },
    scrollViewDidZoom:function (view) {

    },

    tableCellTouched:function (table, cell) {
        cc.log("Lodge Table " + cell.getIdx());
    },

    tableCellSizeForIndex:function (table, idx) {
        return cc.size(363, 142 * (363 / 316));
    },

    tableCellAtIndex:function (table, idx) {
        // cc.log("Create Cell " + idx);
        ///var strValue = idx;
        var cell = table.dequeueCell();
        var level = user.getLevel();
        var image;
        var title;
        var detail;
        var slot;
        var id;
        var curslot = 0;
        var maxslot = 0;
        var price;

            cell = new cc.TableViewCell();
            var imgBg = new cc.Sprite(res.shop_slot_png);
            imgBg.x = 0;
            imgBg.y = 0;
            imgBg.anchorX = 0;
            imgBg.anchorY = 0;
            var scale = (cc.winSize.width / 3) / imgBg.getContentSize().width;
            imgBg.setScale(scale);
            cell.addChild(imgBg);

            var box = imgBg.getBoundingBox();

            var goldImg = new cc.Sprite(res.gold_png);
            goldImg.x = imgBg.getBoundingBox().width / 2;
            goldImg.y = 0;
            goldImg.setAnchorPoint(0.5, -0.5);
            cell.addChild(goldImg);

            id = new cc.LabelTTF(res.infoMachineItem[idx].id);
            id.tag = 0;
            id.setVisible(false);
            cell.addChild(id);

            image = new ccui.Button(res.infoMachineItem[idx].nameIconShop);
            //image = new cc.Sprite(res.infoMachineItem[idx].nameIconShop);
            image.x = box.width / 4 * 3;
            image.y = box.height / 2;
            var scaleImg = imgBg.getContentSize().height / image.getContentSize().height;
            image.setScale(scaleImg);
            image.tag = 1;

            title = new cc.LabelBMFont(fr.Localization.text(res.infoMachineItem[idx].name), res.FONT_OUTLINE_30);
            title.x = box.width / 10 - 10;
            title.y = box.height - 10;
            title.setAnchorPoint(0, 1);
            title.tag = 2;

            detail = new cc.LabelBMFont(fr.Localization.text(res.infoMachineItem[idx].detail), res.FONT_NORMAL_30);
            detail.x = box.width / 3;
            detail.y = box.height / 2;
            detail.color = cc.color(77, 41, 1);
            detail.tag = 3;


            if (level < res.infoMachineItem[idx].level) {
                detail.setString(fr.Localization.text("text_unlock_detail") + res.infoMachineItem[idx].level);
                image.setTouchEnabled(false);
            } else {
                curslot = GameShopController.instance.getNumberMachine(res.infoMachineItem[idx].id);
                maxslot = res.infoMachineItem[idx].number;

                if (curslot < maxslot) {
                    image.addTouchEventListener(this.touchBuyEvent, this);
                }
            }

            slot = new cc.LabelBMFont(curslot.toString() + "/" + maxslot.toString(), res.FONT_OUTLINE_30);
            slot.x = box.width / 3 * 2;
            slot.y = box.height / 5 * 4;
            slot.tag = 4;

            price = new cc.LabelBMFont(fr.toMoney(res.infoMachineItem[idx].price), res.FONT_OUTLINE_30);
            //price = new cc.LabelBMFont(res.infoMachineItem[idx].price, res.FONT_OUTLINE_30);
            price.x = box.width / 5 * 2;
            price.y = 0;
            price.setAnchorPoint(1, -0.5);
            price.tag = 5;

            cell.addChild(image);
            cell.addChild(title);
            cell.addChild(detail);
            cell.addChild(price);
            cell.addChild(slot);
        return cell;
    },

    numberOfCellsInTableView:function (table) {
        return res.infoMachineItem.length;
    },

    touchBuyEvent: function (sender, type) {
        //var lstP = {x: 0, y : 0};
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                this.lstLocation = sender.getTouchBeganPosition();
                this.lstLocation = MapValues.screenPositionToLogic(this.lstLocation.x, this.lstLocation.y);
                //cc.log("Touch Began");
                break;
            case ccui.Widget.TOUCH_MOVED:
                //cc.log(sender.getTouchBeganPosition());
                this.movedP = sender.getTouchMovePosition();

                var winSize = cc.winSize;
                var BORDER_AUTO_MOVE = 100;

                // Auto moving when mouse nears borders
                if (this.movedP.x < BORDER_AUTO_MOVE) {
                    this.autoMoveHor = -1;
                } else if (winSize.width - this.movedP.x < BORDER_AUTO_MOVE) {
                    this.autoMoveHor = 1;
                } else {
                    this.autoMoveHor = 0;
                }

                if (this.movedP.y < BORDER_AUTO_MOVE) {
                    this.autoMoveVer = -1;
                } else if (winSize.height - this.movedP.y < BORDER_AUTO_MOVE) {
                    this.autoMoveVer = 1;
                } else {
                    this.autoMoveVer = 0;
                }

                if (!GameShopLayout.instance._isHide) {
                    this.scheduleUpdate();
                    GameShopLayout.instance.hide();
                    //this._isHide = true;
                    var beganP = sender.getTouchBeganPosition();
                    var createP = MapValues.screenPositionToLogic(beganP.x, beganP.y);
                    createP.x = Math.floor(createP.x);
                    createP.y = Math.floor(createP.y);
                    this.typeObject = sender.parent.getChildByTag(0).getString();
                    switch (this.typeObject) {
                        case "bakery_machine":
                            this._sprite = new BakerySprite(user.getAsset().getMachineList().length + 1,
                                createP.x, createP.y);
                            break;
                        case "food_machine":
                            this._sprite = new FoodMachineSprite(user.getAsset().getMachineList().length + 1,
                                createP.x, createP.y);
                            break;
                        case "butter_machine":
                            this._sprite = new ButterMachineSprite(user.getAsset().getMachineList().length + 1,
                                createP.x, createP.y);
                            break;
                        case "sugar_machine":
                            this._sprite = new SugarCaneSprite(user.getAsset().getMachineList().length + 1,
                                createP.x, createP.y);
                            break;
                        case "popcorn_machine":
                            this._sprite = new PopcornMachineSprite(user.getAsset().getMachineList().length + 1,
                                createP.x, createP.y);
                            break;
                    }
                    if (this._sprite) {
                        this._sprite.setLocalZOrder(10000);
                        MapLayer.instance.addChild(this._sprite);
                    }
                }
                //cc.log(this._sprite);
                //if (this._sprite) {
                //    if (p.x !== lstP.x || p.y !== lstP.y) {
                //        this._sprite.setLogicPosition(p.x, p.y, true);
                //        lstP = p;
                //        //cc.log(Math.floor(psl.x) + " : " + Math.floor(psl.y));
                //    }
                //}
                // cc.log("Touch Moved");
                break;
            case ccui.Widget.TOUCH_ENDED:
                if(this._sprite){
                    this._sprite.setVisible(false);
                    this._sprite.removeFromParent(true);
                    this._sprite = null;
                    if (GameShopLayout.instance._isHide) {
                        GameShopLayout.instance.show();
                    }
                }
                // cc.log("Touch Ended");
                break;
            case ccui.Widget.TOUCH_CANCELED:
                this.unscheduleUpdate();
                if (this._sprite) {
                    var endP = sender.getTouchEndPosition();
                    var endPl = MapValues.screenPositionToLogic(endP.x, endP.y);
                    endPl.x = Math.floor(endPl.x);
                    endPl.y = Math.floor(endPl.y);
                    this._check = MapCtrl.instance.checkValidBlockSprite(this._sprite);
                    this._sprite.removeFromParent(true);
                    if (!this._check) {
                        BaseGUILayer.instance.notifyCantPut(fr.Localization.text("Text_can_not_place"), endP.x, endP.y);
                        if (GameShopLayout.instance._isHide) {
                            GameShopLayout.instance.show();
                        }
                    } else {
                        var missGold = GameShopController.instance.checkGold(fr.moneyToNumber(sender.parent.getChildByTag(5).getString()));
                        cc.log(missGold);
                        if (missGold) {
                            BaseGUILayer.instance.notifyShopNotEnoughGold(missGold, this.typeObject,
                                endPl.x, endPl.y);
                        } else {
                            // Success
                            var machineConfig = getMachineConfigByType(this.typeObject);
                            var machineModel = new Machine(0, this.typeObject, machineConfig.slot, 0, null, false,
                                false, getTime(), machineConfig.time, new Coordinate(endPl.x, endPl.y));
                            user.getAsset().addMachine(machineModel);

                            //Sprite
                            switch (this.typeObject) {
                                case "bakery_machine":
                                    //Constructed Sprite
                                    this._sprite = new ConstructedSprite(machineModel.id,
                                        MapConfigs.BakeryMachine.size.width, MapConfigs.BakeryMachine.size.height,
                                        machineModel.coordinate.x, machineModel.coordinate.y,
                                        MapItemEnum.MACHINE);
                                    break;
                                case "food_machine":
                                    this._sprite = new ConstructedSprite(machineModel.id,
                                        MapConfigs.FoodMachine.size.width, MapConfigs.FoodMachine.size.height,
                                        machineModel.coordinate.x, machineModel.coordinate.y,
                                        MapItemEnum.MACHINE);
                                    break;
                                case "butter_machine":
                                    this._sprite = new ConstructedSprite(machineModel.id,
                                        MapConfigs.ButterMachine.size.width, MapConfigs.ButterMachine.size.height,
                                        machineModel.coordinate.x, machineModel.coordinate.y,
                                        MapItemEnum.MACHINE);
                                    break;
                                case "sugar_machine":
                                    this._sprite = new ConstructedSprite(machineModel.id,
                                        MapConfigs.SugarMachine.size.width, MapConfigs.SugarMachine.size.height,
                                        machineModel.coordinate.x, machineModel.coordinate.y,
                                        MapItemEnum.MACHINE);
                                    break;
                                case "popcorn_machine":
                                    this._sprite = new ConstructedSprite(machineModel.id,
                                        MapConfigs.PopcornMachine.size.width, MapConfigs.PopcornMachine.size.height,
                                        machineModel.coordinate.x, machineModel.coordinate.y,
                                        MapItemEnum.MACHINE);
                                    break;

                            }
                            MapLayer.instance.addChild(this._sprite);
                            MapCtrl.instance.addSpriteAlias(this._sprite);
                            this._sprite.setLogicPosition(this._sprite.lx, this._sprite.ly, true);
                            user.reduceGold(sender.parent.getChildByTag(5).getString());
                            //Send Server
                            testnetwork.connector.sendBuyMapObjectRequest(machineModel.id,
                                machineModel.type, endPl.x, endPl.y);

                            GameShopLayout.instance.show();
                        }
                    }
                }
                this._sprite = null;
                this._tableView.updateCellAtIndex(sender.parent.getIdx());
                // cc.log("Touch Canceled");
                break;
        }
    },

    update: function (dt) {
        var location = this.movedP;
        var logic = MapValues.screenPositionToLogic(location.x, location.y);
        logic.x = Math.floor(logic.x);
        logic.y = Math.floor(logic.y);
        if (this.lstLocation.x !== logic.x ||
            this.lstLocation.y !== logic.y) {
            // cc.log("Map Alias", this.mapAliasType);
            // cc.log("move to", logic, MapCtrl.instance.checkValidBlock(logic.x, logic.y, this.blockSizeX, this.blockSizeY, this.mapAliasType));
            this.lstLocation = logic;
            if (this._sprite) {
                this._sprite.setLogicPosition(logic, true);
                MapCtrl.instance.changeColor(this._sprite);
            }
        }
        if (this.autoMoveHor || this.autoMoveVer) {
            var dx = this.autoMoveHor * dt * 250;
            var dy = this.autoMoveVer * dt * 250;
            MapLayer.instance.move(-dx, -dy);
        }
    }

});