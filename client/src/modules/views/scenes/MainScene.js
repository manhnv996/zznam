var MainScene = cc.Scene.extend({
	ctor: function() {
		this._super();
		MapLayer.instance = new MapLayer();
		this.addChild(MapLayer.instance);

		MapLayer.instance.addChild(new ODatSprite(10, 10));
		MapLayer.instance.addChild(new SiloSprite(20, 20));
		MapLayer.instance.addChild(new WareHouseSprite(18, 24));

		//var field = new FieldSprite(this, 0, 11, 11);
        //
		//MapLayer.instance.addChild(field);

	}
});
