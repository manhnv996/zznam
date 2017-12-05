
var NPCSprite = AnimationSprite.extend({

    orderId: 0,
    orderNPC: null,

    ctor: function (x, y, orderNPC) {
        // this._super(res.orderPaper);

        this.orderNPC = orderNPC;
        this.orderId = orderNPC.orderId;

        this._super(orderNPC.npc_res,
            1,
            1,
            x, y,
            MapItemEnum.NPC
        );

        // this.play("1");

        // this.addEventListener();
        // this.registerTouchEvents();
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



    // addEventListener: function () {
    //     //
    //     this.caculateBoundingPoints();
    //     this.clickListener = cc.EventListener.create({
    //         event: cc.EventListener.TOUCH_ONE_BY_ONE,
    //         swallowTouches: true,
    //         onTouchBegan: function (touch, event) {
    //             // // Disable all popup
    //             // PopupLayer.instance.disableAllPopup();
    //
    //             var touchLocation = touch.getLocation();
    //             var location = MapValues.screenPositionToMapPosition(touchLocation.x, touchLocation.y);
    //
    //             // Check if is click inside sprite
    //             if (rayCasting(location, this.boundingPoints)) {
    //                 this.onBeginClick();
    //
    //                 return true;
    //             }
    //             return false;
    //         }.bind(this),
    //         onTouchMoved: function (touch, event) {
    //             var delta = touch.getDelta();
    //             MapLayer.instance.move(delta.x, delta.y);
    //
    //         }.bind(this),
    //
    //         onTouchEnded: function (touch, event) {
    //             //
    //             this.onClick();
    //             this.onEndClick();
    //
    //         }.bind(this)
    //     });
    //     cc.eventManager.addListener(this.clickListener, this);
    // },
    //
    // clearListener: function() {
    //     cc.eventManager.removeListener(this.clickListener);
    // },

});