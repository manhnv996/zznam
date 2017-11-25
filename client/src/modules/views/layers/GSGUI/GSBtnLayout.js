/**
 * Created by CPU60075_LOCAL on 16/11/2017.
 */

var GSBtnLayout = ccui.Layout.extend({
    _statusGS: 0,

    ctor: function () {
        this._super();
        var size = cc.director.getVisibleSize();

        var btnGS = new ccui.Button(res.shop_icon_png);
        btnGS.setPosition(cc.p(0, 0));
        btnGS.setAnchorPoint(0, 0.1);
        btnGS.setZoomScale(-0.1);
        btnGS.setName("btnGameShop");
        btnGS.addTouchEventListener(this.onclickBtnGS, this);
        btnGS.setScale((size.height / 7) / btnGS.getContentSize().height);
        this.addChild(btnGS);
    },

    onclickBtnGS: function (sender, type) {
        var size = cc.director.getVisibleSize();
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                //sender.setScale((size.height / 7) / sender.getContentSize().height - 0.1);
                break;
            case ccui.Widget.TOUCH_ENDED:
                if (this._statusGS == 0) {
                    this.getParent().show();
                } else {
                    this.getParent().hide();
                }
                this._statusGS = (this._statusGS + 1) % 2;
                //sender.setScale((size.height / 7) / sender.getContentSize().height);
                break;
            default:
                break;
        }
    }
});
