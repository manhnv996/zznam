/**
 * Created by CPU60075_LOCAL on 24/11/2017.
 */

var UpgradeWareLayer = cc.Layer.extend({
    _level: null,

    ctor: function (level) {
        this._super();

        this._level = level;

        var backBtn = new ccui.Button(res.storage_back_png);
        backBtn.x = cc.winSize.width / 4;
        backBtn.y = cc.winSize.width / 10 - cc.winSize.width / 12;
        backBtn.addTouchEventListener(this.touchBackBtn, this);
        this.addChild(backBtn);

        var layout = new ccui.Layout();
        var sprite = new cc.Sprite();
        var label = new cc.LabelBMFont("", res.FONT_OUTLINE_20);
        var btn = new ccui.Button();
        layout.addChild(sprite);
        layout.addChild(label);
        layout.addChild(btn);


        layout = new ccui.Layout();
        sprite = new cc.Sprite();
        label = new cc.LabelBMFont("", res.FONT_OUTLINE_20);
        btn = new ccui.Button();
        layout.addChild(sprite);
        layout.addChild(label);
        layout.addChild(btn);


        layout = new ccui.Layout();
        sprite = new cc.Sprite();
        label = new cc.LabelBMFont("", res.FONT_OUTLINE_20);
        btn = new ccui.Button();
        layout.addChild(sprite);
        layout.addChild(label);
        layout.addChild(btn);
    },

    touchBackBtn: function () {
        this.parent.switchTo(0);
    }
});