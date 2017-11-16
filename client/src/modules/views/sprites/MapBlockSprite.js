var MapBlockSprite = cc.Sprite.extend({
	lx: 0,
	ly: 0,

	ctor: function(resource, blockSizeX, blockSizeY, x, y) {
		this._super(resource);
		this.blockSizeX = blockSizeX;
		this.blockSizeY = blockSizeY;
		this.setLogicPosition(x, y);
	},

	registerTouchEvents: function() {
		cc.log("Register touch events");
	}
});


// Add logic position setting, getting
cc.Node.prototype.setLogicPosition = function(lx, ly) {
    lx = lx || 0;
    ly = ly || 0;
    if (typeof lx === 'object') {
        ly = lx.y;
        lx = lx.x;
    }
    this.lx = lx;
    this.ly = ly;
    var contentSize = this.getContentSize();
    if (contentSize.width + contentSize.height === 0) {
    	this.setLocalZOrder(this.lx + this.ly);
    	this.setPosition(MapValues.logicToPosition(lx, ly));
    	return;
    }
    var point2 = MapValues.logicToPosition(lx, ly);
    var point1 = MapValues.logicToPosition(
        lx - this.blockSizeX,
        ly - this.blockSizeY
    );

    var dx = contentSize.width / 2 + 2 * point2.x - 
            point1.x - this.blockSizeX * MapValues.iLength / 2;
    var dy = contentSize.height / 2 + 2 * point2.y - point1.y;
    
    this.setLocalZOrder(this.lx + this.ly);
    this.setPosition(cc.p(dx, dy));
}

cc.Node.prototype.getLogicPosition = function() {
    return cc.p(this.lx, this.ly);
}
