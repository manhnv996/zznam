
var LastPageUtil = cc.Class.extend({

    lastIndexOfOrderClick: 0,   //
    lastIndexOfPageSeedTableClick: 0,   //not yet started
    machineUtil: [
        {machineType: "food_machine", lastPageOpened: 0 },
        {machineType: "bakery_machine", lastPageOpened: 0 },
        {machineType: "sugar_machine", lastPageOpened: 0 },
        {machineType: "popcorn_machine", lastPageOpened: 0 },
        {machineType: "butter_machine", lastPageOpened: 0 }
    ],
    findLastPageOpenedByType:function(machineType){
        for (var i = 0; i < this.machineUtil.length; i++){
            if (this.machineUtil[i].machineType === machineType){
                return this.machineUtil[i].lastPageOpened;
            }
        }
        return 0;
    }
});
LastPageUtil.instance = new LastPageUtil();