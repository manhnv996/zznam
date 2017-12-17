/**
 * Created by CPU60075_LOCAL on 12/9/2017.
 */

var ToolTipLayout = ccui.Layout.extend({
    ctor: function (name, time) {
        this._super();

        var bg = new cc.Sprite(res.tooltip_png);
        bg.setAnchorPoint(0, 0);

        this.addChild(bg);
        this.setContentSize(bg.getContentSize());
        //this.setAnchorPoint(0.5, 0.5);
        //this.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        //this.setBackGroundColor(cc.color.GREEN);

        var name = cc.LabelBMFont(name, res.FONT_OUTLINE_30);
        name.x = bg.width / 2;
        name.y = bg.height;
        name.setAnchorPoint(0.5, 1);
        this.addChild(name);

        if (time != ""){
            var hour = Math.floor(time / 60);
            var min = time - hour * 60;
            var timeLable;
            cc.log("hour" + hour);
            if(hour) {
                if (min) {
                    timeLable = new cc.LabelBMFont(hour + fr.Localization.text("Text_time_hour") +
                        min + fr.Localization.text("Text_time_minute"), res.FONT_OUTLINE_30);
                } else {
                    timeLable = new cc.LabelBMFont(hour + fr.Localization.text("Text_time_hour"), res.FONT_OUTLINE_30);
                }
            } else {
                timeLable = new cc.LabelBMFont(min + fr.Localization.text("Text_time_minute"), res.FONT_OUTLINE_30);
            }

            timeLable.x = this.width / 2;
            timeLable.y = 0;
            timeLable.setAnchorPoint(0.5, 0);
            this.addChild(timeLable);
        }

        this.showAction();
    },

    showAction: function () {
        this.setScale(0.5);
        var scaleUp = cc.scaleTo(0.2, 1.4);
        var scaleDown = cc.scaleTo(0.15, 1.3);
        this.runAction(cc.sequence(scaleUp, scaleDown));
    }
});