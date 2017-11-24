/**
 * Created by CPU60075_LOCAL on 20/11/2017.
 */

var AnimalTable = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
    },

    init:function () {
        var winSize = cc.director.getWinSize();

        var tableView = new cc.TableView(this, cc.size(363, cc.winSize.height / 9 * 8));
        tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        tableView.x = 0;
        tableView.y = 0;
        tableView.setDelegate(this);
        tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.addChild(tableView);
        tableView.reloadData();

        return true;
    },

    scrollViewDidScroll:function (view) {

    },
    scrollViewDidZoom:function (view) {

    },

    tableCellTouched:function (table, cell) {
        cc.log("Tree Table: " + cell.getIdx());
    },

    tableCellSizeForIndex:function (table, idx) {
        return cc.size((cc.winSize.width / 3), 142 * ((cc.winSize.width / 3) / 316));
    },

    tableCellAtIndex:function (table, idx) {
        //cc.log("Create Cell " + idx);
        var cell = table.dequeueCell();
        var image;
        var title;
        var detail;
        var slot;
        var price;
        var curslot = 0;
        var maxslot = 0;
        var numberLodge = 0;

        if (!cell) {
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

            image = new cc.Sprite(res.infoAnimalItem[idx].nameIconShop);
            image.x = box.width / 4 * 3;
            image.y = box.height / 2;
            var scaleImg = imgBg.getContentSize().height / image.getContentSize().height;
            image.setScale(scaleImg);
            image.tag = 1;

            title = new cc.LabelBMFont(res.infoAnimalItem[idx].title, "fonts/outline/30.fnt");
            title.x = box.width / 10 - 10;
            title.y = box.height - 10;
            title.setAnchorPoint(0, 1);
            title.tag = 2;

            detail = new cc.LabelBMFont(res.infoAnimalItem[idx].detail, "fonts/normal/30.fnt");
            detail.x = box.width / 3;
            detail.y = box.height / 2;
            detail.color = cc.color(77, 41, 1);
            detail.tag = 3;

            numberLodge = GameShopController.instance.getNumberLodge(res.infoAnimalItem[idx].id  + "_habitat");
            curslot = GameShopController.instance.getNumberAnimal(res.infoAnimalItem[idx].id);
            maxslot =  numberLodge * res.infoAnimalItem[idx].slot;

            slot = new cc.LabelBMFont(curslot + "/" + maxslot, "fonts/outline/30.fnt");
            slot.x = box.width / 3 * 2;
            slot.y = box.height / 5 * 4;
            slot.tag = 4;

            var p;
            //if (curslot < res.infoAnimalItem[idx].slot){
            //    price = new cc.LabelBMFont(res.infoAnimalItem[idx].price1, "fonts/outline/30.fnt");
            //} else {
            //    if (numberLodge == 2) {
            //        price = new cc.LabelBMFont(res.infoAnimalItem[idx].price2, "fonts/outline/30.fnt");
            //    } else if (numberLodge == 3) {
            //        if (curslot < res.infoAnimalItem[idx].slot * 2) {
            //            price = new cc.LabelBMFont(res.infoAnimalItem[idx].price2, "fonts/outline/30.fnt");
            //        } else {
            //            price = new cc.LabelBMFont(res.infoAnimalItem[idx].price3, "fonts/outline/30.fnt");
            //        }
            //    }
            //}
            if (curslot < res.infoAnimalItem[idx].slot) {
                p = res.infoAnimalItem[idx].price[0];
            } else {
                for (var i = 1; i <= numberLodge - 1; i++) {
                    if (res.infoAnimalItem[idx].slot * i <= curslot && curslot < res.infoAnimalItem[idx].slot * (i + 1)) {
                        p = res.infoAnimalItem[idx].price[i];
                        break;
                    }
                }
            }

            price = new cc.LabelBMFont(p, "fonts/outline/30.fnt");
            price.x = box.width / 5 * 2;
            price.y = 0;
            price.setAnchorPoint(1, -0.5);
            price.tag = 5;

            cell.addChild(image);
            cell.addChild(title);
            cell.addChild(detail);
            cell.addChild(price);
            cell.addChild(slot);

            //cc.log("create cell container " + idx);
        } else {
            //cc.log("abc" + idx);
            image = cell.getChildByTag(1);
            image.setTexture(res.infoAnimalItem[idx].nameIconShop);

            title = cell.getChildByTag(2);
            title.setString(res.infoAnimalItem[idx].title);

            detail = cell.getChildByTag(3);
            detail.setString(res.infoAnimalItem[idx].detail);

            numberLodge = GameShopController.instance.getNumberLodge(res.infoAnimalItem[idx].id  + "_habitat");
            curslot = GameShopController.instance.getNumberAnimal(res.infoAnimalItem[idx].id);
            maxslot =  numberLodge * res.infoAnimalItem[idx].slot;

            slot = cell.getChildByTag(4);
            slot.setString(curslot + "/" + maxslot);

            var p;
            if (curslot < res.infoAnimalItem[idx].slot) {
                p = res.infoAnimalItem[idx].price[0];
            } else {
                for (var i = 1; i <= numberLodge - 1; i++) {
                    if (res.infoAnimalItem[idx].slot * i <= curslot && curslot < res.infoAnimalItem[idx].slot * (i + 1)) {
                        p = res.infoAnimalItem[idx].price[i];
                        break;
                    }
                }
            }

            price = cell.getChildByTag(5);
            price.setString(p);
            //if (curslot < res.infoAnimalItem[idx].slot){
            //    price.setString(res.infoAnimalItem[idx].price1);
            //} else {
            //    if (numberLodge == 2) {
            //        price.setString(res.infoAnimalItem[idx].price2);
            //    } else if (numberLodge == 3) {
            //        if (curslot < res.infoAnimalItem[idx].slot * 2) {
            //            price.setString(res.infoAnimalItem[idx].price2);
            //        } else {
            //            price.setString(res.infoAnimalItem[idx].price3);
            //        }
            //    }
            //}
        }

        return cell;
    },

    numberOfCellsInTableView:function (table) {
        return res.infoAnimalItem.length;
    }
});