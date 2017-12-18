/**
 * Created by CPU60133_LOCAL on 11/9/2017.
 */

var PlantCtrl = cc.Class.extend({

    onFieldSelected: function(fieldId) {
        var fieldSelected = user.getAsset().getFieldById(fieldId);
        if (fieldSelected != null){
            var status = fieldSelected.checkStatus();
            if (status == FieldStatusTypes.EMPTY){

                var seedShow = getSeedShow(user.getLevel());
                TablePopupLayer.instance.showSeedTablePopup(fieldId, seedShow);

                //
                this.firstDragEmptyField = true;
                this.firstDragField = true;

                //
                this.lastBlockSelected = null;

            } else if (status == FieldStatusTypes.DONE){
                TablePopupLayer.instance.showCropToolPopup(fieldId);

                this.firstShowNotice = false;
                //
                this.lastBlockSelected = null;
            } else {
                TablePopupLayer.instance.showTimeRemainProgressBar(fieldId);
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

                return null;
            }
        }
        this.lastBlockSelected = objectLogic;
        this.firstDragField = false;

        if (objectLogic.typeObject == MapItemEnum.FIELD) {

            return user.getAsset().getFieldByLogicPosition(objectLogic.pointLogic.x, objectLogic.pointLogic.y);
        }
        return null;
    },

    onDragCropTool: function(x, y) {
        var fieldSelected = this.isFieldAndChangeBlock(x, y);
        if (fieldSelected != null){
//            //
            var status = fieldSelected.checkStatus();
            if (status == FieldStatusTypes.DONE){
                //
                var seedType = fieldSelected.getPlantType();
                if (fieldSelected.crop() == null){
                    if (this.firstShowNotice == false){

                        BaseGUILayer.instance.notifyFullStorage(StorageTypes.FOOD_STORAGE);
                        this.firstShowNotice = true;
                    }
                } else {
                    audioEngine.playEffect(res.farm_harvest_01_mp3, false);
                    //send pk to server {packet{fieldId}}
                    testnetwork.connector.sendCrop(fieldSelected.getFieldId());
                    //animation
                    MapLayer.instance.runAnimationCrop(fieldSelected.getFieldId(), seedType, function() {
                        var position = MapValues.logicToScreenPosition(
                                fieldSelected.coordinate.x, fieldSelected.coordinate.y);
                        AnimateEventLayer.instance.animate(
                            position.x, position.y, 
                            StorageTypes.FOOD_STORAGE, seedType, 2,
                            getProductObjByType(seedType).harvestExp);
                    });
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

            var status = fieldSelected.checkStatus();
            if (status == FieldStatusTypes.EMPTY){
                //
                if (fieldSelected.plant(seedType)){     //plant and if success
//
                    audioEngine.playEffect(res.farm_plant_01_mp3, false);
                    //send pk to server {packet{fieldId, productType}}

                    testnetwork.connector.sendPlant(fieldSelected.getFieldId(), fieldSelected.getPlantType());
                    //
                    MapLayer.instance.runAnimationPlantting(fieldSelected.getFieldId(), seedType);

                } else {
                    if (this.firstDragEmptyField){
                        BaseGUILayer.instance.showSuggestBuyMissionItem([new StorageItem(seedType, 1)], null, null);

                    }
                }
                this.firstDragEmptyField = false;
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
                testnetwork.connector.sendPlantBoost(fieldSelected.getFieldId());
                return true;
            } else {
                return false;
            }

        }
        return false;
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