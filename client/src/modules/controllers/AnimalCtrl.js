var AnimalCtrl = cc.Class.extend({
	lock: false,

	onMoveHarvestTool: function(lx, ly, lodgeType) {
		if (this.lock) {
			return;
		}
		var flx = Math.floor(lx);
		var fly = Math.floor(ly);
		if (!user.map[flx] || user.map[flx][fly] !== MapItemEnum.LODGE) {
			return;
		}
		var lodge = user.asset.getLodgeByPosition(lx, ly);
		if (!lodge || lodge.type !== lodgeType) {
			// Stop check
			return;
		}
		var that = this;
		var lodgeSprite = MapLayer.instance.getChildByTag(TagClusters.Lodge + lodge.id);
		lodgeSprite.getAnimalIdsAroundPoint(lx, ly)
		.map(function(id) {
			return lodge.getAnimalById(id);
		})
		.filter(function(animal) {
			return animal.canHarvest();
		})
		.forEach(function(animal) {
			// try to add product to warehouse
			var product = animal.type === AnimalType.chicken 
					? ProductTypes.GOOD_EGG 
					: ProductTypes.GOOD_MILK;
			if (user.asset.warehouse.addItem(product, 1)) {
				var animalSprite = lodgeSprite.getChildByTag(TagClusters.Animal + animal.id);
				animalSprite.hungry();
				animal.harvest();
				user.addExp(AnimalConfig[animal.type].harvestExp);

				audioEngine.playEffect(res.ani_harvest_product_mp3, false);
				// Send to server
				testnetwork.connector.sendAnimalHarvest(lodge.id, animal.id);
			} else {
				that.lock = true;
				BaseGUILayer.instance.notifyFullStorage(StorageTypes.WAREHOUSE);
			}
		});
	},

	onMoveFeedTool: function(lx, ly, lodgeType) {
		if (this.lock) {
			return 0;
		}
		var flx = Math.floor(lx);
		var fly = Math.floor(ly);
		if (!user.map[flx] || user.map[flx][fly] !== MapItemEnum.LODGE) {
			return 0;
		}
		var lodge = user.asset.getLodgeByPosition(lx, ly);
		if (!lodge || lodge.type !== lodgeType) {
			return 0;
		}
		var that = this;
		var count = 0;
		var lodgeSprite = MapLayer.instance.getChildByTag(TagClusters.Lodge + lodge.id);
		lodgeSprite.getAnimalIdsAroundPoint(lx, ly) // ids
		.map(function(id) {
			return lodge.getAnimalById(id);
		})
		.filter(function(animal) {
			return !animal.feeded;
		})
		.forEach(function(animal) {
			// try to take item
			var product = animal.type === AnimalType.chicken
					? ProductTypes.FOOD_CHICKEN 
					: ProductTypes.FOOD_COW;
			if (user.asset.warehouse.takeItem(product, 1)) {
				var animalSprite = lodgeSprite.getChildByTag(TagClusters.Animal + animal.id);
				animal.feed();
				animalSprite.feed();
				animalSprite.setOnHarvestTime(animal.feededTime);
				count++;
				var productSprite = new ProductSprite(
					animal.type === AnimalType.chicken
					? res.iconFoodChicken
					: res.iconFoodCow, null);
				var p = MapValues.logicToPosition(lx, ly);
				productSprite.setPosition(p.x, p.y + 150);
				MapLayer.instance.addChild(productSprite);
				productSprite.setLocalZOrder(1000);
				productSprite.fadeOutProduct();
				audioEngine.playEffect(res.ani_feed_mp3, false);

				// Send to server
				testnetwork.connector.sendAnimalFeed(lodge.id, animal.id);
			} else {
				that.lock = true;
				BaseGUILayer.instance.showSuggestBuyMissionItem([new StorageItem(product, 1)]);
			}
		});
		return count;
	},

	calculateRubyByRemainTime: function(time) {
		return 1;
	},

	boost: function(lodgeId, animalId) {
		var lodge = user.asset.getLodgeById(lodgeId);
		var animal = lodge.getAnimalById(animalId);
		if (user.reduceRuby(this.calculateRubyByRemainTime())) {
			var lodgeSprite = MapLayer.instance.getChildByTag(TagClusters.Lodge + lodge.id);
			var animalSprite = lodgeSprite.getChildByTag(TagClusters.Animal + animal.id);
			animalSprite.harvest();
			animal.boost();

			// Send to server
			testnetwork.connector.sendAnimalBoost(lodgeId, animalId);
			// cc.log("Boost", lodgeId, animalId);
		} else {
			cc.log("Not enough ruby");
		}
	},
	
	unlock: function() {
		this.lock = false;
	}
});
