/**
 * Created by CPU60133_LOCAL on 11/30/2017.
 */

var ProductSprite = cc.Sprite.extend({

    item: null,

    // ctor: function(product_img) {
    //     this._super(product_img);
    ctor: function(product_img, product_id) {

        this.item = product_id;
        this._super(product_img);
        // this._super(getProductIconById(product_id));

        //
        this.registerTouchEvents();
    },


    // 
    registerTouchEvents: function() {
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan.bind(this),
            onTouchMoved: this.onTouchMoved.bind(this),
            onTouchEnded: this.onTouchEnded.bind(this)
        });
        cc.eventManager.addListener(this.touchListener, this);
    },
    clearListener: function() {
        cc.eventManager.removeListener(this.touchListener);
    },


    onTouchBegan: function (touch) {
        var target = this;
        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        var s = target.getContentSize();
        var rect = cc.rect(0, 0, s.width, s.height);

        if (cc.rectContainsPoint(rect, locationInNode)) {
            this.onBeginClick(touch);
            return true;
        }
        return false;

    },
    onTouchMoved: function (touch) {
        this.onMoveClick(touch);
    },
    onTouchEnded: function (touch) {
        // this.onClick();
        this.onEndClick(touch);
    },


    //
    onBeginClick: function (touch) {
        this.showProductInfo();
    },
    onMoveClick: function (touch) {

    },
    onEndClick: function (touch) {
        this.tooltip.removeFromParent(true);
    },
    //


    showProductInfo: function (/*sender, type*/) {
        this.tooltip = new cc.Sprite(res.tooltip_png);
        
        this.tooltip.x = 0;
        this.tooltip.y = 0 + this.height * 2;
        this.addChild(this.tooltip);

        var productConfig = getProductConfigById(this.item);

        var name = new cc.LabelBMFont(fr.Localization.text(productConfig.name), res.FONT_OUTLINE_30);
        name.x = this.tooltip.width / 2;
        name.y = this.tooltip.height;
        name.setAnchorPoint(0.5, 1);
        this.tooltip.addChild(name);

        var description = new cc.LabelBMFont(fr.Localization.text(productConfig.description), res.FONT_NORMAL_30);
        description.x = this.tooltip.width / 2;
        description.y = this.tooltip.height / 2;
        description.setContentSize(this.tooltip.width / 7 * 5, this.tooltip.height / 3);
        description.setBoundingWidth(this.tooltip.width / 7 * 5);
        description.setAlignment(cc.TEXT_ALIGNMENT_CENTER);
        description.color = cc.color(77, 41, 1);
        this.tooltip.addChild(description);

        if (productConfig.timeMin != "") {
            var hour = Math.floor(productConfig.timeMin / 60);
            var min = productConfig.timeMin - hour * 60;
            var time;
            cc.log("hour" + hour);
            if(hour) {
                if (min) {
                    time = new cc.LabelBMFont(hour + fr.Localization.text("Text_time_hour") +
                        min + fr.Localization.text("Text_time_minute"), res.FONT_OUTLINE_30);
                } else {
                    time = new cc.LabelBMFont(hour + fr.Localization.text("Text_time_hour"), res.FONT_OUTLINE_30);
                }
            } else {
                time = new cc.LabelBMFont(min + fr.Localization.text("Text_time_minute"), res.FONT_OUTLINE_30);
            }

            time.x = this.tooltip.width / 2;
            time.y = 0;
            time.setAnchorPoint(0.5, 0);
            this.tooltip.addChild(time);
        }
        this.tooltip.setScale(0.5);
        var scaleUp = cc.scaleTo(0.2, 1.4);
        var scaleDown = cc.scaleTo(0.15, 1.3);
        this.tooltip.runAction(cc.sequence(scaleUp, scaleDown));

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

    fadeOutProduct: function () {

        var fadeIn = cc.fadeIn(0.2);
        var move = cc.moveBy(0.5, cc.p(0, - 150));
        var fadeOut = cc.fadeOut(0.2);
        this.runAction(cc.sequence(fadeIn, move, fadeOut, cc.callFunc(function() {
            this.removeFromParent(true);
        }.bind(this))));
    }

});