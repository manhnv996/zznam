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
        storage_upgrade_png: r("button -nangcap.png"),
        SILO_full: r("Kho chứa đồ đã đầy!.png"),
        warehouse_full: r("Kho lươngthuc.png"),

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
