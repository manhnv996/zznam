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

        this.addChild(this.sell_silo);
        this.addChild(this.sell_ware);

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

        layoutNumberSell.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        layoutNumberSell.setBackGroundColor(cc.color.YELLOW);

        var btnAddNumber = new ccui.Button(res.btn_add);
        btnAddNumber.x = layoutNumberSell.width / 4 * 3;
        btnAddNumber.y = layoutNumberSell.height / 2;
        var btnReduceNumber = new ccui.Button(res.btn_reduce);

        layoutNumberSell.addChild(btnAddNumber);

        var layoutPriceSell = new ccui.Layout();
        layoutPriceSell.x = this.width / 100 * 59;
        layoutPriceSell.y = this.height / 50 * 21;
        layoutPriceSell.setContentSize(this.width / 25 * 9, this.height / 50 * 9);
        layoutPriceSell.setLocalZOrder(this.bgZOrder + 1);
        this.addChild(layoutPriceSell);

        layoutPriceSell.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        layoutPriceSell.setBackGroundColor(cc.color.BLACK);

        var btnAddPrice = new ccui.Button(res.btn_add);
        var btnReduceNumber = new ccui.Button(res.btn_reduce);
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

        layout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        layout.setBackGroundColor(cc.color.GREEN);
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
    }
});