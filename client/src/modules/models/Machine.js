
var Machine = ConstructedObject.extend({

    id: 0,
    type: null,
    slot: 0,
    startTime: null,
    productQueue: [],

    ctor: function (id, type, slot, startTime, productQueue, completed, startBuildTime, coordinate) {
        //
        this._super(startBuildTime, completed, coordinate);

        this.id = id;
        this.type = type;
        this.slot = slot;
        this.startTime = startTime ? startTime : 0;
        this.productQueue = productQueue ? productQueue : [];
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