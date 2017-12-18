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

	onClick: function() {
		this.play("forest_big_stone_1_select");
		cc.audioEngine.playEffect(res.touch_big_rock_mp3, false);
		TablePopupLayer.instance.showNatureToolPopup(this.lx, this.ly, NaturalThingEnum.ROCK_BIG, this.natureId);
	},

	_offset: function() {
		return cc.p(0, - MapValues.jLength + 20);
	},

	collect: function(callback) {
		this.removeTouchEvents();
		this.play("forest_big_stone_1_collect", function() {
			this.removeFromParent(true);
			callback && callback();
		}.bind(this));
	}
});
