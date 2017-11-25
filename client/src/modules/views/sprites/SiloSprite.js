var SiloSprite = AnimationSprite.extend({
	ctor: function(x, y) {
		this._super(resAniId.SILO,
			MapConfigs.Silo.size.width,
			MapConfigs.Silo.size.height,
			x, y, MapItemEnum.SILO
		);
		this.play("idle");
		this.registerTouchEvents();
	},

	onBeginClick: function() {
		this.play("selected");
	},

	onClick: function() {
		cc.log("Silo clicked");
	},

	onFinishMove: function(lx, ly) {
		testnetwork.connector.sendMoveStorage(MapItemEnum.SILO, lx, ly);
	}
});
