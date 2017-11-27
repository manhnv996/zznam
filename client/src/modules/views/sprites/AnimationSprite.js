var AnimationSprite = MapBlockSprite.extend({
	__isAnimation: true,
	__boundingBox: null,
	// __fixNaturePosition: false,

	ctor: function(aniId, blockSizeX, blockSizeY, lx, ly, mapAliasType) {
		this._super(undefined, blockSizeX, blockSizeY, lx, ly, mapAliasType);

		this.content = fr.createAnimationById(aniId, this);
		this.addChild(this.content);
		// Get boundingbox at first time
		this.__boundingBox = this.content.getBoundingBox();
		// if (fixNaturePosition) {
		// 	this.__fixNaturePosition = true;
		// }
	},

	// Play animation
	play: function(aniName) {
		this.content.gotoAndPlay(aniName, -1);
	},

	// Override
	runAction: function(action) {
		this.content.runAction(action);
	},

	stopAllActions: function() {
		this.content.stopAllActions();
	},

	setColor: function(color) {
		this.content.setColor(color);
	},

	// Override
	getContentSize: function() {
		return {
			width: this.__boundingBox.width,
			height: this.__boundingBox.height
		};
		// return this.content.getBoundingBox();
	},

	// Override
	getBoundingBox: function() {
		return this.__boundingBox;
	},

	// Make offset
	_offset: function() {
		return cc.p(0, 0);
	}
});
