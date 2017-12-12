/**
 * Created by CPU60133_LOCAL on 11/30/2017.
 */

var OrderSprite = cc.Sprite.extend({

    orderId: 0,
    order: null,

    ctor: function (parent, orderId) {
        this._super(res.orderPaper);

        //
        this.orderId = orderId;
        this.order = user.getAsset().getOrderById(this.orderId);

        this.initEventListener(parent);
    },


    initOrderPrice: function() {

        if (this.order.checkStatus() == OrderStatusTypes.WAITTING){
            this.initWaittingTime();
            //
            this.setOpacity(0);
            return;
        }

        //
        this.setOpacity(255);
        //
        var slo = new cc.Sprite(res.sloPaper);
        slo.setPosition(this.width / 2, this.height * 3 / 5);
        this.addChild(slo);


        var price = new cc.LabelBMFont(this.order.orderPrice, res.FONT_OUTLINE_20);
        price.setPosition(this.width  * 2 / 5, this.height * 3.5 / 5);
        //var gold = new cc.Sprite(res.goldOrder);
        var gold = new ccui.ImageView(res.goldOrder);
        // gold.setPosition(this.width  * 3.5 / 5, this.height * 3.5 / 5);
        gold.setPosition(price.width + gold.width / 2, price.height / 2);
        gold.setScale(0.5);

        this.addChild(price);
        price.addChild(gold);

        //
        var exp = new cc.LabelBMFont(this.order.orderExp, res.FONT_OUTLINE_20);
        exp.setPosition(this.width  * 2 / 5, this.height * 2.5 / 5);
        //var star = new cc.Sprite(res.expOrder);
        var star = new ccui.ImageView(res.expOrder);
        // star.setPosition(this.width  * 3.5 / 5 / 2.5, this.height * 3.5 / 5 / 2.5);
        star.setPosition(exp.width + star.width / 5, exp.height / 2);
        star.setScale(0.25);

        this.addChild(exp);
        exp.addChild(star);

//
        if (this.order != null){
            if (this.order.checkCondition() == true){
                //var tickSprite = new cc.Sprite(res.tickOrder);
                var tickSprite = new ccui.ImageView(res.tickOrder);
                tickSprite.setPosition(cc.p(this.width * 3 / 4, this.height / 4));
                this.addChild(tickSprite);
            }
        }
    },

    initWaittingTime: function () {
        //var slo = new cc.Sprite(res.sloPaper);
        var slo = new ccui.ImageView(res.sloPaper);
        slo.setPosition(this.width / 2, this.height * 3 / 5);
        this.addChild(slo);

    },

    //
    initEventListener: function (parent) {
        this.clickListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                //var target = this;
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    // cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);

                    return true;
                }
                return false;
            }.bind(this),
            onTouchMoved: function (touch, event) {

            }.bind(this),

            onTouchEnded: function (touch, event) {

                var target = event.getCurrentTarget();

                //
                if (LastPageUtil.instance.lastIndexOfOrderClick != null){
                    parent.orderList[LastPageUtil.instance.lastIndexOfOrderClick].unschedule(this.updateWaittingTime);
                    //
                    parent.stopAllRepeatAction();
                }
                target.showOrderInfo(parent);
                //

///                //////////////////////
                LastPageUtil.instance.lastIndexOfOrderClick = this.orderId;
                parent.lastIndexItemClick = this.orderId;
                //

            }.bind(this)
        });
        cc.eventManager.addListener(this.clickListener, this);
    },

    //
    showOrderInfo: function (parent) {
        this.disableInfo(parent);

        //
        this.actionSelected();
        ////////
        //
        if (this.order.checkStatus() == OrderStatusTypes.WAITTING){
            this.showWaittingTimeInfo(parent);
//        ////////////
            parent.setTouchEnabledButton(false);
            return;
        }

//        ////////////
        parent.setTouchEnabledButton(true);
        //
        this.showPriceInfo(parent);
        //
        this.itemList = [];
        this.itemListModel = this.order.itemList;

        for (var i = 0; i < this.itemListModel.length; i++){
            // var productSprite = new ProductSprite(getProductIconById(this.itemListModel[i].typeItem));
            var productSprite = new ProductSprite(getProductIconById(this.itemListModel[i].typeItem), this.itemListModel[i].typeItem);
            parent.orderInfo.addChild(productSprite);

            this.itemList.push(productSprite);

            productSprite.showQuantityCurr(user.getAsset().getQuantityOfTwoStorageByProductId(this.itemListModel[i].typeItem), this.itemListModel[i].quantity)
        }

        this.setupItemListPosition(parent);


//        //
        if (CarSprite.instance.isStatus != DeliveryStatus.EMPTY) {
            parent.btMakeOrder.setTouchEnabled(false);
            parent.btMakeOrder.setColor(cc.color(128, 128, 128));

            return;
        }

        //
        if (this.order.checkCondition() == true){
            parent.repeatSuggestMakeOrder();    //scale button makeOrder
        }
    },
    setupItemListPosition: function(parent) {
        //var icon = new cc.Sprite(res.iconGoodMilk); //template
        var icon = new ccui.ImageView(res.iconGoodMilk); //template

        for (var i = 0; i < this.itemList.length; i++){
            // this.itemList[i].setPosition(cc.p(this.itemList[i].width  * 3 / 4 + Math.abs(i % 3) * this.itemList[i].width,
            //     parent.orderInfo.height + this.itemList[i].height * 1 / 3 - (Math.floor(i / 3) + 1) * this.itemList[i].height * 4 / 5));
            this.itemList[i].setPosition(cc.p(icon.width  * 3 / 4 + Math.abs(i % 3) * icon.width,
                parent.orderInfo.height + icon.height * 1 / 3 - (Math.floor(i / 3) + 1) * icon.height * 4 / 5));

            this.itemList[i].setScale(0.6);
        }
    },

    showPriceInfo: function (parent) {
        var price = new cc.LabelBMFont(this.order.orderPrice, res.FONT_OUTLINE_30);
        price.setPosition(parent.orderInfo.width  * 1 / 5, parent.orderInfo.height * 1.05);
        //var gold = new cc.Sprite(res.goldOrder);
        var gold = new ccui.ImageView(res.goldOrder);
        // gold.setPosition(this.width  * 3.5 / 5, this.height * 3.5 / 5);
        gold.setPosition(price.width + gold.width / 2, price.height / 2);
        gold.setScale(0.5);

        parent.orderInfo.addChild(price);
        price.addChild(gold);

        //
        var exp = new cc.LabelBMFont(this.order.orderExp, res.FONT_OUTLINE_30);
        exp.setPosition(parent.orderInfo.width  * 2.5 / 5, parent.orderInfo.height * 1.05);
        //var star = new cc.Sprite(res.expOrder);
        var star = new ccui.ImageView(res.expOrder);
        // star.setPosition(this.width  * 3.5 / 5 / 2.5, this.height * 3.5 / 5 / 2.5);
        star.setPosition(exp.width + star.width / 5, exp.height / 2);
        star.setScale(0.25);

        parent.orderInfo.addChild(exp);
        exp.addChild(star);
    },


    showWaittingTimeInfo: function (parent) {
        this.showWaittingTimeRemain(parent);
        //
        this.updateWaittingTime();
        this.schedule(this.updateWaittingTime, 0.5);
        ////


        // var notice = new cc.LabelBMFont("Đợi hết thời gian chờ hoặc tăng tốc bằng ruby,\nĐơn hàng tiếp theo sẽ đến nha bạn", res.FONT_OUTLINE_20);
        var notice = new cc.LabelBMFont(fr.Localization.text("text_wait_order_come_back"), res.FONT_OUTLINE_20);
        notice.setPosition(parent.orderInfo.width / 2, parent.orderInfo.height * 0.75);
        notice.setBoundingWidth(parent.orderInfo.width * 0.9);

        parent.orderInfo.addChild(notice);


        // button boost
        var btBoost = new ccui.Button(res.btBoost);
        btBoost.setPosition(cc.p(parent.orderInfo.width * 0.1625, parent.orderInfo.height * 0.5));
        btBoost.setScale(0.625);
        btBoost.setZoomScale(0.625);

        //var rubi = new cc.Sprite(res.rubi);
        var rubi = new ccui.ImageView(res.rubi);
        rubi.setPosition(cc.p(btBoost.width * 4 / 5, btBoost.height / 2));
        btBoost.addChild(rubi);


        var rubi_buy_seed = new cc.LabelBMFont("3", res.FONT_OUTLINE_30);
        rubi_buy_seed.setPosition(cc.p(btBoost.width / 2, btBoost.height / 2));
        btBoost.addChild(rubi_buy_seed);
        //
        parent.orderInfo.addChild(btBoost);
        //
        btBoost.addClickEventListener(function () {
            btBoost.runAction(new cc.ScaleTo(0.1, 0.625));

            OrderCtrl.instance.onBoostWait(LastPageUtil.instance.lastIndexOfOrderClick);
        }.bind(this));


    },

    disableInfo: function(parent) {
        this.unschedule(this.updateWaittingTime);

        parent.orderInfo.removeAllChildrenWithCleanup(true);
    },



///////
    updateWaittingTime: function () {

        if (this.order == null) {
            this.unschedule(this.updateWaittingTime);
            return;
        }
        if (this.order.itemList == []){
            this.unschedule(this.updateWaittingTime);
            return;
        }

        var parseWaittingTime = this.order.waittingTime.getTime();
        var parseFinishTime = this.order.getFinishWaittingTime().getTime();
        var currTime = new Date().getTime();

        var duration = parseFinishTime - parseWaittingTime;
        var curr = currTime - parseWaittingTime;

        if (curr > duration){
            /*
             */
            this.unschedule(this.updateWaittingTime);
            return false;
        }

        //
        var remain = new Date();
        remain.setTime(duration - curr);
        var timeRemainShow = "";
        if (duration - curr > 60 * 60 * 1000){
            timeRemainShow = remain.getHours() + ": " + remain.getMinutes() + ": " + remain.getSeconds();
        } else {
            timeRemainShow = remain.getMinutes() + ": " + remain.getSeconds();
        }
        this.timeRemain.setString(timeRemainShow);
    },

    showWaittingTimeRemain: function (parent) {
        //
        this.timeRemain = new cc.LabelBMFont("", res.FONT_OUTLINE_30);
        //this.timeRemain.setPosition(cc.p(this.progressBar.width / 2, this.progressBar.height));
        this.timeRemain.setPosition(parent.orderInfo.width / 2, parent.orderInfo.height * 1.05);
        parent.orderInfo.addChild(this.timeRemain);

    },

    actionSelected: function () {
        //
        var action1 = new cc.ScaleTo(0.35, 1.25);
        var action2 = new cc.ScaleTo(0.25, 1);
        this.runAction(cc.sequence(action1, cc.delayTime(0.01), action2));
    }
});

