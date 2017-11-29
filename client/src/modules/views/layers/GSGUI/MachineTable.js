/**
 * Created by CPU60075_LOCAL on 20/11/2017.
 */

var MachineTable = cc.Layer.extend({
    _isHide: false,
    _sprite: null,
    _check: null,
    _tableView: null,

    ctor: function () {
        this._super();
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
        return cc.size((cc.winSize.width / 3), 142 * ((cc.winSize.width / 3) / 316));
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

        //if (!cell) {
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

            title = new cc.LabelBMFont(fr.Localization.text(res.infoMachineItem[idx].name), "fonts/outline/30.fnt");
            title.x = box.width / 10 - 10;
            title.y = box.height - 10;
            title.setAnchorPoint(0, 1);
            title.tag = 2;

            detail = new cc.LabelBMFont(fr.Localization.text(res.infoMachineItem[idx].detail), "fonts/normal/30.fnt");
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

            slot = new cc.LabelBMFont(curslot + "/" + maxslot, "fonts/outline/30.fnt");
            slot.x = box.width / 3 * 2;
            slot.y = box.height / 5 * 4;
            slot.tag = 4;

            price = new cc.LabelBMFont(res.infoMachineItem[idx].price, "fonts/outline/30.fnt");
            price.x = box.width / 5 * 2;
            price.y = 0;
            price.setAnchorPoint(1, -0.5);
            price.tag = 5;

            cell.addChild(image);
            cell.addChild(title);
            cell.addChild(detail);
            cell.addChild(price);
            cell.addChild(slot);

            // cc.log("create cell container " + idx);
        //} else {
        //    // cc.log("abc" + idx);
        //    image = cell.getChildByTag(1);
        //    image.setTexture(res.infoMachineItem[idx].nameIconShop);
        //
        //    title = cell.getChildByTag(2);
        //    title.setString(res.infoMachineItem[idx].name);
        //
        //    detail = cell.getChildByTag(3);
        //    detail.setString(res.infoMachineItem[idx].detail);
        //
        //    curslot = GameShopController.instance.getNumberMachine(res.infoMachineItem[idx].id);
        //    maxslot = res.infoMachineItem[idx].number;
        //
        //    slot = cell.getChildByTag(4);
        //    slot.setString(curslot + "/" + maxslot);
        //
        //    price = cell.getChildByTag(5);
        //    price.setString(res.infoMachineItem[idx].price);
        //}

        return cell;
    },

    numberOfCellsInTableView:function (table) {
        return res.infoMachineItem.length;
    },

    touchBuyEvent: function (sender, type) {
        var lstP = {x: 0, y : 0};
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                cc.log("Touch Began");
                break;
            case ccui.Widget.TOUCH_MOVED:
                //cc.log(sender.getTouchBeganPosition());
                var movedP = sender.getTouchMovePosition();
                var p = MapValues.screenPositionToLogic(movedP.x, movedP.y);
                p.x = Math.floor(p.x);
                p.y = Math.floor(p.y);
                // cc.log(p.x + " " + p.y);
                if (!this._isHide) {
                    GSLayer.instance.hide();
                    this._isHide = true;
                    var beganP = sender.getTouchBeganPosition();
                    var createP = MapValues.screenPositionToLogic(beganP.x, beganP.y);
                    createP.x = Math.floor(createP.x);
                    createP.y = Math.floor(createP.y);
                    switch (sender.parent.getChildByTag(0).getString()) {
                        case "bakery_machine":
                            this._sprite = new BakerySprite(user.getAsset().getMachineList().length, createP.x, createP.y);
                            this._sprite.setLocalZOrder(10000);
                            MapLayer.instance.addChild(this._sprite);
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
                }
                //cc.log(this._sprite);
                if (this._sprite) {
                    if (p.x !== lstP.x || p.y !== lstP.y) {
                        this._sprite.setLogicPosition(p.x, p.y, true);
                        lstP = p;
                        //cc.log(Math.floor(psl.x) + " : " + Math.floor(psl.y));
                    }
                }
                // cc.log("Touch Moved");
                break;
            case ccui.Widget.TOUCH_ENDED:
                // cc.log("Touch Ended");
                break;
            case ccui.Widget.TOUCH_CANCELED:
                if (this._sprite) {
                    var endP = sender.getTouchEndPosition();
                    var endPl = MapValues.screenPositionToLogic(endP.x, endP.y);
                    endPl.x = Math.floor(endPl.x);
                    endPl.y = Math.floor(endPl.y);
                    // cc.log(endPl.x + " " + endPl.y);
                    this._check = MapCtrl.instance.checkValidBlockSprite(this._sprite);
                    // cc.log("this._check " + this._check);
                    if (!this._check) {
                        MapLayer.instance.removeChild(this._sprite);
                        NotifyLayer.instance.notifyCantPut(endP.x, endP.y);
                    } else {
                        var missGold = GameShopController.instance.checkGold(sender.parent.getChildByTag(5).getString());
                        cc.log(missGold);
                        if (missGold) {
                            MapLayer.instance.removeChild(this._sprite);
                            NotifyLayer.instance.notifyMissGold(missGold);
                        } else {
                            // Success
                            MapCtrl.instance.addSpriteAlias(this._sprite);
                            this._sprite.setLogicPosition(this._sprite.lx, this._sprite.ly);
                            var typeObject = sender.parent.getChildByTag(0).getString();
                            switch (typeObject) {
                                case "bakery_machine":
                                    var bakeryModel = new BakeryMachine(this._sprite._bakeryId,
                                        false, 0, new Coordinate(this._sprite.lx, this._sprite.ly));
                                    user.getAsset().addMachine(bakeryModel);

                                    // Send server
                                    //testnetwork.connector.sendBuyMapObjectRequest(this._sprite._bakeryId, typeObject, this._sprite.lx, this._sprite.ly);



                                    //var fieldModel = new Field(new Coordinate(this._sprite.lx, this._sprite.ly), this._sprite.fieldId);
                                    //user.getAsset().addField(fieldModel);
                                    //MapLayer.instance.fieldList.push(this._sprite);
                                    //this._sprite.field = fieldModel;
                                    //// Send server
                                    //testnetwork.connector.sendBuyMapObjectRequest(this._sprite.fieldId,
                                    //    sender.parent.getChildByTag(0).getString(),
                                    //    this._sprite.lx, this._sprite.ly);
                                    //cc.log("Send server buy field");
                                    //...
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
                            cc.log("Gold User" + user.getGold());
                            user.reduceGold(sender.parent.getChildByTag(5).getString());
                            //MainGuiLayer.instance.labelGold.setString(user.getGold());
                            //Send Server
                        }
                    }
                }
                this._sprite = null;
                GSLayer.instance.show();
                this._tableView.reloadData();
                this._isHide = false;
                // cc.log("Touch Canceled");
                break;
        }
    }

});