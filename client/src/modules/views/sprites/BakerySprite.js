var BakerySprite = MapBlockSprite.extend({
	ctor: function(x, y) {
		this._super(undefined, 3, 3, 4, 3);
		this.content = fr.createAnimationById(resAniId.bakery, this);
		this.content.gotoAndPlay('loop', -1);
		this.addChild(this.content);
		cc.log(this.getBoundingBox());
	},

	// getContentSize: function() {
	// 	return this.content.getBoundingBox();
	// }
});
