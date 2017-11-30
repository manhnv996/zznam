var CowLodgeSprite = AnimalLodgeSprite.extend({
	ctor: function(x, y) {
		this._super(
			res.COW_LODGE_GROUND, res.COW_LODGE_FENCE,
			22, 13, 26,
			4, 4, x, y, MapItemEnum.LODGE);
		this.registerTouchEvents();
	},

	onClick: function() {
		cc.log('Cow lodge clicked', this.getLocalZOrder(), this.lx, this.ly);
	},

	setLogicPosition: function(lx, ly, notUpdatePriority) {
		this._super(lx, ly, notUpdatePriority);
		this.x += 24;
		this.y += -30;
	}
});
