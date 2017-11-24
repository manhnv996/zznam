/**
 * Created by CPU60075_LOCAL on 24/11/2017.
 */

var StorageItemListLayer = cc.Layer.extend({
    _listItems: [],

    ctor: function (listItems) {
        this._super();

        this._listItems = listItems;

        var upgradeBtn = new ccui.Button(res.storage_upgrade_png);
        upgradeBtn.x = 0;
        upgradeBtn.y = 0;
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
        var button = [];
        var label = [];
        //var itemType = [];

        //cc.log("create cell" + idx);
        //if (!cell) {
            cell = new cc.TableViewCell();

        //cc.log("cell width " + cell.getBoundingBox().width);

            for (var i = 0; i < 3; i++) {
                button[i] = new ccui.Button(res.storage_apple);
                button[i].x = (cc.winSize.width / 6) * i + cc.winSize.width / 12;
                button[i].y = (cc.winSize.height / 5 * 2) / 4;
                //button[i].x = 0;
                //button[i].y = 0;
                button[i].setZoomScale(-0.1);
                cell.addChild(button[i]);

                label[i] = new cc.LabelBMFont(20, res.FONT_OUTLINE_20);
                label[i].x = (cc.winSize.width / 6) * i + cc.winSize.width / 12;
                label[i].y = button[i].y - button[i].height / 2;
                cell.addChild(label[i]);

            }
            //
        cc.log(this._listItems);
            for (var i = 0; i < 3; i++) {

                if ((idx * 3 + i) < this._listItems.length) {
                    button[i].loadTextureNormal(res.storage_carot);
                    //button[i].addTouchEventListener(this.touchEvent, this);
                    label[i].setString(this._listItems[idx * 3 + i].getQuantityItem());
                } else {
                    button[i].setVisible(false);
                    label[i].setVisible(false);
                }
            }
        //} else {
        //
        //}

        return cell;
    },

    numberOfCellsInTableView:function (table) {
        cc.log("numberOfCellsInTableView " + (this._listItems.length % 3) ? (Math.floor(this._listItems.length / 3) + 1) : (this._listItems.length / 3))
        return (this._listItems.length % 3) ? (Math.floor(this._listItems.length / 3) + 1) : (this._listItems.length / 3);
    }

    //touchEvent: function (sender, type) {
    //
    //}

});