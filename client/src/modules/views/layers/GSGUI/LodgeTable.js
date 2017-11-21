/**
 * Created by CPU60075_LOCAL on 20/11/2017.
 */


var LodgeTable = cc.Layer.extend({

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
        cc.log("Lodge Table " + cell.getIdx());
    },

    tableCellSizeForIndex:function (table, idx) {
        return cc.size(363, 142 * ((cc.winSize.width / 3) / 316));
    },

    tableCellAtIndex:function (table, idx) {
        cc.log("Create Cell " + idx);
        ///var strValue = idx;
        var cell = table.dequeueCell();
        var level = user.getLevel();
        var label;
        var image;
        var title;
        var detail;
        var slot;
        var curslot = 0;
        var maxslot = 0;
        var price;

        if (!cell) {
            cell = new cc.TableViewCell();
            var imgBg = new cc.Sprite(res.shop_slot_png);
            imgBg.x = 0;
            imgBg.y = 0;
            imgBg.anchorX = 0;
            imgBg.anchorY = 0;
            var scale = 363 / imgBg.getContentSize().width;
            imgBg.setScale(scale);
            cell.addChild(imgBg);

            var box = imgBg.getBoundingBox();

            var goldImg = new cc.Sprite(res.gold_png);
            goldImg.x = imgBg.getBoundingBox().width / 2;
            goldImg.y = 0;
            goldImg.setAnchorPoint(0.5, -0.5);
            cell.addChild(goldImg);

            image = new cc.Sprite(res.infoCoopItem[idx].nameIconShop);
            image.x = box.width / 4 * 3;
            image.y = box.height / 2;
            var scaleImg = imgBg.getContentSize().height / image.getContentSize().height;
            image.setScale(scaleImg);
            image.tag = 1;

            title = new cc.LabelBMFont(res.infoCoopItem[idx].title, "fonts/outline/30.fnt");
            title.x = box.width / 10 - 10;
            title.y = box.height - 10;
            title.setAnchorPoint(0, 1);
            title.tag = 2;

            detail = new cc.LabelBMFont(res.infoCoopItem[idx].detail, "fonts/normal/30.fnt");
            detail.x = box.width / 3;
            detail.y = box.height / 2;
            detail.color = cc.color(77, 41, 1);
            detail.tag = 3;

            curslot = GameShopController.instance.getNumberLodge(res.infoCoopItem[idx].id);
            maxslot = 0;

            if(level >= res.infoCoopItem[idx].level3) {
                maxslot = 3;
            } else if (res.infoCoopItem[idx].level2 <= level && level < res.infoCoopItem[idx].level3) {
                maxslot = 2;
            } else if (res.infoCoopItem[idx].level <= level && level < res.infoCoopItem[idx].level2) {
                maxslot = 1;
            }

            slot = new cc.LabelBMFont(curslot + "/" + maxslot, "fonts/outline/30.fnt");
            slot.x = box.width / 3 * 2;
            slot.y = box.height / 5 * 4;
            slot.tag = 4;

            price = new cc.LabelBMFont(res.infoCoopItem[idx].price, "fonts/outline/30.fnt");
            price.x = box.width / 5 * 2;
            price.y = 0;
            price.setAnchorPoint(1, -0.5);
            price.tag = 5;

            cell.addChild(image);
            cell.addChild(title);
            cell.addChild(detail);
            cell.addChild(price);
            cell.addChild(slot);

            cc.log("create cell container " + idx);
        } else {
            cc.log("abc" + idx);
            image = cell.getChildByTag(1);
            image.setTexture(res.infoCoopItem[idx].nameIconShop);

            title = cell.getChildByTag(2);
            title.setString(res.infoCoopItem[idx].title);

            detail = cell.getChildByTag(3);
            detail.setString(res.infoCoopItem[idx].detail);

            slot = cell.getChildByTag(4);
            if(res.infoCoopItem[idx].id == "field"){
                curslot = user.getAsset().getFieldList().length;
                maxslot = GameShopController.instance.getMaxField();
            } else {
                curslot = GameShopController.instance.getNumberLodge(res.infoCoopItem[idx].id);
                if(level >= res.infoCoopItem[idx].level3) {
                    maxslot = 3;
                } else if (res.infoCoopItem[idx].level2 <= level && level < res.infoCoopItem[idx].level3) {
                    maxslot = 2;
                } else if (res.infoCoopItem[idx].level <= level && level < res.infoCoopItem[idx].level2) {
                    maxslot = 1;
                }
            }
            slot.setString(curslot + "/" + maxslot);

            price = cell.getChildByTag(5);
            price.setString(res.infoCoopItem[idx].price);
        }

        return cell;
    },

    numberOfCellsInTableView:function (table) {
        return res.infoCoopItem.length;
    }


});