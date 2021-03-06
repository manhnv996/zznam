/**
 * Created by CPU60075_LOCAL on 12/18/2017.
 */

var SettingGame = BaseLayout.extend({
    ctor: function () {
        this._super(res.BG_2_PNG, fr.Localization.text("text_title_setting_game"), true, true);

        var idLabel = new cc.LabelBMFont("ID: " + user.id, res.FONT_OUTLINE_30);
        idLabel.x = this.width / 12;
        idLabel.y = this.height / 10 * 7 + 5;
        idLabel.setAnchorPoint(0, 0.5);
        this.addChild(idLabel);

        var btnLogout = new ccui.Button(res.BUTTON_ZINGME_PNG);
        btnLogout.x = this.width / 10 * 3;
        btnLogout.y = this.height / 5 * 3;
        btnLogout.setZoomScale(-0.1);
        btnLogout.addTouchEventListener(this.onBtnLogoutClick, this);
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

        this.btnMusic = new ccui.Button();
        this.btnMusic.x = this.width / 10 * 6.5;
        this.btnMusic.y = this.height / 5 * 3;
        this.btnMusic.setZoomScale(-0.1);
        this.btnMusic.tag = 101;
        this.btnMusic.addTouchEventListener(this.touchSettingBtn, this);
        this.setResMusicBtn();
        this.addChild( this.btnMusic);

        this.btnEffect = new ccui.Button();
        this.btnEffect.x = this.width / 10 * 8.5;
        this.btnEffect.y = this.height / 2;
        this.btnEffect.setZoomScale(-0.1);
        this.btnEffect.tag = 102;
        this.btnEffect.addTouchEventListener(this.touchSettingBtn, this);
        this.setResEffectBtn();
        this.addChild(this.btnEffect);

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
                        SoundCtrl.instance.setMusic();
                        this.setResMusicBtn();
                        break;
                    case 102:
                        SoundCtrl.instance.setEffect();
                        this.setResEffectBtn();
                        break;
                }
                break;
        }
    },

    setResMusicBtn: function () {
        if(SoundCtrl.instance._isOnMusic) {
            this.btnMusic.loadTextureNormal(res.MUSIC_ON_PNG);
        } else {
            this.btnMusic.loadTextureNormal(res.MUSIC_OFF_PNG);
        }
    },

    setResEffectBtn: function () {
        if (SoundCtrl.instance._isOnEffect) {
            this.btnEffect.loadTextureNormal(res.BTN_EFFECT_ON_PNG);
        } else {
            this.btnEffect.loadTextureNormal(res.BTN_EFFECT_OFF_PNG);
        }
    },

    onBtnLogoutClick: function(sender, type) {
        ConnectCtrl.instance.logout();
    }
});
