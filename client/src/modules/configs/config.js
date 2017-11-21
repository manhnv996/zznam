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

        if (productTypeObj[i].level <= (level + 29)) {
            //seedLevelList.push(productTypeObj[i].id);
            seedLevelList.unshift(productTypeObj[i].id);
        }
    }

    return seedLevelList;
}

function getSeedShow(level) {

    var seedLevel = getSeedLevel(level);
    var seedList = user.getAsset().getFoodStorage().getItemList();

    var seedShow = [];
    for (var i = 0; i < seedLevel.length; i++){
        if (user.getAsset().getFoodStorage().getQuantity(seedLevel[i]) == 0){
            if (getProductObjByType(seedLevel[i]).level <= user.getLevel()){
                seedShow.push(new StorageItem(seedLevel[i], 0));
            } else {
                seedShow.push(new StorageItem(seedLevel[i], null));
            }
        }
    }
    for (var i = 0; i < seedList.length; i++){
        seedShow.push(new StorageItem(seedList[i].getTypeItem(), seedList[i].getQuantityItem()));
    }

    seedShow.sort(function(a, b) {
        if (getProductObjByType(a.getTypeItem()).level <= user.getLevel() || a.getQuantityItem() != null){
            return getProductObjByType(a.getTypeItem()).level - getProductObjByType(b.getTypeItem()).level;
        }

    });
    seedShow.reverse();

    return seedShow;
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


        //
        case ProductTypes.CROP_INDIGO:
            return resAniId.OaiHuong;

        case ProductTypes.CROP_CHILI:
            return resAniId.Ot;

        case ProductTypes.CROP_TOMATO:
            return resAniId.Cachua;

        case ProductTypes.CROP_STRAWBERRY:
            return resAniId.Dautay;

        default:
            return null;

    }

}

function getSeedImgBySeedTypeAndQuantity(seedType, quantity) {
    switch (seedType) {
        case ProductTypes.CROP_WHEAT:
            if (quantity == null){
                return res.crops_null;
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

        //
        case ProductTypes.CROP_INDIGO:
            if (quantity == null){
                return res.indigo_null;
            }
            return res.indigo;

        case ProductTypes.CROP_CHILI:
            if (quantity == null){
                return res.chili_null;
            }
            return res.chili;

        case ProductTypes.CROP_TOMATO:
            if (quantity == null){
                return res.tomato_null;
            }
            return res.tomato;

        case ProductTypes.CROP_STRAWBERRY:
            if (quantity == null){
                return res.strawberry_null;
            }
            return res.strawberry;

        default:
            return null;

    }

}