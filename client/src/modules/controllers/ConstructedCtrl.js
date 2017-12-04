/**
 * Created by CPU60075_LOCAL on 12/4/2017.
 */

var ConstructedCtrl = cc.Class.extend({

    selectConstructedObject: function (id, typeObject) {
        switch (typeObject) {
            case MapItemEnum.MACHINE:
                cc.log("Machine constructed");
                var machine = user.asset.getMachineById(id);

                break;
        }
    },

    completedBuild: function () {
        cc.log("Completed Build");
    }
});