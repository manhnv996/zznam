/**
 * Created by CPU60133_LOCAL on 11/30/2017.
 */

var ProductSprite = cc.Sprite.extend({

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
        SoundCtrl.instance.playSoundEffect(res.func_click_button_mp3, false);
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
    onBeginClick: function (touch) {},
    onMoveClick: function (touch) {},
    onEndClick: function (touch) {},
    //


    fadeOutProduct: function () {
        this.clearListener();

        var fadeIn = cc.fadeIn(0.2);
        var move = cc.moveBy(0.5, cc.p(0, - 150));
        var fadeOut = cc.fadeOut(0.2);
        this.runAction(cc.sequence(fadeIn, move, fadeOut, cc.callFunc(function() {
            this.removeFromParent(true);
        }.bind(this))));
    }

});