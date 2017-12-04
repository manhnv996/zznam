
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
        for (var i = 0; i < this.fieldList.length; i++){
            if (this.fieldList[i].getFieldId() == fieldId){

                return this.fieldList[i];
            }
        }
        return null;
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
        if (machine.id == 0) {
            machine.id = this.machineList.length;
        }
    },

    getMachineById: function (id) {
        var machine = this.machineList.find(function (f) {
            return f.id = id;
        });
    }

});