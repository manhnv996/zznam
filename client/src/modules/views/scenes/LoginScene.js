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
    _autoSave: false,
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
        this.userNameBox.setFontSize(40);
        this.userNameBox.setPlaceHolder("   username");
        //this.userNameBox.doesAdjustBackgroundImage(true);
        this.userNameBox.font = res.FONT_NORMAL_30;
        //this.userNameBox.setMargins(100, 20);
        this.userNameBox.setPosition(centerpos.x, 5*centerpos.y/4);
        //this.userNameBox.addEventListener(this.textFieldEvent, this);
        this.addChild(this.userNameBox);

        //add password edittext
        this.passwordBox=  new cc.EditBox(cc.size(350, 70), new cc.Scale9Sprite(res.LAYER_24_PNG));
        this.passwordBox.setPosition(centerpos.x, 4*centerpos.y/4);
        this.passwordBox.setFontSize( 40);
        //this.passwordBox.setMargins(100, 20);

        this.passwordBox.setPlaceHolder("   password");
        this.passwordBox.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        this.addChild(this.passwordBox);

        var checkBox = new ccui.CheckBox(res.CHECK_BOX_NORMAL_PNG, res.CHECK_BOX_ACTIVE_PNG);
        //checkBox.loadTextures(res.CHECK_BOX_NORMAL_PNG, res.CHECK_BOX_NORMAL_PRESS_PNG, res.CHECK_BOX_ACTIVE_PNG,frontCrossDisabled, texType);
        checkBox.x = centerpos.x - 120;
        checkBox.y = centerpos.y*3/4;
        checkBox.setScale(2);
        checkBox.addEventListener(this.selectedStateEvent, this);
        this.addChild(checkBox);
        var autoSaveText = new cc.LabelBMFont("Auto-save password", res.FONT_NORMAL_30);
        autoSaveText.setPosition(centerpos.x + 10 ,centerpos.y*3/4 );
        this.addChild(autoSaveText);

        var valueAutoSave = JSON.parse( cc.sys.localStorage.getItem( JSON.stringify( "AUTOSAVE" ) ) );
        cc.log( "AUTOSAVE  " +valueAutoSave );
        var valueUsername = JSON.parse( cc.sys.localStorage.getItem( JSON.stringify( "USERNAME" ) ) );
        this.userNameBox.setString(valueUsername)

        if (valueAutoSave == 1){
            cc.log( "AUTOSAVE TRUE" );
            var valuePassword = JSON.parse( cc.sys.localStorage.getItem( JSON.stringify( "PASSWORD" ) ) );
            this.passwordBox.setString(valuePassword);
            checkBox.setSelected(true);
            this._autoSave = true;
        } else {
            checkBox.setSelected(false);
            this._autoSave = false;
        }

        //6. create a menu and assign onClickLogin event callback to it.
        var menuItemPlay =  new cc.MenuItemSprite(
            new cc.Sprite(res.BUTTON_ZINGME_DANGNHAP_PNG), // normal state image
            new cc.Sprite(res.BUTTON_ZINGME_PNG), //select state image
            this.onClickLogin, this);
        var menu = new cc.Menu(menuItemPlay);

        //7. create the menu
        menu.setPosition(centerpos.x, 2*centerpos.y/4);
        this.addChild(menu);


        this.lbStatus = new cc.LabelBMFont("", res.FONT_OUTLINE_50);
        this.lbStatus.setPosition(cc.winSize.width / 2, 80);
        this.addChild(this.lbStatus);

        return true;
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
        cc.sys.localStorage.setItem( JSON.stringify( "USERNAME" ), JSON.stringify( username ) );
        if (this._autoSave){
            cc.sys.localStorage.setItem( JSON.stringify( "AUTOSAVE" ), JSON.stringify( 1 ) );
            cc.sys.localStorage.setItem( JSON.stringify( "PASSWORD" ), JSON.stringify( password ) );
        } else {
            cc.sys.localStorage.setItem( JSON.stringify( "AUTOSAVE" ), JSON.stringify( 0 ) );
            //cc.sys.localStorage.setItem( JSON.stringify( "USERNAME" ), JSON.stringify( "" ) );
            //cc.sys.localStorage.setItem( JSON.stringify( "PASSWORD" ), JSON.stringify( "" ) );
        }



    },

    connectFailed: function() {
        this.flag = false;
        return this.lbStatus.setString(fr.Localization.text("txt_cant_connect_to_server"));
    },

    invalidUsernamePassword: function() {
        this.flag = false;
        return this.lbStatus.setString(fr.Localization.text("text_can_not_login"));
    },
    selectedStateEvent: function(sender, type) {
        switch (type) {
            case ccui.CheckBox.EVENT_UNSELECTED:
                cc.log("Not selected");
                this._autoSave = false;
                //cc.sys.localStorage.setItem( JSON.stringify( "AUTOSAVE" ), JSON.stringify( 0 ) );
                break;

            case ccui.CheckBox.EVENT_SELECTED:
                cc.log("Selected");
                this._autoSave = true;
                //cc.sys.localStorage.setItem( JSON.stringify( "AUTOSAVE" ), JSON.stringify( 1 ) );
                break;
        }
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
