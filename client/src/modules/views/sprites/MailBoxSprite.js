var MailBoxSprite = MapBlockSprite.extend({
	ctor: function(x, y) {
		this._super(res.MAIL_BOX, 
			MapConfigs.MailBox.size.width,
			MapConfigs.MailBox.size.height,
			x, y, MapItemEnum.MAIL_BOX
		);
		this.registerTouchEvents({ lockMove: true, force: true });
	},

	onClick: function() {
	},
	
	onBeginClick: function() {
		// this.setOpacity(210);
		this.setColor(cc.color(200, 200, 200));
	},

	onEndClick: function() {
		// this.setOpacity(255);
		this.setColor(cc.color(255, 255, 255));
	}
});
