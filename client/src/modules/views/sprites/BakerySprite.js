
var BakerySprite = AnimationSprite.extend({

	_bakeryId: null,

	ctor: function(bakeryId, x, y) {
		this._super(resAniId.bakery, 3, 3, x, y, MapItemEnum.BAKERY);
		// this.content = fr.createAnimationById(resAniId.bakery, this);
		// this.content.gotoAndPlay('loop', -1);
		// this.addChild(this.content);

		this._bakeryId = bakeryId;

		this.play("idle");
		this.registerTouchEvents();
	},

	onBeginClick: function() {
		this.play("selected");
	},

	onClick: function() {
		cc.log("bakery is clicked");
		//this.play("selected");
	},

});
