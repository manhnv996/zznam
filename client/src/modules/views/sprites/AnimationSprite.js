var AnimationSprite = MapBlockSprite.extend({
	__isAnimation: true,
	__boundingBox: null,

	ctor: function(aniId, blockSizeX, blockSizeY, lx, ly) {
		this._super(undefined, blockSizeX, blockSizeY, lx, ly);

		this.content = fr.createAnimationById(aniId, this);
		this.addChild(this.content);
		// Get boundingbox at first time
		this.__boundingBox = this.content.getBoundingBox();
	},

	// Play animation
	play: function(aniName) {
		this.content.gotoAndPlay(aniName, -1);
	},

	// Override
	getContentSize: function() {
		return {
			width: this.__boundingBox.width,
			height: this.__boundingBox.height
		};
	},

	// Override
	getBoundingBox: function() {
		return this.__boundingBox;
	}
});
