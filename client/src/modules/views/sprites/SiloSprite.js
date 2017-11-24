var SiloSprite = MapBlockSprite.extend({
	ctor: function(x, y) {
		this._super(res.SILO, 2, 2, x, y, MapItemEnum.SILO);
	}
});
