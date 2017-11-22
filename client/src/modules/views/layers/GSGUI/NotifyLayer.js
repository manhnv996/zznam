/**
 * Created by CPU60075_LOCAL on 22/11/2017.
 */

var NotifyLayer = cc.Layer.extend({
    _layoutMissGold: null,

    ctor: function () {
        this._super();
    },

    notifyMissGold: function (gold) {
        this._layoutMissGold = new ccui.Layout();
        this._layoutMissGold.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this._layoutMissGold.setBackGroundColor(cc.color.RED);
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
        close.setZoomScale(-0.1);
        close.addTouchEventListener(this.touchCloseButtonLayout, this);
        close.setPosition(this._layoutMissGold.width * 19 / 20, this._layoutMissGold.height * 7 / 8);

        this._layoutMissGold.addChild(bg);
        this._layoutMissGold.addChild(title);
        this._layoutMissGold.addChild(detail);
        this._layoutMissGold.addChild(goldImg);
        this._layoutMissGold.addChild(missGold);
        this._layoutMissGold.addChild(ruby);
        this._layoutMissGold.addChild(close);

        this.addChild(this._layoutMissGold);
    },

    closeNotifyMissGold: function () {
        this._layoutMissGold.removeFromParent(true);
    },

    touchCloseButtonLayout: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                this.closeNotifyMissGold();
                break;
            case ccui.Widget.TOUCH_CANCELED:
                this.closeNotifyMissGold();
                break;
        }
    }
});