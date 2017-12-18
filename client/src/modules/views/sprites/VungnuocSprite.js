var VungnuocSprite = AnimationSprite.extend({
	natureId: 0,

	ctor: function(x, y, id) {
		this._super(resAniId.Vungnuoc1, 
				MapConfigs.BigNatureThing.size.width,
				MapConfigs.BigNatureThing.size.height,
				x, y, MapItemEnum.NATURE_THING);
		this.natureId = id;
		this.play("swamp_select");
		this.registerTouchEvents({ lockMove: true });
	},

	onClick: function() {
		// cc.log("Vungnuoc clicked", "lx:", this.lx, "ly:", this.ly, "id:", this.natureId);
	},

	onClick: function () {
		this.play("swamp_idle");
		audioEngine.playEffect(res.touch_water_pool_mp3, false);
		TablePopupLayer.instance.showNatureToolPopup(this.lx, this.ly, NaturalThingEnum.VUNG_NUOC, this.natureId);
	},

	_offset: function() {
		return cc.p(- MapValues.iLength + 20, -20);
	},

	collect: function(callback) {
		this.removeTouchEvents();
		this.play("swamp_collect", function() {
			this.removeFromParent(true);
			callback && callback();
		}.bind(this));
	}
});
