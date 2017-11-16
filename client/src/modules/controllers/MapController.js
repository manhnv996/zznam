var MapController = cc.Class.extend({
	map: [], // [{ type: MapItemEnum, [anotherKey]: [anotherValue] }]

	init: function() {
		MapLayer.instance.addChild(new ODatSprite(10, 10));
		MapLayer.instance.addChild(new SiloSprite(20, 20));
		MapLayer.instance.addChild(new WareHouseSprite(18, 24));
	}
});

MapController.instance = new MapController();
