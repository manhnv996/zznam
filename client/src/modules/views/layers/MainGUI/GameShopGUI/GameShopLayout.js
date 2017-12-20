/**
 * Created by CPU60075_LOCAL on 20/11/2017.
 */

var GameShopLayout = ccui.Layout.extend({
    _btnGameShop: null,
    _gameShop: null,
    _isHide: true,
    _layoutBlockListener: null,
    _debug: false,
    //_debug: true,

    ctor: function () {
        this._super();

        this._btnGameShop = new GSBtnLayout();
        this._gameShop = new GSDetailLayout();

        this.setContentSize(this._gameShop._bg.getBoundingBox().width, cc.winSize.height);
        this.setPosition(cc.p(-(cc.winSize.width / 3 + cc.winSize.width / 7), 0));

        this._layoutBlockListener = new ccui.Layout();
        this._layoutBlockListener.setContentSize(this.getContentSize());
        this._layoutBlockListener.setPosition(cc.p(0, 0));

        if (this._debug) {
            this.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.setBackGroundColor(cc.color.RED);
        }
        this.addChild(this._layoutBlockListener);
        this.addChild(this._btnGameShop);
        this.addChild(this._gameShop);
    },

    hide: function () {
        if (!this._isHide) {
            MainGuiLayer.instance.btnSettings.setTouchEnabled(true);
            var moveActionBtn = cc.moveTo(0.2, cc.p(0, 0));
            this._btnGameShop.stopAllActions();
            this._btnGameShop.runAction(moveActionBtn);

            var moveAction = cc.moveTo(0.25, cc.p(0, 0));
            this._layoutBlockListener.stopAllActions();
            this._layoutBlockListener.runAction(moveAction);

            this._gameShop.stopAllActions();
            this._gameShop.runAction(moveAction.clone());

            if (this.listener) {
                cc.eventManager.removeListener(this.listener);
            }
            this._isHide = true;
        }
    },

    show: function () {
        if(this._isHide) {
            MainGuiLayer.instance.btnSettings.setTouchEnabled(false);
            var moveActionBtn = cc.moveTo(0.3, cc.p(cc.winSize.width / 3 - 10, 0));
            this._btnGameShop.stopAllActions();
            this._btnGameShop.runAction(moveActionBtn);

            var moveAction = cc.moveTo(0.3, cc.p((cc.winSize.width / 3 + cc.winSize.width / 7), 0));
            this._layoutBlockListener.stopAllActions();
            this._layoutBlockListener.runAction(moveAction);

            this._gameShop.stopAllActions();
            this._gameShop.runAction(moveAction.clone());

            this.blockListener();
            this._isHide = false;
        }
    },

    blockListener: function () {
        //cc.log("Touch Block Event Shop");
        this.listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = this._layoutBlockListener;

                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, locationInNode)) {
                    return true;
                }
                this.hide();
                return false;
            }.bind(this)
        });
        cc.eventManager.addListener(this.listener, 3);

        if (this._debug) {
            this._layoutBlockListener.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this._layoutBlockListener.setBackGroundColor(cc.color.YELLOW);
        }
    }
});