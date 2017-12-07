/**
 * Created by CPU60133_LOCAL on 12/4/2017.
 */
/**
 * Created by CPU60075_LOCAL on 12/1/2017.
 */

var TablePopupLayer = cc.Layer.extend({
    _layout: null,

    ctor: function () {
        this._super();
    },


    showSeedTablePopup: function (fieldId, seedShow) {
        this._layout = new SeedTablePopup(fieldId, seedShow);
        this.addChild(this._layout);
    },

    showCropToolPopup: function (fieldId) {
        this._layout = new CropToolPopup(fieldId);
        this.addChild(this._layout);
    },

    ////TablePopupLayer.instance.removeUpdateDisableListener();


    removeUpdateDisableListener: function () {
        if (this._layout.disableListener) {
            this._layout._isClose = true;
            cc.eventManager.removeListener(this._layout.disableListener);
            this.removeAllChildren();
            this._layout = null;
        }
    },

});