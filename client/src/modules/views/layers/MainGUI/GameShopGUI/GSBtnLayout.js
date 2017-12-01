/**
 * Created by CPU60075_LOCAL on 16/11/2017.
 */

var GSBtnLayout = ccui.Layout.extend({
    //_statusGS: 0,

    ctor: function () {
        this._super();
        var size = cc.director.getVisibleSize();

        this.btnGS = new ccui.Button(res.shop_icon_png);
        this.btnGS.setPosition(cc.p(cc.winSize.width / 3 + cc.winSize.width / 7, 0));
        this.btnGS.setAnchorPoint(0, 0.1);
        this.btnGS.setZoomScale(-0.1);
        this.btnGS.setName("btnGameShop");
        this.btnGS.addTouchEventListener(this.onclickBtnGS, this);
        this.btnGS.setScale((size.height / 7) / this.btnGS.getContentSize().height);
        this.addChild(this.btnGS);
    },

    onclickBtnGS: function (sender, type) {
        var size = cc.director.getVisibleSize();
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                //sender.setScale((size.height / 7) / sender.getContentSize().height - 0.1);
                break;
            case ccui.Widget.TOUCH_ENDED:
            case ccui.Widget.TOUCH_CANCELED:
                if (this.parent._isHide) {
                    this.getParent().show();
                } else {
                    this.getParent().hide();
                }
                //this._statusGS = (this._statusGS + 1) % 2;
                //sender.setScale((size.height / 7) / sender.getContentSize().height);
                break;
            default:
                break;
        }
    }
});
