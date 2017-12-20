/**
 * Created by CPU60075_LOCAL on 16/11/2017.
 */

var GSBtnLayout = ccui.Layout.extend({

    ctor: function () {
        this._super();
        //var size = cc.director.getVisibleSize();

        this.btnGS = new ccui.Button(res.shop_icon_png);
        this.btnGS.setPosition(cc.p(cc.winSize.width / 3 + cc.winSize.width / 7, 0));
        this.btnGS.setAnchorPoint(0, 0.1);
        this.btnGS.setZoomScale(-0.1);
        this.btnGS.setName("btnGameShop");
        this.btnGS.addTouchEventListener(this.onclickBtnGS, this);
        this.btnGS.setScale((cc.winSize.height / 7) / this.btnGS.getContentSize().height);
        this.addChild(this.btnGS);
    },

    onclickBtnGS: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                FriendUI.instance.hide();
                audioEngine.playEffect(res.func_click_button_mp3, false);
                break;
            case ccui.Widget.TOUCH_ENDED:
            case ccui.Widget.TOUCH_CANCELED:
                if (this.parent._isHide) {
                    this.parent.show();
                } else {
                    this.parent.hide();
                }
                break;
            default:
                break;
        }
    }
});
