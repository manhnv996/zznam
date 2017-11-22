/**
 * Created by CPU60075_LOCAL on 11/16/2017.
 */

var _ = (function() {
    function r(_res) {
        return "Art/Shop/" + _res;
    }

    var ShopResource = {
        shop_icon_png: "Art/Main Gui/button-shop2.png",
        gold_png: "Art/Truck Order/Gui-oders/gold1.png",
        shop_bg_png: 	r("BG.png"),
        shop_btLodge_n_png: r("button1-1.png"),
        shop_btLodge_s_png: r("button1.png"),
        shop_btAnimal_n_png: r("button2-1.png"),
        shop_btAnimal_s_png: r("button2.png"),
        shop_btMachine_n_png: r("button3-1.png"),
        shop_btMachine_s_png: r("button3.png"),
        shop_btTree_n_png: r("button4-1.png"),
        shop_btTree_s_png: r("button4.png"),
        shop_slot_png: r("SLOT.png"),
        bg_notify_png: "Art/Storage/BG2.png",
        activity_notify_png: "Art/Storage/Layer 24.png",
        close_png: "Art/Storage/tuchoi.png",

/*        shop_field_png: r("icon chuong/odat2.png"),
        shop_lodge_ga_png: r("icon chuong/chuongGa.png"),
        shop_lodge_lon_png: r("icon chuong/chuongLon.png"),
        shop_lodge_bo_png: r("icon chuong/chuongBo"),
        shop_lodge_cuu_png: r("icon chuong/chuongCuu.png"),
        shop_lodge_de_png: r("icon chuong/chuongDe.png"),*/

        //shop_animal_ga_png: r("icon vatnuoi/chicken.png"),
        //shop_animal_bo_png: r("icon vatnuoi/cow.png"),
        //shop_animal_lon_png: r("icon vatnuoi/pig.png"),
        //shop_animal_cuu_png: r("icon vatnuoi/sheep.png"),
        //shop_animal_de_png: r("icon vatnuoi/goat.png"),

        infoCoopItem: JSON.parse(jsb.fileUtils.getStringFromFile("res/config/gameshopconfig/gsCoopConfig.json")),
        infoAnimalItem: JSON.parse(jsb.fileUtils.getStringFromFile("res/config/gameshopconfig/gsAnimalConfig.json")),
        infoMachineItem: JSON.parse(jsb.fileUtils.getStringFromFile("res/config/gameshopconfig/gsMachineConfig.json")),
        infoTreeItem: JSON.parse(jsb.fileUtils.getStringFromFile("res/config/gameshopconfig/gsTreeConfig.json"))
        //infoShopItem: JSON.parse(jsb.fileUtils.getStringFromFile("res/config/gameshopconfig/shopConfigs.json"))
    };

    var g_ShopResource = [];
    ShopResource.infoCoopItem.forEach(function(content) {
        g_ShopResource.push(content.nameIconShop);
    });
    ShopResource.infoAnimalItem.forEach(function(content) {
        g_ShopResource.push(content.nameIconShop);
    });
    ShopResource.infoMachineItem.forEach(function(content) {
        g_ShopResource.push(content.nameIconShop);
    });
    ShopResource.infoTreeItem.forEach(function (content) {
        g_ShopResource.push(content.nameIconShop);
    });
    for (var k in ShopResource) {
        g_ShopResource.push(ShopResource[k]);
    }
    return {
        ShopResource: ShopResource,
        g_ShopResource: g_ShopResource
    }
})();

var ShopResource = _.ShopResource;
var g_ShopResource = _.g_ShopResource;