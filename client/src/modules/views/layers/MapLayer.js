var SCALE_RATIO = 0.1;

var MapLayer = cc.Layer.extend({
	iLength: 0,
	jLength: 0,
	currentScale: 1.0,

	ctor: function() {
		this._super();
		this.initLength();

		// this.renderGrassBlock(32, 32);
		this.map = new cc.TMXTiledMap("res/map/default.tmx");
		this.addChild(this.map);
		this.map.setAnchorPoint(cc.p(0.5, 0.5))
		this.map.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
		this.initEvent();
		this.centerPoint = cc.p(this.getContentSize().width / 2, this.getContentSize().height / 2);
	},

	initLength: function() {
		var sprite = new cc.Sprite(res.GRASS_BLOCK);
		var contentSize = sprite.getContentSize();
		this.iLength = contentSize.width;
		this.jLength = contentSize.height;
	},

	logicToPosition: function(x, y) {
		var _x = (x - y) * this.iLength / 2;
		var _y = (x + y) * this.jLength / 2;
		return cc.p(_x, _y);
	},

	renderGrassBlock: function(width, height) {
		for (var i = 0; i < width; i++) {
			for (var j = 0; j < height; j++) {
				var sprite = new cc.Sprite(res.GRASS_BLOCK);
				sprite.setPosition(this.logicToPosition(i, j));
				this.addChild(sprite);
			}
		}
	},

	initEvent: function() {
		var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                cc.log('Touch began');
                return true;
            },
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
                var delta = touch.getDelta();
                target.x += delta.x;
                target.y += delta.y;
            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
                cc.log("sprite onTouchesEnded.. ");
                target.setOpacity(255);
            }
        });
        cc.eventManager.addListener(listener, this);

        var listener2 = cc.EventListener.create({
			event: cc.EventListener.MOUSE,
			onMouseScroll: this.handleMouse.bind(this)
		});
		cc.eventManager.addListener(listener2, this);
	},

	handleMouse: function(e) {
		var lstScale = this.currentScale;
		var winSize = cc.winSize;
		var cex = this.centerPoint.x + this.getPosition().x;
		var cey = this.centerPoint.y + this.getPosition().y;
		var cursorX = e.getLocation().x;
		var cursorY = e.getLocation().y;

		var cx = - cursorX + cex;
		var cy = - cursorY + cey;
		if (e.getScrollY() === 1) {
			if (this.currentScale > 0.2) {
				this.currentScale = this.currentScale - SCALE_RATIO;
				this.setScale(this.currentScale);
				this.x -= SCALE_RATIO * cx / lstScale;
				this.y -= SCALE_RATIO * cy / lstScale;
			}
		} else {
			if (this.currentScale < 2) {
				this.currentScale = this.currentScale + SCALE_RATIO;
				this.setScale(this.currentScale);
				// action
				this.x += SCALE_RATIO * cx / lstScale;
				this.y += SCALE_RATIO * cy / lstScale;
			}
		}
	}
});
