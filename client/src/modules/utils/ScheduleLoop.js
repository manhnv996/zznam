var ScheduleLoop = cc.Node.extend({
	index: 1,
	cbMap: null,
	oneSecondIndexes: null,
	schedulingOneSecond: false,

	ctor: function() {
		this._super();
		this.cbMap = {};
		this.oneSecondIndexes = [];
	},

	onEnter: function() {
		this._super();
		this.added = true;
		if (!this.schedulingOneSecond) {
			this.schedulingOneSecond = true;
			this.schedule(this.updateOneSecond, 1.0);
		}
	},

	registerScheduleOneSecond: function(cb) {
		var index = this.index;
		this.cbMap[index] = cb;
		this.oneSecondIndexes.push(index);

		if (!this.schedulingOneSecond) {
			this.schedulingOneSecond = true;
			this.schedule(this.updateOneSecond, 1.0);
		}

		this.index++;
		return index;
	},

	unregister: function(index) {
		this.oneSecondIndexes = this.oneSecondIndexes.filter(function(i) {
			return i !== index;
		});
		delete this.cbMap[index];
		if (this.oneSecondIndexes.length === 0) {
			// Stop scheduling when callback array is empty
			this.schedulingOneSecond = false;
			this.unschedule(this.updateOneSecond);
		}
	},

	updateOneSecond: function(dt) {
		var that = this;
		this.oneSecondIndexes
		.map(function(index) {
			return that.cbMap[index];
		})
		.forEach(function(cb) {
			cb(dt);
		});
	},

	clearAllSchedule: function() {
		if (this.schedulingOneSecond) {
			this.unschedule(this.updateOneSecond);
		}
		this.cbMap = {};
		this.oneSecondIndexes = [];
		this.schedulingOneSecond = false;
	}
});

// Create it before add to MainScene
ScheduleLoop.instance = new ScheduleLoop();
ScheduleLoop.instance.retain(); // Must retain
// ScheduleLoop.instance.registerScheduleOneSecond(function(dt) {
// 	cc.log("Scheduled", dt);
// });
