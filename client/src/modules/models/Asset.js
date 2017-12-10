
var Asset = cc.Class.extend({

    foodStorage: Storages,
    warehouse: Storages,
    fieldList: null,
    machineList: null,
    natureThingList: null,
    myShop: null,
    animalLodgeList: null,
    // map: [],

    ctor: function (foodStorage, warehouse, fieldList, animalLodgeList, machineList, natureThingList, myShop) {
        //
        //this._super();

    //     this.render(foodStorage, warehouse, fieldList, animalLodgeList, machineList, natureThingList, myShop);

    // },
    // render: function (foodStorage, warehouse, fieldList, animalLodgeList, machineList, natureThingList, myShop) {
        //
        this.foodStorage = foodStorage;
        this.warehouse = warehouse;
        this.fieldList = fieldList || [];
        // cc.log("List", animalLodgeList);
        this.animalLodgeList = animalLodgeList || [];
        this.machineList = machineList || [];
        this.natureThingList = natureThingList || [];
        this.myShop = myShop;
        // this.fieldList = [];
    },

    getFoodStorage: function () {
        return this.foodStorage;
    },
    getWarehouse: function () {
        return this.warehouse;
    },
    getFieldList: function () {
        return this.fieldList;
    },
    getAnimalLodgeList: function () {
        return this.animalLodgeList;
    },
    getMachineList: function () {
        return this.machineList;
    },
    getNatureThingList: function () {
        return this.natureThingList;
    },
    getMyShop: function () {
        return this.myShop;
    },

    getFieldById: function(fieldId) {
        // for (var i = 0; i < this.fieldList.length; i++){
        //     if (this.fieldList[i].getFieldId() == fieldId){

        //         return this.fieldList[i];
        //     }
        // }
        // return null;
        return this.getFieldList().find(function(f) {
            return f.fieldId === fieldId;
        });
    },
    addField: function (field) {
        //bug   // ? where??
        this.fieldList.push(field);
        field.setFieldId(this.fieldList.length);
        // this.fieldList[this.fieldList.length - 1].setFieldId(this.fieldList.length - 1);    //autoincrement id

    },

    //
    getFieldByLogicPosition: function (lx, ly) {
        for (var i = 0; i < this.fieldList.length; i++){

            // cc.log(this.fieldList[i].getCoordinate().getCurrX() + ", +  " + this.fieldList[i].getCoordinate().getCurrY());

            if (this.fieldList[i].getCoordinate().getCurrX() == lx){
                if (this.fieldList[i].getCoordinate().getCurrY() == ly){

                    return this.fieldList[i];
                }

            }
        }
        return null;
    },

    addMachine: function (machine) {
        this.machineList.push(machine);
    },

    getLodgeById: function(id) {
        return this.animalLodgeList.find(function(lodge) {
            return lodge.id === id;
        });
        if (machine.id == 0) {
            machine.id = this.machineList.length;
        }
    },

    getMachineById: function (id) {
        var machine = this.machineList.find(function (f) {
            return f.id = id;
        });
        return machine;
    },

    getLodgeByPosition: function(lx, ly) {
        for (var i = 0; i < this.animalLodgeList.length; i++) {
            var lodge = this.animalLodgeList[i];
            var blx = lodge.coordinate.x;
            var bly = lodge.coordinate.y;
            var type = lodge.type;
            var width = 0;
            var height = 0;
            switch (type) {
                case 'chicken_habitat':
                    width = MapConfigs.ChickenLodge.size.width;
                    height = MapConfigs.ChickenLodge.size.height;
                    break;
                case 'cow_habitat':
                    width = MapConfigs.CowLodge.size.width;
                    height = MapConfigs.CowLodge.size.height;
                    break;
                default:
                    cc.log("Unhandled", type);
                    return null;
            }
            if (MapValues.positionInsideBlock(lx, ly, blx, bly, width, height)) {
                return lodge;
            }
        }
        return null;
    }
});
