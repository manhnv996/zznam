var NatureToolSprite = cc.Sprite.extend({
	type: null,

	ctor: function(resImg, quantity) {
		this._super(resImg);
		if (!isNaN(quantity)) {
			this.quantity = quantity;
			this.renderQuantity();
		}
		this.renderMuiTen();
		this.initEvent();
		this.setScale(1.2);
	},

	initEvent: function() {
		this.dragListener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function(touch) {
				var target = this;
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    target.runAction(new cc.ScaleTo(0.1, 1.5, 1.5));
                    this._isFirstMove = false;
                    if (target.slot) {
                    	target.slot.runAction(new cc.MoveBy(0.1, target.width / 4, target.height / 4));
                    }
                    NatureCtrl.instance.unlock();
                    return true;
                }

                return false;
			}.bind(this),

			onTouchMoved: function(touch) {
				var delta = touch.getDelta();
				this.x += delta.x;
				this.y += delta.y;

				if (!this._isFirstMove) {
					this._isFirstMove = true;
        			TablePopupLayer.instance._layout._bg.setVisible(false);
				}

				var mouse = touch.getLocation();
				var lp = MapValues.screenPositionToLogic(mouse.x, mouse.y);
				this.onMove(lp.x, lp.y);
			}.bind(this),

			onTouchEnded: function(touch) {
				var target = this;
                if (!this._isFirstMove) {
                    target.runAction(new cc.ScaleTo(0.1, 1, 1));
                    if (target.slot) {
                    	target.slot.runAction(new cc.MoveBy(0.1, - target.width / 4, - target.height / 4));
                    }
                } else {
                    target.removeFromParent(true);
                }
			}.bind(this)
		});
		cc.eventManager.addListener(this.dragListener, this);
	},

	renderQuantity: function() {
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
	},

	renderMuiTen: function() {
		var muiten = new cc.Sprite(res.ten);
        muiten.setPosition(new cc.p(this.width * 3 / 4, this.height / 4));
        this.addChild(muiten);
	},

	// Override
	onMove: function(lx, ly) {}
});
