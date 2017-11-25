var DatoSprite = AnimationSprite.extend({
	ctor: function(x, y) {
		this._super(resAniId.Dato, 2, 2, x, y, MapItemEnum.NATURE_THING);
		this.play("forest_big_stone_1_idle");
		this.registerTouchEvents();
	},

	onClick: function() {
		this.play("forest_big_stone_1_select");
		cc.log("DatoSprite is clicked");
	},

	_offset: function() {
		return cc.p(0, - MapValues.jLength + 20);
	}
});
