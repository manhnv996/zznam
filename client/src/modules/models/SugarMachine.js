/**
 * Created by CPU60075_LOCAL on 20/11/2017.
 */

var SugarMachine = Machine.extend({
    type: null,

    ctor: function () {
        //this._super();

        this.type = "sugar_machine";
    },

    getType: function () {
        return this.type;
    }
});