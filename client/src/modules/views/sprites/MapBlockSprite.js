var MapBlockSprite = cc.Sprite.extend({
	lx: 0,
	ly: 0,

	ctor: function(resource, blockSizeX, blockSizeY, x, y) {
		this._super(resource);
		this.blockSizeX = blockSizeX;
		this.blockSizeY = blockSizeY;
		this.setLogicPosition(x, y);
	},

	setLogicPosition: function(x, y) {
		if (!x) {
			x = 0;
		}
		if (!y) {
			y = 0;
		}
		if (x.x) {
			y = x.y;
			x = x.x;
		}
		this.lx = x;
		this.ly = y;
		var contentSize = this.getContentSize();
		var point2 = MapValues.logicToPosition(x, y);
		var point1 = MapValues.logicToPosition(x - this.blockSizeX, y - this.blockSizeY);

		var dx = contentSize.width / 2 + 2 * point2.x - point1.x - this.blockSizeX * MapValues.iLength / 2;
		var dy = contentSize.height / 2 + 2 * point2.y - point1.y;
		
		this.setLocalZOrder(this.lx + this.ly);
		this.setPosition(cc.p(dx, dy));
	},

	getLogicPosition: function() {
		return cc.p(this.lx, this.ly);
	}
});
