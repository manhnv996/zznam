var AnimalHarvestSprite = cc.Sprite.extend({
	ctor: function(parent, type) {
		this._super(type === AnimalLodgeType.chicken_habitat ?
			res.GIO : res.XO);
		this.dragListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = this;
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    this.dragListener._isFirstMove = false;

                    target.runAction(new cc.ScaleTo(0.1, 1.5, 1.5));
                    return true;
                }

                return false;
            }.bind(this),
            onTouchMoved: function (touch, event) {
                var delta = touch.getDelta();
                if (!this.active) {
                    this.active = true;
                    this.onActive && this.onActive();
                }

                this.x += delta.x;
                this.y += delta.y;

                if (!this.dragListener._isFirstMove){
                    // parent.disablePopup();

                    //
                    this.dragListener._isFirstMove = true;
                    //
                    TablePopupLayer.instance._layout._isVisible = false;
                }

                // cc.log("onTouchMoved: " + delta.x + ", " + delta.y);

                var mouse = touch.getLocation();
                var lp = MapValues.screenPositionToLogic(mouse.x, mouse.y);
                 //Call ctrl
                AnimalCtrl.instance.onMoveHarvestTool(lp.x, lp.y, type);

            }.bind(this),

            onTouchEnded: function (touch, event) {
                // cc.log("sprite onTouchesEnded.. ");

                // var target = event.getCurrentTarget();
                var target = this;

                if (!this.dragListener._isFirstMove) {
                    target.runAction(new cc.ScaleTo(0.1, 1, 1));
                } else {
                    target.removeFromParent(true);
                    TablePopupLayer.instance._layout._isClose = true;
                }
            }.bind(this)
        });
        cc.eventManager.addListener(this.dragListener, this);
	},

	clearListener: function() {
        cc.eventManager.removeListener(this.dragListener);
    }
});
