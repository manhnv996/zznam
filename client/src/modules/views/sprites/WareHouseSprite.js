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

	onBeginClick: function() {
		this.play("selected");
	},

	onClick: function() {
		// cc.log("Warehouse", this.getLocalZOrder(), this.lx, this.ly, this.blockSizeX, this.blockSizeY);
		//StorageLayer.instance.initStorage(user.getAsset().getWarehouse());
		BaseGUILayer.instance.showStorage(user.getAsset().getWarehouse());
	},

	onFinishMove: function(lx, ly) {
		user.asset.warehouse.coordinate.x = lx;
		user.asset.warehouse.coordinate.y = ly;
		cc.log(user.asset.warehouse);
		testnetwork.connector.sendMoveMapBlock(MapItemEnum.WAREHOUSE, 0, lx, ly);
	}
});
