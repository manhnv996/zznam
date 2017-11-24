/**
 * Created by CPU60075_LOCAL on 11/20/2017.
 */

var StorageLayer = cc.Layer.extend({

    ctor: function () {
        this._super();
    },

    //itemList, capacity, level, type
    initStorage: function (storage) {
        //same background + 1 layout
        //2 layer: storage items (table view) + upgrade
        //layerMultiPlex(storage items, upgrade)) belong to layout
        //upgrade.....

        var bg = new cc.Sprite(res.storage_bg_png);
        bg.x = cc.winSize.width / 2;
        bg.y = cc.winSize.height / 2;
        this.addChild(bg);

        var layout = new ccui.Layout();
        //layout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        //layout.setBackGroundColor(cc.color.RED);
        layout.x = cc.winSize.width / 4;
        layout.y = bg.y - bg.height / 2;
        layout.setContentSize(cc.winSize.width / 2, cc.winSize.height / 2);
        this.addChild(layout);

        cc.log("abc");

        var itemListLayer = new StorageItemListLayer(storage.getItemList());
        //var upgradeLayer = new UpgradeStorageLayer(storage.getStorageType(), storage.getLevel());

        //var multiLayer = new cc.LayerMultiplex(itemListLayer, upgradeLayer);
        var multiLayer = new cc.LayerMultiplex(itemListLayer);

        multiLayer.switchTo(0);

        layout.addChild(multiLayer);
    }
});