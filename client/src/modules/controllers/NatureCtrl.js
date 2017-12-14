var NatureCtrl = cc.Class.extend({
	lock: false,
	nature: null,
	natureSprite: null,
	tool: null,

	initNature: function(natureId) {
		this.nature = user.asset.getNatureThingById(natureId);
		switch (this.nature.type) {
			case NaturalThingEnum.PINE_BIG:
			case NaturalThingEnum.PINE_SMALL:
				this.tool = ProductTypes.TOOl_SAW;
				break;
			case NaturalThingEnum.TREE_BIG:
			case NaturalThingEnum.TREE_SMALL:
				this.tool = ProductTypes.TOOL_AXE;
				break;
			case NaturalThingEnum.VUNG_NUOC:
				this.tool = ProductTypes.TOOL_SHOVEL;
				break;
			case NaturalThingEnum.ROCK_BIG:
				this.tool = ProductTypes.TOOL_DEMOLITION_CHARGE;
				break;
			case NaturalThingEnum.ROCK_SMALL:
				this.tool = ProductTypes.TOOL_DYNOMITE;
				break;
		}
		this.natureSprite = MapLayer.instance.getChildByTag(TagClusters.Nature + natureId);
		// cc.log(this.nature, this.tool);
	},
	
	cutDown: function(lx, ly, type) {
		if (this.lock) {
			return;
		}
		var flx = Math.floor(lx);
		var fly = Math.floor(ly);
		if (!user.map[flx] || user.map[flx][fly] !== MapItemEnum.NATURE_THING) {
			return;
		}
		if (MapValues.positionInsideMapBlockSprite(flx, fly, this.natureSprite)) {
		// if (flx === this.nature.coordinate.x && fly === this.nature.coordinate.y) {
			if (user.asset.warehouse.takeItem(this.tool, 1)) {
				MapCtrl.instance.removeSpriteAlias(this.natureSprite);
				user.asset.removeNatureThing(this.nature.id);
				this.natureSprite.collect();
			} else {
				this.lock = true;
				BaseGUILayer.instance.showSuggestBuyMissionItem([new StorageItem(this.tool, 1)]);
				// Show popup
			}
		}
	},

	unlock: function() {
		this.lock = false;
	}
});
