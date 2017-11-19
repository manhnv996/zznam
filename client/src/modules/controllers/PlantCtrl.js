/**
 * Created by CPU60133_LOCAL on 11/9/2017.
 */

var PlantCtrl = cc.Class.extend({

    onFieldSelected: function(fieldId) {
        /*
         DONE
         */
        var fieldSelected = user.getAsset().getFieldById(fieldId);

        if (fieldSelected != null){

            var status = fieldSelected.checkStatus();


            if (status == FieldStatusTypes.EMPTY){

                var seedShow = getSeedShow(user.getLevel());

                PopupLayer.instance.showSeedPopup(fieldId, seedShow);
                //
                this.firstDragEmptyField = true;
                this.firstDragField = true;
                //

            } else if (status == FieldStatusTypes.DONE){
                /*
                Show croptool
                 */
                PopupLayer.instance.showToolPopup(fieldId);

                this.firstShowNotice = false;
                //
            } else {
                /*
                Show status
                 */
                PopupLayer.instance.showProgressBarInprogress(fieldId);

            }


        }


    },
    onDragCropTool: function(x, y) {
        //
        var fieldSelected = MapCtrl.instance.getField(x, y);

        if (fieldSelected != null){
            if (this.firstDragField) {
                this.lastFieldSelected = null;
            }
            if (this.lastFieldSelected != null){
                if (this.lastFieldSelected.getFieldId() == fieldSelected.getFieldId()){

                    return false;
                }
            }
            this.lastFieldSelected = fieldSelected;
            this.firstDragField = false;


//            //
            var status = fieldSelected.checkStatus();

            if (status == FieldStatusTypes.DONE){
                //
                var seedType = fieldSelected.getPlantType();
                if (fieldSelected.crop() == null){  //crop and check crop fail

                    //full foodStorage
                    /*
                     Inprogress
                     FLOW UpgradeStorage
                     Show Popup
                     */
                    if (this.firstShowNotice == false){

                        PopupLayer.instance.showNoticeFullFoodStorageBG();
                        this.firstShowNotice = true;
                    }

                    //
                    cc.log("FLOW UpgradeStorage!!!!!!!!!!!!!!!!!!!");

                } else {
//
                    //send msg to server {packet{fieldId}}
                    testnetwork.connector.sendCrop(fieldSelected.getFieldId());
/////

                    //animation
                    MapLayer.instance.runAnimationCrop(fieldSelected.getFieldId(), seedType);

                }
            } else {
                /*
                 DO NOTHING
                 */
            }


        }

    },
    onDragSeed: function(seedType, x, y) {
        //
        var fieldSelected = MapCtrl.instance.getField(x, y);

        if (fieldSelected != null){
            if (this.firstDragField) {
                this.lastFieldSelected = null;
            }
            if (this.lastFieldSelected != null){
                if (this.lastFieldSelected.getFieldId() == fieldSelected.getFieldId()){

                    return false;
                }
            }
            this.lastFieldSelected = fieldSelected;
            this.firstDragField = false;


//            //
            var status = fieldSelected.checkStatus();

            if (status == FieldStatusTypes.EMPTY){
                //
                if (fieldSelected.plant(seedType)){     //plant and if success
//
                    //send msg to server {packet{fieldId, productType}}
                    testnetwork.connector.sendPlant(fieldSelected.getFieldId(), fieldSelected.getPlantType());
/////

                    //animation
                    MapLayer.instance.runAnimationPlantting(fieldSelected.getFieldId(), seedType);

                } else {
                    if (this.firstDragEmptyField){
                        cc.log("FLOW BUY SEEDDDDDDDDDDD!!!!!!!!!!!!!!!!!!!");

                        PopupLayer.instance.showSuggestBuyingSeedBG(seedType);
                        /*
                        INPROGRESS
                        FLOW BUY SEED
                        Show Popup
                         */
                    }
                }
                this.firstDragEmptyField = false;
                /*
                 DONE
                 */

            } else {
                /*
                 DO NOTHING
                 */
            }
        }

    },

    boostPlant: function (fieldId) {
        var fieldSelected = user.getAsset().getFieldById(fieldId);

        if (fieldSelected != null) {
            if (fieldSelected.boost()){
//
                //send msg to server {packet{fieldId}}
                testnetwork.connector.sendPlantBoost(fieldSelected.getFieldId());
            } else {
                cc.log("Not enough ruby");
            }

        }

    },

    buySeed: function (seedType) {
        var rubiBuy = getProductObjByType(seedType).rPrice;
        if (user.reduceRuby(rubiBuy)){
            if (user.getAsset().getFoodStorage().addItem(seedType, 1)){

                testnetwork.connector.sendBuyItemByRubi(seedType);
                return true;
            } else {
                return false;
            }
        }
        return false;
    }


});
PlantCtrl.instance = new PlantCtrl();