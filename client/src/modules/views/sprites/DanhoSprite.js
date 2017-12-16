var DanhoSprite = AnimationSprite.extend({
	natureId: 0,

	ctor: function(x, y, id) {
		this._super(resAniId.Danho,
			MapConfigs.SmallNatureThing.size.width,
			MapConfigs.SmallNatureThing.size.height,
			x, y, MapItemEnum.NATURE_THING);
		this.natureId = id;
		this.play("1");
		this.registerTouchEvents({ lockMove: true });
	},

	onEndClick: function() {
		this.play("2");
		// NatureCtrl.instance.cutDown(this.natureId);
		audioEngine.playEffect(res.touch_small_rock_mp3, false);
		TablePopupLayer.instance.showNatureToolPopup(this.lx, this.ly, NaturalThingEnum.ROCK_SMALL, this.natureId);
	},

	_offset: function() {
		return cc.p(0, - MapValues.jLength / 2);
	},

	collect: function() {
		this.removeTouchEvents();
		this.play("3", function() {
			this.removeFromParent(true);
		}.bind(this));
	}
});
