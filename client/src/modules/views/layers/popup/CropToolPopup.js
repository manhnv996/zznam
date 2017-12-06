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


    ///////////////////////
    showToolPopup: function(fieldId){

        var tool = new CropToolSprite(this, res.liem);

        tool.setPosition(cc.p(this._bg.x, this._bg.y));


        this.popupItemList = [];
        this.popupItemList.push(tool);
        this.addChild(tool);

    },

    disablePopup: function(seedId){
        //cc.log("disvisible");
        this.disablePopupBackground();

        //this.disableItemOfPopup(seedId);

    },

    //
    disablePopupBackground: function () {
        if (this._bg != null) {

            this._bg.setVisible(false);
            //this._bg.removeFromParent(true);

            //this._bg = null;
        }
        //if (this.btTurnPage != null){
        //    this.btTurnPage.setVisible(false);
        //    this.btTurnPage.removeFromParent(true);
        //    this.btTurnPage = null;
        //}
//
    },//
    //disableItemOfPopup: function(seedId){
    //    var index = this.getIndexSeedOfPopupItemList(seedId);
    //    if (index == null){
    //        for (var i = 0; i < this.popupItemList.length; i++){
    //            if (this.popupItemList[i] != null){
    //                if (this.popupItemList[i].isVisible()){
    //                    this.popupItemList[i].setVisible(false);
    //                    // this.popupItemList[i].pause();
    //                    this.popupItemList[i].removeFromParent(true);
    //                    this.popupItemList[i].clearListener();
    //                }
    //
    //            }
    //        }
    //        this.popupItemList = [];
    //    } else {
    //        for (var i = 0; i < this.popupItemList.length; i++){
    //            if (index != i){
    //                if (this.popupItemList[i] != null){
    //                    if (this.popupItemList[i].isVisible()){
    //                        this.popupItemList[i].setVisible(false);
    //                        // this.popupItemList[i].pause();
    //                        this.popupItemList[i].removeFromParent(true);
    //                        this.popupItemList[i].clearListener();
    //                    }
    //
    //                }
    //
    //            }
    //        }
    //        this.popupItemList = [];
    //
    //    }
    //
    //},
    //getIndexSeedOfPopupItemList: function (seedId) {
    //    if (seedId == null){    //
    //
    //        return null;
    //    }
    //    for (var i = 0; i < this.popupItemList.length; i++){    //seed list
    //        if (this.popupItemList[i].seedType == seedId){
    //            return i;
    //        }
    //    }
    //    return null;
    //},



});