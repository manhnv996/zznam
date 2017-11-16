
var ProductTypes = {

    CROP_WHEAT: "crop_wheat",
    CROP_CORN: "crop_corn",
    CROP_CARROT: "crop_carrot",
    CROP_SOYBEAN: "crop_soybean",
    CROP_SUGARCANE: "crop_sugarcane",



    //GOOD_EGG: 10,
    //GOOF_MILK: 11,
    //
    //PRODUCT_BREAD: 20,
    //PRODUCT_CORN_BREAD: 21,
    //PRODUCT_COOKIE: 22,
    //FOOD_CHICKEN: 23,
    //FOOD_COW: 24,
    //PRODUCT_CREAM: 25,
    //PRODUCT_BUTTER: 26,
    //PRODUCT_BROWN_SUGAR: 27,
    //PRODUCT_POPCORN: 28,
    //PRODUCT_PANCAKE: 29,
    //
    //CUT_AXE: 30,
    //CUT_SAW: 31,
    //CUT_DYNOMITE: 32,
    //CUT_BIG_BYNOMITE: 33,
    //CUT_SHOVEL: 34

};

//function getSeedLevel(level) {
//
//    // var jsonString = JSON.stringify(ProductTypes);
//    // cc.log(jsonString);
//    // var jsonOject = JSON.parse(jsonString);
//
//
//    //for (var i in jsonOject){
//    //    jsonString = JSON.stringify(i);
//    //    cc.log(jsonString);
//    //    jsonOject = JSON.parse(jsonString);
//    //
//    //    break;
//    //}
//
//
//    var array = [ProductTypes];
//    cc.log(JSON.stringify(array));
//
//    // find_value(array, 'EXP');
//
//    var matches = array.filter(function(val, index, array) {
//        return val.EXP === 1;
//    });
//
//    cc.log(matches);
//
//
//
//    // return [ProductTypes.CROP_WHEAT.TYPE, ProductTypes.CROP_CARROT.TYPE, ProductTypes.CROP_CORN.TYPE];
//
//}

function find_value(array, key) {
    // find will run the provided function for every object in array
    var obj_found = _.find(array, function(obj) {
        // keys returns the keys inside an object
        // so if the key of currently examined object
        // is what we are looking for, return the obj
        if (_.keys(obj)[0] === key) {
            return obj;
        }
    });
    // if an object with such key was found return its value
    if (obj_found) {
        return obj_found[key];
    } else {
        return null;
    }
}



// function getKeyByValue(object, value) {
//     return Object.keys(object).find(key => object[key] === value);
// }

function getKey(object, value) {
    var array = [ProductTypes];
    array.keys(object).find('EXP', object['EXP'] === value);
}
//
// var key = Object.keys(obj).filter(function(key) {return obj[key] === value})[0];

var getKeyByValue = function(searchValue) {
    return _.findKey(hash, function(hashValue) {
        return searchValue === hashValue;
    });
}