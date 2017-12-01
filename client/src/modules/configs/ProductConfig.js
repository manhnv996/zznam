/**
 * Created by CPU60133_LOCAL on 11/30/2017.
 */

var productIconMap = {};

productIconMap[ProductTypes.CROP_WHEAT] = res.iconCropWheat;
productIconMap[ProductTypes.CROP_CORN] = res.iconCropCorn;
productIconMap[ProductTypes.CROP_CARROT] = res.iconCropCarrot;
productIconMap[ProductTypes.CROP_SOYBEAN] = res.iconCropSoybean;
productIconMap[ProductTypes.CROP_SUGARCANE] = res.iconCropSugarcane;

productIconMap[ProductTypes.GOOD_EGG] = res.iconGoodEgg;
productIconMap[ProductTypes.GOOF_MILK] = res.iconGoodMilk;

productIconMap[ProductTypes.PRODUCT_BREAD] = res.iconProductBread;
productIconMap[ProductTypes.PRODUCT_CORN_BREAD] = res.iconProductCornBread;
productIconMap[ProductTypes.PRODUCT_COOKIE] = res.iconProductCookie;

productIconMap[ProductTypes.FOOD_CHICKEN] = res.iconFoodChicken;
productIconMap[ProductTypes.FOOD_COW] = res.iconFoodCow;

productIconMap[ProductTypes.PRODUCT_CREAM] = res.iconProductPopcorn;
productIconMap[ProductTypes.PRODUCT_BUTTER] = res.iconProductBrownSugar;
productIconMap[ProductTypes.PRODUCT_BROWN_SUGAR] = res.iconProductButter;
productIconMap[ProductTypes.PRODUCT_POPCORN] = res.iconProductCream;
productIconMap[ProductTypes.PRODUCT_PANCAKE] = res.iconProductPancake;

/**
 *
 * @type {string}
 */

productIconMap[ProductTypes.TOOL_NAIL] = res.iconProductBread;
productIconMap[ProductTypes.TOOL_SCREW] = res.iconProductCornBread;
productIconMap[ProductTypes.TOOL_WOODPANEL] = res.iconProductCookie;

productIconMap[ProductTypes.TOOL_BOLT] = res.iconProductBread;
productIconMap[ProductTypes.TOOL_PLANK] = res.iconProductCornBread;
productIconMap[ProductTypes.TOOL_DUCTTAPE] = res.iconProductCookie;

function getProductIconById(productId){
    return productIconMap[productId];

}


function removeBlockListener(productId) {
    var productTypeObj = null;
    cc.loader.loadJson(res.productconfig, function (error, data) {
        productTypeObj = data;
        //ProductType = data;
    });

    for (var i = 0; i < productTypeObj.length; i++) {
        if (productTypeObj[i].id == productId) {
            return productTypeObj[i];
        }
    }

    return null;
}

