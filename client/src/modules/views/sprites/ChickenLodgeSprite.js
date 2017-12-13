var ChickenLodgeSprite = AnimalLodgeSprite.extend({
	// chickenSpriteList: [],

	ctor: function(x, y) {
		this._super(
			res.CHICKEN_LODGE_GROUND, res.CHICKEN_LODGE_FENCE, 
			19, 9, 22,
			3, 3, x, y, MapItemEnum.LODGE);
	},

	setLogicPosition: function(lx, ly, notUpdatePriority) {
		this._super(lx, ly, notUpdatePriority);
		this.x += 33;
		this.y += -1;
	},

	// addChickenSprite: function(chickenSprite) {
	// 	this.chickenSpriteList.push(chickenSprite);
	// 	this.addChild(chickenSprite);
	// },

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
		var remain = AnimalConfig.chicken.time * 1000 - (new Date().getTime() - startTime);
		if (remain > 0) {
			this.loadingBar = new LoadingBarLayout(
				AnimalConfig.chicken.time, startTime,
				"NAME_TAB_CHICKEN", 1);
			var p = MapValues.logicToScreenPosition(this.lx + lp.x, this.ly + lp.y);
			this.loadingBar.setPosition(p.x + 50, p.y - 25);
			BaseGUILayer.instance.addChild(this.loadingBar);
			this.loadingBar.setOnClick(function() {
				cc.log("Boost", animal.id);
			});
		}
	},

	showAnimalTool: function() {
		// var hungry = this.lodge.isHungry();
		var harvest = this.lodge.canHarvest();
		var mode = 0;
		if (harvest) {
			mode = 1;
		}
		TablePopupLayer.instance.showAnimalToolPopup(this.lx, this.ly, AnimalLodgeType.chicken_habitat, mode, this);
		// cc.log("HarvestableCount", this.lodge.harvestableCount());
	},

	onClick: function(lx, ly) {
		if (this.lodge.getAnimalCount() > 0) {
			this.showAnimalRemain();
			this.showAnimalTool();
		} else {
			// Open store to buy animal
			cc.log("Open store to buy animal");
		}

		// AnimalCtrl.instance.onMoveFeedTool(lx, ly, AnimalLodgeType.chicken_habitat);
	}
});
