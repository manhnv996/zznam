
var Field = CoordinatedObject.extend({

    fieldId: 0,
    plantType: null,
    plantedTime: null,

    ctor: function (coordinate, fieldId) {
        //
        //this._super(coordinate);
        CoordinatedObject.prototype.render(coordinate);

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

    getFieldId: function () {
        return this.fieldId;
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

                user.addExp(this.plantType.EXP);

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
        // cropTime.setTime(parseTime + this.plantType.TIME_MIN * 1000 * 60);
        cropTime.setTime(parseTime + 2000);     //HERE IS TEST

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

    }
});