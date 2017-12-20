/**
 * Created by CPU60135_LOCAL on 11/29/2017.
 */

var MachineSprite = AnimationSprite.extend({

    _machineId: null,
    _curAniState: "idle",
    _finishedProductSpriteList: [],
    _currFinishedProducts: 0,
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
                cc.log("25" + "getIndexMachineByType ERROR");
                cc.log(MACHINE_LIST[i].aniId +"===="+ MACHINE_LIST[i].size.width +"===="+ MACHINE_LIST[i].size.width+"===="+ machine.coordinate.x+"===="+  machine.coordinate.y+"===="+ MACHINE_LIST[i].mapItemEnum);
                this._super(MACHINE_LIST[i].aniId, MACHINE_LIST[i].size.width, MACHINE_LIST[i].size.width, machine.coordinate.x, machine.coordinate.y, MACHINE_LIST[i].mapItemEnum);
            } else {
                cc.log(MA_LOG_TAG + "getIndexMachineByType ERROR" );
            };
        }
        this.renderFinishedProducts(machineId);
        this.registerTouchEvents();

        //todo.
        this.updateAnimation();
        this.scheduleAnimation();
    },

    onEnter: function() {
        this._super();
        this.play("idle");
    },

    scheduleAnimation:function(){
        this.schedule(this.updateAnimation, 2);
    },
    renderFinishedProducts:function(machineId){
        var machine = user.asset.getMachineById(machineId);

        for (var j  = 0 ; j <  this._finishedProductSpriteList.length; j++){
            this._finishedProductSpriteList[j].removeFromParent();
        }
        this._finishedProductSpriteList = [];
        var now = new Date().getTime();
        var num = machine.getNumberOfCompletedProducts(now);

            for (var i = 0; i < num; i++){
                var productType = machine.productQueue[i];
                var resPath = machine.getProductResPath(productType);
                cc.log("z38 " + resPath);
                var finishedProductSprite = new cc.Sprite(resPath);
                finishedProductSprite.setPosition(-25 +i * 5, -300);
                this._finishedProductSpriteList.push(finishedProductSprite);


                var action1 = new cc.ScaleTo(0.1, 1.35);
                var action2 = new cc.ScaleTo(0.1, 1.15);
                var sprite_action = cc.RepeatForever.create(cc.sequence(action1, cc.delayTime(0.2), action2));
                this._finishedProductSpriteList[i].runAction(sprite_action);

                this.addChild(this._finishedProductSpriteList[i], 10);

            }

    },
    updateAnimation: function (){
        //cc.log("zz schedule updateAnimation:" + this._machineId);
        var now = new Date().getTime();
        var machine  = user.asset.getMachineById(this._machineId);
        var currFinishedProducts = machine.getNumberOfCompletedProducts(now);
        var currProductQueueLength = machine.productQueue.length;
        if (currFinishedProducts != this._currFinishedProducts) {
            this._currFinishedProducts = currFinishedProducts;
            this.renderFinishedProducts(this._machineId);
        }
        if (currFinishedProducts < currProductQueueLength ){
            cc.log("41 " + "update Animation " + machine.machineId);


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
        //this.renderFinishedProducts(this._machineId);
    },

    onClick: function () {
        cc.log(this._machineId + " on click");

        MachineController.instance.onMachineSelected(this._machineId);
        var now = new Date().getTime();
        var machine  = user.asset.getMachineById(this._machineId);
        var currFinishedProducts = machine.getNumberOfCompletedProducts(now);
        var currProductQueueLength = machine.productQueue.length;
        if (currFinishedProducts != this._currFinishedProducts) {
            this._currFinishedProducts = currFinishedProducts;
            this.renderFinishedProducts(this._machineId);
        }

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

