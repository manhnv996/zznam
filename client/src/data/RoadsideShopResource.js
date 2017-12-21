/**
 * Created by CPU60075_LOCAL on 12/20/2017.
 */

var _ = (function() {
    function r(_res) {
        return "Art/roadside shop/" + _res;
    }

    var RoadsideShopResource = {
        //friend_arrowLeft: r("arrowLeft.png"),
        //friend_arrowRight: r("arrowRight.png"),
        roadshop_bg_out: r("BG1.png"),
        roadshop_bg_in: r("BG.png"),
        roadshop_cart: r("slot3 DB.png"),
        price_table: r("slot2.png"),
        star_level: r("star.png"),
        paper: r("paper.png"),
        bangten: r("bangten.png"),

        sell_bg: r("guiban/BG.png"),
        sell_button: r("button-banhang.png"),
        sell_silo: r("button-kho2.png"),
        sell_ware: r("button-kho1.png")
    };

    var g_RoadsideShopResource = [];


    for (var k in RoadsideShopResource) {
        g_RoadsideShopResource.push(RoadsideShopResource[k]);
    }
    return {
        RoadsideShopResource: RoadsideShopResource,
        g_RoadsideShopResource: g_RoadsideShopResource
    }
})();

var RoadsideShopResource = _.RoadsideShopResource;
var g_RoadsideShopResource = _.g_RoadsideShopResource;