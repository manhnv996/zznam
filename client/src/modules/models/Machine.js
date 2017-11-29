
var Machine = ConstructedObject.extend({

    id: 0,
    type: null,
    slot: 0,
    startTime: null,
    productQueue: [],

    ctor: function (id, type, completed, startBuildTime, coordinate) {
        //
        this._super(completed, startBuildTime, coordinate);

        this.id = id;
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