/**
 * Created by CPU60075_LOCAL on 24/11/2017.
 */

var StorageItemListLayer = cc.Layer.extend({
    _listItems: null,

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
        return cc.size(cc.winSize.width / 2, (cc.winSize.height / 5 * 2) / 3);
    },

    tableCellAtIndex:function (table, idx) {
        var cell = table.dequeueCell();
        //var level = user.getLevel();
        var button = [];
        var label = [];
        //var itemType;

        //if (!cell) {
            cell = new cc.TableViewCell();

            for (var i = 0; i < 3; i++) {
                button[i] = new ccui.Button(res.storage_apple);
                button[i].x = (cell.width / 3) * i + cell.width / 6;
                button[i].y = cell.height / 2;
                button[i].setZoomScale(-0.1);
                cell.addChild(button[i]);

                label[i] = new cc.LabelBMFont(0, res.FONT_OUTLINE_20);
                label[i].x = (cell.width / 3) * i + cell.width / 6;
                label[i].y = 0;
                cell.addChild(label[i]);
            }

            for (var i = 0; i < 3; i++) {
                if ((idx * 3 + i) < length) {
                    
                }
            }
        //} else {
        //
        //}

        return cell;
    },

    numberOfCellsInTableView:function (table) {
        return (this._listItems.length % 3) ? (Math.floor(this._listItems.length / 3) + 1) : (this._listItems.length / 3);
    }

});