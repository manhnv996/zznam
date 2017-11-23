
var BakerySprite = AnimationSprite.extend({
	ctor: function(x, y) {
		this._super(resAniId.bakery, 3, 3, x, y, MapItemEnum.BAKERY);
		// this.content = fr.createAnimationById(resAniId.bakery, this);
		// this.content.gotoAndPlay('loop', -1);
		// this.addChild(this.content);
		this.play("loop");
		this.registerTouchEvents();
	},

	onClick: function() {
		cc.log("bakery is clicked");
	}
});
