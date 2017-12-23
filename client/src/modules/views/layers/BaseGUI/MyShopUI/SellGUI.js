/**
 * Created by CPU60075_LOCAL on 12/23/2017.
 */


var SellGUI = BaseLayout.extend({
    ctor: function () {
        this._super(res.sellGUI_bg, null, false, true);
        //this.bgZOrder = 1;
        //this._bg.setLocalZOrder(this.bgZOrder);

        this.btnClose = new ccui.Button(res.close_png);
        this.btnClose.setZoomScale(-0.1);
        this.btnClose.setScale(0.9);
        this.btnClose.setPosition(this.width * 19 / 20, this.height / 10 * 9);
        this.btnClose.addTouchEventListener(this.touchClose, this);
        //this.btnClose.setLocalZOrder(this.bgZOrder + 1);
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

        //this.sell_silo.setLocalZOrder(this.bgZOrder + 1);
        //this.sell_ware.setLocalZOrder(this.bgZOrder - 1);

        this.initSellDataItem();
    },

    initSellDataItem: function () {
        var layout = new ccui.Layout();
        layout.x = this.width / 25 * 4;
        layout.y = this.height / 20;
        layout.setContentSize(this.width / 20 * 7, this.height / 4 * 3);
        //layout.setLocalZOrder(this.bgZOrder + 1);
        this.addChild(layout);
        //
        ////this.debugSprite = cc.Sprite(res.debug_png);
        ////layout.addChild(this.debugSprite);
        //
        this._silo = new SiloSell(layout.getContentSize());
        //this._ware = new WareSell();
        //
        this.multiLayer = new cc.LayerMultiplex(this._silo);
        this.multiLayer.switchTo(0);
        ////this._multiLayer.setLocalZOrder(this.bgZOrder + 2);
        ////this._silo.setLocalZOrder(this.bgZOrder + 2);
        layout.addChild(this.multiLayer);

        //cc.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        //this._silo.createTable();

        //layout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        //layout.setBackGroundColor(cc.color.GREEN);

        //this.multiLayer.switchTo(0);
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
                        //this._multiLayer.switchTo(0);
                        //this.sell_silo.setLocalZOrder(this.bgZOrder + 1);
                        //this.sell_ware.setLocalZOrder(this.bgZOrder - 1);
                        break;
                    case 102:
                        //this._multiLayer.switchTo(1);
                        //this.sell_silo.setLocalZOrder(this.bgZOrder - 1);
                        //this.sell_ware.setLocalZOrder(this.bgZOrder + 1);
                        break;
                }
                break;
        }
    }
});