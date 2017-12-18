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
    },

    showCropToolPopup: function (fieldId) {
        this.removeUpdateDisableListener();
        this._layout = new CropToolPopup(fieldId);
        this.addChild(this._layout);
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
    },


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
            var parseCurrTime = new Date().getTime();
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
    }

});