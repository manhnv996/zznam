var WareHouseSprite = AnimationSprite.extend({
	ctor: function(x, y) {
		this._super(resAniId.Barn,
			MapConfigs.Warehouse.size.width, 
			MapConfigs.Warehouse.size.height, 
			x, y, MapItemEnum.WAREHOUSE
		);
		this.play("idle");
		this.registerTouchEvents();
	},

	onClick: function() {
		this.play("selected");
		cc.audioEngine.playEffect(res.tools_barn_mp3, false);
		BaseGUILayer.instance.showStorage(user.getAsset().getWarehouse());
	},

	onFinishMove: function(lx, ly) {
		user.asset.warehouse.coordinate.x = lx;
		user.asset.warehouse.coordinate.y = ly;
		// cc.log(user.asset.warehouse);
		testnetwork.connector.sendMoveMapBlock(MapItemEnum.WAREHOUSE, 0, lx, ly);
	}
});
