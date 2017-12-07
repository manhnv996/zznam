/**
 * Created by CPU60135_LOCAL on 12/7/2017.
 */

var ProductSprite = cc.Sprite.extend({
    _productConfig: null,
    _muiten: null,
    ctor: function (parent,_productConfig){
        this._productConfig = _productConfig;
        this._super(this._productConfig.res_path);

        this._muiten = new cc.Sprite(res.ten);
        this._muiten.setPosition(new cc.p(this.width * 4 / 5, this.height / 5));
        this.addChild(this._muiten);

    }
    //todo add drag events
})