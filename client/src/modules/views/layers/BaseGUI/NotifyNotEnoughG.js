/**
 * Created by CPU60075_LOCAL on 12/1/2017.
 */

var NotifyNotEnoughG = BaseLayout.extend({

   ctor: function (number, hasBuyBtn) {
       //cc.log("Notify Miss Gold");

       this._super(res.bg_notify_png, "text_notice_title", true, true, false);

       this.detail = new cc.LabelBMFont(fr.Localization.text("TEXT_NOT_ENOUGH_RESOURCE"), res.FONT_OUTLINE_30);
       this.detail.x = this.width / 2;
       this.detail.y = this.height / 3 * 2;

       this.gImg = new cc.Sprite();
       this.gImg.x = this.width / 2;
       this.gImg.y = this.height / 2;
       this.gImg.setTexture(res.gold_png);
       this.gImg.setScale(1.3);

       this.missNumber = new cc.LabelBMFont(number, res.FONT_OUTLINE_30);
       this.missNumber.x = this.width / 2;
       this.missNumber.y = this.height / 2 - this.gImg.getBoundingBox().height;

       //Button buy gold == ruby
       if (hasBuyBtn) {
           this.rubyBtn = new ccui.Button(res.activity_notify_png);
           this.rubyBtn.x = this.width / 2;
           this.rubyBtn.y = this.height / 8;
           this.rubyBtn.setZoomScale(0);
           var activity = new cc.LabelBMFont(fr.Localization.text("text_to_use_gem"), res.FONT_OUTLINE_20);
           activity.x = this.rubyBtn.width / 5 * 3;
           activity.y = this.rubyBtn.height / 2;
           this.rubyBtn.addChild(activity);
           var rubyImg = new cc.Sprite(res.ruby_small);
           rubyImg.x = this.rubyBtn.width / 10 * 3;
           rubyImg.y = this.rubyBtn.height / 2;
           this.rubyBtn.addChild(rubyImg);

           this.rubyNumber = GameShopController.instance.fromGoldToRuby(number);
           var rubyNeeded = new cc.LabelBMFont(this.rubyNumber, res.FONT_OUTLINE_20);
           rubyNeeded.x = rubyImg.x - rubyImg.width - rubyNeeded.width;
           rubyNeeded.y = this.rubyBtn.height / 2;
           this.rubyBtn.addChild(rubyNeeded);

           this.rubyBtn.addTouchEventListener(this.touchBuyGold, this);
           this.addChild(this.rubyBtn);
       }

       this.addChild(this.detail);
       this.addChild(this.gImg);
       this.addChild(this.missNumber);
   },

    touchBuyGold: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                var scaleBy = cc.scaleTo(0.1, 0.9, 0.9);
                sender.runAction(scaleBy);
                break;
            case ccui.Widget.TOUCH_ENDED:
            case ccui.Widget.TOUCH_CANCELED:
                var scaleBy = cc.scaleTo(0.1, 1.1, 1.1);
                sender.runAction(scaleBy);
                BaseGUILayer.instance.removeBlockListener();
                BaseGUILayer.instance.notifyNotEnoughRuby(this.rubyNumber);
                break;
        }
    }
});