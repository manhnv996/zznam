
var TablePopup = ccui.Layout.extend({

    _bg: null,
    _isClose: false,

    ctor: function (background, xlogic, ylogic, spriteCalled) {
        this._super();

        //
        this._bg = new cc.Sprite(background);
        this.setContentSize(this._bg.getContentSize());
        this.addChild(this._bg);



        var screenPosition = MapValues.logicToScreenPosition(xlogic, ylogic);
        this._bg.setPosition(screenPosition.x - spriteCalled.width * 2 / 3,
            screenPosition.y + spriteCalled.height * 2 / 3);



        this.addDisableListener();
        this.scheduleUpdate();
    },

    addDisableListener: function () {
        this.disableListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {

                var target = this._bg;

                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (!cc.rectContainsPoint(rect, locationInNode)) {
                    cc.log("Touch Block Event ");
                    this._isClose = true;
                }

                return true;
            }.bind(this)
        });
        cc.eventManager.addListener(this.disableListener, 1);
    },

    update: function (dt) {
        if (this._isClose) {
            this.unscheduleUpdate();

            if (this.disableListener) {
                cc.eventManager.removeListener(this.disableListener);
                this.removeAllChildren();
            }

            this._isClose = false;
        }
    },


});