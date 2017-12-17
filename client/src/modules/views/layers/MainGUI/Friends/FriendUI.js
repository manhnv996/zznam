/**
 * Created by CPU60075_LOCAL on 12/17/2017.
 */

var FriendUI = ccui.Layout.extend({
    ctor: function () {
        this._super();

        this._btnOpenFriendList = new FriendListBtn();

        this._friendList = new FriendList();

        this.setContentSize(this._friendList._bg.getBoundingBox().width, cc.winSize.height / 3);
        this.x = cc.winSize.width;
        this.y = 0;
        this.setAnchorPoint(1, 0);

        //this.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        //this.setBackGroundColor(cc.color.RED);
        this.addComponent();
    },

    addComponent: function () {
        this.addChild(this._btnOpenFriendList);
        this.addChild(this._friendList);
    },

    hide: function () {

    },

    show: function () {

    },

    blockListener: function () {

    }
});