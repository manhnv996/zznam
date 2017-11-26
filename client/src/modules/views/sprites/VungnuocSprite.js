var VungnuocSprite = AnimationSprite.extend({
	natureId: 0,

	ctor: function(x, y, id) {
		this._super(resAniId.Vungnuoc1, 
				MapConfigs.BigNatureThing.size.width,
				MapConfigs.BigNatureThing.size.height,
				x, y, MapItemEnum.NATURE_THING);
		this.natureId = id;
		this.play("swamp_idle");
		this.registerTouchEvents({ lockMove: true });
	},

	onClick: function() {
		cc.log("Vungnuoc clicked", "lx:", this.lx, "ly:", this.ly, "id:", this.natureId);
		this.play("swamp_select");
	},

	_offset: function() {
		return cc.p(- MapValues.iLength + 20, -20);
	}
});
