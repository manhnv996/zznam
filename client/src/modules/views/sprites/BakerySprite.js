var BakerySprite = MapBlockSprite.extend({
	ctor: function(x, y) {
		this._super(undefined, 3, 3, x, y);
		cc.log(resAniId.bakery);
		this.content = fr.createAnimationById(resAniId.bakery, this);
		this.content.gotoAndPlay('loop', -1);
		this.addChild(this.content);
	},

	_getContentSize: function() {
		return this.content.getBoundingBox();
	}
});
