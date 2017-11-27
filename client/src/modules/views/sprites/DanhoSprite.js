var DanhoSprite = AnimationSprite.extend({
	ctor: function(x, y) {
		this._super(resAniId.Danho, 2, 2, x, y, MapItemEnum.NATURE_THING);
		this.play("1");
		this.registerTouchEvents();
	},

	onClick: function() {
		this.play("2");
		cc.log("DanhoSprite is clicked", this.lx, this.ly);
	},

	_offset: function() {
		return cc.p(0, - MapValues.jLength / 2);
	}
});
