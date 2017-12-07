var ConstructedObject = CoordinatedObject.extend({
	completed: false,
	boostBuild: false,
	startBuildTime: 0,
	retainBuildTime: 0,

	ctor: function(startBuildTime, retainBuildTime, boostBuild, completed, coordinate) {
		this._super(coordinate);
		this.retainBuildTime = retainBuildTime;
		this.startBuildTime = startBuildTime;
		this.boostBuild = boostBuild;
		this.completed = completed;
	},

	reduceRetainBuildTime: function (dt) {
		if (this.retainBuildTime > 0) {
			this.retainBuildTime -= dt;
		}
	},

	setCompleted: function () {
		this.completed = true;
	},

	setBoostBuild: function () {
		this.boostBuild = true;
	}
});
