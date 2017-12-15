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
		this.play(2 * this.treeType - 1);
		var type = 0;
		switch (this.treeType) {
			case 1:
				type = NaturalThingEnum.PINE_SMALL;
				break;
			case 2:
				type = NaturalThingEnum.PINE_BIG;
				break;
			case 3:
				type = NaturalThingEnum.TREE_BIG;
				break;
			case 4:
				type = NaturalThingEnum.TREE_SMALL
				break;
		}
		TablePopupLayer.instance.showNatureToolPopup(this.lx, this.ly, type, this.natureId);
	},

	_offset: function() {
		return cc.p(0, - MapValues.jLength / 2);
	},

	collect: function() {
		this.removeTouchEvents();
		this.play(2 * this.treeType, function() {
			this.removeFromParent(true);
		}.bind(this));
	}
});
