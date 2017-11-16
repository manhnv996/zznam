/**
 * Created by GSN on 6/2/2015.
 */


var res = {
    //font
    FONT_BITMAP_NUMBER_1:"fonts/number_1.fnt",
    FONT_BITMAP_DICE_NUMBER: "fonts/diceNumber.fnt",
    //
    FONT_EFFECT_NUMBER: "fonts/eff_number.fnt",
    FONT_OUTLINE_20: "fonts/outline/20.fnt",
    FONT_OUTLINE_30: "fonts/outline/30.fnt",
    FONT_OUTLINE_50: "fonts/outline/50.fnt",

    //zcsd
    //screen
    ZCSD_SCREEN_MENU:"zcsd/screen_menu.json",
    ZCSD_SCREEN_NETWORK:"zcsd/screen_network.json",
    ZCSD_SCREEN_LOCALIZATION:"zcsd/screen_localize.json",
    ZCSD_SCREEN_DRAGON_BONES:"zcsd/screen_dragon_bones.json",
    ZCSD_SCREEN_DECRYPTION:"zcsd/screen_decryption.json",
    ZCSD_SCREEN_ZALO:"zcsd/screen_zalo.json",
    //popup
    ZCSD_POPUP_MINI_GAME:"zcsd/game/mini_game/PopupMiniGame.json",
    //images
    Slot1_png : "zcsd/slot1.png",



//////////////////
    ///////////
    cropconfig: "src/modules/configs/json/cropconfig.json",
    ////////////////


    //background_jpg: "res/img/background.jpg",
    //
    caroot: "res/Art/Crops/Field/caroot.png",
    corn: "res/Art/Crops/Field/corn.png",
    crops: "res/Art/Crops/Field/crops.png",
    sausages: "res/Art/Crops/Field/dau.png",
    mia: "res/Art/Crops/Field/mia.png",

    caroot_null: "res/Art/Crops/Gui-act/hethat/icon/carrot.png",
    corn_null: "res/Art/Crops/Gui-act/hethat/icon/corn.png",
    crops_null: "res/Art/Crops/Gui-act/hethat/icon/carrot.png",
    sausages_null: "res/Art/Crops/Gui-act/hethat/icon/sausages.png",
    mia_null: "res/Art/Crops/Gui-act/hethat/icon/mia.png",


    field: "res/Art/Crops/Field/field.png",


    liem: "res/Art/Tool/liem.png",

    popup1: "res/Art/Crops/Gui-act/1.png",
    popup2: "res/Art/Crops/Gui-act/2.png",
    popup4: "res/Art/Crops/Gui-act/4.png",
    popup5: "res/Art/Crops/Gui-act/5.png",


    slot: "res/Art/Crops/Gui-act/slot.png",
    tooltip: "res/Art/Crops/Gui-act/tooltip.png",
    ten: "res/Art/Crops/Gui-act/ten.png",
    btBoost: "res/Art/Crops/Gui-act/button-energy2.png",
    rubi: "res/Art/Crops/Gui-act/hethat/ngoc-nho.png",



    progressbar: "res/Art/Main Gui/exp-111.png",
    progress: "res/Art/Main Gui/exp-221.png",

    bgNotice: "res/Art/Storage/gui-thongbao.png",
    msgFullFoodStorage: "res/Art/Storage/Kho chứa đồ đã đầy!.png",


    //plant animation
    caroot_plist: "res/Art/Crops/animation/caroot/caroot.plist",
    caroot_png: "res/Art/Crops/animation/caroot/caroot.png",


};

var g_resources = [
    "CloseNormal.png",
    "CloseSelected.png",
    "game/animation/character/chipu/skeleton.xml",
    "game/animation/eff_dice_number/skeleton.xml",
    "game/animation/effDiceNumber/skeleton.xml",
    "game/animation/firework_test/skeleton.xml",
    "game/animation/ruongngusac/skeleton.xml",
    "game/animation/Dragon/skeleton.json",
    "game/animation/DragonBoy/skeleton.json",
    "game/animation/lobby_girl/skeleton.xml",
    "config.json",
    "Default/Button_Disable.png",
    "Default/Button_Normal.png",
    "Default/Button_Press.png",

    "favicon.ico",
    "HelloWorld.png",
    "fonts/diceNumber.fnt",
    "fonts/diceNumber.png",
    "fonts/eff_number.fnt",
    "fonts/eff_number.png",
    "fonts/number_1.fnt",
    "fonts/number_1.png",
    "fonts/outline/20.fnt",
    "fonts/outline/20.png",
    "game/animation/character/chipu/texture.plist",
    "game/animation/character/chipu/texture.png",
    "game/animation/eff_dice_number/texture.plist",
    "game/animation/eff_dice_number/texture.png",
    "game/animation/effDiceNumber/texture.plist",
    "game/animation/effDiceNumber/texture.png",
    "game/animation/firework_test/texture.plist",
    "game/animation/firework_test/texture.png",
    "game/animation/ruongngusac/texture.xml",
    "game/animation/ruongngusac/texture.png",
    "game/animation/Dragon/texture.json",
    "game/animation/Dragon/texture.png",
    "game/animation/DragonBoy/texture.json",
    "game/animation/DragonBoy/texture.png",
    "game/animation/lobby_girl/texture.plist",
    "game/animation/lobby_girl/texture.png",
    "ipConfig.json",
    "localize/config.json",
    "localize/vi.txt",
    "localize/en.txt",
    "shaders/change_color.fsh",
    "zcsd/screen_decryption.json",
    "zcsd/screen_dragon_bones.json",
    "zcsd/screen_localize.json",
    "zcsd/screen_menu.json",
    "zcsd/screen_network.json",
    "zcsd/screen_zalo.json"




];

for (var k in MapResource) {
    res[k] = MapResource[k];
}

// for (var i in res) {
//     g_resources.push(res[i]);
// }

g_resources = g_resources.concat(g_MapResource);

