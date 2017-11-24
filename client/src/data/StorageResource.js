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
        silo_full: r("Kho chứa đồ đã đầy!.png"),
        warehouse_full: r("Kho lươngthuc.png"),

        upgrade_ware_bolt: "Art/Tool/dinh2.png",
        upgrade_ware_plank: "Art/Tool/go1.png",
        upgrade_ware_ductTape: "Art/Tool/bangdinh.png",

        upgrade_silo_nail: "Art/Tool/dinh3.png",
        upgrade_silo_screw: "Art/Tool/dinh.png",
        upgrade_silo_woodPanel: "Art/Tool/go2.png",

        storage_apple: "Art/Crops/Field/apple.png",

        tooltip_png: "Art/Crops/Gui-act",

        upgradeSilo: JSON.parse(jsb.fileUtils.getStringFromFile("res/config/upgradeSiloConfig.json")),
        upgradeWarehouse: JSON.parse(jsb.fileUtils.getStringFromFile("res/config/upgradeWareConfig.json"))
    };

    var g_StorageResource = [];
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
