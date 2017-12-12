
var NPCSprite = AnimationSprite.extend({

    orderId: 0,
    orderNPC: null,

    ctor: function (x, y, orderNPC) {

        this.orderNPC = orderNPC;
        this.orderId = orderNPC.orderId;

        this._super(orderNPC.npc_res,
            1,
            1,
            x, y,
            MapItemEnum.NPC
        );

        this.play("2");

        // this.addEventListener();
        this.registerTouchEvents({ lockMove: true });
    },


    onEnter: function() {
        this._super();

        this.isStatus = OrderStatusTypes.REALIZABLE;

        this.direction = cc.p(0, 0);

        var rand = Math.round(Math.random() * 10) % 3;
        if (rand === 0) {
            this.walk();
        } else if (rand === 1) {
            Math.random() > 0.5 ? this.play("2") : this.play("3");
        } else {
            Math.random() > 0.5 ? this.play("4") : this.play("5");
        }


        this.doAction();
        if (this.orderNPC.orderItem == null){
            return;
        }
        this.scheduleOnce(function() {
            this.schedule(this.doAction, 4.0);
        }.bind(this), Math.round(Math.random() * 100) % 50 / 10);
    },


    doAction: function () {
        var value = Math.floor(Math.random() * 3);
        this.lstAction = value;
        this.unscheduleUpdate();
        if (Math.random() > 0.8) {
            this.quote();
        }
        switch (value) {
            case 0:
                return Math.random() > 0.2 ? this.walk() : this.play("5");
            case 1:
                return Math.random() > 0.3 ? this.play("2") : this.play("3");
            case 2:
                return Math.random() > 0.3 ? this.play("4") : this.play("6");
        }
    },

    walk: function() {
        this.play("1");
        this.direction.x = 2 * (Math.random() - 0.5);
        this.direction.y = Math.sqrt(1 - Math.pow(this.direction.x, 2)) * (Math.random() > 0.5 ? 1 : -1);

        if (this.lx < (NPCSprite.minLimit.x + 0.5) && this.direction.x < 0) {
            this.direction.x *= -1;
        }
        if (this.ly < (NPCSprite.minLimit.y + 0.5) && this.direction.y < 0) {
            this.direction.y *= -1;
        }
        if (this.lx > (NPCSprite.maxLimit.x - 0.7) && this.direction.x > 0) {
            this.direction.x *= -1;
        }
        if (this.ly > (NPCSprite.maxLimit.y - 0.7) && this.direction.y > 0) {
            this.direction.y *= -1;
        }

        var p = MapValues.logicToPosition(this.direction.x, this.direction.y);
        if (p.x < 0) {
            this.setScaleX(1);
        } else {
            this.setScaleX(-1);
        }
        this.scheduleUpdate();
    },

    update: function(dt) {
        // UpdateWalk
        var newX = this.lx + 0.4 * dt * this.direction.x;
        var newY = this.ly + 0.4 * dt * this.direction.y;
        if (newX < NPCSprite.minLimit.x || newX > NPCSprite.maxLimit.x
            || newY < NPCSprite.minLimit.y || newY > NPCSprite.maxLimit.y) {

            this.unscheduleUpdate();
            this.play(Math.random() > 0.5 ? "2" : "3");
            return;
        }
        this.setLogicPosition(newX, newY);
    },


//
    quote: function () {
        if (this.orderNPC.orderItem != null){
            //var quote = new cc.Sprite(res.quoteNpc);
            var quote = new ccui.ImageView(res.quoteNpc);
            quote.setPosition(cc.p(this.width, this.height));
            // this.content.addChild(quote, "TAG_QUOTE");
            this.addChild(quote);

            //var item = new cc.Sprite(getProductIconById(this.orderNPC.orderItem.typeItem));
            var item = new ccui.ImageView(getProductIconById(this.orderNPC.orderItem.typeItem));
            item.setPosition(cc.p(quote.width / 2, quote.height * 0.65));
            quote.addChild(item);

            var sequence = cc.sequence(
                cc.delayTime(4),
                cc.callFunc(function() {
                    // this.content.removeAllChildrenWithCleanup(true);
                    this.removeChild(quote, true);
                }.bind(this)));
            this.runAction(sequence);
        }
    },
    happy: function () {
        this.content.gotoAndPlay("7", -1, -1, 2);
    },

/////


    onClick: function() {
        cc.log("NPC clicked", this.getLocalZOrder(), this.lx, this.ly, this.blockSizeX, this.blockSizeY);
        /*
        done
         */
        // BaseGUILayer.instance.removeAllChildren();
        if (this.isStatus != OrderStatusTypes.WAITTING){
            BaseGUILayer.instance.showOrderNPCLayer(this.orderNPC);
        }

    },
    onBeginClick: function() {
        this.setColor(cc.color(200, 200, 200));
    },

    onEndClick: function() {
        this.setColor(cc.color(255, 255, 255));
    },

    //
    changeTexture: function (orderNPC) {
        this._super(orderNPC.npc_res);
        this.setResume();

        this.orderNPC = orderNPC;
        this.orderId = orderNPC.orderId;
    },



    removeNPC: function () {
        // this.setVisible(false);
        // this.clearListener();
        this.removeFromParent(true);
    },


    //
    setPause: function () {
        this.pause();
    },
    setResume: function () {
        this.resume();
    },

//
    runScheduleWalkingOut: function (isMake) {
        this.unscheduleUpdate();
        this.unschedule(this.doAction);
        if (isMake){
            this.runAction(cc.sequence(
                cc.callFunc(function() {
                    this.happy();
                }.bind(this)),
                cc.delayTime(3),
                cc.callFunc(function() {
                    this.play("1");
                    this.schedule(this.updateWalkingOut, 0.05);
                }.bind(this))
            ));
        } else {
            this.play("1");
            this.schedule(this.updateWalkingOut, 0.05);
        }
        this.isStatus = OrderStatusTypes.WAITTING;
    },
    runScheduleWalkingBack: function () {
        this.unscheduleUpdate();
        this.unschedule(this.doAction);
        this.play("1");
        this.schedule(this.updateWalkingBack, 0.05);
        this.isStatus = OrderStatusTypes.WAITTING;

        this.setVisible(true);
    },
    ////
    updateWalkingOut: function (dt) {

        if (Math.round(this.getLogicPosition().x) <= NPCSprite.startPoint.x + 1){
            this.direction = cc.p(1, 0);
        } else if (Math.round(this.getLogicPosition().y <= NPCSprite.middlePoint.y)){
            this.direction = cc.p(0, 1);
        } else {
            this.direction = cc.p(1, 0);
        }

//////////
        var p = MapValues.logicToPosition(this.direction.x, this.direction.y);
        if (p.x < 1) {
            this.setScaleX(1);
        } else {
            this.setScaleX(-1);
        }

        //
        var newX = this.lx + 0.8 * dt * this.direction.x;
        var newY = this.ly + 0.8 * dt * this.direction.y;
        if (Math.round(this.getLogicPosition().x) >= NPCSprite.finishPoint.x){

            this.unschedule(this.updateWalkingOut);
            this.unschedule(this.doAction);

            this.isStatus = OrderStatusTypes.REALIZABLE;
            this.setVisible(false);
            return;
        }
        this.setLogicPosition(newX, newY);
    },

    updateWalkingBack: function (dt) {

        if (Math.round(this.getLogicPosition().x) > NPCSprite.middlePoint.x + 1){
            this.direction = cc.p(-1, 0);
        } else {
            this.direction = cc.p(0, -1);
        }

//////////
        var p = MapValues.logicToPosition(this.direction.x, this.direction.y);
        if (p.x < 0) {
            this.setScaleX(1);
        } else {
            this.setScaleX(-1);
        }

        //
        var newX = this.lx + 0.8 * dt * this.direction.x;
        var newY = this.ly + 0.8 * dt * this.direction.y;
        if (Math.round(this.getLogicPosition().y) <= NPCSprite.startPoint.y){

            this.unschedule(this.updateWalkingBack);

            this.setScaleX(1);
            var action = cc.sequence(
                cc.moveTo(2.4, MapValues.logicToPosition(- 1.5, 0)),
                cc.callFunc(function () {
                    //
                    this.setLogicPosition(this.getLogicPosition().x - 1.5, this.getLogicPosition().y);
                    this.content.setPosition(MapValues.logicToPosition(0, 0));

                }.bind(this))
            );
            this.runAction(action);

            this.schedule(this.doAction, 4.0);

            this.isStatus = OrderStatusTypes.REALIZABLE;
            return;
        }
        this.setLogicPosition(newX, newY);
    },


///////
//    addEventListener: function () {
//        //
//        this.caculateBoundingPoints();
//        this.clickListener = cc.EventListener.create({
//            event: cc.EventListener.TOUCH_ONE_BY_ONE,
//            swallowTouches: true,
//            onTouchBegan: function (touch, event) {
//                // // Disable all popup
//                // PopupLayer.instance.disableAllPopup();
//
//                var touchLocation = touch.getLocation();
//                var location = MapValues.screenPositionToMapPosition(touchLocation.x, touchLocation.y);
//
//                // Check if is click inside sprite
//                if (rayCasting(location, this.boundingPoints)) {
//                    this.onBeginClick();
//
//                    return true;
//                }
//                return false;
//            }.bind(this),
//            onTouchMoved: function (touch, event) {
//                var delta = touch.getDelta();
//                MapLayer.instance.move(delta.x, delta.y);
//
//            }.bind(this),
//
//            onTouchEnded: function (touch, event) {
//                //
//                this.onClick();
//                this.onEndClick();
//
//            }.bind(this)
//        });
//        cc.eventManager.addListener(this.clickListener, this);
//    },
//
//    clearListener: function() {
//        cc.eventManager.removeListener(this.clickListener);
//    },




    updateOrderNPCWaittingTime: function () {
        if (this.orderNPC != null){
            var parseCurrTime = new Date().getTime();
            var finishWaittingTime = this.orderNPC.getFinishWaittingTime();
            if (finishWaittingTime != null){
                if (parseCurrTime > finishWaittingTime.getTime()){
                    testnetwork.connector.sendCreateNewOrderNpc(this.orderNPC.orderId);
                }
            }
        }

    },

    runScheduleUpdateOrderNPC: function () {
        this.schedule(this.updateOrderNPCWaittingTime, 1.0);
    },
    stopScheduleUpdateOrderNPC: function () {
        this.unschedule(this.updateOrderNPCWaittingTime);
    },


    // Make offset
    _offset: function() {
        if (this.orderNPC != null){
            if (this.orderNPC.npc_res == resAniId.Cogai1){
                return cc.p(0, 100);
            } else {
                return cc.p(0, 0);
            }
        }
        return cc.p(0, 0);
    }
});

NPCSprite.minLimit = cc.p(15, 18);
NPCSprite.maxLimit = cc.p(16, 20);

NPCSprite.startPoint = cc.p(16, 19);
NPCSprite.middlePoint = cc.p(16, 32);
NPCSprite.finishPoint = cc.p(31, 32);
