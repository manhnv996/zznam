/**
 * Created by CPU60075_LOCAL on 19/11/2017.
 */

var SheepLodge = AnimalLodge.extend({
    type: null,
    sheepList: [],

    ctor: function () {
        //
        //this._super();
        this.type = "sheep_habitat";


    },
    // render: function () {
    //     //

    // },

    getCurrentSlot: function () {
        return this.sheepList.length;
    },

    getType: function () {
        return this.type;
    }

});