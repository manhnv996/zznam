
var LastPageUtil = cc.Class.extend({

    lastIndexOfOrderClick: 0,   //
    lastIndexOfPageSeedTableClick: 0,   //not yet started

    lastPageMachine: [
        {machineType: "food_machine", lastPageOpened: 0 },
        {machineType: "bakery_machine", lastPageOpened: 0 },
        {machineType: "sugar_machine", lastPageOpened: 0 },
        {machineType: "popcorn_machine", lastPageOpened: 0 },
        {machineType: "butter_machine", lastPageOpened: 0 }
    ],
    findLastPageOpenedByType:function(machineType){
        for (var i = 0; i < this.lastPageMachine.length; i++){
            if (this.lastPageMachine[i].machineType === machineType){
                return this.lastPageMachine[i].lastPageOpened;
            }
        }
        return 0;
    },
    setLastOpenPage:function(machineType, pageNumber){
        for (var i = 0; i < this.lastPageMachine.length; i++){
            if (this.lastPageMachine[i].machineType === machineType){
                this.lastPageMachine[i].lastPageOpened = pageNumber;
                return true;
            }
        }
        return false;
    }

});
LastPageUtil.instance = new LastPageUtil();