/**
 * Created by CPU60075_LOCAL on 12/1/2017.
 */

var BaseGUILayer = cc.Layer.extend({
    _layout: null,

    ctor: function () {
        this._super();
    },

    notifyNotEnoughGold: function (gold, hideShop) {
        this._layout = new NotifyNotEnoughG(gold, hideShop);

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

        this.rubyNumber = fromGoldToRuby(gold);
        var rubyNeeded = new cc.LabelBMFont(this.rubyNumber.toString(), res.FONT_OUTLINE_20);
        rubyNeeded.x = rubyImg.x - rubyImg.width - rubyNeeded.width;
        rubyNeeded.y = this._layout.rubyBtn.height / 2;
        this._layout.rubyBtn.addChild(rubyNeeded);

        this._layout.rubyBtn.addTouchEventListener(this.touchBuyObjectByRuy, this);
        this._layout.addChild(this._layout.rubyBtn);
        //}

        this.blockLayout();
    },

    notifyShopNotEnoughGold: function (gold, typeShopObject, lx, ly, lodgeId) {
        this.typeShopObject = typeShopObject;
        this.lx = lx;
        this.ly = ly;
        this.lodgeId = lodgeId;

        this.notifyNotEnoughGold(gold, false);
    },

    touchBuyObjectByRuy: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                this._layout._hideShop = true;
                var scaleBy = cc.scaleTo(0.1, 0.9);
                sender.runAction(scaleBy);
                break;
            case ccui.Widget.TOUCH_ENDED:
            case ccui.Widget.TOUCH_CANCELED:
                var scaleBy = cc.scaleTo(0.1, 1.0);
                sender.runAction(scaleBy);
                BaseGUILayer.instance.removeBlockListener();
                GameShopController.instance.buyMapObjectByRuby(this.typeShopObject,
                    this.lx, this.ly, this.rubyNumber, this.lodgeId);
                break;
        }
    },

    notifyNotEnoughRuby: function (ruby, hideShop) {
        this._layout = new NotifyNotEnoughG(ruby.toString(), hideShop);
        this._layout.gImg.setTexture(res.ruby_small);
        if (this._layout._hasCloseButton) {
            this._layout._btnClose.addTouchEventListener(this.touchCloseButton, this);
        }
        this.blockLayout();
    },

    notifyFullStorage: function (storageType, callback) {
        this._layout = new NotifyFullStorage(storageType);
        if (this._layout._hasCloseButton) {
            //cc.log("_btnClose");
            this._layout._btnClose.addTouchEventListener(this.touchCloseButton, this);
        }
        this.blockLayout();
    },

    showStorage: function (storage) {
        StorageLayout.instance = new StorageLayout(storage);
        this._layout = StorageLayout.instance;
        if (this._layout._hasCloseButton) {
            this._layout._btnClose.addTouchEventListener(this.touchCloseButton, this);
        }
        this.blockLayout();
    },

    showSettingGame: function () {
        this._layout = new SettingGame();
        if (this._layout._hasCloseButton) {
            this._layout._btnClose.addTouchEventListener(this.touchCloseButton, this);
        }
        this.blockLayout();
    },

    showOrderLayer: function () {
        if (CarSprite.instance.isStatus == DeliveryStatus.RECEIVABLE){
            CarSprite.instance.onClick();
            return;
        }

        this._layout = new OrderBGLayer();
        if (this._layout._hasCloseButton) {
            this._layout._btnClose.addTouchEventListener(this.touchCloseButton, this);
        }
        this.blockLayout();
    },

    showSuggestBuyMissionItem: function (storageMissingItemList, targetType, orderId, callback) {
        this._layout = new NoticeMissingItem(storageMissingItemList, targetType, orderId);
        if (this._layout._hasCloseButton) {
            this._layout._btnClose.addTouchEventListener(this.touchCloseButton, this);
        }
        this.blockLayout();
        //this.addChild(this._layout);
    },
    showSuggestBuyRawMaterial: function (storageMissingItemList) {
        this._layout = new NoticeMissingItemLayout(storageMissingItemList);
        if (this._layout._hasCloseButton) {
            this._layout._btnClose.addTouchEventListener(this.touchCloseButton, this);
        }
        this.blockLayout();
    },
    showSuggestLastSeeds: function (storageLastSeedsItemList) {
        this._layout = new NoticeLastSeedsLayout(storageLastSeedsItemList);
        if (this._layout._hasCloseButton) {
            this._layout._btnClose.addTouchEventListener(this.touchCloseButton, this);
        }
        this.blockLayout();
    },
    showSuggestUnlockSlot: function (rubyToUnlock) {
        this._layout = new NoticeFullSlotPopup(rubyToUnlock);
        //this._layout.msgContent.setString("Máy đã hoạt động hết công suất, không thể thêm sản phẩm!");
        //this._layout.nextmsgContent.setString("Để tiết kiệm thời gian bạn hãy mở rộng slot nhé?");
        if (this._layout._hasCloseButton) {
            this._layout._btnClose.addTouchEventListener(this.touchCloseButton, this);
        }
        this.blockLayout();
    },

    showNoticeSureCancelOrder: function (orderId) {
        this._layout = new NoticeCancelOrder(orderId);
        if (this._layout._hasCloseButton) {
            //cc.log("_btnClose");
            this._layout._btnClose.addTouchEventListener(this.touchCloseButton, this);
        }
        this.blockLayout();
        //this.addChild(this._layout);
    },
    //
    showOrderNPCLayer: function (orderNPC) {
        if (orderNPC.orderItem == null) {
            return;
        }
        this._layout = new OrderNPCLayer(orderNPC);
        if (this._layout._hasCloseButton) {
            //cc.log("_btnClose");
            this._layout._btnClose.addTouchEventListener(this.touchCloseButton, this);
        }
        this.blockLayout();
        //this.addChild(this._layout);
    },
    ////BaseGUILayer.instance.removeBlockListener();
    showMyShop: function () {
        this._layout = new MyShopLayout(user.id);
        if (this._layout._hasCloseButton) {
            //cc.log("_btnClose");
            this._layout._btnClose.addTouchEventListener(this.touchCloseButton, this);
        }
        this.blockLayout();
    },

    showSellGUI: function () {
        this._layout = new SellGUI();
        this.blockLayout();
    },

    /**
     * Close GUI
     */
    blockLayout: function () {
        MainGuiLayer.instance.lockButton();
        this._blockLayout = new BlockListenerLayer(this._layout.getContentSize());
        this.addChild(this._blockLayout);
        this.addChild(this._layout);
    },

    touchCloseButton: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                SoundCtrl.instance.playSoundEffect(res.func_click_button_mp3, false);
                break;
            case ccui.Widget.TOUCH_ENDED:
            case ccui.Widget.TOUCH_CANCELED:
                this.removeBlockListener();
                break;
        }
    },

    removeBlockListener: function () {
        MainGuiLayer.instance.unlockButton();
        if (!this._layout._hideShop) {
            if (GameShopLayout.instance._isHide) {
                GameShopLayout.instance.show();
            }
        }
        if (this._blockLayout._listenerBlockFull) {
            cc.eventManager.removeListener(this._blockLayout._listenerBlockFull);
            this.removeAllChildren();
            this._layout = null;
        }
    },

    /**
     *  Popup Move Position Collison
     */
    notifyCantPut: function (content, x, y) {
        if (x.x) {
            y = x.y;
            x = x.x;
        }
        var label = new cc.LabelBMFont(content, res.FONT_OUTLINE_20);
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
    notifyFullStorageForMachine: function (content, x, y) {
        if (x.x) {
            y = x.y;
            x = x.x;
        }
        var label = new cc.LabelBMFont(content, res.FONT_OUTLINE_30);
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