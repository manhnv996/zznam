/**
 * Created by CPU60075_LOCAL on 12/1/2017.
 */

var NotifyFullStorage = BaseLayout.extend({
    _storageType: null,

    ctor: function (storageType) {
        this._super(res.bg_notify_png, "text_notice_title", true, true, true);
        this._storageType = storageType;

        var fullSilo = new cc.Sprite(res.silo_full);
        fullSilo.x = this.width / 2;
        fullSilo.y = this.height / 5 * 2;

        var buttonV = new ccui.Button(res.storage_V_png);
        buttonV.setScale(0.9);
        buttonV.setZoomScale(-0.1);
        buttonV.x = this.width / 3 * 2;
        buttonV.y = this.height / 4;
        buttonV.addTouchEventListener(this.touchUpgradeStorage, this);

        if(storageType === StorageTypes.WAREHOUSE){
            fullSilo.setTexture(res.warehouse_full);
        } else {
            buttonV.setAnchorPoint(1, 0.5);
        }

        this.addChild(fullSilo);
        this.addChild(buttonV);
    },

    touchUpgradeStorage: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
            case ccui.Widget.TOUCH_CANCELED:
                this.removeFromParent(true);
                if (this._storageType === StorageTypes.FOOD_STORAGE) {
                    StorageLayer.instance.initStorage(user.getAsset().getFoodStorage());
                } else {
                    StorageLayer.instance.initStorage(user.getAsset().getWarehouse());
                }
                StorageLayer.instance._multiLayer.switchTo(1);
                break;
        }
    }
});