var MainScene = cc.Scene.extend({
	ctor: function() {
		this._super();

		// Init controllers
		PlantCtrl.instance = new PlantCtrl();
		GameShopController.instance = new GameShopController();
		StorageCtrl.instance = new StorageCtrl();
		ConstructedCtrl.instance = new ConstructedCtrl();
		AnimalCtrl.instance = new AnimalCtrl();
		NatureCtrl.instance = new NatureCtrl();
		SoundCtrl.instance = new SoundCtrl();
		FriendCtrl.instance = new FriendCtrl();
		
		// Init layers
		MapLayer.instance = new MapLayer();
		this.addChild(MapLayer.instance);

        PopupLayer.instance = new PopupLayer();
        this.addChild(PopupLayer.instance);

		TablePopupLayer.instance = new TablePopupLayer();
		this.addChild(TablePopupLayer.instance);

		AnimateEventLayer.instance = new AnimateEventLayer();
		this.addChild(AnimateEventLayer.instance);

		//var mainGuiLayer = new MainG+uiLayer();
		//this.addChild(mainGuiLayer);
		//MainGuiLayer.instance = new MainGuiLayer();
		//this.addChild(MainGuiLayer.instance);

		MapCtrl.instance = new MapCtrl();

        OrderCtrl.instance = new OrderCtrl();

        // Add ScheduleLoop
        // ScheduleLoop.instance = new ScheduleLoop();
        this.addChild(ScheduleLoop.instance); // Instance created in ScheduleLoop.js
		cc.log("Start Scene");
	},

	onEnter: function() {
		this._super();
		this.init();
	},

	onGettedData: function() {
		cc.log("Welcome", user.id, user.name);
		MainGuiLayer.instance = new MainGuiLayer();
		this.addChild(MainGuiLayer.instance);

		BaseGUILayer.instance = new BaseGUILayer();
		this.addChild(BaseGUILayer.instance);

		MapCtrl.instance.init();
		MapCtrl.instance._showDebugMap();

		OrderBGLayer.instance = new OrderBGLayer();


		if (user.asset.countAnimalByType(AnimalType.chicken) > 0) {
			this.schedule(this.scheduleSoundChickenIdle01, 29);
			this.schedule(this.scheduleSoundChickenIdle02, 11);
		}
		if (user.asset.countAnimalByType(AnimalType.cow) > 0) {
			cc.audioEngine.playEffect(res.ani_cow_idle_mp3, false);
			this.schedule(this.scheduleSoundCowIdle, 15);
		}
		// this.addChild(OrderBGLayer.instance);
		if (!home) {
			FriendHomeLayer.instance = new FriendHomeLayer();
			this.addChild(FriendHomeLayer.instance);
		}

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

	scheduleSoundChickenIdle01: function () {
		cc.audioEngine.playEffect(res.ani_chicken_idle01_mp3, false);
	},

	scheduleSoundChickenIdle02: function () {
		cc.audioEngine.playEffect(res.ani_chicken_idle02_mp3, false);
	},

	scheduleSoundCowIdle: function () {
		cc.audioEngine.playEffect(res.ani_cow_idle_mp3, false);
	}
});
