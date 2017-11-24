var RoadShopSprite = MapBlockSprite.extend({
	ctor: function(x, y) {
		this._super(res.ROADSIDE_SHOP,
			MapConfigs.RoadShop.blockSizeX, MapConfigs.RoadShop.blockSizeY,
			x, y, MapItemEnum.ROAD_SHOP);
		this.registerTouchEvents();
	},

	onClick: function() {
		cc.log("Roadshop clicked");
	}
});
