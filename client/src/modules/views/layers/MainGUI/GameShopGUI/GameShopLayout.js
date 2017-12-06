/**
 * Created by CPU60075_LOCAL on 20/11/2017.
 */

var GameShopLayout = ccui.Layout.extend({
    _btnGameShop: null,
    _gameShop: null,
    _isHide: true,
    //_listener: null,
    _layoutBlockListener: null,
    _debug: false,
    _isClose: true,
    //_debug: true,

    ctor: function () {
        this._super();

        this._btnGameShop = new GSBtnLayout();
        //this._btnGameShop.setTouchEnabled(false);
        //this.addChild(this._btnGameShop);

        this._gameShop = new GSDetailLayout();
        //this.addChild(this._gameShop);


        this.setContentSize(this._gameShop._bg.getBoundingBox().width, cc.winSize.height);
        //cc.log("Width Shop " + this.width);
        this.setPosition(cc.p(-(cc.winSize.width / 3 + cc.winSize.width / 7), 0));

        this._layoutBlockListener = new ccui.Layout();
        this._layoutBlockListener.setContentSize(this.getContentSize());
        this._layoutBlockListener.setPosition(cc.p(0, 0));

        if (this._debug) {
            this.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.setBackGroundColor(cc.color.RED);
        }
        this.addComponent();

        //this.scheduleUpdate();
    },

    addComponent: function () {
        //this.blockListener();
        this.addChild(this._layoutBlockListener);
        this.addChild(this._btnGameShop);
        this.addChild(this._gameShop);
    },

    hide: function () {
        this._isHide = true;
        MainGuiLayer.instance.btnSettings.setTouchEnabled(true);
        var moveActionBtn = cc.moveTo(0.05, cc.p(0, 0));
        this._btnGameShop.runAction(moveActionBtn);
        //var moveAction = cc.moveTo(0.1, cc.p(-(cc.winSize.width / 3 + cc.winSize.width / 7), 0));
        var moveAction = cc.moveTo(0.1, cc.p(0, 0));
        this._layoutBlockListener.runAction(moveAction);
        this._gameShop.runAction(moveAction.clone());
        //cc.log("this.listener" + this.listener);
        if (this.listener) {
            cc.eventManager.removeListener(this.listener);
            //cc.log("remove listener");
        }
    },

    show: function () {
        //this.scheduleUpdate();
        this._isHide = false;
        MainGuiLayer.instance.btnSettings.setTouchEnabled(false);
        var moveActionBtn = cc.moveTo(0.1, cc.p(cc.winSize.width / 3 - 10, 0));
        this._btnGameShop.runAction(moveActionBtn);
        //var moveAction = cc.moveTo(0.1, cc.p(0, 0));
        var moveAction = cc.moveTo(0.1, cc.p((cc.winSize.width / 3 + cc.winSize.width / 7), 0));
        this._layoutBlockListener.runAction(moveAction);
        this._gameShop.runAction(moveAction.clone());
        this.blockListener();
        //cc.log("this.listener2" + this.listener);

        //cc.log("this._isHide " + this._isHide);
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
                //cc.log("Block began");
                if (cc.rectContainsPoint(rect, locationInNode)) {
                    //cc.log("Touch Block Event Shop");
                    //cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                    //target.opacity = 180;
                    //MainGuiLayer.instance.btnSettings.setTouchEnabled(false);
                    return true;
                }
                //MainGuiLayer.instance.btnSettings.setTouchEnabled(true);
                //if (!this._isHide) {
                //    this.hide();
                //}
                //this._isClose = true;
                this.hide();
                return false;
                //return true;
            }.bind(this),

            onTouchMoved: function(touch) {
                this._isClose = false;
                var delta = touch.getDelta();
                //MapLayer.instance.move(delta.x, delta.y);
            }.bind(this),

            onTouchEnded: function() {
                if (this._isClose) {
                    this.hide();
                }
            }.bind(this)
        });
        //cc.log("add listener");
        cc.eventManager.addListener(this.listener, 3);
        //cc.eventManager.setPriority(listener, 0);

        if (this._debug) {
            this._layoutBlockListener.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this._layoutBlockListener.setBackGroundColor(cc.color.YELLOW);
        }
    },

    //update: function (dt) {
    //    if (!this._isClose) {
    //        this.unscheduleUpdate();
    //        this.hide();
    //        this._isClose = true;
    //    }
    //}
});