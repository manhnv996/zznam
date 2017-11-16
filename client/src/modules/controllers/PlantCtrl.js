/**
 * Created by CPU60133_LOCAL on 11/9/2017.
 */

var PlantCtrl = cc.Class.extend({

    onFieldSelected: function(fieldId) {
        /*
         INPROGRESS

         get Field Object by id
         check fieldstatus

         show popup view (seed / or croptool) IN MAPVIEW
         */
        var fieldSelected = user.getAsset().getFieldById(fieldId);
        var status = fieldSelected.checkStatus();

        if (status == FieldStatusTypes.EMPTY){
            /*
            Show seedtable
             */
            //var seedList = [
            //    {seedType: ProductTypes.CROP_CARROT},
            //    {seedType: ProductTypes.CROP_WHEAT},
            //    {seedType: ProductTypes.CROP_CORN},
            //    // {seedType: ProductTypes.CROP_SUGARCANE},
            //    // {seedType: ProductTypes.CROP_SOYBEAN}
            //];


            var seedList = user.getAsset().getFoodStorage().getItemList();

            var seedLevel = getSeedLevel(user.getLevel());

            var seedShow = [];
            for (var i = 0; i < seedLevel.length; i++){
                if (user.getAsset().getFoodStorage().getQuantity(seedLevel[i]) == 0){
                    if (getProductObjByType(seedLevel[i]).level < user.getLevel()){
                        seedShow.push(new StorageItem(seedLevel[i], 0));
                    } else {
                        seedShow.push(new StorageItem(seedLevel[i], null));
                    }
                }
            }
            for (var i = 0; i < seedList.length; i++){
                seedShow.push(new StorageItem(seedList[i].getTypeItem(), seedList[i].getQuantityItem()));
            }



            MapLayer.instance.showSeedPopup(fieldId, seedShow);
            cc.log("empty");

        } else if (status == FieldStatusTypes.DONE){
            /*
            Show croptool
             */
            MapLayer.instance.showToolPopup(fieldId);
            cc.log("done");

        } else {
            /*
            Show status
             */
            cc.log("inprogress");
        }

    },
    onDragCropTool: function(x, y) {
        //
        var fieldSelected = MapCtrl.instance.getField(x, y);

        var status = fieldSelected.checkStatus();

        if (status == FieldStatusTypes.DONE){
            //
            var seedType = fieldSelected.getPlantType();

            if (fieldSelected.crop() == null){  //crop and check crop fail

                //full foodStorage
                /*
                 FLOW UpgradeStorage
                 */
            } else {
                //send msg to server {packet{fieldId, productType}}
////////
//                testnetwork.connector.sendCrop(fieldSelected.getFieldId(), fieldSelected.getPlantType());
/////

                //animation
                // MapLayer.instance.runAnimationCrop(1, "caroot", 0.2, fieldSelected.getFieldId());
                 MapLayer.instance.runAnimationCrop(fieldSelected.getFieldId(), seedType);


///////////////
//                var item = user.getAsset().getFoodStorage().getItemList();
//                var str = "FoodStorage: " + user.getAsset().getFoodStorage().getCurrentQuantity() + "/ " + user.getAsset().getFoodStorage().getCapacity() + "\n";
//                for (var _i = 0; _i < item.length; _i++){
//                    cc.log(item[_i].getTypeItem().TYPE);
//                    cc.log(item[_i].getQuantityItem());
//                    str += "TYPE: " + item[_i].getTypeItem().TYPE + ", quantity: " + item[_i].getQuantityItem() + "\n";
//                }
//                MapLayer.instance.label1.setString(str);
////////////
            }

            ////send msg to server {packet{fieldId, productType}}
            //testnetwork.connector.sendCrop(fieldSelected.getFieldId(), fieldSelected.getPlantType());

        } else {
            /*
             DO NOTHING
             */
        }
    },
    onDragSeed: function(seedType, x, y) {
        //
        var fieldSelected = MapCtrl.instance.getField(x, y);

        if (fieldSelected != null){

            var status = fieldSelected.checkStatus();

            if (status == FieldStatusTypes.EMPTY){
                //
                //fieldSelected.plant(seedType);
                if (fieldSelected.plant(seedType)){     //plant and if success
                    //send msg to server {packet{fieldId, productType}}
////////
//                testnetwork.connector.sendPlant(fieldSelected.getFieldId(), fieldSelected.getPlantType());
/////

                    //animation
                    // MapLayer.instance.runAnimationPlantting(4, "caroot", 0.5, fieldSelected.getFieldId());
                    MapLayer.instance.runAnimationPlantting(fieldSelected.getFieldId(), seedType);

///////////////
                    //var item = user.getAsset().getFoodStorage().getItemList();
                    //var str = "FoodStorage: " + user.getAsset().getFoodStorage().getCurrentQuantity() + "/ " + user.getAsset().getFoodStorage().getCapacity() + "\n";
                    //for (var _i = 0; _i < item.length; _i++){
                    //    cc.log(item[_i].getTypeItem().TYPE);
                    //    cc.log(item[_i].getQuantityItem());
                    //    str += "TYPE: " + item[_i].getTypeItem().TYPE + ", quantity: " + item[_i].getQuantityItem() + "\n";
                    //}
                    //MapLayer.instance.label1.setString(str);
////////////
                }

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

    }
});
PlantCtrl.instance = new PlantCtrl();