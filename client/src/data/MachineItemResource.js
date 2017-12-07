/**
 * Created by CPU60135_LOCAL on 11/22/2017.
 */
var _ = (function() {
    function r(_res) {
        return "Art/Machine/items/" + _res;
    }
    var MachineItemResource = {
        BREAD_PNG: 	r("bakery/bread.png"),
        BREAD_CORN_PNG: 	r("bakery/bread corn.png"),
        COOKIE_PNG: 	r("bakery/cookie.png"),
        FOOD_CHICKEN_PNG: 	r("feed mill/Feed-chicken.png"),
        FOOD_COW_PNG: 	r("feed mill/Feed-cow.png"),
        FOOD_PIG_PNG: 	r("feed mill/Feed-pig.png"),
        PAN_CAKE_PNG: 	r("BBQ Grill/pancake.png"),
        BUTTER_PNG: 	r("Dairy/butter.png"),
        BUTTER_MINI_PNG: 	r("Dairy/butter_mini.png"),
        CREAM_PNG: 	r("Dairy/cream.png"),
        CREAM_MINI_PNG: 	r("Dairy/cream_mini.png"),
        BROWN_SUGAR_PNG: 	r("Sugar mill/brown-sugar.png"),
        BROWN_SUGAR_MINI_PNG: 	r("Sugar mill/brown-sugar_mini.png"),
        POPCORN_PNG: 	r("Popcorn pot/popcorn.png"),

    };

    var g_MachineItemResource = [];
    for (var k in MachineItemResource) {
        g_MachineItemResource.push(MachineItemResource[k]);
    }
    return {
        MachineItemResource: MachineItemResource,
        g_MachineItemResource: g_MachineItemResource
    }
})();

var MachineItemResource = _.MachineItemResource;
var g_MachineItemResource = _.g_MachineItemResource;