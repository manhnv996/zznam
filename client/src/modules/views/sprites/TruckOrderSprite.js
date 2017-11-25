var TruckOrderSprite = MapBlockSprite.extend({
	ctor: function(x, y) {
		this._super(res.TRUCK_ORDER_BG_PNG, 
			MapConfigs.TruckOrder.size.width,
			MapConfigs.TruckOrder.size.height, 
			x, y, MapItemEnum.TRUCK_ORDER
		);
		this.registerTouchEvents(true);
	},

	onClick: function() {
		cc.log("TruckOrder clicked");
	}
});
