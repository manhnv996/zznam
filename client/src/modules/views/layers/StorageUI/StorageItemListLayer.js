/**
 * Created by CPU60075_LOCAL on 24/11/2017.
 */

var StorageItemListLayer = cc.Layer.extend({
    _listItems: [],

    ctor: function (listItems) {
        this._super();

        this._listItems = listItems;

        var upgradeBtn = new ccui.Button(res.storage_upgrade_png);
        upgradeBtn.x = cc.winSize.width / 4;
        upgradeBtn.y = cc.winSize.width / 10 - cc.winSize.width / 12;
        upgradeBtn.addTouchEventListener(this.touchUpgrade, this);
        this.addChild(upgradeBtn);

        //cc.log("wh" + this.width);

        var listItem = new cc.TableView(this, cc.size(cc.winSize.width / 2, cc.winSize.height / 5 * 2));
        listItem.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        listItem.x = 0;
        listItem.y = cc.winSize.height / 10;
        listItem.setDelegate(this);
        listItem.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        listItem.reloadData();

        var layout = ccui.Layout();
        layout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        layout.setBackGroundColor(cc.color.GREEN);
        layout.setContentSize(cc.winSize.width / 2, cc.winSize.height / 5 * 2);
        layout.x = 0;
        layout.y = cc.winSize.height / 10;
        this.addChild(layout);
        //layout.addChild(listItem);

        this.addChild(listItem);
    },

    scrollViewDidScroll:function (view) {

    },
    scrollViewDidZoom:function (view) {

    },

    tableCellTouched:function (table, cell) {
        cc.log("Lodge Table " + cell.getIdx());
    },

    tableCellSizeForIndex:function (table, idx) {
        //cc.log("cell width " + cc.winSize.width / 2);
        return cc.size(cc.winSize.width / 2, (cc.winSize.height / 5 * 2) / 2);
    },

    tableCellAtIndex:function (table, idx) {
        var cell = table.dequeueCell();
        //var level = user.getLevel();
        //var button = [];
        //var label = [];
        //var itemType = [];

        //cc.log("create cell" + idx);
        //if (!cell) {
            cell = new cc.TableViewCell();

        //cc.log("cell width " + cell.getBoundingBox().width);

            for (var i = 0; i < 3; i++) {
                var button = new ccui.Button(res.storage_apple);
                button.x = (cc.winSize.width / 6) * i + cc.winSize.width / 12;
                button.y = (cc.winSize.height / 5 * 2) / 4;
                button.setZoomScale(-0.1);
                button.tag = i;
                cell.addChild(button);

                //var resource = null;
                //resource.tag = 20 + i;
                //cell.addChild(resource);

                var label = new cc.LabelBMFont(20, res.FONT_OUTLINE_20);
                label.x = (cc.winSize.width / 6) * i + cc.winSize.width / 12;
                label.y = button.y - button.height / 2 - label.height / 3;
                label.tag = 10 + i;
                cell.addChild(label);

            }
            //
        //cc.log(this._listItems);
            for (var i = 0; i < 3; i++) {
                var button = cell.getChildByTag(i);
                var label = cell.getChildByTag(10 + i);
                //var resource = cell.getChildByTag(20 + i);
                if ((idx * 3 + i) < this._listItems.length) {
                    //cc.log("rs" + this._listItems[idx * 3 + i].getTypeItem()[3]);
                    //button.loadTextureNormal(this._listItems[idx * 3 + i].getTypeItem()[3]);
                    var key = getKeyByValue(this._listItems[idx * 3 + i].getTypeItem());
                    resource = ProductResource[key];
                    //cc.log(getKeyByValue(this._listItems[idx * 3 + i].getTypeItem()));
                    button.loadTextureNormal(ProductResource[key][3]);
                    button.addTouchEventListener(this.touchItem, this);
                    label.setString(this._listItems[idx * 3 + i].getQuantityItem());
                } else {
                    button.setVisible(false);
                    label.setVisible(false);
                }
            }
        //} else {
        //
        //}

        return cell;
    },

    numberOfCellsInTableView:function (table) {
        //cc.log("numberOfCellsInTableView " + (this._listItems.length % 3) ? (Math.floor(this._listItems.length / 3) + 1) : (this._listItems.length / 3))
        return (this._listItems.length % 3) ? (Math.floor(this._listItems.length / 3) + 1) : (this._listItems.length / 3);
    },

    touchItem: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                cc.log("Touch Button");
                break;
        }
    },

    touchUpgrade: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                //if (this._type == StorageTypes.FOOD_STORAGE) {
                    this.parent.switchTo(1);
                //} else {
                //    this.parent.switchTo(2);
                //}
                break;
            case ccui.Widget.TOUCH_CANCELED:
                //if (this._type == StorageTypes.FOOD_STORAGE) {
                    this.parent.switchTo(1);
                //} else {
                //    this.parent.switchTo(2);
                //}
                break;
        }
    }

});