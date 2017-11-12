var TruckOrderSprite = cc.Sprite.extend({
	ctor: function() {
		this._super();
		var background = new cc.Sprite(res.TRUCK_ORDER_BG_PNG);
		this.addChild(background);
	}
});
