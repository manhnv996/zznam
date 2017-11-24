/**
 * Created by CPU60075_LOCAL on 19/11/2017.
 */

var PigLodge = AnimalLodge.extend({
    type: null,
    pigList: [],

    ctor: function () {
        //
        //this._super();
        this.type = "pig_habitat";


    },
    // render: function () {
    //     //

    // },

    getCurrentSlot: function () {
        return this.pigList.length;
    },

    getType: function () {
        return this.type;
    }

});