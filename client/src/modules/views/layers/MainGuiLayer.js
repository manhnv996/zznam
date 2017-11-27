/**
 * Created by CPU60135_LOCAL on 10/27/2017.
 */
var MainGuiLayer = cc.Layer.extend({
    labelGold : null,
    labelRuby : null,
    labelExp : null,
    labelLevel : null,
    level: 18,
    exp: 3483,
    max_exp: 4858,
    ctor : function(){
        //1. call super class's ctor fuction
        this._super();
        var size = cc.director.getVisibleSize();
        cc.log("visible size " + size.width+" "  + size.height);
        //3. calculate the center point
        var centerpos = cc.p(size.width / 2, size.height / 2);
        var center_bottom_pos = cc.p(size.width / 2, 40);
        var center_top_pos = cc.p(size.width / 2, size.height - 40);



        // 3. create a settings button and set it's position at the top left of screensize
        var btnSettings = new ccui.Button(res.BUTTON_SETTING_2_PNG);
        var btnSettingsSize = btnSettings.getSize();
        cc.log("btnSettings " + btnSettingsSize.width + "  " + btnSettingsSize.height);
        btnSettings.setPosition(btnSettingsSize.width/2, size.height - btnSettingsSize.height/2);
        this.addChild(btnSettings);
        btnSettings.addClickEventListener(this.onSelectSettings.bind(this));

        //// 4. create a shop button and set it's position at the bottom left of screensize
        //var btnShop = new ccui.Button(res.BUTTON_SHOP_2_PNG);
        //var btnShopSize = btnShop.getSize();
        //cc.log("btnShop " + btnShopSize.width + "  " + btnShopSize.height);
        //btnShop.setPosition(btnShopSize.width/2, btnShopSize.height/2);
        //btnShop.addClickEventListener(this.onSelectShop.bind(this));
        //this.addChild(btnShop);

        // 5. create a friends button and set it's position at the bottom right of screensize
        var btnFriends = new ccui.Button(res.BUTTON_FIEND_2_PNG);
        var btnFriendsSize = btnFriends.getSize();
        cc.log("btnFriends " + btnFriendsSize.width + "  " + btnFriendsSize.height);
        btnFriends.setPosition(size.width - btnFriendsSize.width/2, btnFriendsSize.height/2);
        btnFriends.addClickEventListener(this.onSelectFriends.bind(this));

        this.addChild(btnFriends);




        // 6. create a BuyCoin button and set it's position at the top right of screensize
        var btnBuyGold = new ccui.Button(res.BUTTON_CONG_2);
        var btnBuyGoldSize = btnBuyGold.getSize();
        cc.log("btnBuyGold " + btnBuyGoldSize.width + "  " + btnBuyGoldSize.height);
        btnBuyGold.setPosition(size.width - btnBuyGoldSize.width/2, size.height - btnBuyGoldSize.height/2);
        btnBuyGold.addClickEventListener(this.onSelectBuyGold.bind(this));
        this.addChild(btnBuyGold);

        var imageGold = new ccui.ImageView(res.gold);
        var imageGoldSize = imageGold.getSize();
        cc.log("imageGold " + imageGoldSize.width + "  " + imageGoldSize.height);
        imageGold.setPosition(size.width - (btnBuyGoldSize.width + imageGoldSize.width), size.height - btnBuyGoldSize.height/2);
        this.addChild(imageGold);

        this.labelGold = new cc.LabelBMFont(user.getGold(), res.FONT_OUTLINE_30);
        this.labelGold.setPosition(size.width - (btnBuyGoldSize.width + imageGoldSize.width + this.labelGold.width),size.height - btnBuyGoldSize.height/2 );
        this.addChild(this.labelGold);


        // 7. create a BuyCoin button and set it's position below btnBuyCoin
        var btnBuyRuby = new ccui.Button(res.BUTTON_CONG_2);
        var btnBuyRubySize = btnBuyRuby.getSize();
        cc.log("btnBuyRuby " + btnBuyRubySize.width + "  " + btnBuyRubySize.height);
        btnBuyRuby.setPosition(size.width - btnBuyRubySize.width/2, size.height - btnBuyGold.height - btnBuyRubySize.height/2);
        btnBuyRuby.addClickEventListener(this.onSelectBuyRuby.bind(this));
        this.addChild(btnBuyRuby);

        var imageRuby = new ccui.ImageView(res.rubi);
        var imageRubySize = imageRuby.getSize();
        cc.log("imageRuby " + imageRubySize.width + "  " + imageRubySize.height);
        imageRuby.setPosition(size.width - (btnBuyRubySize.width + imageRubySize.width), size.height - btnBuyGoldSize.height - btnBuyRubySize.height/2);
        this.addChild(imageRuby);

        this.labelRuby = new cc.LabelBMFont(user.getRuby(), res.FONT_OUTLINE_30);
        this.labelRuby.setPosition(size.width - ( btnBuyRubySize.width + imageRubySize.width + this.labelRuby.width), size.height - 3*btnBuyRubySize.height/2);
        this.addChild(this.labelRuby);



        // 8. create a search button and set it's position below btnBuyCoin
        var btnSearch = new ccui.Button(res.STAR_1_PNG);
        var btnSearchSize = btnSearch.getSize();
        cc.log("btnSearch " + btnSearchSize.width + "  " + btnSearchSize.height);
        btnSearch.setPosition(size.width - btnSearchSize.width/2, size.height - 5*btnBuyRubySize.height/2);
        this.addChild(btnSearch);


        var imageExp_111 = new ccui.ImageView(res.EXP_111_PNG);
        var imageExp_111Size = imageExp_111.getSize();
        cc.log("imageExp_111 " + imageExp_111Size.width + "  " + imageExp_111Size.height);
        imageExp_111.setPosition(center_top_pos);
        this.addChild(imageExp_111);

        var imageExp_221 = new ccui.ImageView(res.EXP_221_PNG);
        var imageExp_221Size = imageExp_221.getSize();
        imageExp_221.setScale(.5*imageExp_111Size.width/imageExp_221Size.width, 1);
        cc.log("imageExp_221 " + imageExp_221Size.width + "  " + imageExp_221Size.height);
        imageExp_221.setPosition(center_top_pos.x -.5*imageExp_221Size.width/2, center_top_pos.y);
        this.addChild(imageExp_221);

        this.labelExp = new cc.LabelBMFont(user.getExp() + "/" + this.max_exp, res.FONT_OUTLINE_30);
        this.labelExp.setPosition(center_top_pos);
        this.addChild(this.labelExp);

        var imageLevel = new ccui.ImageView(res.STAR_1_PNG);
        var imageLevelSize = imageLevel.getSize();
        cc.log("imageLevelSize " + imageLevelSize.width + "  " + imageLevelSize.height);
        imageLevel.setPosition(center_top_pos.x-imageExp_111Size.width/2,center_top_pos.y);
        this.addChild(imageLevel);

        this.labelLevel = new cc.LabelBMFont(user.getLevel(), res.FONT_OUTLINE_30);
        this.labelLevel.setPosition(center_top_pos.x - imageExp_111Size.width/2,center_top_pos.y);
        this.addChild(this.labelLevel);


        // this.lblLog = gv.commonText(fr.Localization.text("..."), size.width*0.4, size.height*0.05);
        // this.addChild(this.lblLog);


        ////6. create a menu and assign onPlay event callback to it.
        //var menuItemPlay =  new cc.MenuItemSprite(
        //    new cc.Sprite(res.button_zingme_dangnhap_png), // normal state image
        //    new cc.Sprite(res.button_zingme_png), //select state image
        //    this.onPlay, this);
        //var menu = new cc.Menu(menuItemPlay);
        ////7. create the menu
        //menu.setPosition(center_bottom_pos);
        //this.addChild(menu);
    },
    onEnter:function(){
      this._super();
    },
    onPlay : function(){
        cc.log("==onplay clicked");
        fr.view(ScreenNetwork);
    },
    onSelectSettings:function(sender)
    {
        var settingsLayer = new SettingsLayer();
        this.addChild(settingsLayer);
    },
    onSelectBuyGold:function(sender){
        cc.log("==onSelectBuyGold clicked");
    },
    onSelectBuyRuby:function(sender){
        cc.log("==onSelectBuyRuby clicked");
    },
    onSelectFriends:function(sender){
        cc.log("==onSelectFriends clicked");
    }
});


