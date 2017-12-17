
var TablePopup = ccui.Layout.extend({

    _bg: null,
    _isClose: false,
    _isVisible: true,
    _isMoved: false,

    ctor: function (background, xlogic, ylogic, spriteCalled) {
        this._super();

        //
        this._bg = new cc.Sprite(background);
        this.setContentSize(this._bg.getContentSize());
        this.addChild(this._bg);



        var screenPosition = MapValues.logicToScreenPosition(xlogic, ylogic);
        if (spriteCalled != null){

            this._bg.setPosition(screenPosition.x - spriteCalled.width * 2 / 3,
                screenPosition.y + spriteCalled.height * 2 / 3);
        } else {
            this._bg.setPosition(screenPosition.x, screenPosition.y);
        }



        // this.addDisableListener();
        // this.scheduleUpdate();
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

                    this.clearEventListeer();
                }

                //if (!cc.rectContainsPoint(rect, locationInNode)) {
                //    this._isClose = true;
                //    return false;
                //}
                return true;
            }.bind(this),

            onTouchMoved: function (touch, event) {

                this._isMoved = true;

                // var delta = touch.getDelta();
                // MapLayer.instance.move(delta.x, delta.y);
                /*
                 DONE
                 */

            }.bind(this),

            onTouchEnded: function (touch, event) {
                //
                var target = this._bg;

                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (!cc.rectContainsPoint(rect, locationInNode)) {
                    // cc.log("Touch Block Event ");
                    this._isClose = true;
                }

            }.bind(this)
        });
        cc.eventManager.addListener(this.disableListener, 60);
    },

    update: function (dt) {

        this._bg.setVisible(this._isVisible);

        if (this._isMoved){
            this.setVisible(false);
        }

        if (this._isClose) {
            this.unscheduleUpdate();

            if (this.disableListener) {
                cc.eventManager.removeListener(this.disableListener);
                this.removeAllChildren();
            }
            this._isClose = false;
        }
    },

    clearEventListeer: function () {},

});