/**
 * Created by CPU60075_LOCAL on 12/17/2017.
 */

var FriendUI = ccui.Layout.extend({
    _isHideFriendList: true,

    ctor: function () {
        this._super();

        this._btnOpenFriendList = new FriendListBtn();

        this._friendList = new FriendList();
        cc.log("FriendUI");

        this.setContentSize(this._friendList._bg.getBoundingBox().width, cc.winSize.height / 3 + this._btnOpenFriendList.height);
        this.x = cc.winSize.width;
        this.y = 0;
        this.setAnchorPoint(1, 0);

        this._friendList.x = this._friendList._bg.getBoundingBox().width;
        this._friendList.y = - this.height;

        this._layoutBlockListener = new ccui.Layout();
        this._layoutBlockListener.setContentSize(this.getContentSize());
        this._layoutBlockListener.setPosition(cc.p(this.width, - this.height));
        this._layoutBlockListener.setAnchorPoint(1, 0);
        //this._layoutBlockListener.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        //this._layoutBlockListener.setBackGroundColor(cc.color.RED);

        this.addChild(this._layoutBlockListener);
        this.addChild(this._btnOpenFriendList);
        this.addChild(this._friendList);
    },

    hide: function () {
        if (!this._isHideFriendList){
            var moveActionBtn = cc.moveTo(0.2,
                cc.p(cc.winSize.width - this._btnOpenFriendList.getBoundingBox().width, 0));
            this._btnOpenFriendList.stopAllActions();
            this._btnOpenFriendList.runAction(moveActionBtn);

            var moveAction = cc.moveTo(0.25, cc.p(this.width, - this.height));
            this._layoutBlockListener.stopAllActions();
            this._layoutBlockListener.runAction(moveAction);
            this._friendList.stopAllActions();
            this._friendList.runAction(moveAction.clone());

            if (this.listener) {
                cc.eventManager.removeListener(this.listener);
            }
            this._isHideFriendList = true;
        }
    },

    show: function () {
        if (this._isHideFriendList) {
            var moveActionBtn = cc.moveTo(0.3,
                cc.p(cc.winSize.width - this._btnOpenFriendList.getBoundingBox().width,
                    cc.winSize.height / 3));
            this._btnOpenFriendList.stopAllActions();
            this._btnOpenFriendList.runAction(moveActionBtn);

            var moveAction = cc.moveTo(0.3, cc.p(this.width, 0));
            this._layoutBlockListener.stopAllActions();
            this._layoutBlockListener.runAction(moveAction);
            this._friendList.stopAllActions();
            this._friendList.runAction(moveAction.clone());

            this.blockListener();
            this._isHideFriendList = false;
        }
    },

    blockListener: function () {
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
                //this.hide();
                return false;
            }.bind(this)
        });
        cc.eventManager.addListener(this.listener, 3);
    }
});