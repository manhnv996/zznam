/**
 * Created by CPU60075_LOCAL on 16/11/2017.
 */

var GameShopLayer = cc.Layer.extend({
    _winSize: 0,
    _btnGameShop: null,
    _gameShop: null,
    _maxField: 1,

    ctor: function (maxField) {
        this._super();
        this._winSize = cc.director.getVisibleSize();
        this._maxField = maxField;

        this._btnGameShop = new GameShopBtnLayout();
        this.addChild(this._btnGameShop);

        this.init();
        //this._gameShop = new GameShopDetailLayout();
        //cc.log("Init");
        //this.addChild(this._gameShop);
    },

    init: function () {
        this._gameShop = new GameShopDetailLayout(this._maxField);
        this._gameShop.setName("GameShop");
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
    },

    updateData: function () {
        this.removeChildByName("GameShop");
        this.init();
        //this.show();
    }
});
