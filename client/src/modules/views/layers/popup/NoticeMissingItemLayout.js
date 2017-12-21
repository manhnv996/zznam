/**
 * Created by CPU60135_ZZNAM on 12/20/2017.
 */

var NoticeMissingItemLayout = BaseLayout.extend({

    _btnBuy: null,
    ctor: function (storageMissingItemList) {
        this._super(res.bgNotice2, "text_notice_title", true, true, true);
        this.initMissingItemList(storageMissingItemList);
    },


    initMissingItemList: function (storageMissingItemList) {
        this.initMsgContent();

        var itemSprite = new ccui.ImageView(res.iconGoodMilk);
        for (var i = 0; i < storageMissingItemList.length; i++){
            this.initMissingItem(storageMissingItemList[i], this._bg.width / 2 - (itemSprite.width / 2 * (storageMissingItemList.length - 1)) + itemSprite.width * i);

        }

        this.initButtons(storageMissingItemList);
    },


    initMissingItem: function (missingItem, xPos) {
//
        var seedImg = new ccui.ImageView(getProductIconById(missingItem.typeItem));
        seedImg.setPosition(cc.p(xPos, this._bg.height / 2));
        seedImg.setScale(0.8);
        this._bg.addChild(seedImg);


        var count = new cc.LabelBMFont(missingItem.quantity, res.FONT_OUTLINE_30);
        count.setPosition(cc.p(xPos, this._bg.height * 1 / 3));
        this._bg.addChild(count);

    },

    initMsgContent: function () {
//
        this.msgContent = new cc.LabelBMFont(fr.Localization.text("TEXT_NOT_ENOUGH_RESOURCE"), res.FONT_OUTLINE_30);
        this.msgContent.setPosition(cc.p(this._bg.width / 2, this._bg.height * 2 / 3));
        this._bg.addChild(this.msgContent);
    },

    initButtons: function (storageMissingItemList) {
//
        this._btnBuy = new ccui.Button(res.btSuggest);
        this._btnBuy.setPosition(this._bg.width / 2, this._bg.height / 8);
        this._bg.addChild(this._btnBuy);
        //this._btnBuy.addClickEventListener(function () {
        //    SoundCtrl.instance.playSoundEffect(res.func_click_button_mp3, false);
        //
        //}.bind(this));

        var msgSuggest = new cc.LabelBMFont(fr.Localization.text("text_to_use_gem"), res.FONT_OUTLINE_30);
        msgSuggest.setPosition(cc.p(this._btnBuy.width * 3 / 5, this._btnBuy.height / 2));
        this._btnBuy.addChild(msgSuggest);

        var rubi = new ccui.ImageView(res.rubi);
        rubi.setPosition(cc.p(this._btnBuy.width * 1 / 5, this._btnBuy.height / 2));
        this._btnBuy.addChild(rubi);

        //
        this.rubiBuy = 0;
        for (var i = 0; i < storageMissingItemList.length; i++){
            this.rubiBuy += getProductObjById(storageMissingItemList[i].typeItem).rubiMuaNgay * storageMissingItemList[i].quantity;
        }
        var rubi_buy_seed = new cc.LabelBMFont(this.rubiBuy, res.FONT_OUTLINE_30);
        rubi_buy_seed.setPosition(cc.p(this._btnBuy.width * 1 / 8, this._btnBuy.height / 2));
        this._btnBuy.addChild(rubi_buy_seed);

    }


});
