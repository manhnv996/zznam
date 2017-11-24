var MailBoxSprite = MapBlockSprite.extend({
	ctor: function(x, y) {
		this._super(res.MAIL_BOX, 
			MapConfigs.MailBox.size.width,
			MapConfigs.MailBox.size.height,
			x, y, MapItemEnum.MAIL_BOX
		);
		this.registerTouchEvents();
	},

	onClick: function() {
		cc.log("Mailbox clicked");
	}
});
