var TruckOrderSprite = MapBlockSprite.extend({
	ctor: function(x, y) {
		this._super(res.TRUCK_ORDER_BG_PNG, 
			MapConfigs.TruckOrder.size.width,
			MapConfigs.TruckOrder.size.height, 
			x, y, MapItemEnum.TRUCK_ORDER
		);
		this.registerTouchEvents({ lockMove: true });

		//
	},

	initTruckOrder: function () {
		this.refresh();

		this.stickList = [];
		for (var i = 0; i < user.getAsset().getOrderList().length; i++){
			var icon = new ccui.ImageView(res.stickIcon);
			this.stickList.push(icon);

			this.addChild(icon);
		}

        this.initStickListPosition();
    },

	initStickListPosition: function () {
        for (var i = 0; i < this.stickList.length; i++){
            this.stickList[i].setPosition(cc.p(this.width * 0.2625 + this.stickList[i].width  * 3 / 4 + Math.abs(i % 3) * this.stickList[i].width,
                this.height * 0.775 - (Math.floor(i / 3) + 1) * this.stickList[i].height * 0.75 + Math.abs(i % 3) * this.stickList[i].height * 0.4));

////            ////
			var order = user.getAsset().getOrderById(user.getAsset().getOrderList()[i].orderId);
			if (order.checkStatus() == OrderStatusTypes.REALIZABLE){
				if (order.checkCondition() == true){

                    var check = new ccui.ImageView(res.checkIcon);
                    check.setPosition(this.stickList[i].width * 0.625, this.stickList[i].height / 2);
                    this.stickList[i].addChild(check);
				}
			} else {
				this.stickList[i].setOpacity(0);
			}
        }
    },

	refresh: function () {
		this.removeAllChildrenWithCleanup(true);
    },


	onClick: function() {
		cc.log("TruckOrder clicked", this.getLocalZOrder(), this.lx, this.ly, this.blockSizeX, this.blockSizeY);

		//
		OrderCtrl.instance.onShowOrderBG();
        TruckOrderSprite.instance.initTruckOrder();
		audioEngine.playEffect(res.func_click_button_mp3, false);
    },
	
	onBeginClick: function() {
		this.setColor(cc.color(200, 200, 200));
	},

	onEndClick: function() {
		this.setColor(cc.color(255, 255, 255));
	}
});
