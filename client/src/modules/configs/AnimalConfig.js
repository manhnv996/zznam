var AnimalConfig = (function() {
	var data = cc.loader.getRes('res/config/animalConfig.json');
	var result = {};
	data.forEach(function(item) {
		result[item.id] = item;
	});
	return result;
})();

// cc.log('AnimalConfig', AnimalConfig);
