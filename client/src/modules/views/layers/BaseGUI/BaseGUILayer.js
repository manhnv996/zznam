/**
 * Created by CPU60075_LOCAL on 12/1/2017.
 */

var BaseGUILayer = cc.Layer.extend({
    _layout: null,

    ctor: function () {
        this._super();
    },

    notifyMissGold: function (gold) {
        //cc.log("Notify Miss Gold");
        this._layout = new NotifyMissGold(gold);
        if (this._layout._hasCloseButton) {
            //cc.log("_btnClose");
            this._layout._btnClose.addTouchEventListener(this.touchCloseButton, this);
        }
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
        this._layout = new StorageLayout(storage);
        if (this._layout._hasCloseButton) {
            //cc.log("_btnClose");
            this._layout._btnClose.addTouchEventListener(this.touchCloseButton, this);
        }
        this.blockLayout();
        this.addChild(this._layout);
    },

    showOrderLayer: function () {
        this._layout = new OrderBGLayer();
        // this._layout = OrderBGLayer.instance;
        if (this._layout._hasCloseButton) {
            //cc.log("_btnClose");
            this._layout._btnClose.addTouchEventListener(this.touchCloseButton, this);
        }
        this.blockLayout();
        this.addChild(this._layout);
    },

    showSuggestBuyMissionItem: function (storageMissingItemList, targetType, orderId) {
        this._layout = new NoticeMissingItem(storageMissingItemList, targetType, orderId);
        if (this._layout._hasCloseButton) {
            //cc.log("_btnClose");
            this._layout._btnClose.addTouchEventListener(this.touchCloseButton, this);
        }
        this.blockLayout();
        this.addChild(this._layout);
    },
    showNoticeSureCancelOrder: function (orderId) {
        this._layout = new NoticeCancelOrder(orderId);
        if (this._layout._hasCloseButton) {
            //cc.log("_btnClose");
            this._layout._btnClose.addTouchEventListener(this.touchCloseButton, this);
        }
        this.blockLayout();
        this.addChild(this._layout);
    },
    //
    showOrderNPCLayer: function (orderNPC) {
        this._layout = new OrderNPCLayer(orderNPC);
        if (this._layout._hasCloseButton) {
            //cc.log("_btnClose");
            this._layout._btnClose.addTouchEventListener(this.touchCloseButton, this);
        }
        this.blockLayout();
        this.addChild(this._layout);
    },
    ////BaseGUILayer.instance.removeBlockListener();

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
        if (this._blockLayout._listenerBlockFull) {
            //cc.log("remove listener");
            cc.eventManager.removeListener(this._blockLayout._listenerBlockFull);
            this.removeAllChildren();
            this._layout = null;
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