/**
 * Created by CPU60133_LOCAL on 11/9/2017.
 */

var CropToolSprite = ProductSprite.extend({

    ctor: function(parent, tool_img) {
        this._super(tool_img, "tool_crop");

        this.popupParent = parent;
         //
         this.render();
    },
    render: function () {
        this.showSuggest();
    },


    //
    onBeginClick: function (touch) {
        SoundCtrl.instance.playSoundEffect(res.func_click_icon_mp3, false);
        //
        this.runAction(new cc.ScaleTo(0.1, 1.5, 1.5));
        //
        this.touchListener._isFirstMove = false;
    },
    onMoveClick: function (touch) {
        var delta = touch.getDelta();

        this.x += delta.x;
        this.y += delta.y;
        ////
        if (!this.touchListener._isFirstMove){
            //
            this.touchListener._isFirstMove = true;

            this.popupParent.popupItemList.shift();
            this.popupParent.disablePopup(null);
            this.removeAllChildrenWithCleanup(true);  //remove all child
            // //
            // TablePopupLayer.instance._layout._isVisible = false;
        }

        var mouse = touch.getLocation();
        //Call ctrl
        PlantCtrl.instance.onDragCropTool(mouse.x, mouse.y);
        /*
        DONE
         */
    },
    onEndClick: function (touch) {
        if (!this.touchListener._isFirstMove){
            this.runAction(new cc.ScaleTo(0.1, 1, 1));

        } else {
            this.popupParent.popupItemList.shift();
            this.popupParent.disablePopup(null);
            this.removeFromParent(true);
            // //
            // TablePopupLayer.instance._layout._isClose = true;
        }

    },
    //

    showSuggest: function () {
        var muiten = new ccui.ImageView(res.ten);
        muiten.setPosition(new cc.p(this.width * 3 / 4, this.height / 4));
        this.addChild(muiten);
    }
});
