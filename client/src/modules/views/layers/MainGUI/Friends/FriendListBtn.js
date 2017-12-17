/**
 * Created by CPU60075_LOCAL on 12/17/2017.
 */

var FriendListBtn = ccui.Layout.extend({
    ctor: function () {
        this._super();

        this.btnFriends = new ccui.Button(res.BUTTON_FIEND_2_PNG);
        //this.btnFriends.setPosition(cc.p(cc.winSize.width + 5,  -5));
        this.btnFriends.setZoomScale(-0.1);
        this.btnFriends.addTouchEventListener(this.onclickBtnFriend, this);
        this.btnFriends.setScale(1.17);
        this.btnFriends.setAnchorPoint(1, 0);

        this.x = cc.winSize.width - this.btnFriends.getBoundingBox().width + 5;
        this.y = - 5;

        this.addChild(this.btnFriends);
    },

    onclickBtnFriend: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                audioEngine.playEffect(res.func_click_button_mp3, false);
                break;
            case ccui.Widget.TOUCH_ENDED:
            case ccui.Widget.TOUCH_CANCELED:
                if (this.parent._isHideFriendList) {
                    this.parent.show();
                } else {
                    this.parent.hide();
                }
                break;
        }
    }
});