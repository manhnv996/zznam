/**
 * Created by CPU60135_ZZNAM on 12/20/2017.
 */

var NoticeFullSlotPopup = BaseLayout.extend({

    _btnYes: null,
    _btnNo:null,
    _rubyToUnlock: null,
    ctor: function (rubyToUnlock) {
        this._super(res.bgNotice2, "Thông báo", true, true, true);
        this._rubyToUnlock = rubyToUnlock;
        this.initLastSeedsList();

    },


    initLastSeedsList: function () {
        this.initMsgContent();

        this.initRubyNeed();

        this.initButtons();
    },


    initRubyNeed: function () {
//
        var rubyImg = new ccui.ImageView(res.ruby_small);
        rubyImg.setPosition(cc.p(this._bg.width /2, this._bg.height *2 /5));
        this._bg.addChild(rubyImg);

        var count = new cc.LabelBMFont(this._rubyToUnlock, res.FONT_OUTLINE_30);
        count.setPosition(cc.p(this._bg.width /2, this._bg.height * 1 / 3));
        this._bg.addChild(count);

    },

    initMsgContent: function () {
        //var msg = fr.Localization.text("Text_info_crop_last");
        this.msgContent = new cc.LabelBMFont("Máy đã hoạt động hết công suất, không thể thêm sản phẩm!", res.FONT_OUTLINE_30);
        this.msgContent.setBoundingWidth(this._bg.width * 4 /5);
        this.msgContent.setPosition(cc.p(this._bg.width / 2, this._bg.height * 2 / 3));
        this.nextmsgContent  = new cc.LabelBMFont("Để tiết kiệm thời gian, bạn hãy mở rộng slot nhé?", res.FONT_OUTLINE_30);
        this.nextmsgContent.setBoundingWidth(this._bg.width * 4 /5);
        this.nextmsgContent.setPosition(cc.p(this._bg.width / 2, this._bg.height * 2 / 3 - this.msgContent.height));

        this._bg.addChild(this.msgContent);
        this._bg.addChild(this.nextmsgContent);
    },

    initButtons: function () {
//
//        this._btnBuy = new ccui.Button(res.btSuggest);
//        this._btnBuy.setPosition(this._bg.width / 2, this._bg.height / 8);
//        this._bg.addChild(this._btnBuy);
        this._btnYes = new ccui.Button(res.DONG_Y_PNG);
        this._btnYes.setPosition(this._bg.width / 3, this._bg.height / 7);
        this._bg.addChild(this._btnYes);
        this._btnNo = new ccui.Button(res.btCancel);
        this._btnNo.setPosition(this._bg.width * 2 / 3, this._bg.height / 7);
        this._bg.addChild(this._btnNo);
        //this._btnYes.addClickEventListener(function () {
        //    SoundCtrl.instance.playSoundEffect(res.func_click_button_mp3, false);
        //}.bind(this));

        //var msgSuggest = new cc.LabelBMFont("Xác nhận", res.FONT_OUTLINE_30);
        //msgSuggest.setPosition(cc.p(this._btnBuy.width * 3 / 5, this._btnBuy.height / 2));
        //this._btnBuy.addChild(msgSuggest);


    }


});
