/**
 * Created by CPU60135_LOCAL on 11/29/2017.
 */

var MachineConfig = {};

MachineConfig.FirstPriceBuySlot = 6;
MachineConfig.NextPriceBuySlot = 3;
MachineConfig.Speedup = 1;

MachineConfig.BakeryMachine = {
    id: "bakery_machine",
    size: {
        width: 3,
        height: 3
    },
    slot: 2,
    productTypeList: ["product_bread", "product_corn_bread", "cookie"],
    mapItemEnum: MapItemEnum.BAKERY

}
MachineConfig.FoodMachine = {
    id: "food_machine",
    size: {
        width: 3,
        height: 3
    },
    slot: 3,
    mapItemEnum: MapItemEnum.FOOD_GRINDER
}
MachineConfig.ButterMachine = {
    id: "butter_machine",
    size: {
        width: 3,
        height: 3
    },
    slot: 2,
    mapItemEnum: MapItemEnum.CREAMERY
}
MachineConfig.SugarMachine = {
    id: "sugar_machine",
    size: {
        width: 2,
        height: 2
    },
    slot: 2,
    mapItemEnum: MapItemEnum.SUGAR_MAKER
}
MachineConfig.PopcornMachine = {
    id: "popcorn_machine",
    size: {
        width: 2,
        height: 2
    },
    slot: 2,
    mapItemEnum: MapItemEnum.POPCORN_MAKER
}


