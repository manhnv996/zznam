/**
 * Created by CPU60135_LOCAL on 11/22/2017.
 */
var _ = (function() {
    function r(_res) {
        return "Art/Main Gui/setting/" + _res;
    }
    var SettingsResource = {
        MUSIC_OFF_PNG: 	r("amthanh.png"),
        MUSIC_ON_PNG: 		r("amthanh- turn on.png"),
        BG_SETTING_PNG: 	r("bg_setting.png"),
        BG_2_PNG: 	"Art/Storage/BG2.png",
        BTN_CHANGE_NAME_PNG: 	r("btn_change_name.png"),
        BTN_EFFECT_OFF_PNG: 	r("btn_effect_off.png"),
        BTN_EFFECT_ON_PNG: 		r("btn_effect_on.png"),
        BTN_FEEDBACK_PNG: 		r("btn_feedback.png"),
        BUTTON_HOI_PNG: 		r("buttohn-hi.png"),
        BUTTON_HUONGDAN_PNG: 		r("button-huongdan.png"),
        BUTTON_ZINGME_DANGNHAP_PNG: 	r("button-zingme dangnhap.png"),
        BUTTON_ZINGME_PNG:    r("button-zingme.png"),
        GUI_THONGBAO_PNG:    r("gui-thongbao.png"),
        LAYER_24_PNG:    r("Layer 24.png"),
        TU_CHOI_PNG:    r("tuchoi.png"),
        //_PNG:    r(".png"),
        //DONG_Y_PNG:    r("Đồng ý.png")

    };

    var g_SettingsResource = [];
    for (var k in SettingsResource) {
        g_SettingsResource.push(SettingsResource[k]);
    }
    return {
        SettingsResource: SettingsResource,
        g_SettingsResource: g_SettingsResource
    }
})();

var SettingsResource = _.SettingsResource;
var g_SettingsResource = _.g_SettingsResource;
