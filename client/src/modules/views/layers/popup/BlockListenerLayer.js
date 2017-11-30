/**
 * Created by CPU60075_LOCAL on 11/30/2017.
 */

var BlockListenerLayer = cc.LayerColor.extend({
    _debug: false,
    _isShow: null,
    //_debug: true,

    ctor: function (sizeBlock) {
        this._super(cc.Color.BLACK, cc.winSize.width, cc.winSize.height);

        this._width = sizeBlock.width * ((cc.winSize.height - 20) / sizeBlock.height);
        this._height = sizeBlock.height * ((cc.winSize.height - 20) / sizeBlock.height);

        this._blockLayout = new ccui.Layout();
        this._blockLayout.setContentSize(this._width, this._height);
        this._blockLayout.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
        this._blockLayout.setAnchorPoint(0.5, 0.5);

        this.addChild(this._blockLayout);


        this.setOpacity(0);
        var action = new cc.FadeTo(0.35, 150);
        this.runAction(action);

        this.blockListenerLayout();

        //if (this._debug) {
        //    this.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        //    this.setBackGroundColor(cc.color.GREEN);
        //}
    },

    blockListenerLayout: function () {
        cc.log("Touch Block Event ");
        this._listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = this._blockLayout;
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    //cc.log("Touch Block Event ");
                    return true;
                }
                return false;
                //return true;
            }.bind(this)
        });
        cc.eventManager.addListener(this._listener, 1);

        //NotifyLayer.instance.touchCloseButtonLayout();

        if (this._debug) {
            this._blockLayout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this._blockLayout.setBackGroundColor(cc.color.GREEN);
        }
    }
});