/**
 * Created by CPU60133_LOCAL on 11/7/2017.
 */

var ChickenLodge = AnimalLodge.extend({
    type: null,
    chickenList: [],

    ctor: function () {
        //
        //this._super();
        this.type = "goat_habitat";


    },
    render: function () {
        //

    },

    getCurrentSlot: function () {
        return this.chickenList.length;
    },

    getType: function () {
        return this.type;
    }

});