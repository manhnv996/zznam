/**
 * Created by CPU60075_LOCAL on 12/18/2017.
 */

var SettingGame = BaseLayout.extend({
    ctor: function () {
        this._super(res.BG_2_PNG, "text_title_setting_game", true, true, true);

        var idLabel = new cc.LabelBMFont("ID: " + 0, res.FONT_OUTLINE_30);
        idLabel.x = this.width / 9;
        idLabel.y = this.height / 10 * 7;
        this.addChild(idLabel);

        var btnLogout = new ccui.Button(res.BUTTON_ZINGME_PNG);
        btnLogout.x = this.width / 10 * 3;
        btnLogout.y = this.height / 5 * 3;
        btnLogout.setZoomScale(-0.1);
        this.addChild(btnLogout);

        var btnError = new ccui.Button(res.BTN_FEEDBACK_PNG);
        btnError.x = this.width / 10 * 3;
        btnError.y = this.height / 5 * 2;
        btnError.setZoomScale(-0.1);
        this.addChild(btnError);

        var btnChangeName = new ccui.Button(res.BTN_CHANGE_NAME_PNG);
        btnChangeName.x = this.width / 10 * 3;
        btnChangeName.y = this.height / 5;
        btnChangeName.setZoomScale(-0.1);
        this.addChild(btnChangeName);

        var btnMusic = new ccui.Button();
        btnMusic.x = this.width / 10 * 6.5;
        btnMusic.y = this.height / 5 * 3;
        btnMusic.setZoomScale(-0.1);
        btnMusic.tag = 101;
        btnMusic.addTouchEventListener(this.touchSettingBtn, this);
        this.addChild(btnMusic);

        if(SoundCtrl.instance.isOnMusic()) {
            btnMusic.loadTextureNormal(res.MUSIC_ON_PNG);
        } else {
            btnMusic.loadTextureNormal(res.MUSIC_OFF_PNG);
        }

        var btnEffect = new ccui.Button();
        btnEffect.x = this.width / 10 * 8.5;
        btnEffect.y = this.height / 2;
        btnEffect.setZoomScale(-0.1);
        btnEffect.tag = 102;
        btnEffect.addTouchEventListener(this.touchSettingBtn, this);
        this.addChild(btnEffect);

        if(SoundCtrl.instance.isOnEffect()) {
            btnEffect.loadTextureNormal(res.BTN_EFFECT_ON_PNG);
        } else {
            btnEffect.loadTextureNormal(res.BTN_EFFECT_OFF_PNG);
        }

        var btnQuestion = new ccui.Button(res.BUTTON_HOI_PNG);
        btnQuestion.x = this.width / 10 * 7;
        btnQuestion.y = this.height / 10 * 3;
        btnQuestion.setZoomScale(-0.1);
        this.addChild(btnQuestion);
    },

    touchSettingBtn: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_ENDED:
            case ccui.Widget.TOUCH_CANCELED:
                switch (sender.tag) {
                    case 101:
                        SoundCtrl.instance.setMusic(sender, res.MUSIC_ON_PNG, res.MUSIC_OFF_PNG);
                        break;
                    case 102:
                        SoundCtrl.instance.setEffect(sender, res.BTN_EFFECT_ON_PNG, res.BTN_EFFECT_OFF_PNG);
                        break;
                }
                break;
        }
    }
});