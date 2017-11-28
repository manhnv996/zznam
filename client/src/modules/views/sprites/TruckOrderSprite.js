var TruckOrderSprite = MapBlockSprite.extend({
	ctor: function(x, y) {
		this._super(res.TRUCK_ORDER_BG_PNG, 
			MapConfigs.TruckOrder.size.width,
			MapConfigs.TruckOrder.size.height, 
			x, y, MapItemEnum.TRUCK_ORDER
		);
		this.registerTouchEvents({ lockMove: true });
	},

	onClick: function() {
		cc.log("TruckOrder clicked", this.getLocalZOrder(), this.lx, this.ly, this.blockSizeX, this.blockSizeY);
	},
	
	onBeginClick: function() {
		// this.setOpacity(210);
		this.setColor(cc.color(200, 200, 200));
	},

	onEndClick: function() {
		// this.setOpacity(255);
		this.setColor(cc.color(255, 255, 255));
	}
});
