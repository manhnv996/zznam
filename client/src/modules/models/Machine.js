
var Machine = ConstructedObject.extend({
    machineId: null,
    machineType: null,
    slot: 2,
    startTime: null,
    productQueue: null,
    ctor: function (coordinate, startBuildTime, completed, machineId, machineType, productQueue, startTime) {
        //
        this._super(startBuildTime, completed, coordinate);
        this.machineId = machineId;
        this.machineType = machineType;
        this.startTime = startTime;
        this.productQueue = productQueue ? productQueue : [];
    },
    calculateFinishTime:function(){
    },
    createProduct: function () {
        //boolean

    },
    getRemainSlotCount: function () {
        //int

    },
    unlockSlot: function () {
        //boolean

    },
    takeProduct: function () {
        //productType

    },
    boost: function () {
        //boolean

    },
    getCompletedProduct: function () {
        //productType enum

    },
    getPendingProduct: function () {
        //productType enum

    },
    takeCompletedProduct: function () {
        //productType enum

    }

});