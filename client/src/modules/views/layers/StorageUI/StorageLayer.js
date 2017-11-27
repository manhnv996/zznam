/**
 * Created by CPU60075_LOCAL on 11/20/2017.
 */

var StorageLayer = cc.Layer.extend({
    _layoutStorage: null,
    _multiLayer: null,

    ctor: function () {
        this._super();
    },

    //itemList, capacity, level, type
    initStorage: function (storage) {
        //same background + 1 layout
        //2 layer: storage items (table view) + upgrade
        //layerMultiPlex(storage items, upgrade)) belong to layout
        //upgrade.....
        //this.setSwallowTouches(false);

        this._layoutStorage = new ccui.Layout();
        //this._layoutStorage.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        //this._layoutStorage.setBackGroundColor(cc.color.RED);
        this._layoutStorage.x = cc.winSize.width / 2;
        this._layoutStorage.y = cc.winSize.height / 2;
        this._layoutStorage.setAnchorPoint(0.5, 0.5);

        var bg = new cc.Sprite(res.storage_bg_png);
        //bg.x = cc.winSize.width / 2;
        //bg.y = cc.winSize.height / 2;
        bg.x = 0;
        bg.y = 0;
        bg.setAnchorPoint(0, 0);
        this._layoutStorage.addChild(bg);

        this._layoutStorage.setContentSize(bg.getContentSize());

        //Close Button
        var closeBtn = new ccui.Button(res.close_png);
        closeBtn.setZoomScale(-0.1);
        closeBtn.addTouchEventListener(this.touchCloseStorage, this);
        closeBtn.setPosition(this._layoutStorage.width * 19 / 20, this._layoutStorage.height * 4 / 5);
        closeBtn.setScale(0.9);
        this._layoutStorage.addChild(closeBtn);

        var upgradeLayer;
        var type = storage.getStorageType();
        var name = new cc.LabelBMFont("", res.FONT_OUTLINE_30);
        name.x = this._layoutStorage.width / 2;
        name.y = this._layoutStorage.height * 4 / 5;

        var total = StorageCtrl.instance.getTotalItems(storage.getItemList());
        var capacity = storage.getCapacity();
        //cc.log("FoodStorage " + (type == StorageTypes.FOOD_STORAGE));
        if (type == StorageTypes.FOOD_STORAGE) {
            name.setString("Kho lương thực : " + total + "/" + capacity);
            upgradeLayer = new UpgradeSiloLayer(storage.getLevel());
        } else {
            name.setString("Nhà kho : " + total + "/" + capacity);
            upgradeLayer = new UpgradeWareLayer(storage.getLevel());
        }
        this._layoutStorage.addChild(name);

        //Progress Bar
        var progressLayout = new ccui.Layout();
        //progressLayout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        //progressLayout.setBackGroundColor(cc.color.YELLOW);
        progressLayout.x = this._layoutStorage.width / 100 * 27;
        progressLayout.y = this._layoutStorage.height / 100 * 86;
        progressLayout.setContentSize(this._layoutStorage.width / 11 * 5, this._layoutStorage.height / 100 * 6);
        this._layoutStorage.addChild(progressLayout);

        var arrow = new cc.Sprite(res.storage_arrow);
        arrow.x = progressLayout.width * (total / capacity);
        arrow.y = progressLayout.height / 2;
        arrow.setScale(progressLayout.height / arrow.getContentSize().height);
        progressLayout.addChild(arrow);

        var layout = new ccui.Layout();
        //layout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        //layout.setBackGroundColor(cc.color.WHITE);
        layout.x = this._layoutStorage.width / 2;
        layout.y = this._layoutStorage.height / 2 - this._layoutStorage.height / 7;
        layout.setAnchorPoint(0.5, 0.5);
        layout.setContentSize(cc.winSize.width / 2, cc.winSize.height / 2);
        this._layoutStorage.addChild(layout);

        //cc.log("abc " + type);

        var itemListLayer = new StorageItemListLayer(storage.getItemList());
        //var upgradeLayer = new UpgradeSiloLayer(storage.getLevel());
        //var upgradeLayer = new UpgradeWareLayer(storage.getLevel());

        this._multiLayer = new cc.LayerMultiplex(itemListLayer, upgradeLayer);
        //var multiLayer = new cc.LayerMultiplex(itemListLayer);

        this._multiLayer.switchTo(0);

        layout.addChild(this._multiLayer);

        this.addChild(this._layoutStorage);
        //this.setScale((cc.winSize.height - 20) / this._layoutStorage.height);
        this._layoutStorage.setScale(0.5);
        var scale = (cc.winSize.height - 20) / this._layoutStorage.height;
        var scaleTo1 = cc.scaleTo(0.2, scale + 0.15, scale + 0.15);
        var scaleTo2 = cc.scaleTo(0.15, scale, scale);
        this._layoutStorage.runAction(cc.sequence(scaleTo1, scaleTo2));
    },

    //getMultiLayer: function () {
    //    return this._multiLayer;
    //},

    touchCloseStorage: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                this._layoutStorage.removeFromParent(true);
                break;
            case ccui.Widget.TOUCH_CANCELED:
                this._layoutStorage.removeFromParent(true);
                break;
        }
    }
});