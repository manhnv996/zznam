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
        PRELOADER_CHRISTMAS_PNG: 			"Art/preloader.png",
        PRELOADER_LOADING_4_PNG: 			"Art/loading4.png",
        PRELOADER_SUMMER_PNG: 		"Art/loading he copy.png",
        PRETTY_BG_DIALOG_PNG: 		"Art/Truck Order/Gui-oders/BG.png",
        TU_CHOI_PNG: 		r("tuchoi.png"),
        DONG_Y_PNG:         r("butoon-V.png"),
        CHECK_BOX_NORMAL_PNG:         r("check_box_normal.png"),
        CHECK_BOX_NORMAL_PRESS_PNG:         r("check_box_normal_press.png"),
        CHECK_BOX_ACTIVE_PNG:         r("check_box_active.png"),
        HOME_BTN: r("home.png")
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
