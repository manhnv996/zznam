/**
 * Created by CPU60133_LOCAL on 11/30/2017.
 */

var ItemBtn = ccui.Button.extend({

    item: null,

    ctor: function(product_img, product_id, lx, ly) {

        this.item = product_id;
        this._super(product_img);

        //
        this.registerTouchEvents();
        if (!isNaN(lx) && !isNaN(ly)) {
            var position = MapValues.logicToPosition(lx, ly);
            this.setPosition(position);
        }
    },


    //
    registerTouchEvents: function() {

        this.addTouchEventListener(this.touchItem, this);
    },

    touchItem: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:

                this.showProductInfo(sender, type);
                break;
            case ccui.Widget.TOUCH_ENDED:
            case ccui.Widget.TOUCH_CANCELED:
                this.tooltip.removeFromParent(true);
                break;
        }
    },


    showProductInfo: function (sender, type) {
        var productConfig = getProductConfigById(this.item);

        this.tooltip = new ToolTipLayout(fr.Localization.text(productConfig.name), productConfig.timeMin);
        this.addChild(this.tooltip);

        this.tooltip.setPosition(cc.p(- this.width * 0.3, this.height * 0.9));

        //
        var touchP = sender.getTouchBeganPosition();
        if (touchP.x > this.getParent().x + this.getParent().width / 2) {

            this.tooltip.setPosition(cc.p(- this.tooltip.width * 1.3, - this.tooltip.height * 0.3));
        }

        //
        var description = new cc.LabelBMFont(fr.Localization.text(productConfig.description), res.FONT_NORMAL_30);
        description.x = this.tooltip.width / 2;
        description.y = this.tooltip.height / 2;
        description.setContentSize(this.tooltip.width / 7 * 5, this.tooltip.height / 3);
        description.setBoundingWidth(this.tooltip.width / 7 * 5);
        description.setAlignment(cc.TEXT_ALIGNMENT_CENTER);
        description.color = cc.color(77, 41, 1);
        this.tooltip.addChild(description);


        //var name = new cc.LabelBMFont(fr.Localization.text(productConfig.name), res.FONT_OUTLINE_30);
        //name.x = this.tooltip.width / 2;
        //name.y = this.tooltip.height;
        //name.setAnchorPoint(0.5, 1);
        //this.tooltip.addChild(name);

        //if (productConfig.timeMin != "") {
        //    var hour = Math.floor(productConfig.timeMin / 60);
        //    var min = productConfig.timeMin - hour * 60;
        //    var time;
        //    cc.log("hour" + hour);
        //    if(hour) {
        //        if (min) {
        //            time = new cc.LabelBMFont(hour + fr.Localization.text("Text_time_hour") +
        //                min + fr.Localization.text("Text_time_minute"), res.FONT_OUTLINE_30);
        //        } else {
        //            time = new cc.LabelBMFont(hour + fr.Localization.text("Text_time_hour"), res.FONT_OUTLINE_30);
        //        }
        //    } else {
        //        time = new cc.LabelBMFont(min + fr.Localization.text("Text_time_minute"), res.FONT_OUTLINE_30);
        //    }
        //
        //    time.x = this.tooltip.width / 2;
        //    time.y = 0;
        //    time.setAnchorPoint(0.5, 0);
        //    this.tooltip.addChild(time);
        //}

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
    },

});