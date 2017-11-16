/**
 * Created by CPU60133_LOCAL on 11/9/2017.
 */

var CropToolSprite = cc.Sprite.extend({

    ctor: function(parent, tool_img) {
        this._super(tool_img);

        //
        this.render();

        var dragListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();

                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);

                    //
                    target.runAction(new cc.ScaleTo(0.1, 1.5, 1.5));

                     target.opacity = 180;
                    return true;
                }


                return false;
            },
            onTouchMoved: function (touch, event) {

                var delta = touch.getDelta();


                this.x += delta.x / MapLayer.instance.scale;
                this.y += delta.y / MapLayer.instance.scale;
                //this.x = x / lstScale;
                //this.y = y / lstScale;

                if (delta.x / lstScale > 0.01 || delta.y / lstScale > 0.01){
                    parent.popupItemList.shift();

                    parent.disVisiblePopup(null);
                    // parent.disVisiblePopupBackground();
                }

                // cc.log("onTouchMoved: " + delta.x + ", " + delta.y);

                // //Call ctrl
                // PlantCtrl.instance.onDragCropTool(this.x, this.y);
                /*
                INPROGRESS
                 */




                //var toolBoundingBox = this.getBoundingBox();
                //if (cc.rectIntersectsRect(toolBoundingBox, runnerBoundingBox)){
                //    //cc.log("va chạm");
                    PlantCtrl.instance.onDragCropTool(this.x, this.y);
                //}


            }.bind(this),

            onTouchEnded: function (touch, event) {
                cc.log("sprite onTouchesEnded.. ");

                var target = event.getCurrentTarget();
                target.opacity = 255;

                target.runAction(new cc.ScaleTo(0.1, 1/1.5, 1/1.5));

                target.removeFromParent(true);

                parent.disVisiblePopup(null);
            }
        });
        cc.eventManager.addListener(dragListener, this);
    },
    render: function () {

    }
});