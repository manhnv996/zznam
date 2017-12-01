/**
 * Created by CPU60075_LOCAL on 12/1/2017.
 */

var NotifyMissGold = BaseLayout.extend({

   ctor: function (gold) {
       //cc.log("Notify Miss Gold");

       this._super(res.bg_notify_png, "text_notice_title", true, false);

       var detail = new cc.LabelBMFont(fr.Localization.text("TEXT_NOT_ENOUGH_RESOURCE"), res.FONT_OUTLINE_30);
       detail.x = this.width / 2;
       detail.y = this.height / 3 * 2;

       var goldImg = new cc.Sprite(res.gold_png);
       goldImg.x = this.width / 2;
       goldImg.y = this.height / 2;
       goldImg.setScale(1.3);

       var missGold = new cc.LabelBMFont(gold, res.FONT_OUTLINE_30);
       missGold.x = this.width / 2;
       missGold.y = this.height / 2 - goldImg.getBoundingBox().height;

       //Button buy gold == ruby
       var rubyBtn = new ccui.Button(res.activity_notify_png);
       rubyBtn.x = this.width / 2;
       rubyBtn.y = this.height / 8;
       rubyBtn.setZoomScale(0);
       var activity = new cc.LabelBMFont(fr.Localization.text("text_to_use_gem"), res.FONT_OUTLINE_20);
       activity.x = rubyBtn.width / 5 * 3;
       activity.y = rubyBtn.height / 2;
       rubyBtn.addChild(activity);
       var rubyImg = new cc.Sprite(res.rubi);
       rubyImg.x = rubyBtn.width / 10 * 3;
       rubyImg.y = rubyBtn.height / 2;
       rubyBtn.addChild(rubyImg);
       var rubyNeeded = new cc.LabelBMFont(GameShopController.instance.fromGoldToRuby(gold), res.FONT_OUTLINE_20);
       rubyNeeded.x = rubyImg.x - rubyImg.width - rubyNeeded.width;
       rubyNeeded.y = rubyBtn.height / 2;
       rubyBtn.addChild(rubyNeeded);

       rubyBtn.addTouchEventListener(this.touchBuyGold, this);

       this.addChild(detail);
       this.addChild(goldImg);
       this.addChild(missGold);
       this.addChild(rubyBtn);
   },

    touchBuyGold: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                var scaleBy = cc.scaleBy(0.2, 0.9);
                sender.runAction(scaleBy);
                break;
            case ccui.Widget.TOUCH_ENDED:
            case ccui.Widget.TOUCH_CANCELED:
                var scaleBy = cc.scaleBy(0.2, 1.1);
                sender.runAction(scaleBy);
                break;
        }
    }
});