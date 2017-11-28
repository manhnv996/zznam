var ArrowLayer = cc.Layer.extend({
	ctor: function() {
		this._super();
		cc.log("Init arrow layer");
	},

	showArrow: function(x, y, callback) {
		this.arrow = fr.createAnimationById(resAniId.Arrow1, this);
		this.arrow.gotoAndPlay('1', -1, 1.0);
		this.arrow.setCompleteListener(callback);
		this.arrow.setScale(0.5);
		// Recaculate position
		var boundingbox = this.arrow.getBoundingBox();
		var position = cc.p(x - boundingbox.width / 2, y + boundingbox.height);

		this.arrow.setPosition(position);
		this.addChild(this.arrow);
	},

	removeArrow: function() {
		if (this.arrow) {
			this.arrow.removeFromParent();
			this.arrow = null;
		}
	}
});
