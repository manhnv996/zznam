var AnimalFoodSprite = cc.Sprite.extend({
	ctor: function(parent, type) {
		this._super(type === AnimalLodgeType.chicken_habitat ?
			res.iconFoodChicken : res.iconFoodCow);

		this.dragListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = this;
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    target.runAction(new cc.ScaleTo(0.1, 1.5, 1.5));
                    this.dragListener._isFirstMove = false;

                    target.slot.runAction(new cc.MoveBy(0.1, target.width / 4, target.height / 4));
                    AnimalCtrl.instance.unlock();
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
                    // this.removeAllChildrenWithCleanup(true);  //remove all child

                    //
                    TablePopupLayer.instance._layout._isVisible = false;
                }

                // cc.log("onTouchMoved: " + delta.x + ", " + delta.y);

                var mouse = touch.getLocation();
                var lp = MapValues.screenPositionToLogic(mouse.x, mouse.y);
                var count = AnimalCtrl.instance.onMoveFeedTool(lp.x, lp.y, type);
                if (count !== 0) {
                    this.quantity -= count;
                    this.quantityLabel.setString(this.quantity);
                }
            }.bind(this),

            onTouchEnded: function (touch, event) {
                // cc.log("sprite onTouchesEnded.. ");

                // var target = event.getCurrentTarget();
                var target = this;
                if (!this.dragListener._isFirstMove) {
                    target.runAction(new cc.ScaleTo(0.1, 1, 1));
                    target.slot.runAction(new cc.MoveBy(0.1, - target.width / 4, - target.height / 4));

                } else {
                    target.removeFromParent(true);
                    TablePopupLayer.instance._layout._isClose = true;

                }
                // target.runAction(new cc.ScaleTo(0.1, 1/1.5, 1/1.5));

                // parent.disablePopup(0);
                //cc.eventManager.removeListener(this.dragListener);
            }.bind(this)
        });
        cc.eventManager.addListener(this.dragListener, this);

        this.quantity = user.asset.warehouse.getQuantity(
            type === AnimalLodgeType.chicken_habitat
            ? ProductTypes.FOOD_CHICKEN
            : ProductTypes.FOOD_COW
        );

        this.quantityLabel = new cc.LabelBMFont(this.quantity, res.FONT_OUTLINE_20);
        if (this.quantity == 0){
            this.quantityLabel.setString("0");
        }
        this.quantityLabel.setScale(1.3);

        this.slot = new cc.Sprite(res.slot);
        this.quantityLabel.setPosition(new cc.p(this.slot.width / 2, this.slot.height / 2));
        this.slot.setPosition(new cc.p(this.width / 4, this.height * 3 / 4));
        this.slot.addChild(this.quantityLabel);
        this.addChild(this.slot);

        var muiten = new cc.Sprite(res.ten);
        muiten.setPosition(new cc.p(this.width * 3 / 4, this.height / 4));
        this.addChild(muiten);
	},

	clearListener: function() {
        cc.eventManager.removeListener(this.dragListener);
    }
});
