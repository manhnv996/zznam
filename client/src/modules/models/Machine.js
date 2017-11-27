
var Machine = CoordinatedObject.extend({

    slot: 1,
    startTime: null,
    productQueue: null,

    ctor: function (coordinate) {
        //
        this._super(coordinate);


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