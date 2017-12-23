/**
 * Created by CPU60075_LOCAL on 12/23/2017.
 */

var SiloSell = cc.Layer.extend({
    ctor: function (size) {
        this._super();

        this.listItem = user.asset.foodStorage.itemList;
        this.size = size;
        this._tableItems = new cc.TableView(this, cc.size(size));
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
        cc.log("cc.size(this.size)", cc.size(this.size));
        return cc.size(this.size);
    },

    tableCellAtIndex: function (table, idx) {
        var cell = table.dequeueCell();
        cell = new cc.TableViewCell();

        for (var i = 0; i < 2; i++) {
            cc.log("create cell", idx);
            //var button = new ccui.Button(res.storage_apple);
            ////button.x = (cc.winSize.width / 6) * i + cc.winSize.width / 12;
            ////button.y = cc.winSize.height / 10;
            //button.x = 0;
            //button.y = 0;
            //button.setZoomScale(0);
            //button.tag = i;
            //cell.addChild(button);

            var keyItem = new cc.LabelTTF("abcxyz");
            keyItem.tag = 20 + i;
            cell.addChild(keyItem);
            //
            //var label = new cc.LabelBMFont(20, res.FONT_OUTLINE_20);
            //label.setScale(1.3);
            ////label.x = (cc.winSize.width / 6) * i + cc.winSize.width / 12;
            ////label.y = button.y - button.height / 2 - label.height / 3;
            //label.tag = 10 + i;
            //cell.addChild(label);

        }
        //
        //for (var i = 0; i < 2; i++) {
        //    var button = cell.getChildByTag(i);
        //    var label = cell.getChildByTag(10 + i);
        //    var keyItem = cell.getChildByTag(20 + i);
        //    if ((idx * 2 + i) < this.listItem.length) {
        //        var typeItem = this.listItem[idx * 2 + i].getTypeItem();
        //        keyItem.setString(typeItem);
        //        keyItem.setVisible(false);
        //        var productConfig = getProductConfigById(typeItem);
        //        button.loadTextureNormal(productConfig.nameIcon);
        //        label.setString(this.listItem[idx * 2 + i].getQuantityItem());
        //        cc.log("keyItem", productConfig.nameIcon);
        //    } else {
        //        button.setVisible(false);
        //        label.setVisible(false);
        //    }
        //}

        return cell;
    },

    numberOfCellsInTableView: function (table) {
        return (this.listItem.length % 2) ? (Math.floor(this.listItem.length / 2) + 1) : (this.listItem.length / 2);
    },
});