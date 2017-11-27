var ODatSprite = MapBlockSprite.extend({
	id: null,
	ctor: function(x, y, id) {
		this._super(res.O_DAT, 1, 1, x, y, MapItemEnum.FIELD);
		this.id = id || 0;
	}
});
