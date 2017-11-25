var RoadShopSprite = MapBlockSprite.extend({
	ctor: function(x, y) {
		this._super(res.ROADSIDE_SHOP,
			MapConfigs.RoadShop.size.width,
			MapConfigs.RoadShop.size.height,
			x, y, MapItemEnum.ROAD_SHOP
		);
		this.registerTouchEvents(true);
	},

	onClick: function() {
		cc.log("Roadshop clicked");
	}
});
