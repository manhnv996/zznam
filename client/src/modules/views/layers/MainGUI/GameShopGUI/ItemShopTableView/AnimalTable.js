/**
 * Created by CPU60075_LOCAL on 20/11/2017.
 */

var AnimalTable = cc.Layer.extend({
    _sprite: null,
    _check: null,
    _tableView: null,
    lstP : {x: 0, y : 0},
    autoMoveHor: 0,
    autoMoveVer: 0,

    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
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

    scrollViewDidScroll: function (view) {

    },
    scrollViewDidZoom: function (view) {

    },

    tableCellTouched: function (table, cell) {
        cc.log("Animal Table: " + cell.getIdx());
    },

    tableCellSizeForIndex: function (table, idx) {
        //return cc.size((cc.winSize.width / 3), 142 * ((cc.winSize.width / 3) / 316));
        return cc.size(363, 142 * (363 / 316));
    },

    tableCellAtIndex: function (table, idx) {
        // cc.log("Create Cell " + idx);
        var cell = table.dequeueCell();
        var id;
        var image;
        var title;
        var detail;
        var slot;
        var price;
        var curslot = 0;
        var maxslot = 0;
        var numberLodge = 0;

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

        id = new cc.LabelTTF(res.infoAnimalItem[idx].id);
        id.tag = 0;
        id.setVisible(false);
        cell.addChild(id);

        image = new ccui.Button(res.infoAnimalItem[idx].nameIconShop);
        image.x = box.width / 4 * 3;
        image.y = box.height / 2;
        var scaleImg = imgBg.getContentSize().height / image.getContentSize().height;
        image.setScale(scaleImg);
        image.tag = 1;

        title = new cc.LabelBMFont(res.infoAnimalItem[idx].title, res.FONT_OUTLINE_30);
        title.x = box.width / 10 - 10;
        title.y = box.height - 10;
        title.setAnchorPoint(0, 1);
        title.tag = 2;

        detail = new cc.LabelBMFont(res.infoAnimalItem[idx].detail, res.FONT_NORMAL_30);
        detail.x = box.width / 3;
        detail.y = box.height / 2;
        detail.color = cc.color(77, 41, 1);
        detail.tag = 3;

        numberLodge = GameShopController.instance.getNumberLodge(res.infoAnimalItem[idx].id + "_habitat");
        curslot = GameShopController.instance.getNumberAnimal(res.infoAnimalItem[idx].id);
        maxslot = numberLodge * res.infoAnimalItem[idx].slot;

        if (!maxslot) {
            image.setTouchEnabled(false);
        } else if (curslot < maxslot) {
            image.addTouchEventListener(this.touchBuyEvent, this);
        }

        slot = new cc.LabelBMFont(curslot.toString() + "/" + maxslot.toString(), res.FONT_OUTLINE_30);
        slot.x = box.width / 3 * 2;
        slot.y = box.height / 5 * 4;
        slot.tag = 4;

        var p;
        if (curslot < res.infoAnimalItem[idx].slot) {
            p = res.infoAnimalItem[idx].price[0];
        } else {
            for (var i = 1; i <= res.infoAnimalItem[idx].price.length - 1; i++) {
                if (res.infoAnimalItem[idx].slot * i <= curslot && curslot < res.infoAnimalItem[idx].slot * (i + 1)) {
                    p = res.infoAnimalItem[idx].price[i];
                    break;
                }
            }
        }

        price = new cc.LabelBMFont(fr.toMoney(p), res.FONT_OUTLINE_30);
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
        return res.infoAnimalItem.length;
    },

    touchBuyEvent: function (sender, type) {
        //var lstP = {x: 0, y : 0};
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                this.lstLocation = sender.getTouchBeganPosition();
                this.lstLocation = MapValues.screenPositionToLogic(this.lstLocation.x, this.lstLocation.y);
                this.smoothMove = false;
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
                    var beganP = sender.getTouchBeganPosition();
                    var createP = MapValues.screenPositionToLogic(beganP.x, beganP.y);
                    createP.x = Math.floor(createP.x);
                    createP.y = Math.floor(createP.y);
                    this.typeObject = sender.parent.getChildByTag(0).getString();
                    switch (this.typeObject) {
                        case "chicken":
                            this._sprite = new ChickenSprite();
                            break;
                        case "cow":
                            this._sprite = new CowSprite();
                            break;
                    }
                    this.smoothMove = true;
                    if (this._sprite) {
                        this._sprite.demo();
                        //this._sprite.setLocalZOrder(10000);
                        MapLayer.instance.addChild(this._sprite);
                    }
                }
                //cc.log("Touch Moved");
                break;
            case ccui.Widget.TOUCH_ENDED:
                if(this._sprite){
                    this.buyAnimalFail();
                }
                 //cc.log("Touch Ended");
                break;
            case ccui.Widget.TOUCH_CANCELED:
                this.unscheduleUpdate();
                if (this._sprite) {
                    var endP = sender.getTouchEndPosition();
                    var endPl = MapValues.screenPositionToLogic(endP.x, endP.y);
                    endPl.x = Math.floor(endPl.x);
                    endPl.y = Math.floor(endPl.y);
                    this._sprite.retain();
                    this._sprite.removeFromParent(true);
                    var lodgeModel = user.asset.getLodgeByPosition(endPl.x, endPl.y);
                    if (!lodgeModel ||
                        (lodgeModel.animalList.length >= GameShopController.instance.getLodgeSlotByType(lodgeModel.type))) {
                        BaseGUILayer.instance.notifyCantPut(fr.Localization.text("Text_can_not_place"), endP.x, endP.y);
                        this.buyAnimalFail();
                    } else {
                        if (lodgeModel.type != (this.typeObject + "_habitat")) {
                            BaseGUILayer.instance.notifyCantPut(fr.Localization.text("Text_place_pet"), endP.x, endP.y);
                            this.buyAnimalFail();
                        } else {
                            cc.log("lodgeModel", lodgeModel.type);
                            //Check gold
                            var missGold = GameShopController.instance.checkGold(sender.parent.getChildByTag(5).getString());
                            if (missGold) {
                                cc.eventManager.removeListener(this._sprite.touchListener);
                                BaseGUILayer.instance.notifyShopNotEnoughGold(missGold, this.typeObject,
                                    endPl.x, endPl.y, lodgeModel.id);
                            } else {
                                //model
                                var animalModel = new Animal(this.typeObject, 0, false, 0);
                                lodgeModel.addAnimal(animalModel);

                                //add to lodge sprite
                                var lodgeSprite = MapLayer.instance.getChildByTag(TagClusters.Lodge + lodgeModel.id);
                                this._sprite.setId(animalModel.id);
                                lodgeSprite.addAnimalSprite(this._sprite);
                                this._sprite.hungry();
                                user.reduceGold(sender.parent.getChildByTag(5).getString());
                                //Send Server
                                testnetwork.connector.sendBuyAnimal(lodgeModel.id, animalModel.id,
                                    animalModel.type, endPl.x, endPl.y);

                                //GameShopLayout.instance.show();
                                if (GameShopLayout.instance._isHide) {
                                    GameShopLayout.instance.show();
                                }
                            }
                        }
                    }
                }
                //this.endTouch();
                //this._sprite = null;
                this._tableView.updateCellAtIndex(sender.parent.getIdx());
                break;
        }
    },

    update: function (dt) {
        var location = this.movedP;
        var logic = MapValues.screenPositionToLogic(location.x, location.y);
        if (this.smoothMove) {
            if (this._sprite) {
                this._sprite.setLogicPosition(logic, true);
            }
        } else {
            logic.x = Math.floor(logic.x);
            logic.y = Math.floor(logic.y);
            if (this.lstLocation.x !== logic.x ||
                this.lstLocation.y !== logic.y) {
                // cc.log("Map Alias", this.mapAliasType);
                // cc.log("move to", logic, MapCtrl.instance.checkValidBlock(logic.x, logic.y, this.blockSizeX, this.blockSizeY, this.mapAliasType));
                this.lstLocation = logic;
                if (this._sprite) {
                    this._sprite.setLogicPosition(logic, true);
                }
            }
        }
        if (this.autoMoveHor || this.autoMoveVer) {
            var dx = this.autoMoveHor * dt * 250;
            var dy = this.autoMoveVer * dt * 250;
            MapLayer.instance.move(-dx, -dy);
        }
    },

    buyAnimalFail: function () {
        this._sprite.setVisible(false);
        cc.eventManager.removeListener(this._sprite.touchListener);
        this._sprite.removeFromParent(true);
        this._sprite = null;
        if (GameShopLayout.instance._isHide) {
            GameShopLayout.instance.show();
        }
    }

});