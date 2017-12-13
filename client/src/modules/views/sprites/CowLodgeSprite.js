var CowLodgeSprite = AnimalLodgeSprite.extend({

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

		//this.id = id;
	},

	showAnimalRemain: function(id) {
		var animal = null;
		if (!id) {
			animal = this.lodge.getAnimalLastFeededTime();
		} else {
			animal = this.lodge.getAnimalById(id);
		}
		var animalSprite = this.getChildByTag(TagClusters.Animal + animal.id);
		var lp = cc.p(animalSprite.lx, animalSprite.ly);
		var startTime = animal.feededTime;
		var remain = AnimalConfig.cow.time * 1000 - (new Date().getTime() - startTime);
		if (remain > 0) {
			this.loadingBar = new LoadingBarLayout(
				AnimalConfig.cow.time, startTime,
				"NAME_TAB_COW", 1);
			var p = MapValues.logicToScreenPosition(this.lx + lp.x, this.ly + lp.y);
			this.loadingBar.setPosition(p.x + 75, p.y - 25);
			BaseGUILayer.instance.addChild(this.loadingBar);
			this.loadingBar.setOnClick(function() {
				AnimalCtrl.instance.boost(this.id, animal.id);
				this.loadingBar.closeLoadingBar();
			}.bind(this));
		}
	},

	showAnimalTool: function() {
		// var hungry = this.lodge.isHungry();
		var harvest = this.lodge.canHarvest();
		var mode = 0;
		if (harvest) {
			mode = 1;
		}
		TablePopupLayer.instance.showAnimalToolPopup(this.lx, this.ly, 
			AnimalLodgeType.cow_habitat, mode, this);
		// cc.log("HarvestableCount", this.lodge.harvestableCount());
	},

	onClick: function(lx, ly) {
		// AnimalCtrl.instance.onMoveHarvestTool(lx, ly, AnimalLodgeType.cow_habitat);
		if (this.lodge.getAnimalCount() > 0) {
			this.showAnimalRemain();
			this.showAnimalTool();
		} else {
			// Open store to buy animal
			cc.log("Open store to buy animal");
		}
	},

	setLogicPosition: function(lx, ly, notUpdatePriority) {
		this._super(lx, ly, notUpdatePriority);
		this.x += 24;
		this.y += -30;
	},
 
	// addCowSprite: function(cow) {
	// 	this.cowSpriteList.push(cow);
	// 	this.addChild(cow);
	// }
});
