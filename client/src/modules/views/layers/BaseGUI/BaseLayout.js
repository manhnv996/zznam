/**
 * Created by CPU60075_LOCAL on 12/1/2017.
 */

var BaseLayout = ccui.Layout.extend({
    //_hasCloseButton: null,
    _bg: null,
    _title: null,
    _btnClose: null,
    //_debug: true,
    _debug: false,

    ctor: function (background, title, hasCloseButton, hideShop) {
        //cc.log("Notify Miss Gold");

        this._super();
        this._hasCloseButton = hasCloseButton;
        this._hideShop = hideShop;

        if (!GameShopLayout.instance._isHide) {
            GameShopLayout.instance.hide();
        }

        this.x = cc.winSize.width / 2;
        this.y = cc.winSize.height / 2;
        this.setAnchorPoint(cc.p(0.5, 0.5));

        //Set background
        this._bg = new cc.Sprite(background);
        this._bg.x = 0;
        this._bg.y = 0;
        this._bg.setAnchorPoint(0, 0);
        //Set size layout
        this.setContentSize(this._bg.getContentSize());
        this.addChild(this._bg);


        //Set title
        if (title) {
            this._title = new cc.LabelBMFont(title.toString(), res.FONT_OUTLINE_50);
            this._title.x = this.width / 2;
            this._title.y = this.height * 0.9;

            this.addChild(this._title);
        }

        //Set close GUI button
        if (this._hasCloseButton) {
            this._btnClose = new ccui.Button(res.close_png);
            this._btnClose.setZoomScale(-0.1);
            this._btnClose.setScale(0.9);
            this._btnClose.setPosition(this.width * 19 / 20, this.height * 5 / 6);
            this.addChild(this._btnClose);
        }

        this.setScale(0.5);
        this.actionShow();
        //BaseGUILayer.instance.blockLayout();

        /**
         *  Debug
         */
        if (this._debug) {
            this.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.setBackGroundColor(cc.color.RED);
        }
    },

    actionShow: function () {
        var scale = (cc.winSize.height - cc.winSize.height / 80 * 3) / this.height;
        //cc.log("scale " + scale);
        var scaleUp = cc.scaleTo(0.2, scale + 0.15);
        var scaleDown = cc.scaleTo(0.2, scale);
        this.runAction(cc.sequence(scaleUp, cc.delayTime(0.05), scaleDown));
    },

    initInfo: function () {

    }

});