var VungnuocSprite = AnimationSprite.extend({
	natureId: 0,

	ctor: function(x, y, id) {
		this._super(resAniId.Vungnuoc1, 
				MapConfigs.VungNuoc.size.width,
				MapConfigs.VungNuoc.size.height,
				x, y, 17, MapItemEnum.NATURE_THING);
		this.natureId = id;
		this.play("swamp_idle");
		this.registerTouchEvents(true);
	},

	onClick: function() {
		cc.log("Vungnuoc clicked", this.lx, this.ly);
		this.play("swamp_collect");
	},

	_offset: function() {
		return cc.p(- MapValues.iLength + 20, -20);
	}
});
