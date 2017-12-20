var LoadingScene = cc.Scene.extend({
	onEnter: function() {
		this._super();

		var layer = new cc.Layer();
		this.addChild(layer);
        var size = cc.director.getVisibleSize();

		var sprite = new cc.Sprite(res.PRELOADER_CHRISTMAS_PNG);
		sprite.setScale(size.width / sprite.width, size.height / sprite.height);
		
		layer.addChild(sprite);
		sprite.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
	}
});
