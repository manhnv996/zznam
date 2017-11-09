var MainScene = cc.Scene.extend({
	ctor: function() {
		this._super();
		this.mapLayer = new MapLayer();
		this.addChild(this.mapLayer);
	}
});
