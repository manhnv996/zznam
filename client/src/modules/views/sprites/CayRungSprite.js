var CayRungSprite = AnimationSprite.extend({
	treeType: 1,
	natureId: 0,

	ctor: function(x, y, type, id) {
		this._super(resAniId.Cayrung,
				MapConfigs.SmallNatureThing.size.width,
				MapConfigs.SmallNatureThing.size.height, 
				x, y, MapItemEnum.NATURE_THING);
		this.treeType = type || this.treeType;
		this.natureId = id;
		this.play(2 * this.treeType - 1);
		this.registerTouchEvents({ lockMove: true });
		// this.showDebugPriorityPoint();
		
	},

	onClick: function() {
		this.play(2 * this.treeType - 1);

		var type = 0;
		switch (this.treeType) {
			case 1:
				type = NaturalThingEnum.PINE_SMALL;
				break;
			case 2:
				type = NaturalThingEnum.PINE_BIG;
				break;
			case 3:
				type = NaturalThingEnum.TREE_BIG;
				break;
			case 4:
				type = NaturalThingEnum.TREE_SMALL
				break;
		}
		TablePopupLayer.instance.showNatureToolPopup(this.lx, this.ly, type, this.natureId);
		// Animate
		// var lx_2 = this.lx - this.ly;
		// var ly_2 = -this.lx - this.ly;

		// var p = MapValues.logicToScreenPosition(this.lx, this.ly);
		// cc.log(p);
		// var delta = cc.p(0, 0);
		// if (p.x < 180) {
		// 	delta.x = 180 - p.x;
		// }
		// if (p.y < 50) {
		// 	delta.y = 50 - p.y;
		// } else if (cc.winSize.height - p.y < 200) {
		// 	delta.y = - 200 + (cc.winSize.height - p.y);
		// }
		
		// // Set threshold
		// if (lx_2 < -28 || lx_2 > 28) {
		// 	delta.x = 0;
		// }
		// if (ly_2 < -60 || ly_2 > -2) {
		// 	delta.y = 0;
		// }
		// // delta.x *= MapLayer.instance.scale;
		// // delta.y *= MapLayer.instance.scale;

		// var action = new cc.MoveBy(1, delta).easing(cc.easeExponentialOut());
		// MapLayer.instance.runAction(action);
		// TablePopupLayer.instance.layerRunAction(action.clone());
		
	},

	_offset: function() {
		return cc.p(0, - MapValues.jLength / 2);
	},

	collect: function() {
		this.removeTouchEvents();
		this.play(2 * this.treeType, function() {
			this.removeFromParent(true);
		}.bind(this));
	}
});
