/**
 * Created by CPU60075_LOCAL on 19/11/2017.
 */

var GoatLodge = AnimalLodge.extend({
    type: null,
    goatList: [],

    ctor: function () {
        //
        //this._super();
        this.type = "chicken_habitat";


    },
    render: function () {
        //

    },

    getCurrentSlot: function () {
        return this.cowList.length;
    },

    getType: function () {
        return this.type;
    }

});