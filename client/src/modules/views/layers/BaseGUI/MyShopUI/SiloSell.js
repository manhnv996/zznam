/**
 * Created by CPU60075_LOCAL on 12/23/2017.
 */

var SiloSell = cc.Layer.extend({
    ctor: function (size) {
        this._super();

        this.listItem = user.asset.foodStorage.itemList;
        this.size = size;
        this._tableItems = new cc.TableView(this, size);
        this._tableItems.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this._tableItems.x = 0;
        this._tableItems.y = 0;
        this._tableItems.setDelegate(this);
        this._tableItems.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this._tableItems.reloadData();
        this.addChild(this._tableItems);
    },
    //
    //createTable: function () {
    //    cc.log(cc.size(this.parent.parent.getContentSize()));
    //    this._tableItems = new cc.TableView(this, cc.size(this.size));
    //    this._tableItems.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
    //    this._tableItems.x = cc.winSize.width / 2;
    //    this._tableItems.y = cc.winSize.height / 2;
    //    this._tableItems.setDelegate(this);
    //    this._tableItems.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
    //    this._tableItems.reloadData();
    //    this.addChild(this._tableItems);
    //},

    scrollViewDidScroll: function (view) {
    },
    scrollViewDidZoom: function (view) {
    },

    tableCellTouched: function (table, cell) {
        cc.log("Silo Table " + cell.getIdx());
    },

    tableCellSizeForIndex: function (table, idx) {
        //cc.log("cc.size(this.size)", cc.size(this.size));
        return cc.size(this.size.width, this.size.height / 4.5);
        //return this.size;
    },

    tableCellAtIndex: function (table, idx) {
        var cell = table.dequeueCell();
        cell = new cc.TableViewCell();

        for (var i = 0; i < 2; i++) {
            //cc.log("create cell", idx);
            var button = new ccui.Button(res.storage_apple);
            button.x = this.size.width / 6 + (this.size.width / 2)*i;
            button.y = this.size.height / 9;
            button.setScale(0.7);
            button.setZoomScale(0);
            button.tag = i;
            cell.addChild(button);
            button.addTouchEventListener(this.onClickProduct, this);

            var keyItem = new cc.LabelTTF("abcxyz");
            keyItem.tag = 20 + i;
            keyItem.setVisible(false);
            cell.addChild(keyItem);
            //
            var number = new cc.LabelBMFont("20", res.FONT_OUTLINE_50);
            number.x = this.size.width / 10 * 3 + (this.size.width / 2)*i;
            number.y = this.size.height / 9;
            number.setAnchorPoint(0, 0.5);
            number.setScale(0.8);
            number.tag = 10 + i;
            cell.addChild(number);

        }

        for (var i = 0; i < 2; i++) {
            var button = cell.getChildByTag(i);
            var number = cell.getChildByTag(10 + i);
            var keyItem = cell.getChildByTag(20 + i);
            if ((idx * 2 + i) < this.listItem.length) {
                var typeItem = this.listItem[idx * 2 + i].getTypeItem();
                keyItem.setString(typeItem);
                //keyItem.setVisible(false);
                var productConfig = getProductConfigById(typeItem);
                button.loadTextureNormal(productConfig.nameIcon);
                number.setString(this.listItem[idx * 2 + i].getQuantityItem());
                //cc.log("keyItem", idx*2 + i, " ", productConfig.nameIcon);
            } else {
                button.setVisible(false);
                number.setVisible(false);
            }
        }

        return cell;
    },

    numberOfCellsInTableView: function (table) {
        return (this.listItem.length % 2) ? (Math.floor(this.listItem.length / 2) + 1) : (this.listItem.length / 2);
    },


    //
    onClickProduct: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                sender.runAction(new cc.ScaleTo(0.1, 0.9));
                break;
            case ccui.Widget.TOUCH_ENDED:
            case ccui.Widget.TOUCH_CANCELED:
                var type = sender.parent.getChildByTag(sender.tag + 20).getString();
                var storageItem = new StorageItem(type, user.asset.getQuantityOfTwoStorageByProductId(type));

                BaseGUILayer.instance._layout.updateSellInfo(storageItem);

                sender.runAction(new cc.ScaleTo(0.1, 0.7));
                break;
        }
    }
});