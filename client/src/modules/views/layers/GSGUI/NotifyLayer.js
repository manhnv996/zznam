/**
 * Created by CPU60075_LOCAL on 22/11/2017.
 */

var NotifyLayer = cc.Layer.extend({
    _layoutMissGold: null,
    _layoutFullSilo: null,
    _layoutFullWare: null,

    ctor: function () {
        this._super();
    },

    notifyMissGold: function (gold) {
        this._layoutMissGold = new ccui.Layout();
        //this._layoutMissGold.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        //this._layoutMissGold.setBackGroundColor(cc.color.RED);
        this._layoutMissGold.x = cc.winSize.width / 2;
        this._layoutMissGold.y = cc.winSize.height / 2;
        this._layoutMissGold.setAnchorPoint(0.5, 0.5);

        var bg = new cc.Sprite(res.bg_notify_png);
        bg.x = 0;
        bg.y = 0;
        bg.setAnchorPoint(0, 0);

        this._layoutMissGold.setContentSize(bg.getContentSize());

        var title = new cc.LabelBMFont("Thông Báo", res.FONT_OUTLINE_50);
        title.x = this._layoutMissGold.width / 2;
        title.y = this._layoutMissGold.height / 8 * 7;

        var detail = new cc.LabelBMFont("Bạn thiếu vật phẩm", res.FONT_OUTLINE_30);
        detail.x = this._layoutMissGold.width / 2;
        detail.y = this._layoutMissGold.height / 3 * 2;

        var goldImg = new cc.Sprite(res.gold_png);
        goldImg.x = this._layoutMissGold.width / 2;
        goldImg.y = this._layoutMissGold.height / 2;
        goldImg.setScale(1.3);

        var missGold = new cc.LabelBMFont(gold, res.FONT_OUTLINE_30);
        missGold.x = this._layoutMissGold.width / 2;
        missGold.y = this._layoutMissGold.height / 2 - goldImg.getBoundingBox().height;

        var ruby = new ccui.Button(res.activity_notify_png);
        ruby.x = this._layoutMissGold.width / 2;
        ruby.y = this._layoutMissGold.height / 8;
        ruby.setZoomScale(-0.1);
        var activity = new cc.LabelBMFont("Để thực hiện hành động", res.FONT_OUTLINE_20);
        activity.x = ruby.width / 5 * 3;
        activity.y = ruby.height / 2;
        ruby.addChild(activity);
        var rubyImg = new cc.Sprite(res.rubi);
        rubyImg.x = ruby.width / 10 * 3;
        rubyImg.y = ruby.height / 2;
        ruby.addChild(rubyImg);
        var rubyNeeded = new cc.LabelBMFont(GameShopController.instance.fromGoldToRuby(gold), res.FONT_OUTLINE_20);
        rubyNeeded.x = rubyImg.x - rubyImg.width - rubyNeeded.width;
        rubyNeeded.y = ruby.height / 2;
        ruby.addChild(rubyNeeded);

        var close = new ccui.Button(res.close_png);
        close.tag = 1;
        close.setZoomScale(-0.1);
        close.addTouchEventListener(this.touchCloseButtonLayout, this);
        close.setScale(0.9);
        close.setPosition(this._layoutMissGold.width * 19 / 20, this._layoutMissGold.height * 7 / 8);

        this._layoutMissGold.addChild(bg);
        this._layoutMissGold.addChild(title);
        this._layoutMissGold.addChild(detail);
        this._layoutMissGold.addChild(goldImg);
        this._layoutMissGold.addChild(missGold);
        this._layoutMissGold.addChild(ruby);
        this._layoutMissGold.addChild(close);

        this.addChild(this._layoutMissGold);
        //this.setScale((cc.winSize.height - 20) / this._layoutMissGold.height);

        var scale = (cc.winSize.height - 20) / this._layoutMissGold.height;
        var scaleTo = cc.scaleTo(0.05, scale, scale);
        this._layoutMissGold.runAction(scaleTo);
    },

    //closeNotifyMissGold: function () {
    //    this._layoutMissGold.removeFromParent(true);
    //},

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

        // setTimeout(function () {
        //     label.removeFromParent(true);
        // }, 2400);

    },

    notifyFullSilo: function () {
        this._layoutFullSilo = new ccui.Layout();
        //this._layoutFullSilo.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        //this._layoutFullSilo.setBackGroundColor(cc.color.RED);
        this._layoutFullSilo.x = cc.winSize.width / 2;
        this._layoutFullSilo.y = cc.winSize.height / 2;
        this._layoutFullSilo.setAnchorPoint(0.5, 0.5);

        var bg = new cc.Sprite(res.bg_notify_png);
        bg.x = 0;
        bg.y = 0;
        bg.setAnchorPoint(0, 0);

        this._layoutFullSilo.setContentSize(bg.getContentSize());

        var title = new cc.LabelBMFont("Thông Báo", res.FONT_OUTLINE_50);
        title.x = this._layoutFullSilo.width / 2;
        title.y = this._layoutFullSilo.height / 8 * 7;

        var fullSilo = new cc.Sprite(res.silo_full);
        fullSilo.x = this._layoutFullSilo.width / 2;
        fullSilo.y = this._layoutFullSilo.height / 5 * 2;

        var buttonV = new ccui.Button(res.storage_V_png);
        buttonV.setScale(0.9);
        buttonV.setZoomScale(-0.1);
        buttonV.x = this._layoutFullSilo.width / 3 * 2;
        buttonV.y = this._layoutFullSilo.height / 4;
        buttonV.setAnchorPoint(1, 0.5);
        buttonV.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    this._layoutFullSilo.removeFromParent(true);
                    StorageLayer.instance.initStorage(user.getAsset().getFoodStorage());
                    StorageLayer.instance._multiLayer.switchTo(1);
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    this._layoutFullSilo.removeFromParent(true);
                    StorageLayer.instance.initStorage(user.getAsset().getFoodStorage());
                    StorageLayer.instance._multiLayer.switchTo(1);
                    break;
            }
        }, this);

        this._layoutFullSilo.addChild(bg);
        this._layoutFullSilo.addChild(fullSilo);
        this._layoutFullSilo.addChild(title);
        this._layoutFullSilo.addChild(buttonV);
        this.addChild(this._layoutFullSilo);
        //this.setScale((cc.winSize.height - 20) / this._layoutFullSilo.height);

        var scale = (cc.winSize.height - 20) / this._layoutFullSilo.height;
        var scaleTo = cc.scaleTo(0.05, scale, scale);
        this._layoutFullSilo.runAction(scaleTo);
    },

    notifyFullWare: function () {
        this._layoutFullWare = new ccui.Layout();
        //this._layoutFullSilo.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        //this._layoutFullSilo.setBackGroundColor(cc.color.RED);
        this._layoutFullWare.x = cc.winSize.width / 2;
        this._layoutFullWare.y = cc.winSize.height / 2;
        this._layoutFullWare.setAnchorPoint(0.5, 0.5);

        var bg = new cc.Sprite(res.bg_notify_png);
        bg.x = 0;
        bg.y = 0;
        bg.setAnchorPoint(0, 0);

        this._layoutFullWare.setContentSize(bg.getContentSize());

        var title = new cc.LabelBMFont("Thông Báo", res.FONT_OUTLINE_50);
        title.x = this._layoutFullWare.width / 2;
        title.y = this._layoutFullWare.height / 8 * 7;

        var fullSilo = new cc.Sprite(res.warehouse_full);
        fullSilo.x = this._layoutFullWare.width / 2;
        fullSilo.y = this._layoutFullWare.height / 5 * 2;

        var buttonV = new ccui.Button(res.storage_V_png);
        buttonV.setScale(0.9);
        buttonV.setZoomScale(-0.1);
        buttonV.x = this._layoutFullWare.width / 3 * 2;
        buttonV.y = this._layoutFullWare.height / 4;
        //buttonV.setAnchorPoint(1, 0.5);
        buttonV.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    this._layoutFullWare.removeFromParent(true);
                    StorageLayer.instance.initStorage(user.getAsset().getWarehouse());
                    StorageLayer.instance._multiLayer.switchTo(1);
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    this._layoutFullWare.removeFromParent(true);
                    StorageLayer.instance.initStorage(user.getAsset().getWarehouse());
                    StorageLayer.instance._multiLayer.switchTo(1);
                    break;
            }
        }, this);

        this._layoutFullWare.addChild(bg);
        this._layoutFullWare.addChild(fullSilo);
        this._layoutFullWare.addChild(title);
        this._layoutFullWare.addChild(buttonV);
        this.addChild(this._layoutFullWare);
        //this.setScale((cc.winSize.height - 20) / this._layoutFullWare.height);

        var scale = (cc.winSize.height - 20) / this._layoutFullWare.height;
        var scaleTo = cc.scaleTo(0.05, scale, scale);
        this._layoutFullWare.runAction(scaleTo);
    },

    touchCloseButtonLayout: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                if(sender.tag === 1) {
                    this._layoutMissGold.removeFromParent(true);
                }
                break;
            case ccui.Widget.TOUCH_CANCELED:
                if(sender.tag === 1) {
                    this._layoutMissGold.removeFromParent(true);
                }
                break;
        }
    }
});