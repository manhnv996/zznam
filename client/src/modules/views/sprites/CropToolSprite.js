/**
 * Created by CPU60133_LOCAL on 11/9/2017.
 */

// var CropToolSprite = cc.Sprite.extend({
var CropToolSprite = ProductSprite.extend({

    ctor: function(parent, tool_img) {
        // this._super(tool_img);
        this._super(tool_img, "tool_crop");

        this.popupParent = parent;
        // //
        // this.render();
    },
    render: function () {

    },


    //
    onBeginClick: function (touch) {
        //
        this.runAction(new cc.ScaleTo(0.1, 1.5, 1.5));

    },
    onMoveClick: function (touch) {
        var delta = touch.getDelta();

        this.x += delta.x;
        this.y += delta.y;

        this.popupParent.popupItemList.shift();
        this.popupParent.disablePopup(null);
        // //
        // TablePopupLayer.instance._layout._isVisible = false;

        var mouse = touch.getLocation();
        //Call ctrl
        PlantCtrl.instance.onDragCropTool(mouse.x, mouse.y);
        /*
        DONE
         */
    },
    onEndClick: function (touch) {
        this.runAction(new cc.ScaleTo(0.1, 1/1.5, 1/1.5));

        this.popupParent.popupItemList.shift();
        this.popupParent.disablePopup(null);
        this.removeFromParent(true);
        // //
        // TablePopupLayer.instance._layout._isClose = true;

    },
    //

});
