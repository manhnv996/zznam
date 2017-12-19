var ConstructedObject = CoordinatedObject.extend({
	completed: false,
	boostBuild: false,
	startBuildTime: 0,
	remainBuildTime: 0,

	ctor: function(startBuildTime, remainBuildTime, boostBuild, completed, coordinate) {
		this._super(coordinate);
		this.remainBuildTime = remainBuildTime;
		this.startBuildTime = startBuildTime;
		this.boostBuild = boostBuild;
		this.completed = completed;
	},

	reduceRemainBuildTime: function (dt) {
		if (this.remainBuildTime > 0) {
			this.remainBuildTime -= dt;
		}
	},

	setBoostBuild: function () {
		this.boostBuild = true;
	}
});
