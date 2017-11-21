var MailBoxSprite = MapBlockSprite.extend({
	ctor: function(x, y) {
		this._super(res.MAIL_BOX, 
			MapConfigs.MailBox.blockSizeX, MapConfigs.MailBox.blockSizeY,
			x, y, MapItemEnum.MAIL_BOX);
		this.registerTouchEvents();
	},

	onClick: function() {
		this.move(this.lx + 1, this.ly - 1);
		for (var i = 0; i < user.map.length; i++) {
            var str = '';
            for (var j = 0; j < user.map[i].length; j++) {
                if (user.map[i][j].type === 0) {
                    str += '0';
                } else {
                    str += "*";
                }
            }
            cc.log(str);
        }
	}
});
