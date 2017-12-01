/**
 * Created by CPU60075_LOCAL on 11/30/2017.
 */

var BlockListenerLayer = cc.LayerColor.extend({
    _isClose: false,
    _debug: false,
    //_debug: true,

    ctor: function (sizeBlock) {
        this._super(cc.Color.BLACK, cc.winSize.width, cc.winSize.height);

        this._width = sizeBlock.width * ((cc.winSize.height - 20) / sizeBlock.height);
        this._height = sizeBlock.height * ((cc.winSize.height - 20) / sizeBlock.height);

        this._blockFull = new ccui.Layout();
        this._blockFull.setContentSize(cc.winSize.width, cc.winSize.height);
        this._blockFull.setPosition(cc.p(0,0));

        if (this._debug) {
            this._blockFull.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this._blockFull.setBackGroundColor(cc.color.WHITE);
        }

        this.addChild(this._blockFull);

        this._blockGUI = new ccui.Layout();
        this._blockGUI.setContentSize(this._width, this._height);
        this._blockGUI.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
        this._blockGUI.setAnchorPoint(0.5, 0.5);

        this.addChild(this._blockGUI);


        this.setOpacity(0);
        var action = new cc.FadeTo(0.35, 150);
        this.runAction(action);

        this.blockFullListener();
        //this.blockGUIListener();

        this.scheduleUpdate();

        if (this._debug) {
            this.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.setBackGroundColor(cc.color.GREEN);
        }
    },

    blockFullListener: function () {
        this._listenerBlockFull = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                //var target = this._blockFull;
                var target = this._blockGUI;

                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (!cc.rectContainsPoint(rect, locationInNode)) {
                    cc.log("Touch Block Event ");
                    this._isClose = true;
                    //return true;
                }
                //this._isClose = true;
                //return false;
                return true;
            }.bind(this)
        });
        cc.eventManager.addListener(this._listenerBlockFull, 1);
    },
    //
    //blockGUIListener: function () {
    //    //cc.log("Touch Block Event ");
    //    this._listenerBlockGUI = cc.EventListener.create({
    //        event: cc.EventListener.TOUCH_ONE_BY_ONE,
    //        swallowTouches: true,
    //        onTouchBegan: function (touch, event) {
    //            var target = this._blockGUI;
    //            var locationInNode = target.convertToNodeSpace(touch.getLocation());
    //            var s = target.getContentSize();
    //            var rect = cc.rect(0, 0, s.width, s.height);
    //
    //            if (cc.rectContainsPoint(rect, locationInNode)) {
    //                //cc.log("Touch Block Event ");
    //                return true;
    //            }
    //            return false;
    //            //return true;
    //        }.bind(this)
    //    });
    //    cc.eventManager.addListener(this._listenerBlockGUI, 1);
    //
    //    if (this._debug) {
    //        this._blockGUI.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
    //        this._blockGUI.setBackGroundColor(cc.color.BLACK);
    //    }
    //},

    update: function (dt) {
        if (this._isClose) {
            this.unscheduleUpdate();
            //MainGuiLayer.instance.unlockButton();
            BaseGUILayer.instance.removeBlockListener();
            //BaseGUILayer.instance.removeAllChildren();
            this._isClose = false;

        }
    }
});