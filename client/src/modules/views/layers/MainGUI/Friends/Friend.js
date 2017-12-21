/**
 * Created by Giang on 17/12/2017.
 */

var FriendWithLevel = ccui.Layout.extend({
    ctor: function (id, avatar, name, lvl) {
        this._super();
        this.setContentSize(cc.size(162, 162));
         //this.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
         //this.setBackGroundColor(cc.color.GREEN);

        var frame = new ccui.Button(res.friend_avatar);
        frame.setZoomScale(0.0);
        frame.x = this.width / 2;
        frame.y = this.height / 3 * 2;
        frame.addTouchEventListener(this.setOnClick, this);
        frame.setSwallowTouches(false);

        var avatar = new cc.Sprite(avatar);
        avatar.x = this.width / 2;
        avatar.y = this.height / 20 * 13;
        avatar.setScale(77/122);
        this.addChild(avatar);

        var name = new cc.LabelBMFont(name.toString(), res.FONT_OUTLINE_30);
        name.x = this.width / 2;
        name.y = this.height / 6;

        var level = new cc.Sprite(res.star_level);
        level.x = this.width / 5 * 4;
        level.y = this.height / 7 * 3;
        //level.setScale(0.7);
        var levelLabel = new cc.LabelBMFont(lvl.toString(), res.FONT_OUTLINE_30);
        levelLabel.x = level.width / 2;
        levelLabel.y = level.height / 2;
        level.addChild(levelLabel);

        this.addChild(frame);
        this.addChild(level);
        this.addChild(name);
        this.id = id;

    },

    setOnClick: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                //cc.log("button friend");
                //this.scale = this.getContentSize().width * 0.9;
                this.runAction(new cc.ScaleTo(0.1, 0.95));
                //sender.runAction(new cc.ScaleTo(0.1, 77/122 - 0.05));
                break;
            case ccui.Widget.TOUCH_ENDED:
                FriendCtrl.instance.viewFriendHome(this.id);
                break;
            case ccui.Widget.TOUCH_CANCELED:
                this.runAction(new cc.ScaleTo(0.1, 1.0));
                //sender.runAction(new cc.ScaleTo(0.1, 77/122));
                break;
        }
    },

    //setOnclick: function () {
    //    cc.log("setOnclick");
    //    var listener = cc.EventListener.create({
    //        event: cc.EventListener.TOUCH_ONE_BY_ONE,
    //        swallowTouches: false,
    //        onTouchBegan: function (touch, event) {
    //            var target = event.getCurrentTarget();
    //
    //            var locationInNode = target.convertToNodeSpace(touch.getLocation());
    //            var s = target.getContentSize();
    //            var rect = cc.rect(0, 0, s.width, s.height);
    //
    //            if (cc.rectContainsPoint(rect, locationInNode)) {
    //                cc.log("Friend began");
    //                target.runAction(new cc.ScaleTo(0.1, 0.9));
    //                return true;
    //            }
    //            return false;
    //        },
    //        onTouchEnded: function (touch, event) {
    //            cc.log("Friend end");
    //            var target = event.getCurrentTarget();
    //            target.runAction(new cc.ScaleTo(0.1, 1.0));
    //            FriendCtrl.instance.viewFriendHome(this.id);
    //        }
    //    });
    //
    //    cc.eventManager.addListener(listener, this);
    //}
});

//var Friend = ccui.Layout.extend({
//    ctor: function (avatar, name) {
//        this._super();
//
//        var layout =
//    }
//});