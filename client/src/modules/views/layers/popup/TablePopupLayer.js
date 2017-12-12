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
        TablePopupLayer.instance.removeUpdateDisableListener();
        this._layout = new SeedTablePopup(fieldId, seedShow);
        this.addChild(this._layout);
    },

    showCropToolPopup: function (fieldId) {
        TablePopupLayer.instance.removeUpdateDisableListener();
        this._layout = new CropToolPopup(fieldId);
        this.addChild(this._layout);
    },

    showTimeRemainProgressBar: function (fieldId) {
        TablePopupLayer.instance.removeUpdateDisableListener();
        this._layout = new TimeRemainProgressBar(fieldId);
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
    },

});