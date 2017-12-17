var AnimalSprite = cc.Sprite.extend({
    lx: 0,
    ly: 0,
    id: null,

    ctor: function (resAniId) {
        this._super();
        this._sprite = fr.createAnimationById(resAniId);
        this.addChild(this._sprite);
        this.initEvent();
    },

	onEnter: function() {
		this._super();
		// cc.log("On Enter")
		this.setLogicPosition(this.lx, this.ly);
	},

    play: function (name, callback) {
        this._sprite.gotoAndPlay(name);
        this._sprite.setCompleteListener(callback);
    },

    setLogicPosition: function (x, y, prepare) {
        //cc.log("INSIDE Set logic position", x, y);
        if (x.x) {
            prepare = y;
            y = x.y;
            x = x.x
        }
        this.lx = x;
        this.ly = y;
        var parent = this.getParent();
        if (!parent) {
            return;
        }
        var p = MapValues.logicToPosition(x, y);
        this.setLocalZOrder(10 * (x + y) + 1);
        if (prepare) {
            this.setPosition(p);
        } else {
            this.setPosition(
                p.x + this.getParent().getContentSize().width / 2,
                p.y + this.getParent().getContentSize().height
            );
        }
    },

    setId: function (id) {
        this.id = id;
    },

    demo: function () {
    },

	// Need to override
	hungry: function() {},
	harvest: function() {},
	feed: function() {},

    // Deprecated
	setOnHarvestTime: function(time) {},
	_setOnHarvestTime: function(time, totalTime) {
		cc.log("Set On harvest time", time);
		var current = new Date().getTime();
		var deltaTime = current - time;
		this.remainTime = totalTime - deltaTime;
		if (this.entered) {
			if (this.remainTime > 0) {
				this.scheduleOnce(this.harvest, this.remainTime / 1000);
			} else {
				this.harvest();
			}
		}
	},

    // [New]
    setRemainTime: function(remainTime) {
        this.remainTime = remainTime;
        if (this.entered) {
            if (remainTime > 0) {
                cc.log("[RemainTime]", remainTime);
                this.schedule(this.harvest, remainTime / 1000);
            } else {
                this.harvest();
            }
        }
    },

    initEvent: function () {
        if (!home) { // Disable on friend
            return;
        }
        // var dot = new cc.Sprite(res.DOT2_PNG);
        // this.addChild(dot);
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch) {
                var location = touch.getLocation();
                var mp = MapValues.screenPositionToMapPosition(location.x, location.y);
                var boundingbox = this._sprite.getBoundingBox();

                var animalMp = MapValues.logicToPosition(this.lx + this.getParent().lx, this.ly + this.getParent().ly);
                var rect = cc.rect(animalMp.x - boundingbox.width / 2, animalMp.y - boundingbox.height / 2,
                    boundingbox.width, boundingbox.height);
                // cc.log("=====", this.id, "=====");
                // cc.log(this._sprite.getBoundingBox());
                // cc.log(rect);
                // cc.log(mp);
                if (cc.rectContainsPoint(rect, mp)) {
                    this._sprite.setColor(cc.color(155, 155, 155));
                    this.isMoved = false;
                    return true;
                }
                return false;
            }.bind(this),
            onTouchMoved: function (touch) {
                this.isMoved = true;
            }.bind(this),
            onTouchEnded: function (touch) {
                this._sprite.setColor(cc.color(255, 255, 255));
                if (!this.isMoved) {
                    this.onClick();
                }
            }.bind(this)
        });
        cc.eventManager.addListener(this.touchListener, 60);
    },

    onClick: function () {
        this.getParent().showAnimalRemain(this.id);
        this.getParent().showAnimalTool();
    }
});
