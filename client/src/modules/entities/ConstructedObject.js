var ConstructedObject = CoordinatedObject.extend({
	completed: false,
	startBuildTime: 0,

	ctor: function(startBuildTime, completed, coordinate) {
		this._super(coordinate);
		this.startBuildTime = startBuildTime;
		this.completed = completed;
	}
});
