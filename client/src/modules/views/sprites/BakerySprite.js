
var BakerySprite = AnimationSprite.extend({

	_Id: null,

	ctor: function(bakeryId, x, y) {
		this._super(resAniId.bakery, 3, 3, x, y, MapItemEnum.BAKERY);
		//this._super(resAniId.Nha_hoanthanh, 3, 3, x, y, MapItemEnum.BAKERY);

		// this.content = fr.createAnimationById(resAniId.bakery, this);
		// this.content.gotoAndPlay('loop', -1);
		// this.addChild(this.content);

		this._Id = bakeryId;

		//this.play("1");
		this.play("idle");
        //
		this.registerTouchEvents();
	},

	onBeginClick: function() {
		this.play("selected");
	},

	onClick: function() {
		cc.log("bakery is clicked " + this._Id);
	}

});
