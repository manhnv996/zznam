/**
 * Created by CPU60075_LOCAL on 23/11/2017.
 */

var _ = (function() {
    function r(_res) {
        return "Art/Storage/" + _res;
    }

    var StorageResource = {
        storage_bg_png: r("BG.png"),
        storage_V_png: r("butoon-V.png"),
        storage_back_png: r("button -back.png"),
        storage_upgrade_png: r("nangcap.png"),
        storage_btn_png: r("Layer 24.png"),
        storage_arrow: r("muiten.png"),
        warehouse_full: r("fullWare.png"),
        silo_full: r("fullSilo.png"),

        upgrade_ware_bolt: "Art/Tool/dinh2.png",
        upgrade_ware_plank: "Art/Tool/go1.png",
        upgrade_ware_ductTape: "Art/Tool/bangdinh.png",

        upgrade_silo_nail: "Art/Tool/dinh3.png",
        upgrade_silo_screw: "Art/Tool/dinh.png",
        upgrade_silo_woodPanel: "Art/Tool/go2.png",

        storage_apple: "Art/Crops/Field/apple.png",
        storage_carot: "Art/Crops/Field/caroot.png",
        storage_corn: "Art/Crops/Field/corn.png",
        storage_wheat: "Art/Crops/Field/crops.png",
        storage_soybean: "Art/Crops/Field/dau.png",
        storage_sugarcane: "Art/Crops/Field/mia.png",

        storage_buy_tool: "Art/Crops/Gui-act/butoon-congG-1.png",
        ruby_small: "Art/Crops/Gui-act/hethat/ngoc-nho.png",

        tooltip_png: "Art/Crops/Gui-act/tooltip.png",

        upgradeSilo: JSON.parse(jsb.fileUtils.getStringFromFile("res/config/upgradeSiloConfig.json")),
        upgradeWarehouse: JSON.parse(jsb.fileUtils.getStringFromFile("res/config/upgradeWareConfig.json"))
    };

    var g_StorageResource = [];
    g_StorageResource.push("Art/Crops/Field/apple.png");
    g_StorageResource.push("Art/Crops/Field/caroot.png");
    g_StorageResource.push("Art/Crops/Field/crops.png");
    g_StorageResource.push("Art/Crops/Field/vhili pepper.png");
    g_StorageResource.push("Art/Crops/Field/indigo.png");
    g_StorageResource.push("Art/Crops/Field/tomato.png");
    g_StorageResource.push("Art/Crops/Field/strawberry.png");
    g_StorageResource.push("Art/Tool/dinh2.png");
    g_StorageResource.push("Art/Tool/go1.png");
    g_StorageResource.push("Art/Tool/bangdinh.png");
    g_StorageResource.push("Art/Tool/dinh3.png");
    g_StorageResource.push("Art/Tool/dinh.png");
    g_StorageResource.push("Art/Tool/go2.png");
    g_StorageResource.push("Art/Crops/Field/corn.png");
    g_StorageResource.push("Art/Crops/Field/dau.png");
    g_StorageResource.push("Art/Crops/Field/mia.png");
    g_StorageResource.push("Art/Tool/dinh2.png");
    g_StorageResource.push("Art/Tool/go1.png");
    g_StorageResource.push("Art/Tool/bangdinh.png");
    g_StorageResource.push("Art/Tool/dinh3.png");
    g_StorageResource.push("Art/Tool/dinh.png");
    g_StorageResource.push("Art/Tool/go2.png");

    for (var k in StorageResource) {
        g_StorageResource.push(StorageResource[k]);
    }
    return {
        StorageResource: StorageResource,
        g_StorageResource: g_StorageResource
    }
})();

var StorageResource = _.StorageResource;
var g_StorageResource = _.g_StorageResource;
