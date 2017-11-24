/**
 * Created by CPU60075_LOCAL on 19/11/2017.
 */

var CowLodge = AnimalLodge.extend({
    type: null,
    cowList: [],

    ctor: function () {
        //
        //this._super();
        this.type = "cow_habitat";


    },
    // render: function () {
    //     //

    // },

    getCurrentSlot: function () {
        return this.cowList.length;
    },

    getType: function () {
        return this.type;
    }

});