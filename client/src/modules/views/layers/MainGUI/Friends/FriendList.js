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
        this.y = 0;
        this.setAnchorPoint(1, 0);
        this.setContentSize(cc.size(this._bg.getBoundingBox().width, this._bg.getBoundingBox().height));
        //this.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        //this.setBackGroundColor(cc.color.YELLOW);

        this.layoutFList = new ccui.Layout();
        this.layoutFList.setContentSize(cc.size(this._bg.getBoundingBox().width / 100 * 78, this._bg.getBoundingBox().height / 25 * 19));
        this.layoutFList.x = this._bg.getBoundingBox().width / 100 * 21;
        this.layoutFList.y = this._bg.getBoundingBox().height / 25;
        this.layoutFList.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.layoutFList.setBackGroundColor(cc.color.GREEN);
        this.addChild(this.layoutFList);

        this._listFriend = new cc.TableView(this, cc.size(this._bg.getBoundingBox().width / 100 * 78, this._bg.getBoundingBox().height / 25 * 19));
        this._listFriend.setDirection(cc.SCROLLVIEW_DIRECTION_HORIZONTAL);
        this._listFriend.x = this._bg.getBoundingBox().width / 100 * 21;
        this._listFriend.y = this._bg.getBoundingBox().height / 25;
        this._listFriend.setDelegate(this);
        this._listFriend.reloadData();
        this.addChild(this._listFriend);
    },

    scrollViewDidScroll: function (view) {

    },
    scrollViewDidZoom: function (view) {

    },

    tableCellTouched: function (table, cell) {
        cc.log("Friend Table " + cell.getIdx());
    },

    tableCellSizeForIndex: function (table, idx) {
        return cc.size(this._bg.getBoundingBox().width / 500 * 78, this._bg.getBoundingBox().height / 25 * 19);
    },

    tableCellAtIndex: function (table, idx) {
        var cell = table.dequeueCell();
        //var level = user.getLevel();
        //if (!cell) {
        cell = new cc.TableViewCell();

        //var cellSize = cc.size(this._bg.getBoundingBox().width / 500 * 78, this._bg.getBoundingBox().height / 25 * 19);

        var friend = new ccui.Layout();
        friend.x = this._bg.getBoundingBox().width / 1000 * 77;
        friend.y = this._bg.getBoundingBox().height / 50 * 19;
        friend.setContentSize(cc.size(this._bg.getBoundingBox().width / 500 * 78, this._bg.getBoundingBox().height / 25 * 19));
        friend.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        friend.setBackGroundColor(cc.color.RED);
        friend.setAnchorPoint(0.5, 0.5);

        var frame = new cc.Sprite(res.friend_avatar);
        frame.setScale(0.7);
        frame.x = friend.width / 2;
        frame.y = friend.height / 3 * 2;
        var avatar = new cc.Sprite(res.henry);
        frame.addChild(avatar);


        var name = new cc.LabelBMFont("", res.FONT_OUTLINE_20);
        var level = new cc.Sprite(res.STAR_1_PNG);
        var levelLabel = new cc.LabelBMFont("", res.FONT_OUTLINE_20);
        level.addChild(levelLabel);

        friend.addChild(frame);
        friend.addChild(level);
        friend.addChild(name);

        cell.addChild(friend);

        return cell;
    },

    numberOfCellsInTableView: function (table) {
        return 5;
    }
});