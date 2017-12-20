/**
 * Created by CPU60075_LOCAL on 12/17/2017.
 */

var FriendList = ccui.Layout.extend({
    layoutFList: null,

    ctor: function () {
        this._super();

        this._bg = new cc.Sprite(res.friend_bg);
        this._bg.setScale((cc.winSize.height / 3) / this._bg.height);
        this._bg.setAnchorPoint(0, 0);
        this.addChild(this._bg);

        this.x = this._bg.getBoundingBox().width;
        this.y = -cc.winSize.height / 3;
        this.setAnchorPoint(1, 0);
        this.setContentSize(cc.size(this._bg.getBoundingBox().width, this._bg.getBoundingBox().height));
        //this.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        //this.setBackGroundColor(cc.color.YELLOW);

        var addFriend = new ccui.Button(res.btn_addFriend);
        addFriend.x = this.width / 100 * 11;
        addFriend.y = this.height / 2;
        //addFriend.setAnchorPoint(0, 0);

        this.layoutFList = new ccui.Layout();
        this.layoutFList.setContentSize(cc.size(this.width / 100 * 78, this.height / 25 * 19));
        this.layoutFList.x = this.width / 100 * 21;
        this.layoutFList.y = this.height / 25;
        // this.layoutFList.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        // this.layoutFList.setBackGroundColor(cc.color.GREEN);
        this.addChild(this.layoutFList);

        this._listFriend = new cc.TableView(this, cc.size(this.width / 100 * 78, this.height / 25 * 19));
        this._listFriend.setDirection(cc.SCROLLVIEW_DIRECTION_HORIZONTAL);
        this._listFriend.x = this.width / 100 * 21;
        this._listFriend.y = this.height / 25;
        this._listFriend.setDelegate(this);
        this._listFriend.reloadData();


        this.addChild(this._listFriend);
        this.addChild(addFriend);
    },

    scrollViewDidScroll: function (view) {

    },
    scrollViewDidZoom: function (view) {

    },

    tableCellTouched: function (table, cell) {
        cc.log("tableCellTouched", cell.getIdx());
        //var friend = cell.getChildByTag(10);
        //friend.setOnClick();
    },

    tableCellSizeForIndex: function (table, idx) {
        return cc.size(this._bg.getBoundingBox().width / 500 * 78, this._bg.getBoundingBox().height / 25 * 19);
    },

    tableCellAtIndex: function (table, idx) {
        var cell = table.dequeueCell();
        //var level = user.getLevel();
        //if (!cell) {
        cell = new cc.TableViewCell();

        var friend = new FriendWithLevel(0, res.henry, "Henry", 50);
        friend.x = this._bg.getBoundingBox().width / 1000 * 77;
        friend.y = this._bg.getBoundingBox().height / 50 * 19;
        friend.setAnchorPoint(0.5, 0.5);
        friend.tag = 10;
        friend.setOnClick(this._listFriend);
        cell.addChild(friend);

        return cell;
    },

    numberOfCellsInTableView: function (table) {
        return 10;
    }


});