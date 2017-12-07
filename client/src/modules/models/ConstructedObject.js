var ConstructedObject = CoordinatedObject.extend({
	completed: false,
	startBuildTime: 0,
	retainBuildTime: 0,

	ctor: function(startBuildTime, retainBuildTime, completed, coordinate) {
		this._super(coordinate);
		this.retainBuildTime = retainBuildTime;
		this.startBuildTime = startBuildTime;
		this.completed = completed;
	},

	reduceRetainBuildTime: function (dt) {
		this.retainBuildTime -= dt * 1000;
	}
});
