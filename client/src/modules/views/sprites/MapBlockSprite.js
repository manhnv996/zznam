var MapBlockSprite = cc.Sprite.extend({
	lx: 0,
	ly: 0,

	ctor: function(resource, blockSizeX, blockSizeY, x, y) {
		this._super(resource);
		this.blockSizeX = blockSizeX;
		this.blockSizeY = blockSizeY;
		this.setLogicPosition(x, y);
	}
});
