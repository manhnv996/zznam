var DatoSprite = AnimationSprite.extend({
	natureId: 0,

	ctor: function(x, y, id) {
		this._super(resAniId.Dato, 
			MapConfigs.BigNatureThing.size.width,
			MapConfigs.BigNatureThing.size.height, 
			x, y, MapItemEnum.NATURE_THING);
		this.natureId = id;
		this.play("forest_big_stone_1_idle");
		this.registerTouchEvents({ lockMove: true });
	},

	onEndClick: function() {
		this.play("forest_big_stone_1_select");
		audioEngine.playEffect(res.touch_big_rock_mp3, false);
		TablePopupLayer.instance.showNatureToolPopup(this.lx, this.ly, NaturalThingEnum.ROCK_BIG, this.natureId);
	},

	_offset: function() {
		return cc.p(0, - MapValues.jLength + 20);
	},

	collect: function() {
		this.removeTouchEvents();
		this.play("forest_big_stone_1_collect", function() {
			this.removeFromParent(true);
		}.bind(this));
	}
});
