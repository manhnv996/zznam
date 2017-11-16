var MainScene = cc.Scene.extend({
	ctor: function() {
		this._super();
		MapLayer.instance = new MapLayer();
		this.addChild(MapLayer.instance);
	},

	onEnter: function() {
		this._super();
		MapController.instance.init();
	}
});
