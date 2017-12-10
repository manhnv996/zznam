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
			var animalSprite = lodgeSprite.getChildByTag(TagClusters.Animal + animal.id);
			animalSprite.hungry();
			animal.harvest();
			// Send to server

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
			// Send to server
			
		});
	}
});
