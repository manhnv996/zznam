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

        this.userNameBox = new ccui.TextBMFont("Username", res.FONT_NORMAL_50, 50);
        this.userNameBox.setTouchEnabled(true);
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


        this.lblLog = gv.commonText(fr.Localization.text("..."), size.width*0.4, size.height*0.05);
        this.addChild(this.lblLog);


    },
    onClickLogin: function(){
        //if (this.flag == 0) { todo
        if (true) {
            this.flag = 1;
        cc.log("==onplay clicked");
        audioEngine.playEffect(res.func_click_button_mp3, false);
        var username = this.userNameBox.getString();
        var password = this.passwordBox.getString();
        cc.log("==onplay clicked, username : " + username);
        cc.log("==onplay clicked, password : " + password);

        if (username == "" ||password == ""){
            this.lblLog.setString("Tên tài khoản hoặc mật khẩu không đúng!");
        } else{
            gv.username = username;
            gv.password = password;
        }
        cc.log("this.lblLog.setString("+"Start Connect!);" + gv.username + "  " + gv.password);

            if (username == "" ||password == ""){
                this.flag = 0;
                this.lblLog.setString("Tên tài khoản hoặc mật khẩu không đúng!");
            } else{
                gv.username = username;
                gv.password = password;

                cc.log("this.lblLog.setString("+"Start Connect!);" + gv.username + "  " + gv.password);

                gv.gameClient.connect();
            }

        } else {
            this.lblLog.setString("Login thread is running!");

        }
    },
    onEnter:function(){
        this._super();
    },
    onConnectSuccess:function()
    {
        cc.log("this.lblLog.setString("+"Connect Success!);")
        this.lblLog.setString("Connect Success!");
    },
    onConnectFail:function(text)
    {
        cc.log("this.lblLog.setString("+"Connect fail: );")
        this.lblLog.setString("Connect fail: " + text);
        this.flag = 0;
    },
    //onFinishLogin:function()
    //{
    //    this.lblLog.setString("Finish login!");
    //    //cc.director.runScene(new MainScene());
    //
    //    MainScene.instance = new MainScene();
    //    cc.director.runScene(MainScene.instance);
    //}


    textFieldEvent: function(sender, type)
    {
        switch (type)
        {
            case ccui.TextField.EVENT_ATTACH_WITH_IME:
                cc.log("Activate");

                break;

            case ccui.TextField.EVENT_DETACH_WITH_IME:
                cc.log("Deactivate");

                break;

            case ccui.TextField.EVENT_INSERT_TEXT:
                cc.log("Insert character");
                cc.log(this.userNameBox.string);

                break;

            case ccui.TextField.EVENT_DELETE_BACKWARD:
                cc.log("Delect character");
                cc.log(this.userNameBox.string);

                break;
        }
    }
    });

var LoginScene = cc.Scene.extend({
    onEnter: function(){
        this._super();
        var layer = new LoginLayer();
        this.addChild(layer);
    }
});