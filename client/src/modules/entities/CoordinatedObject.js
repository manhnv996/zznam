var CoordinatedObject = cc.Class.extend({
	coordinate: null,
	blockSizeX: 0,
	blockSizeY: 0,

	ctor: function(x, y, blockSizeX, blockSizeY) {
		this.coordinate = cc.p(x, y);
		this.blockSizeX = blockSizeX;
		this.blockSizeY = blockSizeY;
	}
});
