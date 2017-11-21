var TruckOrderSprite = MapBlockSprite.extend({
	ctor: function(x, y) {
		this._super(res.TRUCK_ORDER_BG_PNG, 
			MapConfigs.TruckOrder.blockSizeX, MapConfigs.TruckOrder.blockSizeY, 
			x, y);
	}
});
