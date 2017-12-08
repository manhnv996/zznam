
var NPCSprite = AnimationSprite.extend({

    orderId: 0,
    orderNPC: null,

    ctor: function (x, y, orderNPC) {
        // this._super(res.orderPaper);
        /*
         x: 15 - 16,
         y: 18 - 20
         out: x = 17, y = 19
         */
        if (orderNPC == null){
            return;
        }

        this.orderNPC = orderNPC;
        this.orderId = orderNPC.orderId;

        this._super(orderNPC.npc_res,
            1,
            1,
            x, y,
            MapItemEnum.NPC
        );

        this.play("2");

        this.addEventListener();
        //this.registerTouchEvents({ lockMove: true });
    },


    onClick: function() {
        cc.log("NPC clicked", this.getLocalZOrder(), this.lx, this.ly, this.blockSizeX, this.blockSizeY);
        /*
        not yet started
         */
        // BaseGUILayer.instance.removeAllChildren();
        BaseGUILayer.instance.showOrderNPCLayer(this.orderNPC);
    },
    onBeginClick: function() {
        this.setColor(cc.color(200, 200, 200));
    },

    onEndClick: function() {
        this.setColor(cc.color(255, 255, 255));
    },

    //
    changeTexture: function (orderNPC) {
        this.orderNPC = orderNPC;
        this.orderId = orderNPC.orderId;

        this.content = fr.createAnimationById(orderNPC.npc_res, this);
    },


    //
    actionGetOut1: function () {
        this.play("1");
        if (this.getLogicPosition() != cc.p(17, 19)){
            var dx = 17 - this.getLogicPosition().x;
            var dy = 18 - this.getLogicPosition().y;

            var action = cc.sequence(
                cc.moveTo(1, MapValues.logicToPosition(dx, dy)),
                cc.callFunc(function () {
                    //
                    this.setLogicPosition(this.getLogicPosition().x + dx, this.getLogicPosition().y + dy);
                    this.content.setPosition(MapValues.logicToPosition(0, 0));

                    this.actionGetOut2();
                }.bind(this))
            );
            this.runAction(action);
        }
    },

    actionGetOut2: function () {
        var action = cc.sequence(
            cc.moveTo(2, MapValues.logicToPosition(0, 15)),
            cc.callFunc(function () {
                //
                this.setLogicPosition(this.getLogicPosition().x + 0, this.getLogicPosition().y + 15);
                this.content.setPosition(MapValues.logicToPosition(0, 0));

                this.actionGetOut3();
            }.bind(this))
        );
        this.runAction(action);
    },

    actionGetOut3: function () {
        var action = cc.sequence(
            cc.moveTo(2, MapValues.logicToPosition(20, 0)),
            cc.callFunc(function () {
                //
                this.setLogicPosition(this.getLogicPosition().x + 20, this.getLogicPosition().y + 0);
                this.content.setPosition(MapValues.logicToPosition(0, 0));

            }.bind(this))
        );
        this.runAction(action);
    },


    removeNPC: function () {
        this.setVisible(false);
        //this.removeFromParent(true);
    },


    runAction: function (action) {
        this.content.runAction(action);
    },

    //
    setPause: function () {
        this.pause();
    },

    setResume: function () {
        this.resume();
    },

     addEventListener: function () {
         //
         this.caculateBoundingPoints();
         this.clickListener = cc.EventListener.create({
             event: cc.EventListener.TOUCH_ONE_BY_ONE,
             swallowTouches: true,
             onTouchBegan: function (touch, event) {
                 // // Disable all popup
                 // PopupLayer.instance.disableAllPopup();

                 var touchLocation = touch.getLocation();
                 var location = MapValues.screenPositionToMapPosition(touchLocation.x, touchLocation.y);

                 // Check if is click inside sprite
                 if (rayCasting(location, this.boundingPoints)) {
                     this.onBeginClick();

                     return true;
                 }
                 return false;
             }.bind(this),
             onTouchMoved: function (touch, event) {
                 var delta = touch.getDelta();
                 MapLayer.instance.move(delta.x, delta.y);

             }.bind(this),

             onTouchEnded: function (touch, event) {
                 //
                 this.onClick();
                 this.onEndClick();

             }.bind(this)
         });
         cc.eventManager.addListener(this.clickListener, this);
     },

     clearListener: function() {
         cc.eventManager.removeListener(this.clickListener);
     },

});