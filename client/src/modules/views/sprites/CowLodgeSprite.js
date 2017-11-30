var CowLodgeSprite = AnimalLodgeSprite.extend({
	ctor: function(x, y) {
		this._super(
			res.COW_LODGE_GROUND, res.COW_LODGE_FENCE,
			22, 13, 26,
			4, 4, x, y, MapItemEnum.LODGE);
		this.registerTouchEvents();
		var cow = fr.createAnimationById(resAniId.Fix_cow);
		this.addChild(cow);
		cow.gotoAndPlay('Cow_No', -1);
		cow.setPosition(cc.p(
			this.getContentSize().width / 2,
			this.getContentSize().height / 2
		));

		// var dot = new cc.Sprite(res.DOT2_PNG);
  //       dot.setPosition(this.getContentSize());
  //       this.addChild(dot);
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
