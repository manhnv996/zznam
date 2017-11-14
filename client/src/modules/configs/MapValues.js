var MapValues = (function() {
	var iLength = 262;
	var jLength = 134;
	return {
		iLength: iLength,
		jLength: jLength,
		logicToPosition: function(x, y) {
			var _x = (x - y) * iLength / 2;
			var _y = (- x - y) * jLength / 2;
			return cc.p(_x, _y);
		}
	}
})();
