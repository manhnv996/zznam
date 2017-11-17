var MainScene = cc.Scene.extend({
	ctor: function() {
		this._super();
		MapLayer.instance = new MapLayer();
		this.addChild(MapLayer.instance);

		PopupLayer.instance = new PopupLayer();
		this.addChild(PopupLayer.instance);
	},

	onEnter: function() {
		this._super();
		MapController.instance.init();
		this.init();
	},
	init: function() {

		////    TEST//
		////     var field = new Field();
		var foodStorage = new Storages(new Coordinate(10, 10), "foodStorage", 30);
		//var warehouse = new Storages(new Coordinate(15, 10), initt.warehouse.storageId, initt.warehouse.capacity);

		 //foodStorage.addItem(ProductTypes.CROP_CORN, 10);
		foodStorage.addItem(ProductTypes.CROP_CARROT, 10);
		foodStorage.addItem(ProductTypes.CROP_WHEAT, 10);
		foodStorage.addItem(ProductTypes.CROP_SOYBEAN, 5);
		foodStorage.addItem(ProductTypes.CROP_SUGARCANE, 5);



		var asset = new Asset(foodStorage, null, null, null, null, null, null);
		user = new User(asset);

		var currentdate = new Date();
		currentdate.setHours(3, 50, 40);
		for (var i = 0; i < 3; i++){
			var field = new Field(new Coordinate(18, 10 + i), i);
			// var field = new Field(18, 10 + i, i);
			asset.addField(field);
////
			var fieldSprite = new FieldSprite(MapLayer.instance, field.getFieldId(), field.getCoordinate().getCurrX(), field.getCoordinate().getCurrY());
			// var fieldSprite = new FieldSprite(MapLayer.instance, field.getFieldId(), field.getCurrX(), field.getCurrY());
			MapLayer.instance.addChild(fieldSprite);
			MapLayer.instance.fieldList.push(fieldSprite);
		}
		for (var i = 0; i < 3; i++){
			var field = new Field(new Coordinate(17, 10 + i), i);
			// var field = new Field(17, 10 + i, i);
			asset.addField(field);
////
			var fieldSprite = new FieldSprite(MapLayer.instance, field.getFieldId(), field.getCoordinate().getCurrX(), field.getCoordinate().getCurrY());
			// var fieldSprite = new FieldSprite(MapLayer.instance, field.getFieldId(), field.getCurrX(), field.getCurrY());
			MapLayer.instance.addChild(fieldSprite);
			MapLayer.instance.fieldList.push(fieldSprite);
		}
		cc.log(user.getAsset().getFieldList().length + "ddd");

		var fieldList = user.getAsset().getFieldList();
		for (var i = 0; i < fieldList.length; i++){
			cc.log("Field_" + fieldList[i].getFieldId() + ": " + fieldList[i].getCoordinate().getCurrX() + ", " + fieldList[i].getCoordinate().getCurrY());
			// cc.log("Field_" + fieldList[i].getFieldId() + ": " + fieldList[i].getCurrX() + ", " + fieldList[i].getCurrY());
		}
	}
});
