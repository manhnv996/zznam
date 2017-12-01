/**
 * Created by CPU60075_LOCAL on 12/1/2017.
 */

var StorageLayout = BaseLayout.extend({
    _debug: false,
    //_debug: true,

    ctor: function (storage) {
        this._super(res.storage_bg_png, "", false, true, true);

        var upgradeLayer;
        var type = storage.getStorageType();
        var total = storage.getCurrentQuantity();
        var capacity = storage.getCapacity();
        var name = new cc.LabelBMFont("", res.FONT_OUTLINE_30);
        name.x = this.width / 2;
        name.y = this.height * 4 / 5;

        //Set name storage
        if (type == StorageTypes.FOOD_STORAGE) {
            name.setString(fr.Localization.text("NAME_SILO") + total + "/" + capacity);
            upgradeLayer = new UpgradeSiloLayer(storage.level);
            //cc.log("UpgradeSiloLayer " + storage.level);
        } else {
            name.setString(fr.Localization.text("NAME_WARE_HOUSE") + total + "/" + capacity);
            upgradeLayer = new UpgradeWareLayer(storage.level);
        }
        this.addChild(name);

        //Set Progress Bar
        var progressLayout = new ccui.Layout();
        progressLayout.x = this.width / 100 * 27;
        progressLayout.y = this.height / 100 * 86;
        progressLayout.setContentSize(this.width / 11 * 5, this.height / 100 * 6);
        this.addChild(progressLayout);

        var arrow = new cc.Sprite(res.storage_arrow);
        arrow.x = progressLayout.width * (total / capacity);
        arrow.y = progressLayout.height / 2;
        arrow.setScale(progressLayout.height / arrow.getContentSize().height);
        progressLayout.addChild(arrow);

        this._layoutContent = new ccui.Layout();
        this._layoutContent.x = this.width / 2;
        this._layoutContent.y = this.height / 2 - this.height / 7;
        this._layoutContent.setAnchorPoint(0.5, 0.5);
        this._layoutContent.setContentSize(cc.winSize.width / 2, cc.winSize.height / 2);
        this.addChild(this._layoutContent);

        var itemListLayer = new StorageItemListLayer(storage.getItemList());
        this._multiLayer = new cc.LayerMultiplex(itemListLayer, upgradeLayer);
        this._multiLayer.switchTo(0);

        this._layoutContent.addChild(this._multiLayer);

        /**
         * Debug
         */
        if(this._debug) {
            progressLayout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            progressLayout.setBackGroundColor(cc.color.YELLOW);

            this._layoutContent.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this._layoutContent.setBackGroundColor(cc.color.WHITE);
        }
    }
});