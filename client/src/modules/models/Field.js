
var Field = CoordinatedObject.extend({

    fieldId: 0,
    plantType: null,
    plantedTime: null,

    ctor: function (coordinate, fieldId) {
    // ctor: function (x, y, fieldId) {
        //
        this._super(coordinate);
        // this._super(x, y);
        // CoordinatedObject.prototype.render(coordinate);

        this.coordinate = coordinate;

        this.render(fieldId);

        //cc.log("x " + CoordinatedObject.prototype.getCoordinate().call(this));

    },
    render: function (fieldId) {
        //
        this.fieldId = fieldId;

        this.plantType = null;
        this.plantedTime = null;


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
                this.setPlantedTime(new Date());

                cc.log("__" + this.plantType + ", " + this.plantedTime);

                return true
            }

        }
        return false;
    },
    crop: function () {
        //return ProductType
        if (this.checkStatus() == FieldStatusTypes.DONE){

            //////////user is global variable
            if (user.getAsset().getFoodStorage().addItem(this.plantType, 2)){

                user.addExp(getProductObjByType((this.plantType)).harvestExp);

                var productCrop = this.plantType;
                this.render(this.fieldId);

                return productCrop;
            }

        }
        return null;
    },
    getCropTime: function () {
        //Date
        if (this.plantType == null){
            return null;
        }


        var parseTime = this.plantedTime.getTime();
        var cropTime = new Date();
        // cropTime.setTime(parseTime + getProductObjByType(this.plantType).time * 1000);
        cropTime.setTime(parseTime + 6000);     //HERE IS TEST

        return cropTime;
    },
    checkStatus: function () {
        //return Enum{FieldStatusType}
        if (this.plantType != null){
            var currentTime = new Date();

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
                var date = new Date();
                var intDate = date.getTime();
                this.plantedTime.setTime(intDate - getProductObjByType(this.plantType).time * 1000);

                return true;
            }
            return false;
        }
        return false;
    },
});