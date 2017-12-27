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

        sellGUI_bg: r("guiban/BG.png"),
        btn_reduce: r("guiban/butoon1.png"),
        btn_add: r("guiban/butoon2.png"),
        btn_sell: r("guiban/button-banhang.png"),
        sell_silo: r("guiban/button-kho2.png"),
        sell_ware: r("guiban/button-kho1.png"),

        //
        guiEdit: r("guiban/guiedit/edit.png"),
        rac: r("guiban/guiedit/bo rac.png"),
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