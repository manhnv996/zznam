/**
 * Created by CPU60075_LOCAL on 24/11/2017.
 */

var StorageItemListLayer = cc.Layer.extend({
    _listItems: [],
    _tableItems: null,
    _debug: false,
    //_debug: true,

    ctor: function (listItems) {
        this._super();

        this._listItems = listItems;

        this.upgradeBtn = new ccui.Button(res.storage_btn_png);
        this.upgradeBtn.x = cc.winSize.width / 4;
        this.upgradeBtn.y = cc.winSize.width / 10 - cc.winSize.width / 12;
        this.upgradeBtn.addTouchEventListener(this.touchUpgrade, this);
        this.upgradeBtn.setZoomScale(0.0);
        this.addChild(this.upgradeBtn);

        cc.log("this.width " + this.width);

        var labelUpgrade = new cc.LabelBMFont(fr.Localization.text("text_btn_upgrade"), res.FONT_OUTLINE_50);
        labelUpgrade.x = this.upgradeBtn.width / 2;
        labelUpgrade.y = this.upgradeBtn.height / 2;
        labelUpgrade.setScale(0.7);
        this.upgradeBtn.addChild(labelUpgrade);
        //cc.log("wh" + this.width);

        this._tableItems = new cc.TableView(this, cc.size(cc.winSize.width / 2, cc.winSize.height / 5 * 2));
        this._tableItems.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this._tableItems.x = 0;
        this._tableItems.y = cc.winSize.height / 10;
        this._tableItems.setDelegate(this);
        this._tableItems.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this._tableItems.reloadData();

        if (this._debug) {
            var layout = ccui.Layout();
            layout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            layout.setBackGroundColor(cc.color.GREEN);
            layout.setContentSize(cc.winSize.width / 2, cc.winSize.height / 5 * 2);
            layout.x = 0;
            layout.y = cc.winSize.height / 10;
            this.addChild(layout);
        }
        //layout.addChild(listItem);

        this.addChild(this._tableItems);
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
        return cc.size(cc.winSize.width / 2, cc.winSize.height / 5);
        //return cc.size(cc.winSize.width / 2, (cc.winSize.height / 5 * 2) / 2);
    },

    tableCellAtIndex:function (table, idx) {
        var cell = table.dequeueCell();
        //var level = user.getLevel();
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

                var keyItem = new cc.LabelTTF("");
                keyItem.tag = 20 + i;
                cell.addChild(keyItem);

                var label = new cc.LabelBMFont(20, res.FONT_OUTLINE_20);
                label.setScale(1.3);
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
                var keyItem = cell.getChildByTag(20 + i);
                if ((idx * 3 + i) < this._listItems.length) {
                    var typeItem = this._listItems[idx * 3 + i].getTypeItem();
                    //var key = getKeyByValue(this._listItems[idx * 3 + i].getTypeItem());
                    keyItem.setString(typeItem);
                    keyItem.setVisible(false);
                    var productConfig = getProductConfigById(typeItem);
                    //cc.log("itemResource " + keyItem.getString());
                    button.loadTextureNormal(productConfig.nameIcon);
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
                cc.log("Touch Button Product");
                //this._tooltip = new cc.Sprite(res.tooltip_png);
                var type = sender.parent.getChildByTag(sender.tag + 20).getString();
                var productConfig = getProductConfigById(type);

                this._tooltip = new ToolTipLayout(fr.Localization.text(productConfig.name),
                    productConfig.timeMin);
                var touchP = sender.getTouchBeganPosition();

                if (touchP.y < cc.winSize.height / 2) {
                    this._tooltip.x = touchP.x - this._tooltip.width / 2;
                    this._tooltip.y = touchP.y + this._tooltip.height / 2;
                } else {
                    switch (sender.tag) {
                        case 0:
                            this._tooltip.x = touchP.x + this._tooltip.width / 2;
                            this._tooltip.y = touchP.y - this._tooltip.height / 2;
                            break;
                        case 1:
                            //break;
                        case 2:
                            this._tooltip.x = touchP.x - this._tooltip.width * 3 / 2;
                            this._tooltip.y = touchP.y - this._tooltip.height / 2;
                            break;
                    }
                }
                BaseGUILayer.instance.addChild(this._tooltip);

                var description = new cc.LabelBMFont(fr.Localization.text(productConfig.description), res.FONT_NORMAL_30);
                description.x = this._tooltip.width / 2;
                description.y = this._tooltip.height / 2;
                description.setContentSize(this._tooltip.width / 7 * 5, this._tooltip.height / 3);
                description.setBoundingWidth(this._tooltip.width / 7 * 5);
                description.setAlignment(cc.TEXT_ALIGNMENT_CENTER);
                description.color = cc.color(77, 41, 1);
                this._tooltip.addChild(description);

                /**
                 *
                 */
                if (this._debug) {
                    var sprite = new cc.Sprite(res.debug_png);
                    sprite.x = 0;
                    sprite.y = 0;
                    this._tooltip.addChild(sprite);
                }
                break;
            case ccui.Widget.TOUCH_ENDED:
            case ccui.Widget.TOUCH_CANCELED:
                this._tooltip.removeFromParent(true);
                break;
        }
    },

    touchUpgrade: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                var scaleBy = cc.scaleTo(0.1, 0.9);
                sender.runAction(scaleBy);
                break;
            case ccui.Widget.TOUCH_ENDED:
            case ccui.Widget.TOUCH_CANCELED:
                this.parent.switchTo(1);
                var scaleBy = cc.scaleTo(0.1, 1.0);
                //StorageLayout.instance.upgradeLayer.backBtn.setScale(0.9);
                StorageLayout.instance.upgradeLayer.backBtn.runAction(scaleBy);
                break;
        }
    }

});