var TruckOrderSprite = MapBlockSprite.extend({
	ctor: function(x, y) {
		this._super(res.TRUCK_ORDER_BG_PNG, 
			MapConfigs.TruckOrder.blockSizeX, MapConfigs.TruckOrder.blockSizeY, 
			x, y);
		this.registerTouchEvents();
	},

	onClick: function() {
		cc.log("TruckOrder clicked");
		if (this.move(this.lx, this.ly - 1)) {
			cc.log("Yes");
		} else {
			cc.log("No");
		}
	}
});
