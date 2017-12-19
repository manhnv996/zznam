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

	onClick: function() {
		this.play("selected");
		SoundCtrl.instance.playSoundEffect(res.tools_silo_mp3, false);
		BaseGUILayer.instance.showStorage(user.getAsset().getFoodStorage());
		// cc.log("Silo", this.getLocalZOrder(), this.lx, this.ly, this.blockSizeX, this.blockSizeY);
	},

	onFinishMove: function(lx, ly) {
		user.asset.foodStorage.coordinate.x = lx;
		user.asset.foodStorage.coordinate.y = ly;
		testnetwork.connector.sendMoveMapBlock(MapItemEnum.SILO, 0, lx, ly);
	}
});
