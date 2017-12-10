var CowLodgeSprite = AnimalLodgeSprite.extend({
	cowSpriteList: [],

	ctor: function(x, y) {
		this._super(
			res.COW_LODGE_GROUND, res.COW_LODGE_FENCE,
			22, 13, 26,
			4, 4, x, y, MapItemEnum.LODGE);
		// this.registerTouchEvents();
		// for (var i = 0; i < 5; i++) {
		// 	var cow = new CowSprite();
		// 	cow.id = i;
		// 	this.addChild(cow);
		// }
	},

	onClick: function(lx, ly) {
		AnimalCtrl.instance.onMoveHarvestTool(lx, ly);
		// if (this.lodge.getAnimalCount() > 0) {
		// 	var startTime = this.lodge.getLastFeededTime();
		// 	var remain = AnimalConfig.cow.time * 1000 - (new Date().getTime() - startTime);
		// 	if (remain > 0) {
		// 		// Animal feeded
		// 		this.loadingBar = new LoadingBarLayout(
		// 			AnimalConfig.cow.time, startTime,
		// 			// fr.Localization.text("Ga"), 1);
		// 			"Ga", 1);
		// 		var p = MapValues.logicToScreenPosition(this.lx, this.ly);
		// 		this.loadingBar.setPosition(p.x, p.y + 50);
		// 		BaseGUILayer.instance.addChild(this.loadingBar);
		// 	}

		// 	if (this.lodge.isHungry()) {
		// 		// Show feed tools
		// 		cc.log('Hungry');
		// 	}

		// 	if (this.lodge.canHarvest()) {
		// 		cc.log("Harvest");
		// 	}

		// 	cc.log("HarvestableCount", this.lodge.harvestableCount());

		// } else {
		// 	// Open store to buy animal
		// 	cc.log("Open store to buy animal");
		// }
	},

	setLogicPosition: function(lx, ly, notUpdatePriority) {
		this._super(lx, ly, notUpdatePriority);
		this.x += 24;
		this.y += -30;
	},
 
	addCowSprite: function(cow) {
		this.cowSpriteList.push(cow);
		this.addChild(cow);
	}
});
