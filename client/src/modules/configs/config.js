var config = {};

var ProductType = null;


function getSeedLevel(level) {

    var productTypeObj = null;
    cc.loader.loadJson(res.cropconfig, function (error, data) {
        productTypeObj = data;
        ProductType = data;
        //cc.log("data " + str);// data is the json object
    });

    var seedLevelList = [];
    for (var i = 0; i < productTypeObj.length; i++) {

        if (productTypeObj[i].level <= (level + 2)) {
            //seedLevelList.push(productTypeObj[i].id);
            seedLevelList.unshift(productTypeObj[i].id);
        }
    }

    return seedLevelList;
    // return [ProductTypes.CROP_WHEAT.TYPE, ProductTypes.CROP_CARROT.TYPE, ProductTypes.CROP_CORN.TYPE];

}

function getProductObjByType(productId) {
    var productTypeObj = null;
    cc.loader.loadJson(res.cropconfig, function (error, data) {
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

function getResAniIdBySeedType(seedType) {
    switch (seedType) {
        case ProductTypes.CROP_WHEAT:
            return resAniId.luanuoc;

        case ProductTypes.CROP_CORN:
            return resAniId.Ngo;

        case ProductTypes.CROP_CARROT:
            return resAniId.Carot;

        case ProductTypes.CROP_SOYBEAN:
            return resAniId.DauHL;

        case ProductTypes.CROP_SUGARCANE:
            return resAniId.Mia;
        default:
            return null;

    }

}

function getSeedImgBySeedTypeAndQuantity(seedType, quantity) {
    switch (seedType) {
        case ProductTypes.CROP_WHEAT:
            if (quantity == null){
                res.caroot_null;
            }
            return res.crops;

        case ProductTypes.CROP_CORN:
            if (quantity == null){
                return res.corn_null;
            }
            return res.corn;

        case ProductTypes.CROP_CARROT:
            if (quantity == null){
                return res.caroot_null;
            }
            return res.caroot;

        case ProductTypes.CROP_SOYBEAN:
            if (quantity == null){
                return res.sausages_null;
            }
            return res.sausages;

        case ProductTypes.CROP_SUGARCANE:
            if (quantity == null){
                return res.mia_null;
            }
            return res.mia;

        default:
            return null;

    }

}