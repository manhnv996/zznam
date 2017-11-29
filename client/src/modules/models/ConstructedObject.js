/**
 * Created by CPU60075_LOCAL on 11/29/2017.
 */

var ConstructedObject = CoordinatedObject.extend({

    completed: null,
    startBuildTime: null,

    ctor: function (completed, startBuildTime, coordinate) {
        this._super(coordinate);

        this.completed = false;
        this.startBuildTime = startBuildTime;
    }
});