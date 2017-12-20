
var OrderBGLayer = BaseLayout.extend({

    orderList: [],
    lastIndexItemClick: null,   //

    ctor:function(){
        this._super(res.bgTruckOrder, "text_title_order_neighbor", true, true, true);

        this.lastIndexItemClick = LastPageUtil.instance.lastIndexOfOrderClick;
//
        this.initInfo();
    },

    initInfo: function() {
        this.refresh();

        this.orderList = [];
        var orderListModel = user.getAsset().getOrderList();
        for (var i = 0; i < orderListModel.length; i++){
            //var orderSprite = new OrderSprite(orderListModel[i].orderId);
            var orderSprite = new OrderSprite(this, orderListModel[i].orderId);

            this.orderList.push(orderSprite);
            this._bg.addChild(orderSprite);
            orderSprite.initOrderPrice(orderListModel[i]);
        }

        //
        this.setupOrderPaperPosition();
        this.initInfoDetail();
        //
        this.showButton();

        this.showOrderDetail();
    },
    setupOrderPaperPosition: function() {
        for (var i = 0; i < this.orderList.length; i++){
            this.orderList[i].setPosition(cc.p(this.orderList[i].width  * 3 / 4 + Math.abs(i % 3) * this.orderList[i].width,
                this.height - this.orderList[i].height * 1 / 3 - (Math.floor(i / 3) + 1) * this.orderList[i].height));

////            ////
//            var slo = new cc.Sprite(res.sloPaper);
//            slo.setPosition(this.orderList[i].x, this.orderList[i].y * 1.04);
//            this.bgBackground.addChild(slo);
        }
    },

    initInfoDetail: function(){
        this.orderInfo = new cc.Sprite(res.slot2);
        this.orderInfo.setPosition(cc.p(this.width * 3 / 4, this.height * 3 / 7));

        this._bg.addChild(this.orderInfo);
    },

    showOrderDetail: function () {
        if (this.lastIndexItemClick != null){
            this.orderList[this.lastIndexItemClick].showOrderInfo(this);
        }
    },


    //
    showButton: function() {
        this.btCancelOrder = new ccui.Button(res.btCancelOrder);
        this.btCancelOrder.setZoomScale(-0.2);
        this.btCancelOrder.setPosition(this.width * 3 / 5, this.height / 8);
        this._bg.addChild(this.btCancelOrder);
        this.btCancelOrder.addClickEventListener(this.cancelOrderEvent.bind(this));

        //
        this.btMakeOrder = new ccui.Button(res.btMakeOrder);
        this.btMakeOrder.setZoomScale(-0.2);
        this.btMakeOrder.setPosition(this.width * 9 / 10, this.height / 8);
        this._bg.addChild(this.btMakeOrder);
        this.btMakeOrder.addClickEventListener(this.makeOrderEvent.bind(this));
    },

    cancelOrderEvent: function () {
        //
        audioEngine.playEffect(res.func_click_button_mp3, false);
        if (this.lastIndexItemClick != null){
            this.stopAllRepeatAction();

            BaseGUILayer.instance.removeBlockListener();
            BaseGUILayer.instance.showNoticeSureCancelOrder(this.lastIndexItemClick);
        }
    },
    makeOrderEvent: function () {
        //
        if (this.lastIndexItemClick != null){
            this.stopAllRepeatAction();
            audioEngine.playEffect(res.func_click_button_mp3, false);

            OrderCtrl.instance.onMakeOrder(this.lastIndexItemClick);
        }
    },


    refresh: function () {
        this._bg.removeAllChildren();
    },

    repeatSuggestMakeOrder: function () {
        ///
        var move = new cc.ScaleTo(0.75, 1.2);
        var move_back = new cc.ScaleTo(0.5, 1);
        var move_seq = cc.sequence(move, move_back);
        this.btMakeOrder.runAction(move_seq.repeatForever());
    },

    stopAllRepeatAction: function () {
        this.btMakeOrder.stopAllActions();
        this.btMakeOrder.setScale(1);
    },

    setTouchEnabledButton: function (isEnable) {
        this.btMakeOrder.setTouchEnabled(isEnable);
        this.btCancelOrder.setTouchEnabled(isEnable);
        if (!isEnable){
            this.btMakeOrder.setColor(cc.color(128, 128, 128));
            this.btCancelOrder.setColor(cc.color(128, 128, 128));
        } else {
            this.btMakeOrder.setColor(cc.color(255, 255, 255));
            this.btCancelOrder.setColor(cc.color(255, 255, 255));
        }
    },


});