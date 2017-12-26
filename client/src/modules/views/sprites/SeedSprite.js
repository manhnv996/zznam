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
        SoundCtrl.instance.playSoundEffect(res.func_click_icon_mp3, false);
        //
        this.runAction(new cc.ScaleTo(0.1, 1.5, 1.5));
        //
        this.touchListener._isFirstMove = false;
        if (this.quantity == null){

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
        var productConfig = getProductConfigById(this.seedType);

        this.tooltip = new ToolTipLayout(fr.Localization.text(productConfig.name), "");
        this.addChild(this.tooltip);

        this.tooltip.setPosition(cc.p(- this.width, this.height * 0.8));

        this.tooltip.setScale(0.5);
        var scaleUp = cc.scaleTo(0.2, 0.55);
        var scaleDown = cc.scaleTo(0.15, 0.5);
        this.tooltip.runAction(cc.sequence(scaleUp, scaleDown));


        var msg = new cc.LabelBMFont(fr.Localization.text("text_unlock") + " " + getProductObjByType(this.seedType).level, res.FONT_OUTLINE_30);
        msg.setPosition(cc.p(this.tooltip.width / 2, this.tooltip.height / 2));
        this.tooltip.addChild(msg);
    },

    addQuantityInfo: function () {
        /////
        if (this.quantity != null){
            var quantitySeed = new cc.LabelBMFont(this.quantity, res.FONT_OUTLINE_20);
            if (this.quantity == 0){
                quantitySeed.setString("0");
            }
            quantitySeed.setScale(1.3);
            //
            this.slot = new cc.Sprite(res.slot);
            quantitySeed.setPosition(new cc.p(this.slot.width / 2, this.slot.height / 2));
            this.slot.setPosition(new cc.p(this.width / 4, this.height * 3 / 4));
            this.slot.addChild(quantitySeed);
            this.addChild(this.slot);

            //
            this.showSuggest();
        }
    },

    showSuggest: function () {
        //
        var muiten = new ccui.ImageView(res.ten);
        muiten.setPosition(new cc.p(this.width * 3 / 4, this.height / 4));
        this.addChild(muiten);
    }

});
