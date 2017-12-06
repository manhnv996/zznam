/**
 * Created by CPU60075_LOCAL on 20/11/2017.
 */

var BakeryMachine = Machine.extend({

    ctor: function (id, startTime, productQueue, completed, startBuildTime, coordinate) {
        this._super(id, "bakery_machine", startTime, productQueue, completed, startBuildTime, coordinate);

    }

});