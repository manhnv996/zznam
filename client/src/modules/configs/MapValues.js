var MapValues = new function() {
	this.iLength = 262;
	this.jLength = 134;
	this.width = 32;
	this.height = 50;
	this.paddingTop = 100;
	this.paddingBottom = 100;
	this.paddingLeft = 100;
	this.paddingRight = 100;

	this.logicToPosition = function(x, y) {
		var _x = (x - y) * this.iLength / 2;
		var _y = (- x - y) * this.jLength / 2;
		return cc.p(_x, _y);
	}

	this.positionToLogic = function(_x, _y) {
		var x = _x / this.iLength - _y / this.jLength;
		var y = -_x / this.iLength - _y / this.jLength;
		return cc.p(x, y);
	}

	this.screenPositionToLogic = function(x, y) {
		var map = MapLayer.instance;
		var mapCenterPosition = cc.p(
			cc.winSize.width / 2 + map.x,
			cc.winSize.height / 2 + map.y
		);
		var mapRootPosition = cc.p(
			mapCenterPosition.x - map.scale * map.width / 2,
			mapCenterPosition.y - map.scale * map.height / 2
		);
		var deltaPosition = cc.p(
			(x - mapRootPosition.x) / map.scale,
			(y - mapRootPosition.y) / map.scale
		);
		return this.positionToLogic(deltaPosition.x, deltaPosition.y);
	}
};
