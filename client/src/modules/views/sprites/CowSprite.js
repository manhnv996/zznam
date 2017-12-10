var CowSprite = AnimalSprite.extend({
	direction: null,
	lstAction: 0,
	entered: false,
	isHungry: false,

	ctor: function() {
		this._super(resAniId.Fix_cow);
		this.direction = cc.p(0, 0);
	},

	onEnter: function() {
		this._super();
		this.entered = true;

		// Random position
		this.maxX = this.getParent().blockSizeX;
		this.maxY = this.getParent().blockSizeY;
		var lx = (Math.round(Math.random() * 100) % ((this.maxX - 1) * 10)) / 10 + 0.5;
		var ly = (Math.round(Math.random() * 100) % ((this.maxY - 1) * 10)) / 10 + 0.5;
		this.setLogicPosition(lx, ly);
		
		if (this.isHungry) {
			this.play(CowSprite.Hungry);
			return;
		}

		if (this.remainTime > 0) {
			// cc.log("Set scheduleOnce after", this.remainTime / 1000);
			this.scheduleOnce(this.harvest, this.remainTime / 1000);
			this.doAction();
			this.scheduleOnce(function() {
				// cc.log("Start schedule");
				this.schedule(this.doAction, 4.0);
			}.bind(this), Math.round(Math.random() * 100) % 40 / 10);
		} else {
			this.harvest();
		}

		// var rand = Math.round(Math.random() * 10) % 3;
		// if (rand === 0) {
		// 	this.walk();
		// } else if (rand === 1) {
		// 	 this.play(CowSprite.Idle2);
		// } else {
		// 	return this.play(CowSprite.Idle1);
		// }
	},

	doAction: function() {
		var value = Math.round(Math.random() * 10) % (this.lstAction === 0 ? 2 : 3) + (this.lstAction === 0 ? 1 : 0);
		this.lstAction = value;
		// cc.log("Run", value);
		this.unscheduleUpdate();
		switch (value) {
			case 0:
				return this.walk();
			case 1:
				return this.play(CowSprite.Idle1);
			case 2:
				return this.play(CowSprite.Idle2);
		}
	},

	walk: function() {
		this.play(CowSprite.Walk);
		this.direction.x = 2 * (Math.random() - 0.5);
		this.direction.y = Math.sqrt(1 - Math.pow(this.direction.x, 2)) * (Math.random() > 0.5 ? 1 : -1);
		// cc.log("Walk", this.id, this.direction);
		if (this.lx < 0.5 && this.direction.x < 0) {
			this.direction.x *= -1;
		}
		if (this.ly < 0.5 && this.direction.y < 0) {
			this.direction.y *= -1;
		}
		if (this.lx > (this.maxX - 0.7) && this.direction.x > 0) {
			this.direction.x *= -1;
		}
		if (this.ly > (this.maxY - 0.7) && this.direction.y > 0) {
			this.direction.y *= -1;
		}
		// cc.log("Direction", this.direction);
		var p = MapValues.logicToPosition(this.direction.x, this.direction.y);
		if (p.x < 0) {
			this.setScaleX(-1);
		} else {
			this.setScaleX(1);
		}
		this.scheduleUpdate();
	},

	harvest: function() {
		this.unscheduleUpdate();
		this.unschedule(this.doAction);
		this.play(CowSprite.Harvest);
	},

	hungry: function() {
		cc.log("Set hungry");
		this.isHungry = true; // firstTime only
		if (this.entered) {
			this.play(CowSprite.Hungry);
		}
	},

	feed: function() {
		this.doAction();
		this.schedule(this.doAction, 4.0);
	},

	update: function(dt) {
		// UpdateWalk
		// cc.log("Direction", this.id, this.direction);
		var newX = this.lx + 0.4 * dt * this.direction.x;
		var newY = this.ly + 0.4 * dt * this.direction.y;
		if (newX < 0.2 || newX > (this.maxX - 0.6)
			|| newY < 0.2 || newY > (this.maxY - 0.6)
		) {
			this.unscheduleUpdate();
			// cc.log("Stop");
			this.play(Math.random() > 0.5 ? CowSprite.Idle1 : CowSprite.Idle2);
			return;
		}
		this.setLogicPosition(newX, newY);
	},

	setOnHarvestTime: function(time) {
		this._setOnHarvestTime(time, AnimalConfig.cow.time * 1000);
	}
});

CowSprite.Idle1 = 'Cow_Idle1';
CowSprite.Idle2 = 'Cow_Idle2';
CowSprite.Walk = 'Cow_walk';
CowSprite.Harvest = 'Cow_No';
CowSprite.Hungry = 'Cow_Hungry';
