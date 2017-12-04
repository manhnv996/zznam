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
		StorageLayer.instance.initStorage(user.getAsset().getFoodStorage());
		// cc.log("Silo", this.getLocalZOrder(), this.lx, this.ly, this.blockSizeX, this.blockSizeY);
	},

	onFinishMove: function(lx, ly) {
		user.asset.foodStorage.coordinate.x = lx;
		user.asset.foodStorage.coordinate.y = ly;
		testnetwork.connector.sendMoveMapBlock(MapItemEnum.SILO, 0, lx, ly);
	}
});
