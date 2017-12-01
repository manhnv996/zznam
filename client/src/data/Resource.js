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
    FONT_NORMAL_20: "fonts/normal/20.fnt",
    FONT_NORMAL_30: "fonts/normal/30.fnt",
    FONT_NORMAL_50: "fonts/normal/50.fnt",

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


for (var k in ShopResource) {
    res[k] = ShopResource[k];
}

for (var k in StorageResource) {
    res[k] = StorageResource[k];
}

for (var i in res) {
    g_resources.push(res[i]);
}

//g_resources = g_resources.concat(g_MapResource, g_ShopResource);


for (var k in HavestResource) {
    res[k] = HavestResource[k];
}

/*g_resources = g_resources.concat(g_MapResource, g_HavestResource);*/


//add resources in Art/Main Gui
for (var k in MainGuiResource) {
    res[k] = MainGuiResource[k];
}
//add resources in Art/Main Gui/setting
for (var k in SettingsResource) {
    res[k] = SettingsResource[k];
}

//add resources in /fonts/
for (var k in FontResource) {
    res[k] = FontResource[k];
}


//add resources in /fonts/
for (var k in MachineItemResource) {
    res[k] = MachineItemResource[k];
}