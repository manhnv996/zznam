
//var OrderBGLayer = cc.Layer.extend({
//
//    orderList: [],
//
//    lastIndexItemClick: null,   //not yet started
//
//    ctor:function(){
//        this._super();
//
//    },
var OrderBGLayer = BaseLayout.extend({

    orderList: [],

    lastIndexItemClick: null,   //not yet started

    ctor:function(){
        //this._super();
        this._super(res.bgTruckOrder, "text_title_order_neighbor", true, true, false);

        //this._title.setFntFile(res.FONT_OUTLINE_30);
        //this._title.x = this.width / 2;
        //this._title.y = this.height / 8 * 7;

//
//        this.bgBackground = new cc.Sprite(res.bgTruckOrder);
        this.initOrderList();
        this.setupOrderPaperPosition();
        this.initOrderInfo();

        this.showButton();
    },

    showBG: function () {
        if (MainGuiLayer.instance.isShowPopup == false){
            //
            //
            this.bgBackground = new cc.Sprite(res.bgTruckOrder);
            this.initOrderList();
            this.setupOrderPaperPosition();
            this.initOrderInfo();

            this.showButton();
            //
            //
            CommonPopup.instance  = new CommonPopup("BẢNG ĐƠN HÀNG", this.bgBackground, true);
            MainGuiLayer.instance.addChild(CommonPopup.instance);
            //MainGuiLayer.instance.addChild(new OrderBGLayer("BẢNG ĐƠN HÀNG", this.bgBackground, true));
            MainGuiLayer.instance.isShowPopup = true;
        }
    },

    initOrderList: function() {
        this.orderList = [];
        var orderListModel = user.getAsset().getOrderList();
        for (var i = 0; i < orderListModel.length; i++){
            //var orderSprite = new OrderSprite(orderListModel[i].orderId);
            var orderSprite = new OrderSprite(this, orderListModel[i].orderId);

            this.orderList.push(orderSprite);
            //this.bgBackground.addChild(orderSprite);
            this.addChild(orderSprite);
            orderSprite.initOrderPrice(orderListModel[i]);
        }

    },
    setupOrderPaperPosition: function() {
        for (var i = 0; i < this.orderList.length; i++){
            this.orderList[i].setPosition(cc.p(this.orderList[i].width  * 3 / 4 + Math.abs(i % 3) * this.orderList[i].width,
                this.height - this.orderList[i].height * 1 / 3 - (Math.floor(i / 3) + 1) * this.orderList[i].height));
                //this.bgBackground.height - this.orderList[i].height * 1 / 3 - (Math.floor(i / 3) + 1) * this.orderList[i].height));


////            ////
//            var slo = new cc.Sprite(res.sloPaper);
//            slo.setPosition(this.orderList[i].x, this.orderList[i].y * 1.04);
//            this.bgBackground.addChild(slo);

        }
    },

    initOrderInfo: function(){
        this.orderInfo = new cc.Sprite(res.slot2);
        //this.orderInfo.setPosition(cc.p(this.bgBackground.width * 3 / 4, this.bgBackground.height * 3 / 7));
        this.orderInfo.setPosition(cc.p(this.width * 3 / 4, this.height * 3 / 7));

        //this.bgBackground.addChild(this.orderInfo);
        this.addChild(this.orderInfo);
    },


    //
    showButton: function() {
        var btCancelOrder = new ccui.Button(res.btCancelOrder);
        //btCancelOrder.setPosition(this.bgBackground.width * 3 / 5, this.bgBackground.height / 8);
        btCancelOrder.setPosition(this.width * 3 / 5, this.height / 8);
        //this.bgBackground.addChild(btCancelOrder);
        this.addChild(btCancelOrder);
        btCancelOrder.addClickEventListener(this.cancelOrderEvent.bind(this));

        //
        var btMakeOrder = new ccui.Button(res.btMakeOrder);
        //btMakeOrder.setPosition(this.bgBackground.width * 9 / 10, this.bgBackground.height / 8);
        btMakeOrder.setPosition(this.width * 9 / 10, this.height / 8);
        //this.bgBackground.addChild(btMakeOrder);
        this.addChild(btMakeOrder);
        btMakeOrder.addClickEventListener(this.makeOrderEvent.bind(this));
    },

    cancelOrderEvent: function () {
        //
        if (this.lastIndexItemClick != null){
            OrderCtrl.instance.onCancelOrder(this.lastIndexItemClick);

        }
    },
    makeOrderEvent: function () {
        //
        if (this.lastIndexItemClick != null){
            OrderCtrl.instance.onMakeOrder(this.lastIndexItemClick);

        }
    },


    /////
    //updateWaittingTimeOrderList: function () {
    //    //
    //    for (var i = 0; i < this.orderList.length; i++){
    //        this.orderList[i].updateWaittingTime();
    //    }
    //}

});