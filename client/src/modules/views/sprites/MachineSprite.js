/**
 * Created by CPU60135_LOCAL on 11/29/2017.
 */
/**
 * Created by CPU60135_LOCAL on 11/28/2017.
 */

var MachineSprite = AnimationSprite.extend({

    _machineId: null,
    _curAniState: "idle",
    _machine: null,
    ctor: function (machineId) {
        this._machineId = machineId;
        //this._super(aniId, blockSizeX, blockSizeY, lx, ly, mapAliasType)
        this._machine = user.getAsset().getMachineList().find(function (f) {
            return f.machineId === machineId;
        })


        cc.log(MA_LOG_TAG + this._machine.machineType + " ===== " );
        if (this._machine != null) {
            var i = this._machine.getIndexMachineInConfigByType(this._machine.machineType);
            if (i != -1){
                this._super(MACHINE_LIST[i].aniId, MACHINE_LIST[i].size.width, MACHINE_LIST[i].size.width, this._machine.coordinate.x, this._machine.coordinate.y, MACHINE_LIST[i].mapItemEnum);

            } else {
                cc.log(MA_LOG_TAG + "getIndexMachineByType ERROR" );
            };
            this.updateAnimation();
        } else {
            this._super(resAniId.bakery, MapConfigs.Bakery.size.width, MapConfigs.Bakery.size.width, 30, 30, MapConfigs.DuongRay);

        }
        this.play(this._curAniState);
        this.registerTouchEvents();

        //todo
        //this.schedule(this.updateMachineState, 0.5);
    },
    updateAnimation: function (){
        if (this._machine.productQueue.length > 0){
            this._curAniState = "loop";
        } else {
            this._curAniState = "idle";
        }
    },

    onClick: function () {
        cc.log(this._machineId + " on click");
        MachineController.instance.onMachineSelected(this._machineId);

    },

    onBeginClick: function () {
        cc.log(this._machineId + " on begin click");
       if (this._curAniState == "idle"){
           this.play("selected");
           setTimeout(function(){ this.play(this._curAniState);}.bind(this), 500);
       }

    },

    onEndClick: function () {
        cc.log(this._machineId + " on end click");
        //this.play(this.curAniState);
    },
    playAnimation:function (aniState) {
        this._curAniState = aniState;
        this.play(aniState);
    },
    updateMachineState:function(){
        //todo  if productQueue = null  unschedule,
        // update state of machine per 0.5s by checking it's running or not

    }

});

