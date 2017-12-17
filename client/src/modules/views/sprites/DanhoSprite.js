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

	onClick: function() {
		this.play("2");
		// NatureCtrl.instance.cutDown(this.natureId);
		TablePopupLayer.instance.showNatureToolPopup(this.lx, this.ly, NaturalThingEnum.ROCK_SMALL, this.natureId);
	},

	_offset: function() {
		return cc.p(0, - MapValues.jLength / 2);
	},

	collect: function(callback) {
		this.removeTouchEvents();
		this.play("3", function() {
			this.removeFromParent(true);
			callback && callback();
		}.bind(this));
	}
});
