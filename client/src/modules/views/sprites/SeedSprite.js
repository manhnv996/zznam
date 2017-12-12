/**
 * Created by CPU60133_LOCAL on 11/8/2017.
 */

// var SeedSprite = cc.Sprite.extend({
var SeedSprite = ProductSprite.extend({

    data: null,
    seedType: null,

    quantity: null,

    ctor: function(parent, seed_img, seedType) {
        // this._super(seed_img);
        this._super(seed_img, seedType);

        //
        this.render(parent, seedType);

    },
    render: function (parent, seedType) {

        this.seedType = seedType;
        //
        this.quantity = null;

        this.popupParent = parent;
    },




    //
    onBeginClick: function (touch) {
        //
        this.runAction(new cc.ScaleTo(0.1, 1.5, 1.5));
        //
        this.touchListener._isFirstMove = false;
        if (this.quantity == null){
            /*
            DONE
            SHOW LEVEL UNLOCK
             */
            this.showInfo();

        } else {
            this.slot.runAction(new cc.MoveBy(0.1, this.width / 4, this.height / 4));
        }
    },
    onMoveClick: function (touch) {
        var delta = touch.getDelta();

        if (this.quantity == null){
            return false;
        }
        this.x += delta.x;
        this.y += delta.y;

        ////
        if (!this.touchListener._isFirstMove){
            this.popupParent.disablePopup(this.seedType);

            //
            this.touchListener._isFirstMove = true;
            this.removeAllChildrenWithCleanup(true);  //remove all child

            // //
            // TablePopupLayer.instance._layout._isVisible = false;
        }

        //Call ctrl
        var mouse = touch.getLocation();
        PlantCtrl.instance.onDragSeed(this.seedType, mouse.x, mouse.y);
        /*
         DONE
         */
    },
    onEndClick: function (touch) {
        if (!this.touchListener._isFirstMove){
            this.runAction(new cc.ScaleTo(0.1, 1, 1));

            if (this.quantity == null){
                this.removeAllChildrenWithCleanup(true);
            } else {
                this.slot.runAction(new cc.MoveBy(0.1, - this.width / 4, - this.height / 4));
            }
        } else {

            this.popupParent.disablePopup(this.seedType);
            this.removeFromParent(true);
            // //
            // TablePopupLayer.instance._layout._isClose = true;
        }
    },
    //

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

});
