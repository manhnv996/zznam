/**
 * Created by CPU60075_LOCAL on 12/1/2017.
 */

var BaseGUILayer = cc.Layer.extend({
    _layout: null,

    ctor: function () {
        this._super();
    },

    notifyShopNotEnoughGold: function (gold) {
        //cc.log("Notify Miss Gold");
        this._layout = new NotifyNotEnoughG(gold, true);
        if (this._layout._hasCloseButton) {
            //cc.log("_btnClose");
            this._layout._btnClose.addTouchEventListener(this.touchCloseButton, this);
        }
        //if (!this._layout._hideShop) {
        //    cc.log("setBounceable");
        //    //GameShopLayout.instance.setBounceable(false);
        //    //LodgeTable.instance = new
        //}
        this.blockLayout();
        this.addChild(this._layout);
    },

    notifyNotEnoughRuby: function (ruby) {
        this._layout = new NotifyNotEnoughG(ruby, false);
        cc.log("this._layout.gImg " + this._layout.gImg.getTexture());
        this._layout.gImg.setTexture(res.ruby_small);
        if (this._layout._hasCloseButton) {
            //cc.log("_btnClose");
            this._layout._btnClose.addTouchEventListener(this.touchCloseButton, this);
        }
        //this._layout.gImg.setTexture(res.ruby);
        this.blockLayout();
        this.addChild(this._layout);
    },

    notifyFullStorage: function (storageType) {
        this._layout = new NotifyFullStorage(storageType);
        if (this._layout._hasCloseButton) {
            //cc.log("_btnClose");
            this._layout._btnClose.addTouchEventListener(this.touchCloseButton, this);
        }
        this.blockLayout();
        this.addChild(this._layout);
    },

    showStorage: function (storage) {
        //this._layout = new StorageLayout(storage);
        StorageLayout.instance = new StorageLayout(storage);
        this._layout = StorageLayout.instance;
        if (this._layout._hasCloseButton) {
            //cc.log("_btnClose");
            this._layout._btnClose.addTouchEventListener(this.touchCloseButton, this);
        }
        this.blockLayout();
        this.addChild(this._layout);
    },

    blockLayout: function () {
        MainGuiLayer.instance.lockButton();
        this._blockLayout = new BlockListenerLayer(this._layout.getContentSize());
        this.addChild(this._blockLayout);
    },

    touchCloseButton: function (sender, type) {
        switch (type) {
        //    case ccui.Widget.TOUCH_BEGAN:
        //        this.removeBlockListener();
        //        break;
            case ccui.Widget.TOUCH_ENDED:
            case ccui.Widget.TOUCH_CANCELED:
                this.removeBlockListener();
                break;
        }
    },

    removeBlockListener: function () {
        MainGuiLayer.instance.unlockButton();
        if (!this._layout._hideShop) {
            GameShopLayout.instance._gameShop.unlockGameShop();
        }
        if (this._blockLayout._listenerBlockFull) {
            //cc.log("remove listener");
            cc.eventManager.removeListener(this._blockLayout._listenerBlockFull);
            this.removeAllChildren();
        }
    },

    notifyCantPut: function (x, y) {
        if (x.x) {
            y = x.y;
            x = x.x;
        }
        var label = new cc.LabelBMFont(fr.Localization.text("Text_can_not_place"), res.FONT_OUTLINE_20);
        label.x = x;
        label.y = y;
        this.addChild(label);
        var fadeIn = cc.fadeIn(0.2);
        var move = cc.moveTo(2, cc.p(x, y + 25));
        var fadeOut = cc.fadeOut(0.2);
        label.runAction(cc.sequence(fadeIn, move, fadeOut, cc.callFunc(function() {
            label.removeFromParent(true);
        })));
    }
});