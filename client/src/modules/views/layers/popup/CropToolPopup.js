/**
 * Created by CPU60133_LOCAL on 12/4/2017.
 */

var CropToolPopup = TablePopup.extend({

    popupItemList: [],
    fieldList: [],

    ctor: function (fieldId) {

        var index = MapLayer.instance.getIndexOfFieldList(fieldId);

        var fieldSelected = user.getAsset().getFieldById(MapLayer.instance.fieldList[index].fieldId);

        this._super(res.popup2, fieldSelected.getCoordinate().getCurrX(), fieldSelected.getCoordinate().getCurrY(),
            MapLayer.instance.fieldList[index]);


        //
        this.showToolPopup(fieldId);
    },

    /////
    showToolPopup: function(fieldId){
        var tool = new CropToolSprite(this, res.liem);
        tool.setPosition(cc.p(this._bg.x, this._bg.y));

        this.popupItemList = [];
        this.popupItemList.push(tool);
        this.addChild(tool);
    },

    disablePopup: function(seedId){
        this.disablePopupBackground();
    },

    //
    disablePopupBackground: function () {
        if (this._bg != null) {
            this._bg.setVisible(false);
        }
    },

});