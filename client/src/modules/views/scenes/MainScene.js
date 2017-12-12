var MainScene = cc.Scene.extend({
	ctor: function() {
		this._super();

		// Init controllers
		PlantCtrl.instance = new PlantCtrl();
		GameShopController.instance = new GameShopController();
		StorageCtrl.instance = new StorageCtrl();
		ConstructedCtrl.instance = new ConstructedCtrl();

		// Init layers
		MapLayer.instance = new MapLayer();
		this.addChild(MapLayer.instance);

        PopupLayer.instance = new PopupLayer();
        this.addChild(PopupLayer.instance);

		TablePopupLayer.instance = new TablePopupLayer();
		this.addChild(TablePopupLayer.instance);

		//var mainGuiLayer = new MainGuiLayer();
		//this.addChild(mainGuiLayer);
		//MainGuiLayer.instance = new MainGuiLayer();
		//this.addChild(MainGuiLayer.instance);

		MapCtrl.instance = new MapCtrl();

        OrderCtrl.instance = new OrderCtrl();

		cc.log("Start Scene");
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

        //BaseGUILayer.instance.notifyFullStorage(StorageTypes.FOOD_STORAGE);
		//BaseGUILayer.instance.notifyMissGold(50);

		//BaseGUILayer.instance.notifyFullStorage(StorageTypes.FOOD_STORAGE);
		//BaseGUILayer.instance.notifyMissGold(50);
		//cc.log(res.infoCoopItem[0]["id"]);

		//BaseGUILayer.instance.loadingBar();

        //var model = new Machine(0, "bakery_machine", 3, 0, null, false, new Date().getTime(), new Coordinate(20, 20));
        //user.asset.addMachine(model);
        ////cc.log("model " + model.coordinate.x + " " + model.coordinate.y + " id " + model.id + " slot " + model.slot);
        ////var machine = user.asset.getMachineById(model.id);
        ////cc.log("machine " + machine.coordinate.x + " " + machine.coordinate.y + " id " + machine.id + " slot " + machine.slot);
        //var bakery = new BakerySprite(0, 20, 20);
        //MapLayer.instance.addChild(bakery);
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
