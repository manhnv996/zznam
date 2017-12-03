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
                // var popup = new SeedTablePopup(fieldId, seedShow);
                // BaseGUILayer.instance.addChild(popup);

                //
                this.firstDragEmptyField = true;
                this.firstDragField = true;

                //
                this.lastBlockSelected = null;

            } else if (status == FieldStatusTypes.DONE){
                /*
                Show croptool
                 */
                PopupLayer.instance.showToolPopup(fieldId);

                this.firstShowNotice = false;

                //
                this.lastBlockSelected = null;
            } else {
                /*
                Show status
                 */
                PopupLayer.instance.showProgressBarInprogress(fieldId);

            }


        }


    },

    isFieldAndChangeBlock: function(x, y) {
        //
        var objectLogic = MapCtrl.instance.getObject(x, y);

        if (this.firstDragField) {
            this.lastBlockSelected = null;
        }
        if (this.lastBlockSelected != null) {
            if (this.lastBlockSelected.typeObject  == objectLogic.typeObject &&
                this.lastBlockSelected.pointLogic.x == objectLogic.pointLogic.x &&
                this.lastBlockSelected.pointLogic.y == objectLogic.pointLogic.y) {

                //return false;
                return null;
            }
        }
        this.lastBlockSelected = objectLogic;
        this.firstDragField = false;

        if (objectLogic.typeObject == MapItemEnum.FIELD) {

            return user.getAsset().getFieldByLogicPosition(objectLogic.pointLogic.x, objectLogic.pointLogic.y);
        }
        //return false;
        return null;
    },

    onDragCropTool: function(x, y) {
        //
        //var fieldSelected = MapCtrl.instance.getField(x, y);
        //
        //if (fieldSelected != null){
        //    if (this.firstDragField) {
        //        this.lastFieldSelected = null;
        //    }
        //    if (this.lastFieldSelected != null){
        //        if (this.lastFieldSelected.getFieldId() == fieldSelected.getFieldId()){
        //
        //            return false;
        //        }
        //    }
        //    this.lastFieldSelected = fieldSelected;
        //    this.firstDragField = false;

        var fieldSelected = this.isFieldAndChangeBlock(x, y);
        if (fieldSelected != null){
//            //
            var status = fieldSelected.checkStatus();
            if (status == FieldStatusTypes.DONE){
                //
                var seedType = fieldSelected.getPlantType();
                if (fieldSelected.crop() == null){  //crop and check crop fail

                    //full foodStorage
                    /*
                     done
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
                    //send pk to server {packet{fieldId}}
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
        var fieldSelected = this.isFieldAndChangeBlock(x, y);
        if (fieldSelected != null){
//            //
            var status = fieldSelected.checkStatus();

            if (status == FieldStatusTypes.EMPTY){
                //
                if (fieldSelected.plant(seedType)){     //plant and if success
//
                    //send pk to server {packet{fieldId, productType}}
                    testnetwork.connector.sendPlant(fieldSelected.getFieldId(), fieldSelected.getPlantType());
/////

                    //animation
                    MapLayer.instance.runAnimationPlantting(fieldSelected.getFieldId(), seedType);

                } else {
                    if (this.firstDragEmptyField){
                        cc.log("FLOW BUY SEEDDDDDDDDDDD!!!!!!!!!!!!!!!!!!!");

                        PopupLayer.instance.showSuggestBuyingSeedBG(seedType);
                        /*
                        done
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
                //send pk to server {packet{fieldId}}
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

                testnetwork.connector.sendBuyItemByRubi(seedType, 1);
                return true;
            } else {
                return false;
            }
        }
        return false;
    }


});

// Moved to MainScene.js
// PlantCtrl.instance = new PlantCtrl();