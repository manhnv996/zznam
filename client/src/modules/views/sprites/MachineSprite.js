/**
 * Created by CPU60135_LOCAL on 11/29/2017.
 */
/**
 * Created by CPU60135_LOCAL on 11/28/2017.
 */

var MachineSprite = AnimationSprite.extend({

    machineId: null,
    curAniState: "idle",
    machine: null,
    ctor: function (machineId) {
        this.machineId = machineId;
        //this._super(aniId, blockSizeX, blockSizeY, lx, ly, mapAliasType)
        this.machine = user.getAsset().getMachineList().find(function (f) {
            return f.machineId === machineId;
        })


        cc.log(MA_LOG_TAG + this.machine.machineType + " ===== " );
        if (this.machine != null) {
            var i = this.machine.getIndexMachineByType(this.machine.machineType);
            if (i != -1){
                this._super(MACHINE_LIST[i].aniId, MACHINE_LIST[i].size.width, MACHINE_LIST[i].size.width, this.machine.coordinate.x, this.machine.coordinate.y, MACHINE_LIST[i].mapItemEnum);
                this.play(this.curAniState);

            } else {
                cc.log(MA_LOG_TAG + "getIndexMachineByType" );
            }
        } else {
            this._super(resAniId.bakery, MapConfigs.Bakery.size.width, MapConfigs.Bakery.size.width, 30, 30, MapConfigs.DuongRay);
            this.play(this.curAniState);
        }

        this.registerTouchEvents();

        //todo
        //this.schedule(this.updateMachineState, 0.5);
    },

    onClick: function () {
        cc.log(this.machineId + " on click");
        MachineController.instance.onMachineSelected(this.machineId);

    },

    onBeginClick: function () {
        cc.log(this.machineId + " on begin click");
        this.play("selected");

    },

    onEndClick: function () {
        cc.log(this.machineId + " on end click");
        this.play(this.curAniState);
    },
    playAnimation:function (aniState) {
        this.curAniState = aniState;
        this.play(aniState);
    },
    updateMachineState:function(){
        //todo  if productQueue = null  unschedule,
        // update state of machine per 0.5s by checking it's running or not

    }

});

