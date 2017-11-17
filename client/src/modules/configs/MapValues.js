var MapValues = new function() {
	this.iLength = 262;
	this.jLength = 134;

	// Convert logic map position to map position
	this.logicToPosition = function(xl, yl) { // x-logic, y-logic
		var x = (xl - yl) * this.iLength / 2;
		var y = (- xl - yl) * this.jLength / 2;
		return cc.p(x, y); // x-of map, y-of map
	}

	// Convert map position to logic map position
	this.positionToLogic = function(x, y) {
		var xl = x / this.iLength - y / this.jLength;
		var yl = -x / this.iLength - y / this.jLength;

		return cc.p(xl, yl);
	}

	// Convert screen position to map position
	this.screenPositionToMapPosition = function(x, y) {
		var map = MapLayer.instance;
		var mapCenterPosition = cc.p(
			cc.winSize.width / 2 + map.x,
			cc.winSize.height / 2 + map.y
		);
		var mapRootPosition = cc.p(
			mapCenterPosition.x - map.scale * map.width / 2,
			mapCenterPosition.y - map.scale * map.height / 2
		);
		return cc.p(
			(x - mapRootPosition.x) / map.scale,
			(y - mapRootPosition.y) / map.scale
		);
	}

	// Convert screen position to logic map position
	this.screenPositionToLogic = function(x, y) {
		// First convert screen position to map position
		var mapPosition = this.screenPositionToMapPosition(x, y)
		// Last convert map position to logic map position
		return this.positionToLogic(mapPosition.x, mapPosition.y);
	}

	this.mapPositionToScreenPosition = function(x, y) {
		var map = MapLayer.instance;
		var mapCenter = cc.p(
			map.width / 2,
			map.height / 2
		);
		var delta = cc.p(
			(mapCenter.x - x) * map.scale,
			(mapCenter.y - y) * map.scale
		);
		var mapPosition = map.getPosition();
		var d = cc.p(
			mapPosition.x - delta.x,
			mapPosition.y - delta.y
		);
		var screenCenter = cc.p(
			cc.winSize.width / 2,
			cc.winSize.height / 2
		);
		return cc.p(
			screenCenter.x + d.x,
			screenCenter.y + d.y
		);
	}

	this.logicToScreenPosition = function(xl, yl) {
		var mapPosition = this.logicToPosition(xl, yl);
		return this.mapPositionToScreenPosition(mapPosition.x, mapPosition.y);
	}

	// xl = x / this.iLength - y / this.jLength;
	// yl = -x / this.iLength - y / this.jLength;
	// Find linear by logic map position => return y
	this.yLinearByXl = function(xl, x) {
		return this.jLength * (- xl + x / this.iLength);
	}

	// Find linear by logic map position => return x
	this.xLinearByXl = function(xl, y) {
		return this.iLength * (xl + y / this.jLength);
	}

	this.yLinearByYl = function(yl, x) {
		return this.jLength * (- yl - x / this.iLength); 
	}

	this.xLinearByYl = function(yl, y) {
		return this.iLength * (- yl - y / this.jLength); 
	}
};
