/**
 * Created by CPU60135_ZZNAM on 12/20/2017.
 */

var NoticeLastSeedsLayout = BaseLayout.extend({

    _btnYes: null,
    _btnNo:null,
    ctor: function (storageLastSeedsList) {
        this._super(res.bgNotice2, "text_notice_title", true, true);
        this.initLastSeedsList(storageLastSeedsList);
    },


    initLastSeedsList: function (storageLastSeedsList) {
        this.initMsgContent();

        var itemSprite = new ccui.ImageView(res.iconGoodMilk);
        for (var i = 0; i < storageLastSeedsList.length; i++){
            this.initMissingItem(storageLastSeedsList[i], this._bg.width / 2 - (itemSprite.width / 2 * (storageLastSeedsList.length - 1)) + itemSprite.width * i);

        }

        this.initButtons();
    },


    initMissingItem: function (missingItem, xPos) {
//
        var seedImg = new ccui.ImageView(getProductIconById(missingItem.typeItem));
        seedImg.setPosition(cc.p(xPos, this._bg.height *2 /5));
        seedImg.setScale(0.8);
        this._bg.addChild(seedImg);


        //var count = new cc.LabelBMFont(missingItem.quantity, res.FONT_OUTLINE_30);
        //count.setPosition(cc.p(xPos, this._bg.height * 1 / 3));
        //this._bg.addChild(count);

    },

    initMsgContent: function () {
        //var msg = fr.Localization.text("Text_info_crop_last");
        this.msgContent = new cc.LabelBMFont("Đây là hạt giống duy nhất trong kho lương thực!", res.FONT_OUTLINE_30);
        this.msgContent.setBoundingWidth(this._bg.width * 4 /5);
        this.msgContent.setPosition(cc.p(this._bg.width / 2, this._bg.height * 2 / 3));
        this.nextmsgContent  = new cc.LabelBMFont("Bạn có muốn sử dụng không?", res.FONT_OUTLINE_30);
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
