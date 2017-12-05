/**
 * Created by CPU60135_LOCAL on 11/29/2017.
 */

var MachineController = cc.Class.extend({
    onMachineSelected:function(machineId){

    },
    initMachineList: function () {
        MapLayer.instance.machineList = [];


    },
    // lấy ra chỉ số của máy trong mảng các máy có trên bản đồ theo machineId
    getIndexOfMachineList: function (machineId) {
        if (machineId == null){
            return null;
        }
        for (var i = 0; i < MapLayer.instance.machineList.length; i++){
            if (MapLayer.instance.machineList[i].machineId == machineId){
                return i;
            }
        }
        return null;
    },
    getMachineById: function (machineId){
        var field = MapLayer.instance.machineList.find(function(f) {
            return f.machineId === machineId;
        })
        return null;
    }

})