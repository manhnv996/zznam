var NhaChinhSprite = MapBlockSprite.extend({
	ctor: function(x, y) {
		this._super(res.NHA_CHINH_PNG, 
			MapConfigs.NhaChinh.size.width, MapConfigs.NhaChinh.size.height, 
			x, y, MapItemEnum.NHA_CHINH
		);
		this.registerTouchEvents(true);
	},

	onClick: function() {
		cc.log("Nha chinh is clicked");
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
