var INERIA_BUFFER_SIZE = 3;

var InertiaEngine = cc.Node.extend({
	history: [],
	time: 0,
	count: 0,
	currentPoint: null,

	ctor: function() {
		this._super();
		for (var i = 0; i < INERIA_BUFFER_SIZE; i++) {
			this.history.push({
				point: null,
				time: 0
			});
		}
		cc.log("Initialized inertia Engine");
	},

	init: function(startPoint) {
		// cc.log("Start recording");
		this.time = 0;
		this.count = 0;
		this.currentPoint = startPoint;
		this.addPoint(startPoint);
		this.scheduleUpdate();
	},

	setPoint: function(point) {
		this.currentPoint = point;
	},

	stopAndGetVelocity: function(endPoint) {
		// cc.log("Stop recording");
		if (!endPoint) {
			endPoint = cc.p(0, 0);
		}
		this.addPoint(endPoint);
		this.unscheduleUpdate();
		var sortedHistory = this.sortHistory();
		var velocities = this.caculateVelocities(sortedHistory);
		var velocity = this.caculateAverageVelocity(velocities);
		// cc.log("History", this.sortHistory());
		// cc.log("velocities", velocities);
		// cc.log("Average", velocity);
		// cc.log("Count", this.count);
		return velocity;
	},

	update: function(dt) {
		this.time += dt;
		if (this.time > 0.1) {
			this.addPoint(this.currentPoint);
			this.time = 0;
		}
	},

	addPoint: function(point) {
		this.history[this.count % INERIA_BUFFER_SIZE] = {
			point: point,
			time: this.time,
			count: this.count
		};
		this.count++;
	},

	sortHistory: function() {
		var sortedHistory = [];
		if (this.count < INERIA_BUFFER_SIZE) {
			for (var i = 0; i < this.count; i++) {
				sortedHistory.push(this.history[i]);
			}
		} else {
			for (var i = 0; i < INERIA_BUFFER_SIZE; i++) {
				sortedHistory.push(this.history[(this.count + i) % INERIA_BUFFER_SIZE]);
			}
		}
		return sortedHistory;
	},

	caculateVelocities: function(sortedHistory) {
		var velocities = [];
		for (var i = 1; i < sortedHistory.length; i++) {
			var currentRecord = sortedHistory[i];
			var lastRecord = sortedHistory[i - 1];
			if (currentRecord.time !== 0) {
				var velocity = cc.p(
					(currentRecord.point.x - lastRecord.point.x) / currentRecord.time,
					(currentRecord.point.y - lastRecord.point.y) / currentRecord.time
				);
				velocities.push(velocity);
			}
		}
		return velocities;
	},

	caculateAverageVelocity: function(velocities) {
		var aVelocity = cc.p(0, 0);
		if (velocities.length === 0) {
			return aVelocity;
		}
		for (var i = 0; i < velocities.length; i++) {
			aVelocity.x += velocities[i].x;
			aVelocity.y += velocities[i].y;
		}
		aVelocity.x /= velocities.length;
		aVelocity.y /= velocities.length;
		return aVelocity;
	}
});

// IneriaEngine.instance = new IneriaEngine();
