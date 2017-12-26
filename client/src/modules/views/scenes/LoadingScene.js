var LoadingScene = BaseScene.extend({
	ctor: function() {
		this._super();
		var layer = new cc.Layer();
		this.addChild(layer);
        var size = cc.director.getVisibleSize();

		var sprite = new cc.Sprite(res.PRELOADER_CHRISTMAS_PNG);
		sprite.setScale(size.width / sprite.width, size.height / sprite.height);
		
		layer.addChild(sprite);
		sprite.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
		// lbLoginStatus.setString("");
		this.lbStatus = new cc.LabelBMFont("", res.FONT_OUTLINE_50);
		this.lbStatus.setPosition(cc.winSize.width / 2, 40);
		layer.addChild(this.lbStatus);
	},

	setText: function(text) {
		this.lbStatus.setString(text);
	},

	disconnected: function() {
        this.setText(fr.Localization.text("text_disconnect"));
	}
});
