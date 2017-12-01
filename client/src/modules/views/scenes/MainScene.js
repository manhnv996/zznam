var MainScene = cc.Scene.extend({
	ctor: function() {
		this._super();

		// Init controllers
		PlantCtrl.instance = new PlantCtrl();
		GameShopController.instance = new GameShopController();
		StorageCtrl.instance = new StorageCtrl();

		// Init layers
		MapLayer.instance = new MapLayer();
		this.addChild(MapLayer.instance);

        PopupLayer.instance = new PopupLayer();
        this.addChild(PopupLayer.instance);

		//var mainGuiLayer = new MainGuiLayer();
		//this.addChild(mainGuiLayer);
		//MainGuiLayer.instance = new MainGuiLayer();
		//this.addChild(MainGuiLayer.instance);

		MapCtrl.instance = new MapCtrl();
		
		cc.log("Start Scene");
		this.schedule(this.updateOrderWaittingTime, 1);
	},

	onEnter: function() {
		this._super();
		this.init();
	},

	onGettedData: function() {

		MainGuiLayer.instance = new MainGuiLayer();
		this.addChild(MainGuiLayer.instance);

		BaseGUILayer.instance = new BaseGUILayer();
		this.addChild(BaseGUILayer.instance);

		MapCtrl.instance.init();
		MapCtrl.instance._showDebugMap();

		//NotifyLayer.instance.notifyFullSilo();

		OrderBGLayer.instance = new OrderBGLayer();
		// this.addChild(OrderBGLayer.instance);

		//BaseGUILayer.instance.notifyMissGold(50);
	},

	//
	updateOrderWaittingTime: function () {
		var list = user.getAsset().getWaittingOrderList();
		cc.log("updateOrderWaittingTime");
		for (var i = 0; i < list.length; i++){

			var parseCurrTime = new Date().getTime();
			var finishWaittingTime = list[i].getFinishWaittingTime();
			if (finishWaittingTime != null){
				if (parseCurrTime > finishWaittingTime.getTime()){

					testnetwork.connector.sendCreateNewOrder(list[i].orderId);
					cc.log("SUCCESSSSS")
				}
			}
			cc.log("update order " + i);
		}

		//BaseGUILayer.instance.notifyFullStorage(StorageTypes.FOOD_STORAGE);

	},

	init: function() {

		//gv.gameClient.connect();
		//testnetwork.connector.sendLoginRequest();

		//gv.username = "fresher001";
		//gv.password = "fresher";
        //
        //
		//gv.gameClient.connect();


//		////    TEST//
//		////     var field = new Field();
//		var foodStorage = new Storages(new Coordinate(10, 10), "foodStorage", 30);
//		//var warehouse = new Storages(new Coordinate(15, 10), initt.warehouse.storageId, initt.warehouse.capacity);
//
//		// foodStorage.addItem(ProductTypes.CROP_CORN, 10);
//		foodStorage.addItem(ProductTypes.CROP_CARROT, 5);
//		//foodStorage.addItem(ProductTypes.CROP_WHEAT, 10);
//		foodStorage.addItem(ProductTypes.CROP_SOYBEAN, 10);
//		// foodStorage.addItem(ProductTypes.CROP_SUGARCANE, 5);
//
//
//
//		var asset = new Asset(foodStorage, null, null, null, null, null, null);
//		user = new User(asset);
//
//		var currentdate = new Date();
//		currentdate.setHours(3, 50, 40);
//		for (var i = 0; i < 3; i++){
//			var field = new Field(new Coordinate(18, 10 + i), i);
//			// var field = new Field(18, 10 + i, i);
//			asset.addField(field);
//////
//			var fieldSprite = new FieldSprite(MapLayer.instance, field.getFieldId(), field.getCoordinate().getCurrX(), field.getCoordinate().getCurrY());
//			// var fieldSprite = new FieldSprite(MapLayer.instance, field.getFieldId(), field.getCurrX(), field.getCurrY());
//			MapLayer.instance.addChild(fieldSprite);
//			MapLayer.instance.fieldList.push(fieldSprite);
//		}
//		for (var i = 0; i < 3; i++){
//			var field = new Field(new Coordinate(17, 10 + i), i);
//			// var field = new Field(17, 10 + i, i);
//			asset.addField(field);
//////
//			var fieldSprite = new FieldSprite(MapLayer.instance, field.getFieldId(), field.getCoordinate().getCurrX(), field.getCoordinate().getCurrY());
//			// var fieldSprite = new FieldSprite(MapLayer.instance, field.getFieldId(), field.getCurrX(), field.getCurrY());
//			MapLayer.instance.addChild(fieldSprite);
//			MapLayer.instance.fieldList.push(fieldSprite);
//		}
//		cc.log(user.getAsset().getFieldList().length + "ddd");
//
//		var fieldList = user.getAsset().getFieldList();
//		for (var i = 0; i < fieldList.length; i++){
//			cc.log("Field_" + fieldList[i].getFieldId() + ": " + fieldList[i].getCoordinate().getCurrX() + ", " + fieldList[i].getCoordinate().getCurrY());
//			// cc.log("Field_" + fieldList[i].getFieldId() + ": " + fieldList[i].getCurrX() + ", " + fieldList[i].getCurrY());
//		}
	}
});
