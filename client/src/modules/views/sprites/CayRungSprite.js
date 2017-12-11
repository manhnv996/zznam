var CayRungSprite = AnimationSprite.extend({
	treeType: 1,
	natureId: 0,

	ctor: function(x, y, type, id) {
		this._super(resAniId.Cayrung,
				MapConfigs.SmallNatureThing.size.width,
				MapConfigs.SmallNatureThing.size.height, 
				x, y, MapItemEnum.NATURE_THING);
		this.treeType = type || this.treeType;
		this.natureId = id;
		this.play(2 * this.treeType - 1);
		this.registerTouchEvents({ lockMove: true });
		// this.showDebugPriorityPoint();
		
	},

	onClick: function() {
		cc.log("Cayrung is clicked", this.getLocalZOrder(), "lx:", this.lx, "ly:", this.ly, "id:", this.natureId, this.getPriority());
		this.play(2 * this.treeType - 1);
		// this.play(2 * this.treeType);
	},

	_offset: function() {
		return cc.p(0, - MapValues.jLength / 2);
	}
});
