
var EditSell = BaseLayout.extend({

    slot: null,
    productSale: null,

    ctor: function (slot) {
        this._super(res.guiEdit, fr.Localization.text("text_edit_road_shop"), false, true);
        // this.bgZOrder = 1;
        // this._bg.setLocalZOrder(this.bgZOrder);

        this.slot = slot;
        this.productSale = user.asset.myShop.getProductBySlot(slot);


        this.initBtn();
        //
        this.initProductEdit();
    },

    actionShow: function () {
        var scale = (cc.winSize.height - cc.winSize.height / 80 * 3) / this.height;
        //cc.log("scale " + scale);
        var scaleUp = cc.scaleTo(0.2, 1.4);
        var scaleDown = cc.scaleTo(0.2, 1.2);
        this.runAction(cc.sequence(scaleUp, cc.delayTime(0.05), scaleDown));
    },


    initProductEdit: function () {
        if (this.productSale != null){
            var productIcon = new ccui.ImageView(getProductIconById(this.productSale.product.typeItem));
            productIcon.setPosition(cc.p(this._bg.width * 0.35, this._bg.height * 0.72));
            productIcon.setScale(0.65);
            this._bg.addChild(productIcon);

            var quantity = new cc.LabelBMFont(this.productSale.product.quantity + "x", res.FONT_OUTLINE_30);
            quantity.setPosition(cc.p(this._bg.width * 0.18, this._bg.height * 0.72));
            this._bg.addChild(quantity);


            var imgGold = new ccui.ImageView(res.gold_png);
            imgGold.setPosition(cc.p(this._bg.width * 0.75, this._bg.height * 0.72));
            // imgGold.setScale(0.8);
            this._bg.addChild(imgGold);

            var price = new cc.LabelBMFont(this.productSale.price, res.FONT_OUTLINE_30);
            price.setPosition(cc.p(this._bg.width * 0.62, this._bg.height * 0.72));
            this._bg.addChild(price);

        }
    },

    initBtn: function () {
        this.btnClose = new ccui.Button(res.close_png);
        this.btnClose.setZoomScale(-0.1);
        this.btnClose.setScale(0.9);
        this.btnClose.setPosition(this.width * 19 / 20, this.height / 10 * 9);
        this.btnClose.addTouchEventListener(this.touchClose, this);
        // this.btnClose.setLocalZOrder(this.bgZOrder + 1);
        this.addChild(this.btnClose);


        //
        this.btCancel = new ccui.Button(res.rac);
        // this.btCancel.setZoomScale(-0.1);
        // this.btCancel.setScale(0.9);
        this.btCancel.setPosition(cc.p(this._bg.width / 2, this._bg.height / 15));
        this.btCancel.addTouchEventListener(this.touchCancel, this);
        this.addChild(this.btCancel);


        var rubyNumber = new cc.LabelBMFont("1", res.FONT_OUTLINE_30);
        rubyNumber.setPosition(cc.p(this.btCancel.width / 2, this.btCancel.height / 2));
        this.btCancel.addChild(rubyNumber);

        var rubyImg = new cc.Sprite(res.ruby_small);
        rubyImg.setPosition(cc.p(this.btCancel.width * 0.75, this.btCancel.height / 2));
        this.btCancel.addChild(rubyImg);

    },

    touchClose: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                SoundCtrl.instance.playSoundEffect(res.func_click_button_mp3, false);
                break;
            case ccui.Widget.TOUCH_ENDED:
            case ccui.Widget.TOUCH_CANCELED:
                BaseGUILayer.instance.removeBlockListener();
                BaseGUILayer.instance.showMyShop();
                break;
        }
    },

    touchCancel: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                SoundCtrl.instance.playSoundEffect(res.func_click_button_mp3, false);
                break;
            case ccui.Widget.TOUCH_ENDED:
                if (MyShopCtrl.instance.onCancelSell(this.slot)){

                    BaseGUILayer.instance.removeBlockListener();
                    BaseGUILayer.instance.showMyShop();
                }
                break;
            case ccui.Widget.TOUCH_CANCELED:
                // BaseGUILayer.instance.removeBlockListener();
                // BaseGUILayer.instance.showMyShop();
                break;
        }
    },


});