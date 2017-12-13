/**
 * Created by CPU60075_LOCAL on 20/11/2017.
 */


var LodgeTable = cc.Layer.extend({
    //_isHide: false,
    _sprite: null,
    _check: null,
    _tableView: null,
    lstP: {x: 0, y: 0},
    autoMoveHor: 0,
    autoMoveVer: 0,

    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        //var layoutColor = new ccui.Layout();
        //layoutColor.setContentSize(cc.winSize.width / 3, cc.winSize.height / 9 * 8);
        //layoutColor.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        //layoutColor.setBackGroundColor(cc.color.RED);

        this._tableView = new cc.TableView(this, cc.size(363, cc.winSize.height / 9 * 8));
        this._tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this._tableView.x = 0;
        this._tableView.y = 0;
        this._tableView.setDelegate(this);
        this._tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this._tableView.reloadData();

        this.addChild(this._tableView);
        //
        //layoutColor.addChild(tableView);
        //this.addChild(layoutColor);

        //
        //layoutColor.addChild(tableView);
        //this.addChild(layoutColor);

        //return true;
    },

    scrollViewDidScroll: function (view) {
        //this.setSwallowTouches(false);
    },
    scrollViewDidZoom: function (view) {

    },

    tableCellTouched: function (table, cell) {
        cc.log("Lodge Table " + cell.getIdx());
    },

    tableCellSizeForIndex: function (table, idx) {
        return cc.size(363, 142 * (363 / 316));
    },

    tableCellAtIndex: function (table, idx) {
        var cell = table.dequeueCell();
        var level = user.getLevel();
        var imgBg;
        var id;
        var image;
        var title;
        var detail;
        var slot;
        var curslot = 0;
        var maxslot = 0;
        var price;

        //if (!cell) {
        cell = new cc.TableViewCell();
        imgBg = new cc.Sprite(res.shop_slot_png);
        imgBg.x = 0;
        imgBg.y = 0;
        imgBg.anchorX = 0;
        imgBg.anchorY = 0;
        //var scale = (cc.winSize.width / 3) / imgBg.getContentSize().width;
        var scale = 363 / imgBg.getContentSize().width;
        imgBg.setScale(scale);
        //imgBg.tag = 1000;

        var box = imgBg.getBoundingBox();

        var goldImg = new cc.Sprite(res.gold_png);
        goldImg.x = box.width / 2;
        goldImg.y = 0;
        goldImg.setAnchorPoint(0.5, -0.5);

        id = new cc.LabelTTF(res.infoCoopItem[idx].id);
        id.tag = 0;
        id.setVisible(false);
        cell.addChild(id);

        image = new ccui.Button(res.infoCoopItem[idx].nameIconShop);
        //image = new cc.Sprite(res.infoCoopItem[idx].nameIconShop);
        image.x = box.width / 4 * 3;
        image.y = box.height / 2;
        var scaleImg = imgBg.getContentSize().height / image.getContentSize().height;
        image.setScale(scaleImg);
        image.tag = 1;

        title = new cc.LabelBMFont(fr.Localization.text(res.infoCoopItem[idx].name), res.FONT_OUTLINE_30);
        title.x = box.width / 10 - 10;
        title.y = box.height - 10;
        title.setAnchorPoint(0, 1);
        title.tag = 2;

        detail = new cc.LabelBMFont(fr.Localization.text(res.infoCoopItem[idx].detail), res.FONT_NORMAL_30);
        detail.x = box.width / 3;
        detail.y = box.height / 2;
        detail.color = cc.color(77, 41, 1);
        detail.tag = 3;

        //curslot = GameShopController.instance.getNumberLodge(res.infoCoopItem[idx].id);
        //maxslot = 0;

        if (level < res.infoCoopItem[idx].level[0]) {
            detail.setString(fr.Localization.text("text_unlock_detail") + res.infoCoopItem[idx].level[0]);
            image.setTouchEnabled(false);
        } else {
            if (res.infoCoopItem[idx].id === "field") {
                curslot = user.getAsset().getFieldList().length;
            } else {
                curslot = GameShopController.instance.getNumberLodge(res.infoCoopItem[idx].id);
            }
        }

        maxslot = GameShopController.instance.getMaxLodge(res.infoCoopItem[idx].id);

        if (curslot < maxslot) {
            image.addTouchEventListener(this.touchBuyEvent, this);
        }

        slot = new cc.LabelBMFont(curslot.toString() + "/" + maxslot.toString(), res.FONT_OUTLINE_30);
        slot.x = box.width / 3 * 2;
        slot.y = box.height / 5 * 4;
        slot.tag = 4;

        price = new cc.LabelBMFont(res.infoCoopItem[idx].price, res.FONT_OUTLINE_30);
        price.x = box.width / 5 * 2;
        price.y = 0;
        price.setAnchorPoint(1, -0.5);
        price.tag = 5;


        cell.addChild(imgBg);
        cell.addChild(goldImg);

        cell.addChild(image);
        cell.addChild(title);
        cell.addChild(detail);
        cell.addChild(price);
        cell.addChild(slot);

        return cell;
    },

    numberOfCellsInTableView: function (table) {
        return res.infoCoopItem.length;
    },

    touchBuyEvent: function (sender, type) {
        //var sprite = null;
        //this.lstP = {x: 0, y : 0};
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                this.lstLocation = sender.getTouchBeganPosition();
                this.lstLocation = MapValues.screenPositionToLogic(this.lstLocation.x, this.lstLocation.y);
                //cc.log("Touch Began");
                break;
            case ccui.Widget.TOUCH_MOVED:
                //cc.log(sender.getTouchBeganPosition());
                //this.lastMouse = sender.getTouch()
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
                    switch (sender.parent.getChildByTag(0).getString()) {
                        case "field":
                            this._sprite = new FieldSprite(user.asset.getFieldList().length + 1, createP.x, createP.y);
                            break;
                        case AnimalLodgeType.chicken_habitat:
                            this._sprite = new ChickenLodgeSprite(createP.x, createP.y);
                            break;
                        case AnimalLodgeType.cow_habitat:
                            this._sprite = new CowLodgeSprite(createP.x, createP.y);
                            break;
                        //case "pig_habitat":
                        //    break;
                        //case "sheep_habitat":
                        //    break;
                        //case "goat_habitat":
                        //    break;
                    }
                    if (this._sprite) {
                        this._sprite.setLocalZOrder(10000);
                        MapLayer.instance.addChild(this._sprite);
                    }
                }
                //cc.log(this._sprite);
                //if (this._sprite) {
                //    if (p.x !== this.lstP.x || p.y !== this.lstP.y) {
                //        this._sprite.setLogicPosition(p.x, p.y, true);
                //        this.lstP = p;
                //        //cc.log(Math.floor(psl.x) + " : " + Math.floor(psl.y));
                //    }
                //}
                // cc.log("Touch Moved");
                break;
            case ccui.Widget.TOUCH_ENDED:
                // cc.log("Touch Ended");
                break;
            case ccui.Widget.TOUCH_CANCELED:
                this.unscheduleUpdate();
                //GameShopLayout.instance.show();
                if (this._sprite) {
                    var endP = sender.getTouchEndPosition();
                    var endPl = MapValues.screenPositionToLogic(endP.x, endP.y);
                    endPl.x = Math.floor(endPl.x);
                    endPl.y = Math.floor(endPl.y);
                    // cc.log(endPl.x + " " + endPl.y);
                    this._check = MapCtrl.instance.checkValidBlockSprite(this._sprite);
                    // cc.log("this._check " + this._check);
                    var typeObject = sender.parent.getChildByTag(0).getString();
                    if (!this._check) {
                        this._sprite.removeFromParent(true);
                        BaseGUILayer.instance.notifyCantPut(endP.x, endP.y);
                        if (GameShopLayout.instance._isHide) {
                            //cc.log("GameShopLayout.instance._isHide " + GameShopLayout.instance._isHide);
                            GameShopLayout.instance.show();
                        }
                    } else {
                        var missGold = GameShopController.instance.checkGold(sender.parent.getChildByTag(5).getString());
                        cc.log(missGold);
                        if (missGold) {
                            this._sprite.removeFromParent(true);
                            BaseGUILayer.instance.notifyShopNotEnoughGold(missGold, typeObject, endPl.x, endPl.y);
                        } else {
                            // Success
                            MapCtrl.instance.addSpriteAlias(this._sprite);
                            this._sprite.setLogicPosition(this._sprite.lx, this._sprite.ly, false);
                            if (typeObject === "field") {
                                var fieldModel = new Field(new Coordinate(this._sprite.lx, this._sprite.ly), this._sprite.fieldId);
                                user.asset.addField(fieldModel);
                                MapLayer.instance.fieldList.push(this._sprite);
                                this._sprite.field = fieldModel;
                                // Send server
                                testnetwork.connector.sendBuyMapObjectRequest(fieldModel.fieldId,
                                    typeObject, endPl.x, endPl.y);
                            } else {
                                //Model
                                var lodgeModel = new AnimalLodge(new Coordinate(this._sprite.lx, this._sprite.ly),
                                    typeObject, 0, null);
                                user.asset.addAnimalLodge(lodgeModel);
                                this._sprite.tag = TagClusters.Lodge + lodgeModel.id;
                                this._sprite.setId(lodgeModel.id);
                                //Send server
                                testnetwork.connector.sendBuyMapObjectRequest(lodgeModel.id, typeObject,
                                    endPl.x, endPl.y);
                            }
                            user.reduceGold(parseInt(sender.parent.getChildByTag(5).getString()));

                            GameShopLayout.instance.show();
                        }
                    }
                }
                this._sprite = null;
                this._tableView.updateCellAtIndex(sender.parent.getIdx());
                GameShopLayout.instance._gameShop._animalTable._tableView.reloadData();
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
            //this._sprite.setLogicPosition(logic, true);
            if (this._sprite) {
                this._sprite.setLogicPosition(logic, true);
            }
        }
        if (this.autoMoveHor || this.autoMoveVer) {
            var dx = this.autoMoveHor * dt * 250;
            var dy = this.autoMoveVer * dt * 250;
            MapLayer.instance.move(-dx, -dy);
        }
    }

});