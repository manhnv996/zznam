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
                //cc.log("25" + "getIndexMachineByType ERROR");
                //cc.log(MACHINE_LIST[i].aniId +"===="+ MACHINE_LIST[i].size.width +"===="+ MACHINE_LIST[i].size.width+"===="+ machine.coordinate.x+"===="+  machine.coordinate.y+"===="+ MACHINE_LIST[i].mapItemEnum);
                this._super(MACHINE_LIST[i].aniId, MACHINE_LIST[i].size.width, MACHINE_LIST[i].size.width, machine.coordinate.x, machine.coordinate.y, MACHINE_LIST[i].mapItemEnum);
            } else {
                cc.log(MA_LOG_TAG + "getIndexMachineByType ERROR" );
            };
        }
        this.renderFinishedProducts(machineId);
        this.registerTouchEvents();

        this.play("idle");
        this.scheduleAnimation();
    },

    onEnter: function() {
        this._super();
    },

    scheduleAnimation:function(){
        this.updateAnimation();
        this.schedule(this.updateAnimation, 2);
    },
    renderFinishedProducts:function(machineId){
        var machine = user.asset.getMachineById(machineId);

        for (var j  = 0 ; j <  this._finishedProductSpriteList.length; j++){
            this._finishedProductSpriteList[j].removeFromParent();
        }
        this._finishedProductSpriteList = [];
        var now = getTime();
        var num = machine.getNumberOfCompletedProducts(now);

            for (var i = 0; i < num; i++){
                var productType = machine.productQueue[i];
                var resPath = machine.getProductResPath(productType);
                cc.log("z38 " + resPath);
                var finishedProductSprite = new cc.Sprite(resPath);
                if (i < 5){
                    switch (this.blockSizeX){
                        case 2:
                            finishedProductSprite.setPosition(-25 +i * 10, -150); break;
                        case 3:
                            finishedProductSprite.setPosition(-25 +i * 10, -250); break;
                        case 4:
                            finishedProductSprite.setPosition( i * 10, -350); break;
                    }
                } else {
                    switch (this.blockSizeX){
                        case 2:
                            finishedProductSprite.setPosition(-100 +(i%5) * 10, -150); break;
                        case 3:
                            finishedProductSprite.setPosition(-100 +(i%5) * 10, -220); break;
                        case 4:
                            finishedProductSprite.setPosition(-150 +(i%5) * 10, -300); break;
                    }
                }
                this._finishedProductSpriteList.push(finishedProductSprite);


                var action1 = new cc.ScaleTo(0.1, 1.35);
                var action2 = new cc.ScaleTo(0.1, 1.15);
                var sprite_action = cc.RepeatForever.create(cc.sequence(action1, cc.delayTime(2 + i *.2), action2));
                this._finishedProductSpriteList[i].runAction(sprite_action);

                this.addChild(this._finishedProductSpriteList[i], 10);

            }

    },
    updateAnimation: function (){
        //cc.log("zz schedule updateAnimation:" + this._machineId);
        var now = getTime();
        var machine  = user.asset.getMachineById(this._machineId);
        var currFinishedProducts = machine.getNumberOfCompletedProducts(now);
        var currProductQueueLength = machine.productQueue.length;
        if (currFinishedProducts != this._currFinishedProducts) {
            this._currFinishedProducts = currFinishedProducts;
            this.renderFinishedProducts(this._machineId);
        }
        if (currFinishedProducts < currProductQueueLength ){


            if (this._curAniState != "loop"){
                this._curAniState = "loop";
                cc.log("90 " + "update Animation " + " loop");
                this.play(this._curAniState);
            }
        } else {
           if (this._curAniState != "idle"){
               this._curAniState = "idle";
               this.play(this._curAniState);
               cc.log("90 " + "update Animation " + " idle");
               this.unschedule(this.updateAnimation);
           }
        }
        //this.renderFinishedProducts(this._machineId);
    },

    onClick: function () {
        cc.log(this._machineId + " on click");
        var machineId = this._machineId;
        //cc.log(MA_LOG_TAG + "7 " + machineId);
        var now = getTime();
        var machine  = user.asset.getMachineById(machineId);
        var currFinishedProducts = machine.getNumberOfCompletedProducts(now);
        if (currFinishedProducts > 0) {
            if (user.asset.warehouse.getCurrentQuantity() < user.asset.warehouse.capacity){
                this.collectFinishedProduct(machineId);
            }else {
                // todo label nha kho day

                //endPl.x = Math.floor(endPl.x);
                //endPl.y = Math.floor(endPl.y);
                TablePopupLayer.instance.showMachineTablePopup(machineId);
                setTimeout(function(){
                    cc.log("full storageeeeeeeeeeeeeeeeeeeeeeeeeeeeee :"  + this.lx + " @@ "+this.ly);
                    var endPl = MapValues.logicToScreenPosition(this.lx, this.ly);
                    BaseGUILayer.instance.notifyFullStorageForMachine(fr.Localization.text("Text_full_ware_house"), endPl.x, endPl.y);
                }.bind(this), 150);
            }
        } else {
            TablePopupLayer.instance.showMachineTablePopup(machineId);
        }

        var now = getTime();
        var machine  = user.asset.getMachineById(this._machineId);
        var currFinishedProducts = machine.getNumberOfCompletedProducts(now);
        var currProductQueueLength = machine.productQueue.length;
        if (currFinishedProducts != this._currFinishedProducts) {
            this._currFinishedProducts = currFinishedProducts;
            this.renderFinishedProducts(this._machineId);
        }

    },

    onBeginClick: function () {
        //cc.log(this._machineId + " on begin click");
       if (this._curAniState == "idle"){
           this.play("selected");
           setTimeout(function(){ this.play(this._curAniState);}.bind(this), 500);
       }

    },

    onEndClick: function () {
        //cc.log(this._machineId + " on end click");
        //this.play(this.curAniState);
    },
    collectFinishedProduct:function(machineId){
        cc.log("23 " +"on collectFinishedProduct")
        var i = MachineController.instance.getIndexMachineInListById(machineId);
        var now = getTime();
        var product = user.asset.machineList[i].takeCompletedProduct(now);
        if (product!= null){
            var p = MapValues.logicToScreenPosition(
                this.lx,
                this.ly
            );
            var exp = getProductConfigById(product).exp;
            //AnimateEventLayer.instance.animateExp(p.x, p.y, exp);
            AnimateEventLayer.instance.animate(p.x, p.y, StorageTypes.WAREHOUSE, product, 1, exp);
            user.asset.warehouse.addItem(product, 1);
            user.addExp(exp);
            testnetwork.connector.sendCollectProduct(machineId);

        }
    }



});

