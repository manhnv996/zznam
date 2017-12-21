/**
 * Created by CPU60135_LOCAL on 11/15/2017.
 */
gv.username = null;
gv.password  = null;

var LoginLayer = cc.Layer.extend({
    userNameBox: null,
    passwordBox: null,
    userNameText: null,
    passwordText: null,
    lbStatus: null,
    flag: 0, //flag = 1, loginButton is already clicked login, flag = 0 not

    ctor:function(){
        this._super();
        var size = cc.director.getVisibleSize();
        var centerpos = cc.p(size.width / 2, size.height / 2);
        var spritebg = new cc.Sprite(res.PRETTY_BG_DIALOG_PNG);
        cc.log(spritebg.width+" "  +spritebg.height);
        spritebg.setScale(size.width/spritebg.width,size.height/spritebg.height);
        //spritebg.setScale(fr.clientConfig.getResourceScale().)
        spritebg.setPosition(centerpos);
        this.addChild(spritebg);
        //add username edittext
        var usernamBoxImage =  new cc.Scale9Sprite(res.LAYER_24_PNG);
        usernamBoxImage.setPosition(centerpos.x, 5*centerpos.y/4);
        this.addChild(usernamBoxImage);

        this.userNameBox = new cc.EditBox(cc.size(350, 70), new cc.Scale9Sprite(res.LAYER_24_PNG));
        //this.userNameBox.setTouchEnabled(true);
        this.userNameBox.setString("zznamspozz79");
        this.userNameBox.setPosition(centerpos.x, 5*centerpos.y/4);
        //this.userNameBox.addEventListener(this.textFieldEvent, this);
        this.addChild(this.userNameBox);

        //add password edittext
        this.passwordBox=  new cc.EditBox(cc.size(350, 70), new cc.Scale9Sprite(res.LAYER_24_PNG));
        this.passwordBox.setPosition(centerpos.x, 4*centerpos.y/4);
        this.passwordBox.setFont("Paint Boy", 60);
        this.passwordBox.setPlaceHolder("password");
        this.passwordBox.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        this.passwordBox.setString("altkhm979");
        this.addChild(this.passwordBox);


        //6. create a menu and assign onClickLogin event callback to it.
        var menuItemPlay =  new cc.MenuItemSprite(
            new cc.Sprite(res.BUTTON_ZINGME_DANGNHAP_PNG), // normal state image
            new cc.Sprite(res.BUTTON_ZINGME_PNG), //select state image
            this.onClickLogin, this);
        var menu = new cc.Menu(menuItemPlay);

        //7. create the menu
        menu.setPosition(centerpos.x, 3*centerpos.y/4);
        this.addChild(menu);


        this.lbStatus = new cc.LabelBMFont("", res.FONT_OUTLINE_50);
        this.lbStatus.setPosition(cc.winSize.width / 2, 80);
        this.addChild(this.lbStatus);
    },

    onClickLogin: function() {
        if (this.flag) {
            return;
        }
        this.flag = true;
        this.lbStatus.setString(fr.Localization.text("txt_waiting"));
        SoundCtrl.instance.playSoundEffect(res.func_click_button_mp3, false);
        
        var username = this.userNameBox.getString();
        var password = this.passwordBox.getString();
        
        if (username == "" || password == ""){
            this.invalidUsernamePassword();
        }

        gv.username = username;
        gv.password = password;

        gv.gameClient.connect();
    },

    connectFailed: function() {
        this.flag = false;
        return this.lbStatus.setString(fr.Localization.text("txt_cant_connect_to_server"));
    },

    invalidUsernamePassword: function() {
        this.flag = false;
        return this.lbStatus.setString(fr.Localization.text("text_can_not_login"));
    }
});

var LoginScene = BaseScene.extend({
    ctor: function() {
        this._super();
        this.layer = new LoginLayer();
        this.addChild(this.layer);
    },

    connectFailed: function() {
        this.layer.connectFailed();
    }
});
