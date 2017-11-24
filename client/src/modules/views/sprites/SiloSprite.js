var SiloSprite = MapBlockSprite.extend({
	ctor: function(x, y) {
		this._super(res.SILO,
			MapConfigs.Silo.size.width,
			MapConfigs.Silo.size.height,
			x, y, MapItemEnum.SILO
		);
		this.registerTouchEvents();
	},

	onClick: function() {
		cc.log("Silo clicked");
	}
});
