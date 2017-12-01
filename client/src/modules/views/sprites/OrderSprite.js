/**
 * Created by CPU60133_LOCAL on 11/30/2017.
 */

var OrderSprite = cc.Sprite.extend({

    orderId: 0,
    order: null,

    ctor: function (orderId) {
        this._super(res.orderPaper);

        //
        this.orderId = orderId;
        this.order = user.getAsset().getOrderById(this.orderId);

        this.initEventListener();
    },


    initOrderPrice: function() {

        if (this.order.checkStatus() == OrderStatusTypes.WAITTING){
             this.initWaittingTime();
            //this.setVisible(false);
            return;
        }

         //
         var slo = new cc.Sprite(res.sloPaper);
         slo.setPosition(this.width / 2, this.height * 3 / 5);
         this.addChild(slo);


        var price = new cc.LabelBMFont(this.order.orderPrice, res.FONT_OUTLINE_20);
        price.setPosition(this.width  * 2 / 5, this.height * 3.5 / 5);
        var gold = new cc.Sprite(res.goldOrder);
        // gold.setPosition(this.width  * 3.5 / 5, this.height * 3.5 / 5);
        gold.setPosition(price.width + gold.width / 2, price.height / 2);
        gold.setScale(0.5);

        this.addChild(price);
        price.addChild(gold);

        //
        var exp = new cc.LabelBMFont(this.order.orderExp, res.FONT_OUTLINE_20);
        exp.setPosition(this.width  * 2 / 5, this.height * 2.5 / 5);
        var star = new cc.Sprite(res.expOrder);
        // star.setPosition(this.width  * 3.5 / 5 / 2.5, this.height * 3.5 / 5 / 2.5);
        star.setPosition(exp.width + star.width / 5, exp.height / 2);
        star.setScale(0.25);

        this.addChild(exp);
        exp.addChild(star);

//
        if (this.order != null){
            if (this.order.checkCondition() == true){
                var tickSprite = new cc.Sprite(res.tickOrder);
                tickSprite.setPosition(cc.p(this.width * 3 / 4, this.height / 4));
                this.addChild(tickSprite);
            }
        }
    },

    initWaittingTime: function () {
        var slo = new cc.Sprite(res.sloPaper);
        slo.setPosition(this.width / 2, this.height * 3 / 5);
        this.addChild(slo);

    },

    //
    initEventListener: function () {
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
                target.showOrderInfo();
                //
                var action1 = new cc.ScaleTo(0.13, 1.25);
                var action2 = new cc.ScaleTo(0.1, 1);
                this.runAction(cc.sequence(action1, cc.delayTime(0.01), action2));

///                //////////////////////
                OrderBGLayer.instance.lastIndexItemClick = this.orderId;
                //

            }.bind(this)
        });
        cc.eventManager.addListener(this.clickListener, this);
    },

    //
    showOrderInfo: function () {
        this.disableInfo();

        if (this.order.checkStatus() == OrderStatusTypes.WAITTING){
            this.showWaittingTimeInfo();
            return;
        }

        this.itemList = [];
        this.itemListModel = this.order.itemList;

        for (var i = 0; i < this.itemListModel.length; i++){
            var productSprite = new ProductSprite(getProductIconById(this.itemListModel[i].typeItem));
            OrderBGLayer.instance.orderInfo.addChild(productSprite);

            this.itemList.push(productSprite);

            productSprite.showQuantityCurr(user.getAsset().getQuantityOfTwoStorageByProductId(this.itemListModel[i].typeItem), this.itemListModel[i].quantity)
        }

        this.setupItemListPosition();
        this.showPriceInfo();

    },
    setupItemListPosition: function() {
        for (var i = 0; i < this.itemList.length; i++){
            this.itemList[i].setPosition(cc.p(this.itemList[i].width  * 3 / 4 + Math.abs(i % 3) * this.itemList[i].width,
                OrderBGLayer.instance.orderInfo.height + this.itemList[i].height * 1 / 3 - (Math.floor(i / 3) + 1) * this.itemList[i].height * 4 / 5));

            this.itemList[i].setScale(0.6);
        }
    },

    showPriceInfo: function () {
        var price = new cc.LabelBMFont(this.order.orderPrice, res.FONT_OUTLINE_30);
        price.setPosition(OrderBGLayer.instance.orderInfo.width  * 1 / 5, OrderBGLayer.instance.orderInfo.height * 1.05);
        var gold = new cc.Sprite(res.goldOrder);
        // gold.setPosition(this.width  * 3.5 / 5, this.height * 3.5 / 5);
        gold.setPosition(price.width + gold.width / 2, price.height / 2);
        gold.setScale(0.5);

        OrderBGLayer.instance.orderInfo.addChild(price);
        price.addChild(gold);

        //
        var exp = new cc.LabelBMFont(this.order.orderExp, res.FONT_OUTLINE_30);
        exp.setPosition(OrderBGLayer.instance.orderInfo.width  * 2.5 / 5, OrderBGLayer.instance.orderInfo.height * 1.05);
        var star = new cc.Sprite(res.expOrder);
        // star.setPosition(this.width  * 3.5 / 5 / 2.5, this.height * 3.5 / 5 / 2.5);
        star.setPosition(exp.width + star.width / 5, exp.height / 2);
        star.setScale(0.25);

        OrderBGLayer.instance.orderInfo.addChild(exp);
        exp.addChild(star);
    },


    showWaittingTimeInfo: function () {
        this.showWaittingTimeRemain();
        ////
        //this.unschedule(this.updateWaittingTime);
        //this.schedule(this.updateWaittingTime, 0.2);
        ////


        var notice = new cc.LabelBMFont("Đợi hết thời gian chờ hoặc tăng tốc bằng ruby,\nĐơn hàng tiếp theo sẽ đến nha bạn", res.FONT_OUTLINE_20);
        notice.setPosition(OrderBGLayer.instance.orderInfo.width / 2, OrderBGLayer.instance.orderInfo.height * 0.75);

        OrderBGLayer.instance.orderInfo.addChild(notice);
    },

    disableInfo: function() {
        OrderBGLayer.instance.orderInfo.removeAllChildrenWithCleanup(true);

        this.unschedule(this.updateWaittingTime);
    },



///////
    updateWaittingTime: function () {

        if (this.order == null) {
            this.unschedule(this.updateWaittingTime);
            cc.log("order is null")
            return;
        }
        if (this.order.itemList == []){
            this.unschedule(this.updateWaittingTime);
            cc.log("itemList is null")
            return;
        }

        var parseWaittingTime = this.order.waittingTime.getTime();
        var parseFinishTime = this.order.getFinishWaittingTime().getTime();
        var currTime = new Date().getTime();

        var duration = parseFinishTime - parseWaittingTime;
        var curr = currTime - parseWaittingTime;

        cc.log("dddddddd is null")
        if (curr > duration){
            /*

             */
            //this.isShowProgressBar = false;
            //this.disableProgressBarInprogress();
            this.unschedule(this.updateWaittingTime);
            return false;
        }

        cc.log("cccccc is null")
        //this.progress.setPercent(curr / duration * 100);
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

    showWaittingTimeRemain: function () {
        // crop name
        this.timeRemain = new cc.LabelBMFont("", res.FONT_OUTLINE_30);
        //this.timeRemain.setPosition(cc.p(this.progressBar.width / 2, this.progressBar.height));
        this.timeRemain.setPosition(OrderBGLayer.instance.orderInfo.width / 2, OrderBGLayer.instance.orderInfo.height * 1.05);
        OrderBGLayer.instance.orderInfo.addChild(this.timeRemain);

    }
});
