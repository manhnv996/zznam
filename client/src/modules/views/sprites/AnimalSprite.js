var AnimalSprite = cc.Sprite.extend({
	ctor: function(resAniId) {
		this._super();
		this._sprite = fr.createAnimationById(resAniId);
		this.addChild(this._sprite);
	},

	play: function(name) {
		this._sprite.gotoAndPlay(name);
	}
});
