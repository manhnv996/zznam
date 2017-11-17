/**
 * Created by CPU60133_LOCAL on 11/9/2017.
 */

var PlantCtrl = cc.Class.extend({

    onFieldSelected: function(fieldId) {
        /*
         DONE

         get Field Object by id
         check fieldstatus

         show popup view (seed / or croptool) IN Mapview
         */
        var fieldSelected = user.getAsset().getFieldById(fieldId);

        if (fieldSelected != null){

            var status = fieldSelected.checkStatus();


            if (status == FieldStatusTypes.EMPTY){
                /*
                Show seedtable
                 */

                var seedLevel = getSeedLevel(user.getLevel());
                var seedList = user.getAsset().getFoodStorage().getItemList();

                var seedShow = [];
                for (var i = 0; i < seedLevel.length; i++){
                    if (user.getAsset().getFoodStorage().getQuantity(seedLevel[i]) == 0){
                        if (getProductObjByType(seedLevel[i]).level <= user.getLevel()){
                            seedShow.push(new StorageItem(seedLevel[i], 0));
                        } else {
                            seedShow.push(new StorageItem(seedLevel[i], null));
                        }
                    }
                }
                for (var i = 0; i < seedList.length; i++){
                    seedShow.push(new StorageItem(seedList[i].getTypeItem(), seedList[i].getQuantityItem()));
                }

                seedShow.sort(function(a, b) {
                    if (getProductObjByType(a.getTypeItem()).level <= user.getLevel() || a.getQuantityItem() != null){
                        return getProductObjByType(a.getTypeItem()).level - getProductObjByType(b.getTypeItem()).level;
                    }

                });
                seedShow.reverse();



                PopupLayer.instance.showSeedPopup(fieldId, seedShow);
                cc.log("empty");
                //
                this.FIRST_DRAG = true;
                //

            } else if (status == FieldStatusTypes.DONE){
                /*
                Show croptool
                 */
                //MapLayer.instance.showToolPopup(fieldId);
                PopupLayer.instance.showToolPopup(fieldId);
                cc.log("done");

            } else {
                /*
                Show status
                 */
                //MapLayer.instance.showProgressBar(fieldId);
                PopupLayer.instance.showProgressBarInprogress(fieldId);

                cc.log("inprogress");
            }


        }


    },
    onDragCropTool: function(x, y) {
        //
        var fieldSelected = MapCtrl.instance.getField(x, y);

        if (fieldSelected != null){

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
                    PopupLayer.instance.showNoticeFullFoodStorageBG();
                    //
                    // MapLayer.instance.disablePopupAllFieldList();
                    cc.log("FLOW UpgradeStorage!!!!!!!!!!!!!!!!!!!");

                } else {
////////
                    //send msg to server {packet{fieldId, productType}}
                    testnetwork.connector.sendCrop(fieldSelected.getFieldId(), seedType);
/////

                    //animation
                    MapLayer.instance.runAnimationCrop(fieldSelected.getFieldId(), seedType);

                    /*
                    Inprogress
                    Call Mapview (show effect)
                     */
                }

                ////send msg to server {packet{fieldId, productType}}
                //testnetwork.connector.sendCrop(fieldSelected.getFieldId(), fieldSelected.getPlantType());

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

            var status = fieldSelected.checkStatus();

            if (status == FieldStatusTypes.EMPTY){
                //
                if (fieldSelected.plant(seedType)){     //plant and if success

////////
                    //send msg to server {packet{fieldId, productType}}
                    testnetwork.connector.sendPlant(fieldSelected.getFieldId(), fieldSelected.getPlantType());
/////

                    //animation
                    MapLayer.instance.runAnimationPlantting(fieldSelected.getFieldId(), seedType);

                    /*
                    Inprogress
                    Call Mapview (show effect)
                     */
                } else {
                    if (this.FIRST_DRAG){

                        /*
                        INPROGRESS
                        FLOW BUY SEED
                        Show Popup
                         */
                    }

                }
                this.FIRST_DRAG = false;

                ////send msg to server {packet{fieldId, productType}}
                //testnetwork.connector.sendPlant(fieldSelected.getFieldId(), fieldSelected.getPlantType());
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
            //fieldSelected.boost();
            /*
            Inprogress
            Call Mapview (show effect)
             */
            if (fieldSelected.boost()){

            }
        }

    }


});
PlantCtrl.instance = new PlantCtrl();