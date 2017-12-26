/**
 * Created by CPU60075_LOCAL on 12/23/2017.
 */


var SellGUI = BaseLayout.extend({
    ctor: function () {
        this._super(res.sellGUI_bg, null, false, true);
        this.bgZOrder = 1;
        this._bg.setLocalZOrder(this.bgZOrder);

        this.btnClose = new ccui.Button(res.close_png);
        this.btnClose.setZoomScale(-0.1);
        this.btnClose.setScale(0.9);
        this.btnClose.setPosition(this.width * 19 / 20, this.height / 10 * 9);
        this.btnClose.addTouchEventListener(this.touchClose, this);
        this.btnClose.setLocalZOrder(this.bgZOrder + 1);
        this.addChild(this.btnClose);

        this.sell_silo = new ccui.Button(res.sell_silo);
        this.sell_silo.x = this.width / 25 * 2;
        this.sell_silo.y = this.height / 4 * 3;
        this.sell_silo.setZoomScale(0);
        this.sell_silo.tag = 101;
        this.sell_silo.addTouchEventListener(this.touchChooseStorage, this);

        this.sell_ware = new ccui.Button(res.sell_ware);
        this.sell_ware.x = this.width / 25 * 2;
        this.sell_ware.y = this.height / 50 * 28;
        this.sell_ware.setZoomScale(0);
        this.sell_ware.tag = 102;
        this.sell_ware.addTouchEventListener(this.touchChooseStorage, this);

        this.btnSell = new ccui.Button(res.btn_sell);
        this.btnSell.x = this.width / 52 * 40;
        this.btnSell.y = this.height / 100 * 11;
        this.btnSell.setZoomScale(0);
        this.btnSell.addTouchEventListener(this.touchSell, this);
        this.btnSell.setLocalZOrder(this.bgZOrder + 1);
        //this.btnSell.setScale(0.8);

        var labelSell = new cc.LabelBMFont(fr.Localization.text("text_put_on_shop"), res.FONT_OUTLINE_30);
        labelSell.x = this.btnSell.width / 2;
        labelSell.y = this.btnSell.height / 5 * 2;
        this.btnSell.addChild(labelSell);

        this.addChild(this.sell_silo);
        this.addChild(this.sell_ware);
        this.addChild(this.btnSell);

        this.sell_silo.setLocalZOrder(this.bgZOrder + 1);
        this.sell_ware.setLocalZOrder(this.bgZOrder - 1);

        this.initSellDataItem();
        this.addSellInfo();
        this.addArrow();
    },

    addArrow: function () {
        this.layoutArrow = new ccui.Layout();
        this.layoutArrow.x = this.width / 50 * 7;
        this.layoutArrow.y = this.height / 100 * 88;
        this.layoutArrow.setContentSize(this.width / 5 * 2, this.height / 1000 * 57);
        this.layoutArrow.setLocalZOrder(this.bgZOrder + 1);

        this.arrow = new cc.Sprite(res.storage_arrow);
        this.arrow.x = 0;
        this.arrow.y = this.layoutArrow.height / 2;
        this.arrow.setScale(1.1);
        this.layoutArrow.addChild(this.arrow);

        //this.layoutArrow.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        //this.layoutArrow.setBackGroundColor(cc.color.YELLOW);
        this.schedule(this.updateArrow, 0.03);
        this.addChild(this.layoutArrow);
    },

    addSellInfo: function () {
        var layoutNumberSell = new ccui.Layout();
        layoutNumberSell.x = this.width / 100 * 59;
        layoutNumberSell.y = this.height / 5 * 3;
        layoutNumberSell.setContentSize(this.width / 25 * 9, this.height / 50 * 9);
        layoutNumberSell.setLocalZOrder(this.bgZOrder + 1);
        this.addChild(layoutNumberSell);

        //layoutNumberSell.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        //layoutNumberSell.setBackGroundColor(cc.color.YELLOW);

        var scaleBtn = 0.8;

        this.numberSell = new cc.LabelBMFont("10x", res.FONT_OUTLINE_50);
        this.numberSell.x = layoutNumberSell.width * 0.42;
        this.numberSell.y = layoutNumberSell.height / 2;
        this.numberSell.setScale(scaleBtn);

        this.imgSellItem = new cc.Sprite(res.storage_apple);
        this.imgSellItem.x = layoutNumberSell.width / 8 * 5;
        this.imgSellItem.y = layoutNumberSell.height / 2;
        this.imgSellItem.setScale(scaleBtn);


        this.btnAddNumber = new ccui.Button(res.btn_add);
        this.btnAddNumber.x = layoutNumberSell.width / 8 * 7;
        this.btnAddNumber.y = layoutNumberSell.height / 2;
        this.btnAddNumber.setScale(scaleBtn);
        this.btnAddNumber.addTouchEventListener(this.onClickBtnUpdateNumber(0, this.numberSell));
        //this.btnReducePrice.addTouchEventListener(this.onClickReduceNumber, this);
        this.btnReduceNumber = new ccui.Button(res.btn_reduce);
        this.btnReduceNumber.x = layoutNumberSell.width / 8;
        this.btnReduceNumber.y = layoutNumberSell.height / 2;
        this.btnReduceNumber.setScale(scaleBtn);
        this.btnReduceNumber.addTouchEventListener(this.onClickBtnUpdateNumber(0, this.numberSell));
        //this.btnReduceNumber.addTouchEventListener(this.onClickReduceNumber, this);


        layoutNumberSell.addChild(this.btnAddNumber);
        layoutNumberSell.addChild(this.btnReduceNumber);
        layoutNumberSell.addChild(this.numberSell);
        layoutNumberSell.addChild(this.imgSellItem);

        var layoutPriceSell = new ccui.Layout();
        layoutPriceSell.x = this.width / 100 * 59;
        layoutPriceSell.y = this.height / 50 * 21;
        layoutPriceSell.setContentSize(this.width / 25 * 9, this.height / 50 * 9);
        layoutPriceSell.setLocalZOrder(this.bgZOrder + 1);
        this.addChild(layoutPriceSell);

        //layoutPriceSell.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        //layoutPriceSell.setBackGroundColor(cc.color.BLACK);

        this.priceSell = new cc.LabelBMFont("60", res.FONT_OUTLINE_50);
        //this.priceSell.x = layoutPriceSell.width / 2;
        this.priceSell.x = layoutPriceSell.width * 0.48;
        this.priceSell.y = layoutPriceSell.height / 2;
        this.priceSell.setAnchorPoint(1.0, 0.5);
        this.priceSell.setScale(scaleBtn);

        //this.imgGold = new cc.Sprite(res.gold_png);
        this.imgGold = new ccui.ImageView(res.gold_png);
        //this.imgGold.x = layoutPriceSell.width / 2;
        this.imgGold.x = layoutPriceSell.width * 0.55;
        this.imgGold.y = layoutPriceSell.height / 2;
        this.imgGold.setAnchorPoint(-0.3, 0.5);
        this.imgGold.setScale(scaleBtn);



        this.btnAddPrice = new ccui.Button(res.btn_add);
        this.btnAddPrice.x = layoutPriceSell.width / 8 * 7;
        this.btnAddPrice.y = layoutPriceSell.height / 2;
        this.btnAddPrice.setScale(scaleBtn);
        this.btnAddPrice.addTouchEventListener(this.onClickBtnUpdateNumber(0, this.priceSell), this);
        //this.btnAddPrice.addTouchEventListener(this.onClickAddPrice, this);
        this.btnReducePrice = new ccui.Button(res.btn_reduce);
        this.btnReducePrice.x = layoutPriceSell.width / 8;
        this.btnReducePrice.y = layoutPriceSell.height / 2;
        this.btnReducePrice.setScale(scaleBtn);
        this.btnReducePrice.addTouchEventListener(this.onClickBtnUpdateNumber(0, this.priceSell), this);
        //this.btnReducePrice.addTouchEventListener(this.onClickReducePrice, this);


        layoutPriceSell.addChild(this.btnAddPrice);
        layoutPriceSell.addChild(this.btnReducePrice);
        layoutPriceSell.addChild(this.priceSell);
        layoutPriceSell.addChild(this.imgGold);
    },

    initSellDataItem: function () {
        var layout = new ccui.Layout();
        layout.x = this.width / 25 * 4;
        layout.y = this.height / 20;
        layout.setContentSize(this.width / 20 * 7, this.height / 4 * 3);
        layout.setLocalZOrder(this.bgZOrder + 1);
        this.addChild(layout);

        this._silo = new SiloSell(layout.getContentSize());
        this._ware = new WareSell(layout.getContentSize());
        this.multiLayer = new cc.LayerMultiplex(this._silo, this._ware);
        this.multiLayer.switchTo(0);
        this.total = user.asset.foodStorage.getCurrentQuantity();
        this.capacity = user.asset.foodStorage.capacity;
        layout.addChild(this.multiLayer);

        //layout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        //layout.setBackGroundColor(cc.color.GREEN);
    },

    updateArrow: function (dt) {
        this.arrow.x += 1;
        if (this.arrow.x > (this.total / this.capacity) * this.layoutArrow.width) {
            this.unschedule(this.updateArrow);
        }
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

    touchChooseStorage: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                sender.runAction(new cc.ScaleTo(0.1, 1.1));
                break;
            case ccui.Widget.TOUCH_ENDED:
            case ccui.Widget.TOUCH_CANCELED:
                sender.runAction(new cc.ScaleTo(0.1, 1.0));
                switch (sender.tag) {
                    case 101:
                        this.multiLayer.switchTo(0);
                        this.total = user.asset.foodStorage.getCurrentQuantity();
                        this.capacity = user.asset.foodStorage.capacity;
                        this.sell_silo.setLocalZOrder(this.bgZOrder + 1);
                        this.sell_ware.setLocalZOrder(this.bgZOrder - 1);
                        break;
                    case 102:
                        this.multiLayer.switchTo(1);
                        this.total = user.asset.warehouse.getCurrentQuantity();
                        this.capacity = user.asset.warehouse.capacity;
                        this.sell_silo.setLocalZOrder(this.bgZOrder - 1);
                        this.sell_ware.setLocalZOrder(this.bgZOrder + 1);
                        break;
                }
                this.arrow.x = 0;
                this.schedule(this.updateArrow, 0.03);
                break;
        }
    },

    touchSell: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                sender.runAction(new cc.ScaleTo(0.1, 1.1));
                break;
            case ccui.Widget.TOUCH_ENDED:
            case ccui.Widget.TOUCH_CANCELED:

                sender.runAction(new cc.ScaleTo(0.1, 1.0));
                break;
        }
    },


    //
    updateSellInfo: function (storageItem) {
        this.numberSell.setString(Math.ceil(storageItem.quantity / 2) + "x");
        this.imgSellItem.setTexture(getProductIconById(storageItem.typeItem));

        this.priceSell.setString(Math.ceil(getProductConfigById(storageItem.typeItem).maxPrice * 0.3));
    },


    onClickBtnUpdateNumber: function (storageItem, label) {
        return function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:
                    break;
                case ccui.Widget.TOUCH_ENDED :
                    var value = label.getString();
                    if (isNaN(value)){
                        var str = value
                        value = str.split("x")[0];
                    }
                    cc.log(value)
                    break;
            }
        }
    }

});