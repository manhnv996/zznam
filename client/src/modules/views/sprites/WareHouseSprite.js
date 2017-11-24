var WareHouseSprite = MapBlockSprite.extend({
	ctor: function(x, y) {
		this._super(res.WAREHOUSE,
			MapConfigs.Warehouse.size.width, 
			MapConfigs.Warehouse.size.height, 
			x, y, MapItemEnum.WAREHOUSE
		);
		this.registerTouchEvents();
	},

	onClick: function() {
		cc.log("Warehouse clicked");
	}
});
