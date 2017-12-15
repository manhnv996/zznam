var _ = (function() {
	function r(_res) {
		return 'Art/Tool/' + _res
	}

	var ToolResource = {
		GIO: r("gio.png"),
		XO: r("xo.png"),
		CUA: r("cua.png"),
		RIU: r("riu.png"),
		XENG: r("xeng.png"),
		BOMB: r("bomb.png"),
		BOMB_TNT: r("bomb TNT.png")
	}

	var g_ToolResource = [];
	for (var k in ToolResource) {
		g_ToolResource.push(ToolResource[k]);
	}
	return {
		ToolResource: ToolResource,
		g_ToolResource: g_ToolResource
	}
})();

var ToolResource = _.ToolResource;
var g_ToolResource = _.g_ToolResource;
