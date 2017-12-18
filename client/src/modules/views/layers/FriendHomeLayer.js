var FriendHomeLayer = cc.Layer.extend({
	ctor: function() {
		this._super();
		this.renderHomeButton();
		this.renderUserLabel();
	},

	renderHomeButton: function() {
		this.btnHome = new ccui.Button(res.HOME_BTN);
		var btnSize = this.btnHome.getSize();
		this.btnHome.setPosition(btnSize.width / 2, btnSize.height / 2);
		this.addChild(this.btnHome);

		this.btnHome.addClickEventListener(this.onBtnHomeClick.bind(this));
	},

	renderUserLabel: function() {
		this.userLabel = new cc.LabelBMFont(user.id, res.FONT_OUTLINE_30);
		this.userLabel.setPosition(cc.winSize.width / 2, cc.winSize.height - 30);
		this.addChild(this.userLabel);
	},

	onBtnHomeClick: function(sender) {
		FriendCtrl.instance.goHome();
	}
});
