
var Machine = ConstructedObject.extend({

    slot: 1,
    startTime: null,
    productQueue: [],
    type: null,

    ctor: function (id, completed, startBuildTime, coordinate, type) {
        //
        this._super(id, completed, startBuildTime, coordinate);

        this.type = type;

    },
    // render: function () {
    //     //

    // },
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