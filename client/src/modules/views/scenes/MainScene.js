var MainScene = cc.Scene.extend({
	ctor: function() {
		this._super();
		MapLayer.instance = new MapLayer();
		this.addChild(MapLayer.instance);

		// MapLayer.instance.addChild(new ODatSprite(10, 10));
		MapLayer.instance.addChild(new SiloSprite(20, 20));
		MapLayer.instance.addChild(new WareHouseSprite(18, 24));

        // //
        // var field1 = new FieldSprite(MapLayer.instance, 0, 18, 10);
        // var field2 = new FieldSprite(MapLayer.instance, 1, 18, 11);
        // MapLayer.instance.addChild(field1);
        // MapLayer.instance.addChild(field2);
        // MapLayer.instance.fieldList.push(field1);
        // MapLayer.instance.fieldList.push(field2);

	}
});
