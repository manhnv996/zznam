var FriendHomeLayer = cc.Layer.extend({
	ctor: function() {
		this._super();
		this.btnHome = new ccui.Button(res.HOME_BTN);
		var btnSize = this.btnHome.getSize();
		this.btnHome.setPosition(btnSize.width / 2, btnSize.height / 2);
		this.addChild(this.btnHome);

		this.btnHome.addClickEventListener(this.onBtnHomeClick.bind(this));
	},

	onBtnHomeClick: function(sender) {
		FriendCtrl.instance.goHome();
	}
});
