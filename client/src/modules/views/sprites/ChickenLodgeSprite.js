var ChickenLodgeSprite = AnimalLodgeSprite.extend({
	ctor: function(x, y) {
		this._super(
			res.CHICKEN_LODGE_GROUND, res.CHICKEN_LODGE_FENCE, 
			19, 9, 22,
			3, 3, x, y, MapItemEnum.LODGE);
		this.registerTouchEvents();
		// this.showDebugPriorityPoint();
		// this._showBoundingPoints();
		var chicken = new ChickenSprite();
		chicken.play(ChickenSprite.Harvest);
		chicken.setPosition(1, 1);
		this.addChild(chicken);
	},

	onClick: function() {
		cc.log('Chicken lodge clicked');
	},

	setLogicPosition: function(lx, ly, notUpdatePriority) {
		this._super(lx, ly, notUpdatePriority);
		this.x += 33;
		this.y += -1;
	}
});
