/**
 * Created by CPU60075_LOCAL on 20/11/2017.
 */

var BakeryMachine = Machine.extend({

    ctor: function (id, completed, startBuildTime, coordinate) {
        this._super(id, "bakery_machine", completed, startBuildTime, coordinate);

    }

});