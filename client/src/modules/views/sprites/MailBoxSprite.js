var MailBoxSprite = MapBlockSprite.extend({
	ctor: function(x, y) {
		this._super(res.MAIL_BOX, 
			MapConfigs.MailBox.blockSizeX, MapConfigs.MailBox.blockSizeY,
			x, y, MapItemEnum.MAIL_BOX);
		this.registerTouchEvents();
	},

	onClick: function() {
		cc.log("Mailbox clicked");
	}
});
