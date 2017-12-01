var CowSprite = AnimalSprite.extend({
	direction: cc.p(0, 0),

	ctor: function() {
		this._super(resAniId.Fix_cow);
	},

	onEnter: function() {
		this._super();

		// Random position
		this.maxX = this.getParent().blockSizeX;
		this.maxY = this.getParent().blockSizeY;
		// var lx = (Math.round(Math.random() * 100) % 40) / 10;
		// var ly = (Math.round(Math.random() * 100) % 40) / 10;
		this.setLogicPosition(1, 1);
		this.direction = cc.p(1, 1);
		// this.tt = 0;
		this.scheduleUpdate();
		// this.doAction();
		// this.schedule(this.doAction, 4.0);
	},

	doAction: function() {
		var value = Math.round(Math.random() * 10) % 3;
		cc.log("Run", value);
		switch (value) {
			case 0:
				return this.walk();
			case 1:
				this.unscheduleUpdate();
				return this.play(CowSprite.Idle1);
			case 2:
				this.unscheduleUpdate();
				return this.play(CowSprite.Idle2);
		}
	},

	walk: function() {
		this.play(CowSprite.Walk);
		this.direction.x = 2 * (Math.random() - 0.5);
		this.direction.y = Math.sqrt(1 - Math.pow(this.direction.x, 2)) * (Math.random() > 0.5 ? 1 : -1);
		if (this.lx < 0.2 && this.direction.x < 0) {
			this.direction.x *= -1;
		}
		if (this.ly < 0.2 && this.direction.y < 0) {
			this.direction.y *= -1;
		}
		cc.log("Direction", this.direction);
		var p = MapValues.logicToPosition(this.direction.x, this.direction.y);
		if (p.y < 0) {
			this.setScaleX(-1);
		} else {
			this.setScaleX(1);
		}
		this.scheduleUpdate();
	},

	harvest: function() {

	},

	hungry: function() {

	},

	update: function(dt) {
		// UpdateWalk
		if (this.lx < 0.2 || this.lx > (this.maxX - 0.2)
			|| this.ly < 0.2 || this.ly > (this.maxY - 0.2)
		) {
			this.unscheduleUpdate();
			cc.log("Stop");
			this.play(Math.random() > 0.5 ? CowSprite.Idle1 : CowSprite.Idle2);
		} 
		this.setLogicPosition(
			this.lx + 0.4 * dt * this.direction.x,
			this.ly + 0.4 * dt * this.direction.y
		);
	}
});

CowSprite.Idle1 = 'Cow_Idle1';
CowSprite.Idle2 = 'Cow_Idle2';
CowSprite.Walk = 'Cow_walk';
CowSprite.Harvest = 'Cow_No';
CowSprite.Hungry = 'Cow_Hungry';
