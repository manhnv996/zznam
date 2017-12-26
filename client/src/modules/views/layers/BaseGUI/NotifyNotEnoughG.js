/**
 * Created by CPU60075_LOCAL on 12/1/2017.
 */

var NotifyNotEnoughG = BaseLayout.extend({

   ctor: function (number, hideShop) {

       this._super(res.bg_notify_png, fr.Localization.text("text_notice_title"), true, hideShop);
       //cc.log("Notify Miss Ruby");

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

       this.addChild(this.detail);
       this.addChild(this.gImg);
       this.addChild(this.missNumber);
   }
});