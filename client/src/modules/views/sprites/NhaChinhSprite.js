var NhaChinhSprite = MapBlockSprite.extend({
	ctor: function(x, y) {
		this._super(res.NHA_CHINH_PNG, 
			MapConfigs.NhaChinh.size.width, MapConfigs.NhaChinh.size.height, 
			x, y, MapItemEnum.NHA_CHINH
		);
		this.registerTouchEvents();
	},

	onClick: function() {
		
	},

	onBeginClick: function() {
		// this.setOpacity(210);
		cc.log("Nha chinh is clicked");
		
	},

	onEndClick: function() {
		// this.setOpacity(255);
		
	},

	onFinishMove: function(lx, ly) {
		cc.log("House moved to", lx, ly);
	}
});
