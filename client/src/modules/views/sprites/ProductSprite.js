/**
 * Created by CPU60133_LOCAL on 11/30/2017.
 */

var ProductSprite = cc.Sprite.extend({

    item: null,

    ctor: function(product_img) {
        this._super(product_img);

        //

    },

    showQuantityCurr: function (curr, need) {
        var quantityCurr = new cc.LabelBMFont(curr, res.FONT_OUTLINE_30);
        if (curr <= 0){
            quantityCurr.setString("0");
        }
        var quantityNeed = new cc.LabelBMFont(need, res.FONT_OUTLINE_30);
        var s = new cc.LabelBMFont(" / ", res.FONT_OUTLINE_30);


        quantityCurr.setPosition(this.width  * 1.5 / 5, - quantityCurr.height / 2);
        quantityNeed.setPosition(this.width  * 3.5 / 5, - quantityNeed.height / 2);
        s.setPosition(this.width  * 2.5 / 5, - s.height / 2);

        if (curr < need) {
            quantityCurr.setColor(cc.color(255, 0, 0));
        }

        this.addChild(quantityCurr);
        this.addChild(quantityNeed);
        this.addChild(s);
    }
});