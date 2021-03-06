var ProductTypes = {
    CROP_WHEAT : "crop_wheat",
    CROP_CORN : "crop_corn",
    CROP_CARROT : "crop_carrot",
    CROP_SOYBEAN : "crop_soybean",
    CROP_SUGARCANE : "crop_sugarcane",

    //
    GOOD_EGG: "good_egg",
    GOOD_MILK: "good_milk",

    PRODUCT_BREAD: "product_bread",
    PRODUCT_CORN_BREAD: "product_corn_bread",
    PRODUCT_COOKIE: "product_cookie",

    FOOD_CHICKEN: "food_chicken",
    FOOD_COW: "food_cow",

    PRODUCT_CREAM: "product_cream",
    PRODUCT_BUTTER: "product_butter",
    PRODUCT_BROWN_SUGAR: "product_brown_sugar",
    PRODUCT_POPCORN: "product_popcorn",
    PRODUCT_PANCAKE: "product_pancake",


//    ////
    CROP_INDIGO : "crop_indigo",
    CROP_CHILI : "crop_chili_pepper",
    CROP_TOMATO : "crop_tomato",
    CROP_STRAWBERRY : "crop_strawberry",


    /*
    TOOL
     */
    TOOL_NAIL : "tool_nail",
    TOOL_SCREW : "tool_screw",
    TOOL_WOODPANEL : "tool_woodPanel",

    TOOL_BOLT : "tool_bolt",
    TOOL_PLANK : "tool_plank",
    TOOL_DUCTTAPE : "tool_ductTape",

    //
    TOOL_AXE: "tool_axe",
    TOOl_SAW: "tool_saw",
    TOOL_DYNOMITE: "tool_dynamite",
    TOOL_DEMOLITION_CHARGE: "tool_demolition_charge",
    TOOL_SHOVEL: "tool_shovel"
};

function getKeyByValue(value) {
    for (var k in ProductTypes) {
        if (ProductTypes[k] === value) {
            return k;
        }
    }
}


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


//[
//    {
//        "id": "crop_wheat",
//        "harvest": "2",
//        "time": "120",
//        "level": "1",
//        "name": "Lua",
//        "harvestExp": "1",
//        "percentMaterial": "1",
//        "maxPrice": "3",
//        "growTimeType": "1",
//        "rPrice": "1",
//        "instantPrice": "1",
//
//
//        "animation_res": "game/animation/luanuoc",
//        "plantAni": "Luanuoc_1",
//
//        "grow1": "Luanuoc_2",
//        "grow2": "Luanuoc3",
//        "grow3": "selected",
//        "grow4": "Luanuoc_chin",
//
//        "cropAni": "Luanuoc_Harvest"
//
//    },
//    {
//        "id": "crop_corn",
//        "harvest": "2",
//        "time": "300",
//        "level": "2",
//        "name": "Ngo",
//        "harvestExp": "1",
//        "percentMaterial": "1",
//        "maxPrice": "7",
//        "growTimeType": "1",
//        "rPrice": "1",
//        "instantPrice": "1",
//
//
//
//        "animation_res": "game/animation/Ngo",
//        "plantAni": "Ngo_hat",
//
//        "grow1": "Ngo_non",
//        "grow2": "Ngo_Hoa",
//        "grow3": "selected",
//        "grow4": "Ngo_bap",
//
//
//        "cropAni": "Ngo_Th"
//    },
//    {
//        "id": "crop_carrot",
//        "harvest": "2",
//        "time": "600",
//        "level": "9",
//        "name": "Ca rot",
//        "harvestExp": "2",
//        "percentMaterial": "2",
//        "maxPrice": "7",
//        "growTimeType": "1",
//        "rPrice": "2",
//        "instantPrice": "2",
//
//
//
//        "animation_res": "game/animation/Carot",
//        "plantAni": "Carot_mam",
//
//        "grow1": "Carot_La",
//        "grow2": "Carot_nho",
//        "grow3": "selected",
//        "grow4": "Carot_chin",
//
//        "cropAni": "Carot_Harvest"
//    },
//    {
//        "id": "crop_soybean",
//        "harvest": "2",
//        "time": "1200",
//        "level": "5",
//        "name": "Dau nanh",
//        "harvestExp": "2",
//        "percentMaterial": "2",
//        "maxPrice": "10",
//        "growTimeType": "1",
//        "rPrice": "2",
//        "instantPrice": "2",
//
//
//
//        "animation_res": "game/animation/DauHL",
//        "plantAni": "DauHL_Mam",
//
//        "grow1": "DauHL_La",
//        "grow2": "DauHL_Hoa",
//        "grow3": "selected",
//        "grow4": "DauHL_chin",
//
//        "cropAni": "DauHL_Harvest"
//    },
//    {
//        "id": "crop_sugarcane",
//        "harvest": "2",
//        "time": "1800",
//        "level": "7",
//        "name": "Mia",
//        "harvestExp": "3",
//        "percentMaterial": "3",
//        "maxPrice": "14",
//        "growTimeType": "1",
//        "rPrice": "3",
//        "instantPrice": "3",
//
//
//
//        "animation_res": "game/animation/Mia",
//        "plantAni": "Mia_mam",
//
//        "grow1": "Mia_non",
//        "grow2": "Mia_nho",
//        "grow3": "selected",
//        "grow4": "Mia_to",
//
//        "cropAni": "Mia_Harvest"
//    },
//    {
//        "id": "crop_indigo",
//        "harvest": "2",
//        "time": "7200",
//        "level": "13",
//        "name": "Hoa oai huong",
//        "harvestExp": "5",
//        "percentMaterial": "4",
//        "maxPrice": "25",
//        "growTimeType": "2",
//        "rPrice": "5",
//        "instantPrice": "5",
//
//
//        "animation_res": "game/animation/OaiHuong",
//        "plantAni": "OaiHuong_mam",
//
//        "grow1": "OaiHuong_nho",
//        "grow2": "OaiHuong_hoanho",
//        "grow3": "selected",
//        "grow4": "OaiHuong_to",
//
//        "cropAni": "OaiHuong_TH"
//
//    },
//    {
//        "id": "crop_chili_pepper",
//        "harvest": "2",
//        "time": "14400",
//        "level": "25",
//        "name": "Ot",
//        "harvestExp": "7",
//        "percentMaterial": "5",
//        "maxPrice": "36",
//        "growTimeType": "2",
//        "rPrice": "7",
//        "instantPrice": "7",
//
//
//        "animation_res": "game/animation/Ot",
//        "plantAni": "Ot_Mam",
//
//        "grow1": "Ot_la",
//        "grow2": "Ot_Hoa",
//        "grow3": "selected",
//        "grow4": "Ot_to",
//
//        "cropAni": "Ot_Harvest"
//
//
//    },
//    {
//        "id": "crop_tomato",
//        "harvest": "2",
//        "time": "21600",
//        "level": "30",
//        "name": "Ca chua",
//        "harvestExp": "8",
//        "percentMaterial": "5",
//        "maxPrice": "43",
//        "growTimeType": "3",
//        "rPrice": "8",
//        "instantPrice": "8",
//
//
//        "animation_res": "game/animation/Cachua",
//        "plantAni": "Cachua_mam",
//
//        "grow1": "Cachua_non",
//        "grow2": "Cachua_quaxanh",
//        "grow3": "selected",
//        "grow4": "Cachua_chin",
//
//        "cropAni": "Cachua_thuhoach"
//
//
//    },
//    {
//        "id": "crop_strawberry",
//        "harvest": "2",
//        "time": "28800",
//        "level": "34",
//        "name": "Dau tay",
//        "harvestExp": "10",
//        "percentMaterial": "6",
//        "maxPrice": "50",
//        "growTimeType": "3",
//        "rPrice": "10",
//        "instantPrice": "10",
//
//
//        "animation_res": "game/animation/Dautay",
//        "plantAni": "Dau_mam",
//
//        "grow1": "Dau_la",
//        "grow2": "Dau_hoa",
//        "grow3": "selected",
//        "grow4": "Dau_chin",
//
//        "cropAni": "Dau_Harvest"
//
//
//    }
//]



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
