/**
 * Created by CPU60075_LOCAL on 20/11/2017.
 */

var BakeryMachine = Machine.extend({
    type: null,

    ctor: function (coordinate) {
        this._super(coordinate);

        this.type = "bakery_machine";
    },

    getType: function () {
        return this.type;
    }
});