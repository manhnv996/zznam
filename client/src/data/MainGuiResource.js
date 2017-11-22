/**
 * Created by CPU60135_LOCAL on 11/22/2017.
 */
var _ = (function() {
    function r(_res) {
        return "Art/Main Gui/" + _res;
    }
    var MainGuiResource = {
        BUTTON_CONG_2: 	r("butoon- cong 2.png"),
        BUTTON_TRU_2_PNG: 		r("butoon-tru2.png"),
        BUTTON_FIEND_2_PNG: 	r("button-friend2.png"),
        BUTTON_SETTING_2_PNG: 	r("button-setting2.png"),
        BUTTON_SHOP_2_PNG: 	r("button-shop2.png"),
        EXP_111_PNG: 		r("exp-111.png"),
        EXP_221_PNG: 		r("exp-221.png"),
        MOVE_2_PNG: 		r("move2.png"),
        STAR_1_PNG: 			r("star1.png"),
    };

    var g_MainGuiResource = [];
    for (var k in MainGuiResource) {
        g_MainGuiResource.push(MainGuiResource[k]);
    }
    return {
        MainGuiResource: MainGuiResource,
        g_MainGuiResource: g_MainGuiResource
    }
})();

var MainGuiResource = _.MainGuiResource;
var g_MainGuiResource = _.g_MainGuiResource;
