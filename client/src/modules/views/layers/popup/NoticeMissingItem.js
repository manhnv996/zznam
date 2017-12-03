
var NoticeMissingItem = BaseLayout.extend({

    ctor: function (storageMissingItem) {
        //this._super();
        this._super(res.bgNotice2, "text_notice_title", true, true, false);

        //
        this.initMissingItem(storageMissingItem);

    },


    initMissingItem: function (storageMissingItem) {
//
        var msgContent = new cc.LabelBMFont(fr.Localization.text("TEXT_NOT_ENOUGH_RESOURCE"), res.FONT_OUTLINE_30);
        msgContent.setPosition(cc.p(this._bg.width / 2, this._bg.height * 2 / 3));
        this._bg.addChild(msgContent);

        var seedImg = new cc.Sprite(getProductIconById(storageMissingItem.typeItem));
        seedImg.setPosition(cc.p(this._bg.width / 2, this._bg.height / 2));
        this._bg.addChild(seedImg);


        var count = new cc.LabelBMFont(storageMissingItem.quantity, res.FONT_OUTLINE_30);
        count.setPosition(cc.p(this._bg.width / 2, this._bg.height * 1 / 3));
        this._bg.addChild(count);

//
        var btBuy = new ccui.Button(res.btSuggest);
        btBuy.setPosition(this._bg.width / 2, this._bg.height / 8);
        this._bg.addChild(btBuy);
        // btBuy.addClickEventListener(this.addBuyingSeedEvent.bind(this));
        btBuy.addClickEventListener(function () {
            if (OrderCtrl.instance.buyMissingItem(storageMissingItem)){
                //
                BaseGUILayer.instance.removeBlockListener();
                OrderCtrl.instance.onMakeOrder(LastPageUtil.instance.lastIndexOfOrderClick);

                if (BaseGUILayer.instance._layout == null){
                    BaseGUILayer.instance.showOrderLayer();
                }

                //
                TruckOrderSprite.instance.initTruckOrder();

            } else {
                msgContent.setString("Mua vật phẩm không thành công");
                // BaseGUILayer.instance.removeBlockListener();
            }

        });

        var msgSuggest = new cc.LabelBMFont(fr.Localization.text("text_to_use_gem"), res.FONT_OUTLINE_30);
        msgSuggest.setPosition(cc.p(btBuy.width * 3 / 5, btBuy.height / 2));
        btBuy.addChild(msgSuggest);

        var rubi = new cc.Sprite(res.rubi);
        rubi.setPosition(cc.p(btBuy.width * 1 / 5, btBuy.height / 2));
        btBuy.addChild(rubi);


        var rubi_buy = getProductObjById(storageMissingItem.typeItem).rubiMuaNgay * storageMissingItem.quantity;
        var rubi_buy_seed = new cc.LabelBMFont(rubi_buy, res.FONT_OUTLINE_30);
        rubi_buy_seed.setPosition(cc.p(btBuy.width * 1 / 8, btBuy.height / 2));
        btBuy.addChild(rubi_buy_seed);

    }


});