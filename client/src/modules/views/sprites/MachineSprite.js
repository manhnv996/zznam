/**
 * Created by CPU60135_LOCAL on 11/29/2017.
 */
/**
 * Created by CPU60135_LOCAL on 11/28/2017.
 */

var MachineSprite = AnimationSprite.extend({

    _machineId: null,
    _curAniState: "idle",
    _finishedProductSpriteList: [],
    ctor: function (machineId) {
        this._machineId = machineId;
        //this._super(aniId, blockSizeX, blockSizeY, lx, ly, mapAliasType)
        var machine = user.getAsset().getMachineList().find(function (f) {
            return f.machineId === machineId;
        })

        //constructor
        if (machine != null) {
            var i = MachineController.instance.getIndexMachineInConfigByType(machine.machineType);
            if (i != -1){
                this._super(MACHINE_LIST[i].aniId, MACHINE_LIST[i].size.width, MACHINE_LIST[i].size.width, machine.coordinate.x, machine.coordinate.y, MACHINE_LIST[i].mapItemEnum);

            } else {
                cc.log(MA_LOG_TAG + "getIndexMachineByType ERROR" );
            };
        }
        this.renderFinishedProducts(machineId);
        this.registerTouchEvents();

        //todo
        this.schedule(this.updateAnimation, 1);
    },
    renderFinishedProducts:function(machineId){
        var machine = user.getAsset().getMachineList().find(function (f) {
            return f.machineId === machineId;
        })

        var now = new Date().getTime();
        var num = machine.getNumberOfCompletedProducts(now);
        if ( machine.machineType == "bakery_machine"){
            for (var i = 0; i < num; i++){
                var productType = machine.productQueue[i];
                var resPath = machine.getProductResPath(productType);
                cc.log("z38 " + resPath);
                var finishedProductSprite = new cc.Sprite(resPath);
                this._finishedProductSpriteList.push(finishedProductSprite);
                var screenPosition = MapValues.logicToScreenPosition( machine.coordinate.x, machine.coordinate.y);
                finishedProductSprite.setPosition(screenPosition.x, screenPosition.y);
                MapLayer.instance.addChild(finishedProductSprite);
            }
        }
    },
    updateAnimation: function (){
        //cc.log("zz schedule updateAnimation:" + this._machineId);
        var now = new Date().getTime();
        var machine  = user.asset.getMachineById(this._machineId);
        var currFinishedProducts = machine.getNumberOfCompletedProducts(now);
        var currProductQueueLength = machine.productQueue.length;
        if (currFinishedProducts < currProductQueueLength){
            if (this._curAniState != "loop"){
                this._curAniState = "loop";
                this.play(this._curAniState);
            }
        } else {
           if (this._curAniState != "idle"){
               this._curAniState = "idle";
               this.play(this._curAniState);
               this.unschedule(this.updateAnimation);
           }
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

