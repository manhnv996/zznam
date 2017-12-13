
var NoticeMissingItem = BaseLayout.extend({

    targetType: 0,
    isOrder: false,
    orderId: 0,

    ctor: function (storageMissingItemList, targetType, orderId) {
        //this._super();
        this._super(res.bgNotice2, "text_notice_title", true, true, true);

        //
        if (targetType !== undefined) {
            this.targetType = targetType;
        }
        if (orderId !== undefined) {
            this.orderId = orderId;
        }

        //
        this.initMissingItemList(storageMissingItemList);
    },


    initMissingItemList: function (storageMissingItemList) {
        this.initMsgContent();

        var itemSprite = new cc.Sprite(res.iconGoodMilk);
        for (var i = 0; i < storageMissingItemList.length; i++){
            this.initMissingItem(storageMissingItemList[i], this._bg.width / 2 - (itemSprite.width / 2 * (storageMissingItemList.length - 1)) + itemSprite.width * i);

        }

        this.initButtonBuy(storageMissingItemList);
    },


    initMissingItem: function (missingItem, xPos) {
//
        var seedImg = new cc.Sprite(getProductIconById(missingItem.typeItem));
        //seedImg.setPosition(cc.p(this._bg.width / 2, this._bg.height / 2));
        seedImg.setPosition(cc.p(xPos, this._bg.height / 2));
        seedImg.setScale(0.8);
        this._bg.addChild(seedImg);


        var count = new cc.LabelBMFont(missingItem.quantity, res.FONT_OUTLINE_30);
        //count.setPosition(cc.p(this._bg.width / 2, this._bg.height * 1 / 3));
        count.setPosition(cc.p(xPos, this._bg.height * 1 / 3));
        this._bg.addChild(count);

    },

    initMsgContent: function () {
//
        this.msgContent = new cc.LabelBMFont(fr.Localization.text("TEXT_NOT_ENOUGH_RESOURCE"), res.FONT_OUTLINE_30);
        this.msgContent.setPosition(cc.p(this._bg.width / 2, this._bg.height * 2 / 3));
        this._bg.addChild(this.msgContent);
    },

    initButtonBuy: function (storageMissingItemList) {
//
        var btBuy = new ccui.Button(res.btSuggest);
        btBuy.setPosition(this._bg.width / 2, this._bg.height / 8);
        this._bg.addChild(btBuy);
        btBuy.addClickEventListener(function () {
            if (user.getRuby() >= this.rubiBuy){

                if (this.targetType == BuyItemTargetType.MAKE_ORDER){
                    if (this.orderId != null){
                        OrderCtrl.instance.onMakeOrderByRuby(storageMissingItemList, this.orderId);

                    }

                } else if (this.targetType == BuyItemTargetType.MAKE_ORDER_NPC) {
                    if (this.orderId != null){
                        OrderCtrl.instance.onMakeOrderNPCByRuby(storageMissingItemList, this.orderId);
                        //
                    }
                } else {
                    if (!OrderCtrl.instance.buyMissingItem(storageMissingItemList[0])){
                        this.msgContent.setString("Mua vật phẩm không thành công");
                    }
                }

            } else {
                this.msgContent.setString("Mua vật phẩm không thành công");
                // BaseGUILayer.instance.removeBlockListener();
            }

        }.bind(this));

        var msgSuggest = new cc.LabelBMFont(fr.Localization.text("text_to_use_gem"), res.FONT_OUTLINE_30);
        msgSuggest.setPosition(cc.p(btBuy.width * 3 / 5, btBuy.height / 2));
        btBuy.addChild(msgSuggest);

        var rubi = new cc.Sprite(res.rubi);
        rubi.setPosition(cc.p(btBuy.width * 1 / 5, btBuy.height / 2));
        btBuy.addChild(rubi);

        //
        this.rubiBuy = 0;
        for (var i = 0; i < storageMissingItemList.length; i++){
            this.rubiBuy += getProductObjById(storageMissingItemList[i].typeItem).rubiMuaNgay * storageMissingItemList[i].quantity;
        }
        var rubi_buy_seed = new cc.LabelBMFont(this.rubiBuy, res.FONT_OUTLINE_30);
        rubi_buy_seed.setPosition(cc.p(btBuy.width * 1 / 8, btBuy.height / 2));
        btBuy.addChild(rubi_buy_seed);

    }


});