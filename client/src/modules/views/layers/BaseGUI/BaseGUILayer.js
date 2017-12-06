/**
 * Created by CPU60075_LOCAL on 12/1/2017.
 */

var BaseGUILayer = cc.Layer.extend({
    _layout: null,

    ctor: function () {
        this._super();
    },

    notifyShopNotEnoughGold: function (gold, typeShopObject, lx, ly) {
        //cc.log("Notify Miss Gold");

        this._layout = new NotifyNotEnoughG(gold);

        //this._layout.id = id;
        this._layout.typeShopObject = typeShopObject;
        this._layout.lx = lx;
        this._layout.ly = ly;

        if (this._layout._hasCloseButton) {
            //cc.log("_btnClose");
            this._layout._btnClose.addTouchEventListener(this.touchCloseButton, this);
        }
        //Button buy gold == ruby
        //if (hasBuyBtn) {
            this._layout.rubyBtn = new ccui.Button(res.activity_notify_png);
            this._layout.rubyBtn.x = this._layout.width / 2;
            this._layout.rubyBtn.y = this._layout.height / 8;
            this._layout.rubyBtn.setZoomScale(0);
            var activity = new cc.LabelBMFont(fr.Localization.text("text_to_use_gem"), res.FONT_OUTLINE_20);
            activity.x = this._layout.rubyBtn.width / 5 * 3;
            activity.y = this._layout.rubyBtn.height / 2;
            this._layout.rubyBtn.addChild(activity);
            var rubyImg = new cc.Sprite(res.ruby_small);
            rubyImg.x = this._layout.rubyBtn.width / 10 * 3;
            rubyImg.y = this._layout.rubyBtn.height / 2;
            this._layout.rubyBtn.addChild(rubyImg);

            this._layout.rubyNumber = GameShopController.instance.fromGoldToRuby(gold);
            var rubyNeeded = new cc.LabelBMFont(this._layout.rubyNumber, res.FONT_OUTLINE_20);
            rubyNeeded.x = rubyImg.x - rubyImg.width - rubyNeeded.width;
            rubyNeeded.y = this._layout.rubyBtn.height / 2;
            this._layout.rubyBtn.addChild(rubyNeeded);

            this._layout.rubyBtn.addTouchEventListener(this.touchBuyObjectByRuy, this);
            this._layout.addChild(this._layout.rubyBtn);
        //}

        this.blockLayout();
        this.addChild(this._layout);
    },

    touchBuyObjectByRuy: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                var scaleBy = cc.scaleTo(0.1, 0.9);
                sender.runAction(scaleBy);
                break;
            case ccui.Widget.TOUCH_ENDED:
            case ccui.Widget.TOUCH_CANCELED:
                var scaleBy = cc.scaleTo(0.1, 1.0);
                sender.runAction(scaleBy);
                BaseGUILayer.instance.removeBlockListener();
                //var ruby = user.ruby;
                //if (ruby < this._layout.rubyNumber) {
                //    BaseGUILayer.instance.notifyNotEnoughRuby(this._layout.rubyNumber - ruby);
                //} else {
                GameShopController.instance.buyMapObjectByRuby(this._layout.typeShopObject,
                    this._layout.lx, this._layout.ly, this._layout.rubyNumber);
                //}
                break;
        }
    },

    notifyNotEnoughRuby: function (ruby) {
        this._layout = new NotifyNotEnoughG(ruby);
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


    /**
     * Close GUI
     */
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

    /**
     *  Popup Move Position Collison
     */
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
    },

    /**
     * Popup loanding bar
     */

    loadingBar: function () {
        var loadingBar = new LoadingBarLayout();
        this.addChild(loadingBar);
    }
});