
var OrderResource = {
    //
    productconfig: "src/modules/configs/json/productconfig.json",
    //
    //
    bgTruckOrder: "res/Art/Truck Order/Gui-oders/BG.png",
    orderPaper: "res/Art/Truck Order/Gui-oders/giay.png",
    sloPaper: "res/Art/Truck Order/Gui-oders/slo1.png",
    slot2: "res/Art/Truck Order/Gui-oders/slot2.png",
    goldOrder: "res/Art/Truck Order/Gui-oders/gold1.png",
    expOrder: "res/Art/Main Gui/star1.png",

    tickOrder: "res/Art/Truck Order/Gui-oders/X.png",

    btCancelOrder: "res/Art/Truck Order/Gui-oders/rac.png",
    btMakeOrder: "res/Art/Truck Order/Gui-oders/button-xetai.png",



    //for product icon
    iconCropWheat: "res/Art/Crops/Field/crops.png",
    iconCropCorn: "res/Art/Crops/Field/corn.png",
    iconCropCarrot: "res/Art/Crops/Field/caroot.png",
    iconCropSoybean: "res/Art/Crops/Field/dau.png",
    iconCropSugarcane: "res/Art/Crops/Field/mia.png",

    iconGoodEgg: "res/Art/Machine/items/feed mill/egg.png",
    iconGoodMilk: "res/Art/Machine/items/feed mill/milk.png",

    iconProductBread: "res/Art/Machine/items/bakery/bread.png",
    iconProductCornBread: "res/Art/Machine/items/bakery/bread corn.png",
    iconProductCookie: "res/Art/Machine/items/bakery/cookie.png",

    iconFoodChicken: "res/Art/Machine/items/feed mill/Feed-chicken.png",
    iconFoodCow: "res/Art/Machine/items/feed mill/Feed-cow.png",

    iconProductPopcorn: "res/Art/Machine/items/Popcorn pot/popcorn.png",
    iconProductBrownSugar: "res/Art/Machine/items/Sugar mill/brown-sugar.png",
    iconProductButter: "res/Art/Machine/items/Dairy/butter.png",
    iconProductCream: "res/Art/Machine/items/Dairy/cream.png",
    iconProductPancake: "res/Art/Machine/items/BBQ Grill/pancake.png",


};

var g_OrderResource = [];

for (var k in OrderResource) {
    g_OrderResource.push(OrderResource[k]);
}
