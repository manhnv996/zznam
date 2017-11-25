/**
 * Created by CPU60135_LOCAL on 11/24/2017.
 */
var _ = (function() {

    //return path of the fonts
    function r(_res) {
        return "fonts/" + _res;
    };

    function r_normal(_res) {
        return "fonts/normal" + _res;
    };
    function r_outline(_res) {
        return "fonts/outline" + _res;
    };

    var FontResource = {
        DICE_NUMBER_PNG:    r("diceNumber.png"),
        DICE_NUMBER_FNT:    r("diceNumber.fnt"),
        EFF_NUMBER_PNG:    r("eff_number.png"),
        EFF_NUMBER_FNT:    r("eff_number.fnt"),
        NUMBER_1_PNG:    r("number_1.png"),
        NUMBER_1_FNT:    r("number_1.fnt"),

        FONT_NORMAL_20_PNG:    r_normal("20.png"),
        FONT_NORMAL_20_FNT:    r_normal("20.fnt"),
        FONT_NORMAL_30_PNG:    r_normal("30.png"),
        FONT_NORMAL_30_FNT:    r_normal("30.fnt"),
        FONT_NORMAL_50_PNG:    r_normal("50.png"),
        FONT_NORMAL_50_FNT:    r_normal("50.fnt"),
        FONT_NORMAL_80_PNG:    r_normal("80.png"),
        FONT_NORMAL_80_FNT:    r_normal("80.fnt"),

        FONT_OUTLINE_15_PNG:    r_outline("15.png"),
        FONT_OUTLINE_15_FNT:    r_outline("15.fnt"),
        FONT_OUTLINE_20_PNG:    r_outline("20.png"),
        FONT_OUTLINE_20_FNT:    r_outline("20.fnt"),
        FONT_OUTLINE_30_PNG:    r_outline("30.png"),
        FONT_OUTLINE_30_FNT:    r_outline("30.fnt"),
        FONT_OUTLINE_50_PNG:    r_outline("50.png"),
        FONT_OUTLINE_50_FNT:    r_outline("50.fnt"),
        FONT_OUTLINE_80_PNG:    r_outline("80.png"),
        FONT_OUTLINE_80_FNT:    r_outline("80.fnt")
    };

    var g_FontResource = [];
    for (var k in FontResource) {
        g_FontResource.push(FontResource[k]);
    }
    return {
        FontResource: FontResource,
        g_FontResource: g_FontResource
    }
})();

var FontResource = _.FontResource;
var g_FontResource = _.g_FontResource;
