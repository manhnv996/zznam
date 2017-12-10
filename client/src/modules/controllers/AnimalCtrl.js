var AnimalCtrl = cc.Class.extend({
	onMoveHarvestTool: function(lx, ly) {
		var lodge = user.asset.getLodgeByPosition(lx, ly);
		if (!lodge) {
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
			if (user.asset.warehouse.addItem(animal.type === 'chicken' ? ProductTypes.GOOD_EGG : ProductTypes.GOOD_MILK, 1)) {
				var animalSprite = lodgeSprite.getChildByTag(TagClusters.Animal + animal.id);
				animalSprite.hungry();
				animal.harvest();
				// Add product to warehouse

				// Send to server
				testnetwork.connector.sendAnimalHarvest(lodge.id, animal.id);
			} else {
				cc.log("Full Warehouse");				
			}
		});
	},

	onMoveFeedTool: function(lx, ly) {
		var lodge = user.asset.getLodgeByPosition(lx, ly);
		if (!lodge) {
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
			var animalSprite = lodgeSprite.getChildByTag(TagClusters.Animal + animal.id);
			animal.feed();
			animalSprite.feed();
			animalSprite.setOnHarvestTime(animal.feededTime);
			// Substract products from warehouse
			
			///
			// Send to server
			testnetwork.connector.sendAnimalFeed(lodge.id, animal.id);
		});
	}
});
