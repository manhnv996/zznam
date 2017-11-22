var NhaChinhSprite = MapBlockSprite.extend({
	ctor: function(x, y) {
		this._super(res.NHA_CHINH_PNG, 4, 4, x, y);
		this.registerTouchEvents();
	},

	onClick: function() {
		cc.log("Nha chinh is clicked");
	},

	onBeginClick: function() {
		this.setOpacity(210);
	},

	onEndClick: function() {
		this.setOpacity(255);
	}
});
