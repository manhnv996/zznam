var _ = (function() {
	function r(_res) {
		return "Art/Map/" + _res;
	}
	var MapResource = {
	    GRASS_BLOCK: 	r("grass-lock1x1-2.png"),
	    ROAD_PNG: 		r("road.png"),
	    NOI_DUONG_PNG: 	r("noi duong.png"),
	    ROAD_02_PNG: 	r("road02.png"),
	    NHA_CHINH_PNG: 	r("nha chinh.png"),
	    SONG_1: 		r("song1.png"),
	    SONG_2: 		r("song2.png"),
	    NUI_PNG: 		r("nui.png"),
	    MO_02: 			r("mo02.png"),
	    RAY_TAU: 		r("ray tau.png"),
	    MO_01: 			r("mo01.png"),
	    GRASS_PNG: 		r("grass.png"),
	    TRUCK_ORDER_BG_PNG: "Art/Truck Order/BG.png",
	    DOT_PNG: 		"dot.png",
	    DOT2_PNG: 		"dot2.png",
	    NHOM_CAY_1: 	r("nhom-cay1 x 2.png"),
	    NHOM_CAY_2: 	r("nhom-cay2 x 2.png"),
	    HOA_1: 			r("hoa1.png"),
	    HOA_2: 			r("hoa2.png"),
	    STONE_13: 		r("stone13.png"),
	    STONE_12: 		r("stone12.png"),
	    GRASS_TREE_1: 	r("grass-tre.png"),
	    GRASS_TREE_2: 	r("grass-tree.png"),
	    CAY_02_OUT: 	r("cay02.png"),
	    CAY_01_OUT: 	r("forest_small_tree_2.png"),
	    HABOR: 			r("habor.png"),
	    ROADSIDE_SHOP: 	r("roadside-shop.png"),
	    MAIL_BOX: 		r("mail-box.png"),
	    O_DAT: 			r("Odat.png"),
	    SILO: 			"Art/Storage/silo/silo.png",
	    WAREHOUSE: 		"Art/Storage/wareHouse/warehouse.png"
	};

	var g_MapResource = [];
	for (var k in MapResource) {
	    g_MapResource.push(MapResource[k]);
	}
	return {
		MapResource: MapResource,
		g_MapResource: g_MapResource
	}
})();

var MapResource = _.MapResource;
var g_MapResource = _.g_MapResource;
