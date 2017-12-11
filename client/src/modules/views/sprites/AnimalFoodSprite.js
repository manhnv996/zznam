var AnimalFoodSprite = cc.Sprite.extend({
	ctor: function(parent, type) {
		this._super(type === AnimalLodgeType.chicken_habitat ?
			res.iconFoodChicken : res.iconFoodCow);

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

                    return true;
                }


                return false;
            }.bind(this),
            onTouchMoved: function (touch, event) {
                var delta = touch.getDelta();

                this.x += delta.x;
                this.y += delta.y;

                parent.popupItemList.shift();
                parent.disablePopup(null);


                //
                TablePopupLayer.instance._layout._isVisible = false;

                // cc.log("onTouchMoved: " + delta.x + ", " + delta.y);

                var mouse = touch.getLocation();

                 //Call ctrl
                // PlantCtrl.instance.onDragCropTool(mouse.x, mouse.y);
                /*
                DONE
                 */

            }.bind(this),

            onTouchEnded: function (touch, event) {
                // cc.log("sprite onTouchesEnded.. ");

                // var target = event.getCurrentTarget();
                var target = this;

                target.runAction(new cc.ScaleTo(0.1, 1/1.5, 1/1.5));

                parent.popupItemList.shift();
                parent.disablePopup(null);
                // parent.disablePopup(0);
                target.removeFromParent(true);
                //cc.eventManager.removeListener(this.dragListener);

                //
                TablePopupLayer.instance._layout._isClose = true;

            }.bind(this)
        });
        cc.eventManager.addListener(this.dragListener, this);
	},

	clearListener: function() {
        cc.eventManager.removeListener(this.dragListener);
    }
});
