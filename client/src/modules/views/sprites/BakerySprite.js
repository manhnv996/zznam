var BakerySprite = MapBlockSprite.extend({
	ctor: function(w, h, x, y) {
		this._super(undefined, w, h, x, y);
		this.content = fr.createAnimationById(resAniId.bakery, this);
		this.content.gotoAndPlay('loop', -1);
		this.addChild(this.content);
		cc.log(this.getBoundingBox());
	},

	// getContentSize: function() {
	// 	return this.content.getBoundingBox();
	// }
});
