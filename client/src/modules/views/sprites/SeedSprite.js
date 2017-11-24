/**
 * Created by CPU60133_LOCAL on 11/8/2017.
 */

var SeedSprite = cc.Sprite.extend({

    data: null,
    seedType: null,

    quantity: null,

    ctor: function(parent, seed_img, seedType) {
        this._super(seed_img);

        //
        this.render(seedType);
        this.addDragEventListener(parent, seedType);

    },
    render: function (seedType) {

        this.seedType = seedType;
        //
        this.quantity = null;
    },


    //
    addDragEventListener: function (parent, seedType) {
        this.dragListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                // var target = event.getCurrentTarget();
                var target = this;
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    // cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);

                    //
                    target.runAction(new cc.ScaleTo(0.1, 1.5, 1.5));
                    //
                    this.dragListener._isFirstMove = false;


                    if (target.quantity == null){
                        /*
                        DONE
                        SHOW LEVEL UNLOCK
                         */
                        target.showInfo();

                    } else {
                        target.slot.runAction(new cc.MoveBy(0.1, target.width / 4, target.height / 4));
                    }


                    return true;
                }
                return false;
            }.bind(this),
            onTouchMoved: function (touch, event) {

                var delta = touch.getDelta();
                // var target = event.getCurrentTarget();
                var target = this;

                if (target.quantity == null){
                    return false;
                }

                this.x += delta.x;
                this.y += delta.y;

                ////
                if (!this.dragListener._isFirstMove){
                    parent.disablePopup(seedType);

                    //
                    this.dragListener._isFirstMove = true;
                    target.removeAllChildrenWithCleanup(true);  //remove all child
                }


                //Call ctrl
                var mouse = touch.getLocation();
                //cc.log(MapValues.screenPositionToLogic(mouse.x, mouse.y));

                PlantCtrl.instance.onDragSeed(seedType, mouse.x, mouse.y);
                /*
                 DONE
                 */

            }.bind(this),

            onTouchEnded: function (touch, event) {
                // cc.log("sprite onTouchesEnded.. ");

                // var target = event.getCurrentTarget();
                var target = this;

                if (!this.dragListener._isFirstMove){
                    target.runAction(new cc.ScaleTo(0.1, 1, 1));

                    if (target.quantity == null){
                        target.removeAllChildrenWithCleanup(true);
                    } else {
                        target.slot.runAction(new cc.MoveBy(0.1, - target.width / 4, - target.height / 4));
                    }
                } else {

                    parent.disablePopup(seedType);
                    target.removeFromParent(true);
                    cc.eventManager.removeListener(this.dragListener);
                }

            }.bind(this)
        });
        //cc.eventManager.addListener(this.dragListener, 1);
        cc.eventManager.addListener(this.dragListener, this);
    },
    //
    showInfo: function () {
        var popupMsg = cc.Sprite.create(res.tooltip);
        popupMsg.setPosition(0, this.height * 6 / 5);
        popupMsg.setScale(0.5);
        this.addChild(popupMsg);


        var msg = new cc.LabelBMFont("LevelUnlock: " + getProductObjByType(this.seedType).level, res.FONT_OUTLINE_30);
        msg.setPosition(cc.p(popupMsg.width / 2, popupMsg.height / 2));
        popupMsg.addChild(msg);
    },

    addQuantityInfo: function () {
        /////
        if (this.quantity != null){
            var quantitySeed = new cc.LabelBMFont(this.quantity, res.FONT_OUTLINE_20);
            if (this.quantity == 0){
                quantitySeed.setString("0");
            }

            this.slot = new cc.Sprite(res.slot);
            quantitySeed.setPosition(new cc.p(this.slot.width / 2, this.slot.height / 2));
            this.slot.setPosition(new cc.p(this.width / 4, this.height * 3 / 4));
            this.slot.addChild(quantitySeed);
            this.addChild(this.slot);

            var muiten = new cc.Sprite(res.ten);
            muiten.setPosition(new cc.p(this.width * 3 / 4, this.height / 4));
            this.addChild(muiten);

        }

    },

    clearListener: function() {
        cc.eventManager.removeListener(this.dragListener);
    }
});
