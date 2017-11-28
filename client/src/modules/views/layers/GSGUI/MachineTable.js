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

            image = new cc.Sprite(res.infoMachineItem[idx].nameIconShop);
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
            } else {
                curslot = GameShopController.instance.getNumberMachine(res.infoMachineItem[idx].id);
                maxslot = res.infoMachineItem[idx].number;

                if (curslot < maxslot) {
                    image.addTouchEventListener(this.touchEvent, this);
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
    }

});