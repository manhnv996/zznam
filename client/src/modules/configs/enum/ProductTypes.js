
var ProductTypes = {

    CROP_WHEAT: "crop_wheat",
    CROP_CORN: "crop_corn",
    CROP_CARROT: "crop_carrot",
    CROP_SOYBEAN: "crop_soybean",
    CROP_SUGARCANE: "crop_sugarcane",

    CROP_CHILI: "crop_chili_pepper",
    CROP_INDIGO: "crop_indigo",
    CROP_TOMATO: "crop_tomato",
    CROP_STRAWBERRY: "crop_strawberry",



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


// ,
// {
//     "id": "crop_pumpkin",
//     "harvest": "2",
//     "time": "10800",
//     "level": "15",
//     "name": "Bi do",
//     "harvestExp": "6",
//     "percentMaterial": "4",
//     "maxPrice": "32",
//     "growTimeType": "2",
//     "rPrice": "6",
//     "instantPrice": "6"
//
//
//
// },
// {
//     "id": "crop_potato",
//     "harvest": "2",
//     "time": "13200",
//     "level": "35",
//     "name": "Khoai tay",
//     "harvestExp": "7",
//     "percentMaterial": "5",
//     "maxPrice": "36",
//     "growTimeType": "2",
//     "rPrice": "7",
//     "instantPrice": "7"
//
//
// },
// {
//     "id": "crop_lettuce",
//     "harvest": "2",
//     "time": "12600",
//     "level": "58",
//     "name": "Xa lach",
//     "harvestExp": "7",
//     "percentMaterial": "5",
//     "maxPrice": "32",
//     "growTimeType": "2",
//     "rPrice": "7",
//     "instantPrice": "7"
//
//
//
// },
// {
//     "id": "crop_rice",
//     "harvest": "2",
//     "time": "2700",
//     "level": "56",
//     "name": "Lua nep",
//     "harvestExp": "3",
//     "percentMaterial": "3",
//     "maxPrice": "18",
//     "growTimeType": "1",
//     "rPrice": "3",
//     "instantPrice": "3"
//
//
//
// }

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
