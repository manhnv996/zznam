var CayRungSprite = AnimationSprite.extend({
	treeType: 1,
	natureId: 0,

	ctor: function(x, y, type, id) {
		this._super(resAniId.Cayrung,
				MapConfigs.Tree.size.width,
				MapConfigs.Tree.size.height, 
				x, y, 17, MapItemEnum.NATURE_THING);
		this.treeType = type || this.treeType;
		this.natureId = id;
		this.play(2 * this.treeType - 1);
		this.registerTouchEvents(true);
	},

	onClick: function() {
		cc.log("Cayrung is clicked");
		this.play(2 * this.treeType - 1);
		// this.play(2 * this.treeType);
	},

	_offset: function() {
		return cc.p(0, - MapValues.jLength / 2);
	}
});
