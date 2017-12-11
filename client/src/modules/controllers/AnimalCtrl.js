var AnimalCtrl = cc.Class.extend({
	onMoveHarvestTool: function(lx, ly, lodgeType) {
		var lodge = user.asset.getLodgeByPosition(lx, ly);
		if (!lodge || lodge.type !== lodgeType) {
			// Stop check
			return;
		}
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
				// Send to server
				testnetwork.connector.sendAnimalHarvest(lodge.id, animal.id);
			} else {
				cc.log("Full Warehouse");
			}
		});
	},

	onMoveFeedTool: function(lx, ly, lodgeType) {
		var lodge = user.asset.getLodgeByPosition(lx, ly);
		if (!lodge || lodge.type !== lodgeType) {
			return;
		}
		var lodgeSprite = MapLayer.instance.getChildByTag(TagClusters.Lodge + lodge.id);
		lodgeSprite.getAnimalIdsAroundPoint(lx, ly)
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
				// Send to server
				testnetwork.connector.sendAnimalFeed(lodge.id, animal.id);
			} else {
				cc.log("Not enough item");				
			}
		});
	}
});
