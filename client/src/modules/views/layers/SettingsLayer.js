/**
 * Created by CPU60135_LOCAL on 10/27/2017.
 */
var SettingsLayer = cc.Layer.extend({
    btnLogout : null,
    btnSendMessage : null,
    btnChangeFarmName : null,
    btnHuongDan : null,
    labelUserId : null,
    btnEffect: null,
    btnMusic: null,
    btnQuestions: null,
    effect: "on",
    ctor : function(){
        //1. call super class's ctor fuction
        this._super();
        var size = cc.director.getVisibleSize();
        cc.log("visible size " + size.width+" "  + size.height);
        //3. calculate the center point
        var centerpos = cc.p(size.width / 2, size.height / 2);
        var center_bottom_pos = cc.p(size.width / 2, 40);
        var center_top_pos = cc.p(size.width / 2, size.height - 40);

        var spritebg = new cc.Sprite(res.BG_SETTING_PNG);
        cc.log("spritebg " + spritebg.width + " " + spritebg.height);
        //spritebg.setScale(fr.clientConfig.getResourceScale().)
        spritebg.setPosition(centerpos);
        this.addChild(spritebg);

        var btnTuChoi = new ccui.Button(res.TU_CHOI_PNG);
        var btnTuChoiSize = btnTuChoi.getSize();
        cc.log("btnTuChoiSize " + btnTuChoiSize.width + "  " + btnTuChoiSize.height);
        btnTuChoi.setPosition(size.width/2 + spritebg.width/2 - btnTuChoiSize.width/2, size.height/2 + spritebg.height/2 - btnTuChoiSize.height/2);
        btnTuChoi.addClickEventListener(this.onSelectClose.bind(this));
        this.addChild(btnTuChoi);

        this.btnLogout = new ccui.Button(res.BUTTON_ZINGME_PNG);
        this.btnLogout.setPosition(centerpos.x - spritebg.width/5, centerpos.y + spritebg.height/6 );
        this.btnLogout.addClickEventListener(this.onSelectLogout.bind(this));
        this.addChild(this.btnLogout);

        this.btnChangeFarmName = new ccui.Button(res.BTN_CHANGE_NAME_PNG);
        this.btnChangeFarmName.setPosition(centerpos.x - spritebg.width/5, centerpos.y );
        this.btnChangeFarmName.addClickEventListener(this.onselectChangeFarmName.bind(this));
        this.addChild(this.btnChangeFarmName);

        this.btnHuongDan = new ccui.Button(res.BUTTON_HUONGDAN_PNG);
        this.btnHuongDan.setPosition(centerpos.x - spritebg.width/5, centerpos.y - spritebg.height/6 );
        this.btnHuongDan.addClickEventListener(this.onSelectHuongDan.bind(this));

        this.addChild(this.btnHuongDan);

        this.btnSendMessage = new ccui.Button(res.BTN_FEEDBACK_PNG);
        this.btnSendMessage.setPosition(centerpos.x - spritebg.width/5, centerpos.y - 2*spritebg.height/6 );
        this.btnSendMessage.addClickEventListener(this.onSelectSendFeedback.bind(this));
        this.addChild(this.btnSendMessage);

        this.btnMusic = new ccui.Button(res.AMTHANH_TURN_ON_PNG);
        this.btnMusic.setPosition(centerpos.x + spritebg.width/7, centerpos.y + spritebg.height/12 );
        this.btnMusic.addClickEventListener(this.onSelectBtnMusic.bind(this));
        this.addChild(this.btnMusic);

        this.btnEffect = new ccui.Button(res.BTN_EFFECT_ON_PNG);
        this.btnEffect.setPosition(centerpos.x + 3*spritebg.width/8, centerpos.y + spritebg.height/24);
        this.btnEffect.addClickEventListener(this.onSelectBtnEffect.bind(this));

        this.addChild(this.btnEffect);

        this.btnQuestions = new ccui.Button(res.BUTTON_HOI_PNG);
        this.btnQuestions.setPosition(centerpos.x + spritebg.width/4, centerpos.y - spritebg.height/4 );
        this.btnQuestions.addClickEventListener(this.onSelectBtnQuestions.bind(this));
        this.addChild(this.btnQuestions);




    },
    onEnter:function(){
        this._super();
    },
    onSelectClose:function(sender)
    {
        this.removeFromParent(true);
    },
    onselectChangeFarmName:function(sender)
    {
        cc.log("onselectChangeFarmName");
    },
    onSelectLogout:function(sender)
    {
        cc.log("OnSelectLogout");
    },
    onSelectHuongDan:function(sender)
    {
        cc.log("onSelectHuongDan");
    },
    onSelectSendFeedback:function(sender)
    {
        cc.log("onSelectSendFeedback");
    },
    onSelectBtnMusic:function(sender)
    {
        cc.log("onSelectBtnMusic");
    },
    onSelectBtnQuestions:function(sender)
    {
        cc.log("onSelectBtnQuestions");
    },
    onSelectBtnEffect:function(sender)
    {
        cc.log("onSelectBtnSound");
        if ( this.effect == "on"){
            //this.btnEffect.setNormalImage(res.BTN_EFFECT_OFF_PNG);
            //this.btnEffect.loadTextures(res.BTN_EFFECT_OFF_PNG);
            this.effect = "off";
        } else if (this.effect == "off"){
            //this.btnEffect.setNormalImage(res.BTN_EFFECT_ON_PNG);
            //this.btnEffect.loadTextures(res.BTN_EFFECT_ON_PNG);

            this.effect = "on";
        }
    },

});


