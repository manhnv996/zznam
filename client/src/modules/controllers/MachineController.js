/**
 * Created by CPU60135_LOCAL on 11/29/2017.
 */

var MachineController = cc.Class.extend({
    onMachineSelected:function(machineId){

    },
    initMachineSpriteList: function () {
        MapLayer.instance.machineSpriteList = [];


    },

    // lấy ra chỉ số của máy trong mảng các máy có trên bản đồ theo machineId
    getIndexInMachineSpriteList: function (machineId) {
        if (machineId == null){
            return null;
        }
        for (var i = 0; i < MapLayer.instance.machineSpriteList.length; i++){
            if (MapLayer.instance.machineSpriteList[i]._machineId == machineId){
                return i;
            }
        }
        return null;
    },
    getIndexMachineInListById: function(machineId) {
        if (machineId == null) {
            return -1;
        }
        for (var i = 0; i <= user.asset.machineList.length; i++) {
            if (machineId == user.asset.machineList[i].machineId) {
                return i;
            }
        }
        return -1;
    },
    //getMachineById: function (machineId){
    //    var machine = MapLayer.instance.machineList.find(function(f) {
    //        return f.machineId == machineId;
    //    })
    //    return null;
    //},

    getMachineConfigByType: function(machineType){
        //var machineConfig = MACHINE_LIST.find(function(f) {
        //    return f.machineType === machineType;
        //})

        for (var i = 0; i < MACHINE_LIST.length; i++){
            if (MACHINE_LIST[i].machineType === machineType){
                return MACHINE_LIST[i];
            }
        }
        return null;
    },
    // lấy ra index của máy trong MACHINE_LIST theo loại máy
    getIndexMachineInConfigByType: function(machineType){
        //cc.log("77" + machineType);
        for (var i = 0; i < MACHINE_LIST.length; i++){
            //cc.log("79" + MACHINE_LIST[i].machineType);
            if (MACHINE_LIST[i].machineType == machineType){
                return i;
            }
        }
        return -1;
    },


})