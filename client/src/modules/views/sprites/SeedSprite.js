/**
 * Created by CPU60133_LOCAL on 11/8/2017.
 */

var SeedSprite = cc.Sprite.extend({

    data: null,
    seedType: null,


    ctor: function(parent, seed_img, seedType) {
        this._super(seed_img);

        //
        this.render(seedType);

        this.addDragEventListener(parent, seed_img, seedType);

    },
    render: function (seedType) {

        this.seedType = seedType;
    },


    //
    addDragEventListener: function (parent, seed_img, seedType) {
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

                    parent.getIndexSeedOfPopupItemList(seedType);


                    target.removeAllChildrenWithCleanup(true);  //remove all child


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


                ////
                parent.popupItemSelected = seedType;
                parent.disVisiblePopup(seedType);



                //cc.log("onTouchMoved: " + delta.x + ", " + delta.y);

                ////Call ctrl
                //PlantCtrl.instance.onDragSeed(seedType, this.x, this.y);
                /*
                 INPROGRESS
                 */



                //var seedBoundingBox = this.getBoundingBox();
                //if (cc.rectIntersectsRect(seedBoundingBox, runnerBoundingBox)){
                //    //cc.log("va chạm");
                    PlantCtrl.instance.onDragSeed(seedType, this.x, this.y);
                //}


            }.bind(this),

            onTouchEnded: function (touch, event) {
                cc.log("sprite onTouchesEnded.. ");

                var target = event.getCurrentTarget();
                target.opacity = 255;
                target.removeFromParent(true);

                // parent.popupItemSelected = null;

                // parent.removePopup();
                parent.disVisiblePopup(seedType);

            }
        });
        cc.eventManager.addListener(dragListener, this);
    },
    removeDragEventListener: function () {
        //this.removeAllEventListeners();
        /*
        BUGGG
         */

    }
});