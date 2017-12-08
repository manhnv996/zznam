/**
 * Created by CPU60135_LOCAL on 11/29/2017.
 */

var MACHINE_CONFIG = {};

var MA_LOG_TAG = "MAHCHINE_LOG_TAG: ";
MACHINE_CONFIG.FIRST_PRICE_BUY_SLOT = 6;
MACHINE_CONFIG.NEXT_PRICE_BUY_SLOT = 3;
MACHINE_CONFIG.SPEED_UP = 1;

var MACHINE_LIST = [];

MACHINE_LIST.push({
    machineType: "food_machine",
    size: {
        width: 3,
        height: 3
    },
    slot: 3,
    mapItemEnum: MapItemEnum.FOOD_GRINDER,
    aniId: resAniId.feed_mill,
    productList: [
        {
            productType: "food_chicken",
            name: "Thức Ăn Cho Gà",
            res_path: res.FOOD_CHICKEN_PNG,
            speedUp: 1,
            rubyToBuy: 4, // truong hop thieu nguyen lieu user muon mua lun
            time: 5,
            exp: 3,
            price: 21,
            levelUnlock: 2
        },
        {
            productType: "food_cow",
            name: "Thức Ăn Cho Bò",
            res_path: res.FOOD_COW_PNG,
            speedUp: 1,
            rubyToBuy: 4, // truong hop thieu nguyen lieu user muon mua lun
            time: 5,
            exp: 3,
            price: 21,
            levelUnlock: 2
        },
        {
            productType: "food_pig",
            name: "Thức Ăn Cho Lợn",
            res_path: res.FOOD_PIG_PNG,
            speedUp: 1,
            rubyToBuy: 4, // truong hop thieu nguyen lieu user muon mua lun
            time: 5,
            exp: 3,
            price: 21,
            levelUnlock: 15
        }
    ]

});

MACHINE_LIST.push({
    machineType: "bakery_machine",
    size: {
        width: 3,
        height: 3
    },
    slot: 2,

    mapItemEnum: MapItemEnum.BAKERY,
    aniId: resAniId.bakery,
    productList: [
        {
        productType: "product_bread",
        name: "Bánh Mì",
            res_path: res.BREAD_PNG,
        speedUp: 1,
        rubyToBuy: 4, // truong hop thieu nguyen lieu user muon mua lun
        time: 5,
        exp: 3,
        price: 21,
        levelUnlock: 2,
        rawMaterialList: [{rawMaterialId: "crop_wheat", quantity: 3}]
         },
        {
            productType: "product_corn_bread",
            name: "Bánh Mì",
            res_path: res.BREAD_CORN_PNG,
            speedUp: 1,
            rubyToBuy: 4, // truong hop thieu nguyen lieu user muon mua lun
            time: 5,
            exp: 3,
            price: 21,
            levelUnlock: 2,
            rawMaterialList: [{rawMaterialId: "crop_wheat", quantity: 3}]
        },
        {
            productType: "product_cookie",
            name: "Bánh Mì",
            res_path: res.COOKIE_PNG,
            speedUp: 1,
            rubyToBuy: 4, // truong hop thieu nguyen lieu user muon mua lun
            time: 5,
            exp: 3,
            price: 21,
            levelUnlock: 2,
            rawMaterialList: [{rawMaterialId: "crop_wheat", quantity: 3}]
        }
    ]
});

MACHINE_LIST.push({
    machineType: "butter_machine",
    size: {
        width: 4,
        height: 4
    },
    slot: 2,
    mapItemEnum: MapItemEnum.CREAMERY,
    aniId: resAniId.Fairy,
    productList: [
        {
            productType: "product_bread",
            name: "Bánh Mì",
            res_path: res.BREAD_PNG,
            speedUp: 1,
            rubyToBuy: 4, // truong hop thieu nguyen lieu user muon mua lun
            time: 5,
            exp: 3,
            price: 21,
            levelUnlock: 2,
            rawMaterialList: [{rawMaterialId: "crop_wheat", quantity: 3}]
        },
        {
            productType: "product_bread",
            name: "Bánh Mì",
            res_path: res.BREAD_PNG,
            speedUp: 1,
            rubyToBuy: 4, // truong hop thieu nguyen lieu user muon mua lun
            time: 5,
            exp: 3,
            price: 21,
            levelUnlock: 2,
            rawMaterialList: [{rawMaterialId: "crop_wheat", quantity: 3}]
        },
        {
            productType: "product_bread",
            name: "Bánh Mì",
            res_path: res.BREAD_PNG,
            speedUp: 1,
            rubyToBuy: 4, // truong hop thieu nguyen lieu user muon mua lun
            time: 5,
            exp: 3,
            price: 21,
            levelUnlock: 2,
            rawMaterialList: [{rawMaterialId: "crop_wheat", quantity: 3}]
        }
    ]
});

MACHINE_LIST.push({
    machineType: "sugar_machine",
    size: {
        width: 2,
        height: 2
    },
    slot: 2,
    mapItemEnum: MapItemEnum.SUGAR_MAKER,
    aniId: resAniId.SugarCan,
    productlist: [
        {
            productType: "product_bread",
            name: "Bánh Mì",
            res_path: res.BREAD_PNG,
            speedUp: 1,
            rubyToBuy: 4, // truong hop thieu nguyen lieu user muon mua lun
            time: 5,
            exp: 3,
            price: 21,
            levelUnlock: 2,
            rawMaterialList: [{rawMaterialId: "crop_wheat", quantity: 3}]
        }
    ]


});

MACHINE_LIST.push({
    machineType: "popcorn_machine",
    size: {
        width: 2,
        height: 2
    },
    slot: 2,

    mapItemEnum: MapItemEnum.POPCORN_MAKER,
    aniId: resAniId.popcorn_pot,
    productList: [
        {
            productType: "product_bread",
            name: "Bánh Mì",
            res_path: res.BREAD_PNG,
            speedUp: 1,
            rubyToBuy: 4, // truong hop thieu nguyen lieu user muon mua lun
            time: 5,
            exp: 3,
            price: 21,
            levelUnlock: 2,
            rawMaterialList: [{rawMaterialId: "crop_wheat", quantity: 3}]
        },
        {
            productType: "product_corn_bread",
            name: "Bánh Mì",
            res_path: res.BREAD_CORN_PNG,
            speedUp: 1,
            rubyToBuy: 4, // truong hop thieu nguyen lieu user muon mua lun
            time: 5,
            exp: 3,
            price: 21,
            levelUnlock: 2,

        },
        {
            productType: "product_bread",
            name: "Bánh Mì",
            res_path: res.BREAD_PNG,
            speedUp: 1,
            rubyToBuy: 4, // truong hop thieu nguyen lieu user muon mua lun
            time: 5,
            exp: 3,
            price: 21,
            levelUnlock: 2,
            rawMaterialList: [{rawMaterialId: "crop_wheat", quantity: 3}]
        },
        {
            productType: "product_corn_bread",
            name: "Bánh Mì",
            res_path: res.BREAD_CORN_PNG,
            speedUp: 1,
            rubyToBuy: 4, // truong hop thieu nguyen lieu user muon mua lun
            time: 5,
            exp: 3,
            price: 21,
            levelUnlock: 2,

        },
        {
            productType: "product_bread",
            name: "Bánh Mì",
            res_path: res.BREAD_PNG,
            speedUp: 1,
            rubyToBuy: 4, // truong hop thieu nguyen lieu user muon mua lun
            time: 5,
            exp: 3,
            price: 21,
            levelUnlock: 2,
            rawMaterialList: [{rawMaterialId: "crop_wheat", quantity: 3}]
        },
        {
            productType: "product_corn_bread",
            name: "Bánh Mì",
            res_path: res.BREAD_CORN_PNG,
            speedUp: 1,
            rubyToBuy: 4, // truong hop thieu nguyen lieu user muon mua lun
            time: 5,
            exp: 3,
            price: 21,
            levelUnlock: 2,

        }
    ]
});



