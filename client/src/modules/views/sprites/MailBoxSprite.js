var MailBoxSprite = MapBlockSprite.extend({
	ctor: function(x, y) {
		this._super(res.MAIL_BOX, 
			MapConfigs.MailBox.blockSizeX, MapConfigs.MailBox.blockSizeY,
			x, y);
	}
});
