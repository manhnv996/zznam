/**
 * Created by CPU60075_LOCAL on 20/11/2017.
 */

var GSLayer = cc.Layer.extend({
    _btnGameShop: null,
    _gameShop: null,
    _listener: null,

    ctor: function () {
        this._super();

        this._btnGameShop = new GSBtnLayout();
        this.addChild(this._btnGameShop);

        this._gameShop = new GSDetailLayout();
        this.addChild(this._gameShop);
    },

    hide: function () {
        var moveActionBtn = cc.moveTo(0.05, cc.p(0, 0));
        this._btnGameShop.runAction(moveActionBtn);
        var moveAction = cc.moveTo(0.1, cc.p(-(cc.winSize.width / 3 + cc.winSize.width / 7), 0));
        this._gameShop.runAction(moveAction);

        //cc.eventManager.removeEventListener(this._listener);
    },

    show: function () {
        var moveActionBtn = cc.moveTo(0.1, cc.p(cc.winSize.width / 3 - 10, 0));
        this._btnGameShop.runAction(moveActionBtn);
        var moveAction = cc.moveTo(0.1, cc.p(0, 0));
        this._gameShop.runAction(moveAction);

        //block listener
        //this._listener = cc.EventListener.create(
        //    setSwallows: true;
        //    onTouchBegan: function(touch, event) {
        //        return true;
        //    },
        //
        //);
        //cc.eventManager.addListener(this._listener, -1);
    }
});