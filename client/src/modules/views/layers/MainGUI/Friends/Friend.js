/**
 * Created by Giang on 17/12/2017.
 */

var Friend = ccui.Layout.extend({
    ctor: function (id, avatar, name, lvl) {
        this._super();
        this.setContentSize(cc.size(162, 162));

        var frame = new cc.Sprite(res.friend_avatar);
        frame.setScale(0.7);
        frame.x = this.width / 2;
        frame.y = this.height / 3 * 2;
        var avatar = new cc.Sprite(avatar);
        avatar.x = frame.width / 100 * 9;
        avatar.y = frame.height / 20;
        avatar.setAnchorPoint(0, 0);
        frame.addChild(avatar);

        var name = new cc.LabelBMFont(name, res.FONT_OUTLINE_30);
        name.x = this.width / 2;
        name.y = this.height / 6;

        var level = new cc.Sprite(res.STAR_1_PNG);
        level.x = this.width / 5 * 4;
        level.y = this.height / 7 * 3;
        level.setScale(0.7);
        var levelLabel = new cc.LabelBMFont(lvl.toString(), res.FONT_OUTLINE_30);
        levelLabel.x = level.width / 2;
        levelLabel.y = level.height / 2;
        level.addChild(levelLabel);

        this.addChild(frame);
        this.addChild(level);
        this.addChild(name);
    }
});