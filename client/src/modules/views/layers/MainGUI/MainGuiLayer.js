/**
 * Created by CPU60135_LOCAL on 10/27/2017.
 */
var MainGuiLayer = cc.Layer.extend({
    labelGold : null,
    labelRuby : null,
    labelExp : null,
    labelLevel : null,
    level: null,
    exp: null,
    max_exp: 50,
    loadingBar: null,
    isShowPopup: false,

    ctor : function(){
        //1. call super class's ctor fuction
        this._super();

        var size = cc.director.getVisibleSize();
        cc.log("visible size " + size.width +" "  + size.height);
        //3. calculate the center point
        var centerpos = cc.p(size.width / 2, size.height / 2);
        var center_bottom_pos = cc.p(size.width / 2, 40);
        var center_top_pos = cc.p(size.width / 2, size.height - 40);

        // 5. create a friends button and set it's position at the bottom right of screensize
        //this.btnFriends = new ccui.Button(res.BUTTON_FIEND_2_PNG);
        //var btnFriendsSize = this.btnFriends.getSize();
        ////cc.log("btnFriends " + btnFriendsSize.width + "  " + btnFriendsSize.height);
        //this.btnFriends.setPosition(size.width - btnFriendsSize.width/2, btnFriendsSize.height/2);
        //this.btnFriends.addClickEventListener(this.onSelectFriends.bind(this));
        //
        //this.addChild(this.btnFriends);

        if (!home) {
            return;
        }
        // 3. create a settings button and set it's position at the top left of screensize
        this.btnSettings = new ccui.Button(res.BUTTON_SETTING_2_PNG);
        var btnSettingsSize = this.btnSettings.getSize();
        //cc.log("btnSettings " + btnSettingsSize.width + "  " + btnSettingsSize.height);
        this.btnSettings.setPosition(btnSettingsSize.width/2, size.height - btnSettingsSize.height/2);
        this.addChild(this.btnSettings);
        this.btnSettings.addClickEventListener(this.onSelectSettings.bind(this));

        // 6. create a BuyCoin button and set it's position at the top right of screensize
        this.btnBuyGold = new ccui.Button(res.BUTTON_CONG_2);
        var btnBuyGoldSize = this.btnBuyGold.getSize();
        //cc.log("btnBuyGold " + btnBuyGoldSize.width + "  " + btnBuyGoldSize.height);
        this.btnBuyGold.setPosition(size.width - btnBuyGoldSize.width/2, size.height - btnBuyGoldSize.height/2);
        this.btnBuyGold.addTouchEventListener(this.onSelectBuyGold, this);
        this.addChild(this.btnBuyGold);

        this.imageGold = new ccui.ImageView(res.gold);
        var imageGoldSize = this.imageGold.getSize();
        //cc.log("imageGold " + imageGoldSize.width + "  " + imageGoldSize.height);
        //this.imageGold.setPosition(size.width - (btnBuyGoldSize.width + imageGoldSize.width), size.height - btnBuyGoldSize.height/2);
        this.imageGold.setPosition(cc.winSize.width / 10 * 9, size.height - btnBuyGoldSize.height/2);
        this.addChild(this.imageGold);

        this.labelGold = new cc.LabelBMFont(user.getGold(), res.FONT_OUTLINE_30);
        //this.labelGold.setPosition(size.width - (btnBuyGoldSize.width + imageGoldSize.width + this.labelGold.width),size.height - btnBuyGoldSize.height/2 );
        this.labelGold.setPosition(cc.p(cc.winSize.width / 10 * 8.75, size.height - btnBuyGoldSize.height/2));
        this.labelGold.setAnchorPoint(cc.p(1, 0.5));
        this.addChild(this.labelGold);


        // 7. create a BuyCoin button and set it's position below btnBuyCoin
        this.btnBuyRuby = new ccui.Button(res.BUTTON_CONG_2);
        var btnBuyRubySize = this.btnBuyRuby.getSize();
        //cc.log("btnBuyRuby " + btnBuyRubySize.width + "  " + btnBuyRubySize.height);
        this.btnBuyRuby.setPosition(size.width - btnBuyRubySize.width/2, size.height - this.btnBuyRuby.height - btnBuyRubySize.height/2);
        this.btnBuyRuby.addTouchEventListener(this.onSelectBuyRuby, this);
        this.addChild(this.btnBuyRuby);

        var imageRuby = new ccui.ImageView(res.rubi);
        var imageRubySize = imageRuby.getSize();
        //cc.log("imageRuby " + imageRubySize.width + "  " + imageRubySize.height);
        //imageRuby.setPosition(size.width - (btnBuyRubySize.width + imageRubySize.width), size.height - btnBuyGoldSize.height - btnBuyRubySize.height/2);
        imageRuby.setPosition(cc.winSize.width / 10 * 9, size.height - btnBuyGoldSize.height - btnBuyRubySize.height/2);
        this.addChild(imageRuby);

        this.labelRuby = new cc.LabelBMFont(user.getRuby(), res.FONT_OUTLINE_30);
        //this.labelRuby.setPosition(size.width - ( btnBuyRubySize.width + imageRubySize.width + this.labelRuby.width), size.height - 3*btnBuyRubySize.height/2);
        this.labelRuby.setPosition(cc.p(cc.winSize.width / 10 * 8.75, size.height - 3*btnBuyRubySize.height/2));
        this.labelRuby.setAnchorPoint(cc.p(1, 0.5));
        this.addChild(this.labelRuby);



        // 8. create a search button and set it's position below btnBuyCoin
        // this.btnSearch = new ccui.Button(res.STAR_1_PNG);
        // var btnSearchSize = this.btnSearch.getSize();
        // //cc.log("btnSearch " + btnSearchSize.width + "  " + btnSearchSize.height);
        // this.btnSearch.setPosition(size.width - btnSearchSize.width/2, size.height - 5*btnBuyRubySize.height/2);
        // this.addChild(this.btnSearch);


        var imageExp_111 = new ccui.ImageView(res.EXP_111_PNG);
        var imageExp_111Size = imageExp_111.getSize();
        imageExp_111.setPosition(center_top_pos);
        this.addChild(imageExp_111);

        this.loadingBar = new ccui.LoadingBar();
        this.loadingBar.setName("ExpBar");
        this.loadingBar.loadTexture(res.progress);
        this.loadingBar.setPosition(center_top_pos.x + 28, center_top_pos.y);
        this.addChild(this.loadingBar);

        this.labelExp = new cc.LabelBMFont(user.getExp() + " / " + getLevelupObjById(user.getLevel() + 1).exp, res.FONT_OUTLINE_30);
        this.labelExp.setPosition(center_top_pos);
        this.addChild(this.labelExp);

        this.imageLevel = new ccui.ImageView(res.STAR_1_PNG);
        var imageLevelSize = this.imageLevel.getSize();
        //cc.log("imageLevelSize " + imageLevelSize.width + "  " + imageLevelSize.height);
        this.imageLevel.setPosition(center_top_pos.x-imageExp_111Size.width/2,center_top_pos.y);
        this.addChild(this.imageLevel);

        this.labelLevel = new cc.LabelBMFont(user.getLevel(), res.FONT_OUTLINE_30);
        this.labelLevel.setPosition(center_top_pos.x - imageExp_111Size.width/2,center_top_pos.y);
        this.addChild(this.labelLevel);


        //
        this.setExpPecent();

        GameShopLayout.instance = new GameShopLayout();
        this.addChild(GameShopLayout.instance);

        FriendUI.instance = new FriendUI();
        this.addChild(FriendUI.instance);
    },

    //
    setExpPecent: function () {
        // this.labelExp.setString(user.getExp() + " / " + getLevelupObjById(user.getLevel() + 1).exp);
        this.loadingBar.setPercent(user.getExp() * 100.0 / getLevelupObjById(user.getLevel() + 1).exp);
    },


    lockButton: function () {
        GameShopLayout.instance._btnGameShop.btnGS.setTouchEnabled(false);
        this.btnSettings.setTouchEnabled(false);
        FriendUI.instance._btnOpenFriendList.btnFriends.setTouchEnabled(false);
        this.btnBuyGold.setTouchEnabled(false);
        this.btnBuyRuby.setTouchEnabled(false);
        this.btnSearch.setTouchEnabled(false);

    },

    unlockButton: function () {
        GameShopLayout.instance._btnGameShop.btnGS.setTouchEnabled(true);
        this.btnSettings.setTouchEnabled(true);
        FriendUI.instance._btnOpenFriendList.btnFriends.setTouchEnabled(true);
        this.btnBuyGold.setTouchEnabled(true);
        this.btnBuyRuby.setTouchEnabled(true);
        this.btnSearch.setTouchEnabled(true);
    },

    onEnter:function(){
      this._super();
    },
    onPlay : function(){
        //cc.log("==onplay clicked");
        fr.view(ScreenNetwork);
    },
    onSelectSettings:function(sender)
    {
       //if (this.isShowPopup == false){
           //SettingsLayer.instance  = new SettingsLayer();
           //var action1 = new cc.ScaleTo(0.1, 1.35);
           //var action2 = new cc.ScaleTo(0.1, 1.15);
           //this.addChild(SettingsLayer.instance);
           //SettingsLayer.instance.runAction(cc.sequence(action1, cc.delayTime(0.01), action2));
           //
           //this.isShowPopup = true;
       //}
        SoundCtrl.instance.playSoundEffect(res.func_click_button_mp3, false);
        BaseGUILayer.instance.showSettingGame();
    },
    onSelectBuyGold:function(sender, type){
        //cc.log("==onSelectBuyGold clicked");
        //if (this.isShowPopup == false){
        //    CommonPopup.instance  = new CommonPopup("Cấu Hình", res.BG_2_PNG, true);
        //
        //    this.addChild(CommonPopup.instance);
        //
        //
        //    this.isShowPopup = true;
        //}


        //var gold = Math.floor((Math.random() * 1000) - 500);
        //user.addGold(gold);
        //MainGuiLayer.instance.labelGold.setString(user.getGold());
        //testnetwork.connector.sendBuyGold(gold);

        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                user.addGold(20);

                testnetwork.connector.sendAddMoney(20, 1101);
                break;
        }
    },
    onSelectBuyRuby:function(sender, type){
        //cc.log("==onSelectBuyRuby clicked");

        //var ruby = Math.floor((Math.random() * 1000) - 500);
        //user.addRuby(ruby);
        //MainGuiLayer.instance.labelRuby.setString(user.getRuby());
        ////send pk to server {packet{fieldId}}
        //testnetwork.connector.sendBuyRuby(ruby);

        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                user.addRuby(10);

                testnetwork.connector.sendAddMoney(10, 1102);
                break;
        }
    },
    onSelectFriends:function(sender){
        // cc.log("==onSelectFriends clicked");
        cc.log(MapLayer.instance.touchesMap);
        FriendCtrl.instance.viewFriendHome();
    },
    setIsShowPopup:function(bool){
        this.isShowPopup = bool;
    },

    increaseExp: function(exp) {
        var currentExp = parseInt(this.labelExp.getString().split('/')[0]);
        var dstExp = currentExp + exp;
        var time = 1.0;
        var velocity = exp / time;
        // cc.log("[VELOCITY]", velocity);
        var that = this;
        var schedule = function(dt) {
            currentExp += velocity * dt;
            that.labelExp.setString(Math.floor(currentExp) + " / " + getLevelupObjById(user.getLevel() + 1).exp);
            // cc.log(currentExp, dstExp);
            if (currentExp >= dstExp) {
                that.labelExp.setString(dstExp + " / " + getLevelupObjById(user.getLevel() + 1).exp);
                this.unschedule(schedule);
            }
        }
        this.schedule(schedule);
    },

    goldQueue: 0,
    currentGold: 0,
    isUpdatingGold: false,
    increaseGold: function(gold) {
        // cc.log("add", gold);
        this.goldQueue += gold;
        // this.dstGold = this.currentGold + gold;
        this.currentGold = parseInt(this.labelGold.getString() || "0");
        if (!this.isUpdatingGold) {
            this.isUpdatingGold = true;
            this.schedule(this.updateGold);
        }
    },

    decreaseGold: function(gold) {
        this.goldQueue -= gold;
        this.currentGold = parseInt(this.labelGold.getString() || "0");
        if (!this.isUpdatingGold) {
            this.isUpdatingGold = true;
            this.schedule(this.updateGold);
        }
    },

    updateGold: function(dt) {
        var deltaGold = 0;
        var sign = 1;
        if (this.goldQueue > 0) {
            deltaGold = (50 + this.goldQueue) * dt;
            sign = 1;
            // cc.log("DeltaGold", deltaGold);
        } else {
            deltaGold = (-50 + this.goldQueue) * dt;
            sign = -1;
        }
        this.currentGold += deltaGold;
        this.goldQueue -= deltaGold;
        this.labelGold.setString(Math.floor(this.currentGold));
        if (sign * this.goldQueue <= 0) {
            this.isUpdatingGold = false;
            this.goldQueue = 0;
            this.unschedule(this.updateGold);
            this.labelGold.setString(user.gold); // re-update
            // cc.log("Stop gold");
        }
    },

    // For ruby
    rubyQueue: 0,
    currentRuby: 0,
    isUpdatingRuby: false,
    increaseRuby: function(ruby) {
        this.rubyQueue += ruby;
        this.currentRuby = parseInt(this.labelRuby.getString() || "0");
        if (!this.isUpdatingRuby) {
            this.isUpdatingRuby = true;
            this.schedule(this.updateRuby);
        }
    },

    decreaseRuby: function(ruby) {
        this.rubyQueue -= ruby;
        this.currentRuby = parseInt(this.labelRuby.getString() || "0");
        if (!this.isUpdatingRuby) {
            this.isUpdatingRuby = true;
            this.schedule(this.updateRuby);
        }
    },

    updateRuby: function(dt) {
        var deltaRuby = 0;
        var sign = 1;
        if (this.rubyQueue > 0) {
            deltaRuby = (50 + this.rubyQueue) * dt;
            sign = 1;
        } else {
            deltaRuby = (-50 + this.rubyQueue) * dt;
            sign = -1;
        }
        this.currentRuby += deltaRuby;
        this.rubyQueue -= deltaRuby;
        this.labelRuby.setString(Math.floor(this.currentRuby));
        if (sign * this.rubyQueue <= 0) {
            this.isUpdatingRuby = false;
            this.rubyQueue = 0;
            this.unschedule(this.updateRuby);
            this.labelRuby.setString(user.ruby); // re-update
            // cc.log("Stop ruby");
        }
    }
});
