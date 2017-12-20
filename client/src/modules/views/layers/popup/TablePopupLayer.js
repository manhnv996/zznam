/**
 * Created by CPU60133_LOCAL on 12/4/2017.
 */

var TablePopupLayer = cc.Layer.extend({
    _layout: null,

    ctor: function () {
        this._super();

        this.runUpdateOrderWaittingTime();
    },


    showSeedTablePopup: function (fieldId, seedShow) {
        this.removeUpdateDisableListener();
        this._layout = new SeedTablePopup(fieldId, seedShow);
        this.addChild(this._layout);
        var field = user.asset.getFieldById(fieldId);
        this.autoMove(field.coordinate.x, field.coordinate.y, 350, 220);
    },

    showCropToolPopup: function (fieldId) {
        this.removeUpdateDisableListener();
        this._layout = new CropToolPopup(fieldId);
        this.addChild(this._layout);
        var field = user.asset.getFieldById(fieldId);
        this.autoMove(field.coordinate.x, field.coordinate.y, 280, 200);
    },

    showTimeRemainProgressBar: function (fieldId) {
        var field = user.asset.getFieldById(fieldId);
        this.loadingBar = new LoadingBarLayout(
            getProductConfigById(field.plantType).timeMin * 60, field.plantedTime,
            getProductConfigById(field.plantType).name, 1);
        var p = MapValues.logicToScreenPosition(field.coordinate.x, field.coordinate.y);
        this.loadingBar.setPosition(p.x, p.y);
        BaseGUILayer.instance.addChild(this.loadingBar);

        //
        this.loadingBar.setOnClick(function() {
            if (PlantCtrl.instance.boostPlant(fieldId)) {
                this.loadingBar.closeLoadingBar();
            }
        }.bind(this));
    },


    showAnimalToolPopup: function(lx, ly, type, mode, caller) {
        this.removeUpdateDisableListener();
        this._layout = new AnimalToolPopup(lx, ly, type, mode, caller);
        this.addChild(this._layout);
        this.autoMove(lx, ly, 220, 220);
    },

    showNatureToolPopup: function(lx, ly, type, natureId) {
        this.removeUpdateDisableListener();
        this._layout = new NatureToolPopup(lx, ly, type, natureId);
        this.addChild(this._layout);
        this.autoMove(lx, ly, 180, 200);
    },

    showMachineTablePopup: function (machineId) {
        cc.log(MA_LOG_TAG + "showMachineTablePopup");
        this._layout = new MachineTablePopup(machineId);
        this.addChild(this._layout);
    },

    ////TablePopupLayer.instance.removeUpdateDisableListener();
    //
    runUpdateOrderWaittingTime: function () {
        this.schedule(this.updateOrderWaittingTime, 1);
    },
    updateOrderWaittingTime: function () {
        var list = user.getAsset().getWaittingOrderList();
        if (list.length <= 0){
            this.unschedule(this.updateOrderWaittingTime);
        }
        for (var i = 0; i < list.length; i++){
            var parseCurrTime = getTime();
            var finishWaittingTime = list[i].getFinishWaittingTime();
            if (finishWaittingTime != null){
                if (parseCurrTime > finishWaittingTime.getTime()){
                    testnetwork.connector.sendCreateNewOrder(list[i].orderId);
                }
            }
        }
    },
//

    removeUpdateDisableListener: function () {
        // if (this._layout.disableListener) {
        //     this._layout._isClose = false;
        //     cc.eventManager.removeListener(this._layout.disableListener);
        //     this.removeAllChildren();
        //     this._layout = null;
        // }
        if (this._layout != null){
            // this._layout._isClose = false;
            this.removeAllChildren();
            this._layout = null;
        }
    },

    layerRunAction: function(action) {
        if (this._layout) {
            // cc.log("Run");
            this._layout.runAction(action);
        }
    },

    autoMove: function(lx, ly, thresholdX, thresholdY) {
        var lx_2 = lx - ly;
        var ly_2 = -lx - ly;

        var p = MapValues.logicToScreenPosition(lx, ly);
        // cc.log(p);
        var delta = cc.p(0, 0);
        if (p.x < thresholdX) {
            delta.x = thresholdX - p.x;
        }
        if (p.y < 50) {
            delta.y = 50 - p.y;
        } else if (cc.winSize.height - p.y < thresholdY) {
            delta.y = - thresholdY + (cc.winSize.height - p.y);
        }
        
        // cc.log("l'", lx_2, ly_2)
        // Set threshold
        if (lx_2 <= -26 || lx_2 >= 26) {
            delta.x = 0;
        }
        if (ly_2 <= -56 || ly_2 >= -6) {
            delta.y = 0;
        }
        var action = new cc.MoveBy(1, delta).easing(cc.easeExponentialOut());
        MapLayer.instance.runAction(action);
        this.layerRunAction(action.clone());
    }

});