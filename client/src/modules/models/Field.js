
var Field = CoordinatedObject.extend({

    fieldId: 0,
    plantType: null,
    plantedTime: null,

    ctor: function (coordinate, fieldId, plantType, plantedTime) {
    // ctor: function (x, y, fieldId) {
        //
        this._super(coordinate);
        // this._super(x, y);
        // CoordinatedObject.prototype.render(coordinate);

        // this.coordinate = coordinate;

        // this.render(fieldId);

        //cc.log("x " + CoordinatedObject.prototype.getCoordinate().call(this));

    // },
    // render: function (fieldId) {
        //
        this.fieldId = fieldId;

        this.plantType = plantType;
        this.plantedTime = plantedTime;

        //this._super().changeCoordinate();
    },

//     //
//     getCoordinate: function() {
//         this._super();
//     },
//
//     changeCoordinate: function (coordinate) {
//         //return boolean
//         this._super();
//     },
// //

    getFieldId: function () {
        return this.fieldId;
    },
    setFieldId: function (fieldId) {
        this.fieldId = fieldId;
    },
    getPlantType: function () {
        return this.plantType;
    },
    setPlantType: function (productType) {
        this.plantType = productType;
    },
    getPlantedTime: function () {
        return this.plantedTime;
    },
    setPlantedTime: function (datetime) {
        this.plantedTime = datetime;
    },


    plant: function (productType) {
        //boolean
        if (this.checkStatus() == FieldStatusTypes.EMPTY) {

            //cc.log("plantting");
            if (user.getAsset().getFoodStorage().takeItem(productType, 1)) {

                this.setPlantType(productType);
                this.setPlantedTime(getDate());

                // cc.log("__" + this.plantType + ", " + this.plantedTime);

                return true;
            }

        }
        return false;
    },
    crop: function () {
        //return ProductType
        if (this.checkStatus() == FieldStatusTypes.DONE){
            if (user.getAsset().getFoodStorage().addItem(this.plantType, 2)){

                user.addExp(parseInt(getProductObjByType(this.plantType).harvestExp));

                var productCrop = this.plantType;
                this.plantType = null;
                this.plantedTime = null;
                // this.render(this.fieldId);

                return productCrop;
            }
        }
        return null;
    },
    getCropTime: function () {
        //Date
        if (!this.plantType){
            return null;
        }


        var parseTime = this.plantedTime.getTime();
        var cropTime = getDate();
        cropTime.setTime(parseTime + getProductObjByType(this.plantType).time * 1000);
        //cropTime.setTime(parseTime + 6000);     //HERE IS TEST

        return cropTime;
    },
    checkStatus: function () {
        //return Enum{FieldStatusType}
        if (this.plantType != null){
            var currentTime = getDate();

            if (currentTime >= this.getCropTime()){
                return FieldStatusTypes.DONE;
            } else {
                return FieldStatusTypes.GROWING;
            }

        } else {
            return FieldStatusTypes.EMPTY;
        }

    },

    boost: function () {
        //boolean
        if (this.checkStatus() == FieldStatusTypes.GROWING){
            if (user.reduceRuby(1)){
                var date = getDate();
                var intDate = date.getTime();
                this.plantedTime.setTime(intDate - getProductObjByType(this.plantType).time * 1000);
                //this.plantedTime.setTime(intDate - 6000);   //HERE IS TEST

                return true;
            }
            return false;
        }
        return false;
    },
});