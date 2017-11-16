/**
 * Created by Giang on 16/11/2017.
 */

var GameShopLayer = cc.Layer.extend({
    _winSize: 0,
    _btnGameShop: null,
    _gameShop: null,

    ctor: function () {
        this._super();
        this._winSize = cc.director.getVisibleSize();

        this._btnGameShop = new GameShopBtnLayout();
        this.addChild(this._btnGameShop);

        this._gameShop = new GameShopDetailLayout();
        cc.log("Init");
        this.addChild(this._gameShop);
    },

    hide: function () {
        var moveActionBtn = cc.moveTo(0.05, cc.p(0, 0));
        this._btnGameShop.runAction(moveActionBtn);
        var moveAction = cc.moveTo(0.1, cc.p(-(this._winSize.width / 3 + this._winSize.width / 7), 0));
        this._gameShop.runAction(moveAction);
    },

    show: function () {
        var moveActionBtn = cc.moveTo(0.1, cc.p(this._winSize.width / 3 - 10, 0));
        this._btnGameShop.runAction(moveActionBtn);
        var moveAction = cc.moveTo(0.1, cc.p(0, 0));
        this._gameShop.runAction(moveAction);
    }
});
