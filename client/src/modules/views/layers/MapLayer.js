var SCALE_RATIO = 0.05;
var __DEBUG = true;

var MapValues = (function() {
	var iLength = 262;
	var jLength = 134;
	return {
		iLength: iLength,
		jLength: jLength,
		logicToPosition: function(x, y) {
			var _x = (x - y) * iLength / 2;
			var _y = (- x - y) * jLength / 2;
			return cc.p(_x, _y);
		}
	}
})();

var MapLayer = cc.Layer.extend({
	currentScale: 0.6,
	LEFT_LIMIT: null,
	RIGHT_LIMIT: null,
	TOP_LIMIT: null,
	BOTTOM_LIMIT: null,

	ctor: function() {
		this._super();
		this.renderGrassBlock(32, 32);
		this.renderSong();
		this.renderRoad();
		this.renderRoad2();
		this.renderNui();
		this.renderForest();
		this.renderDuongRay();
		this.renderNhaChinh();
		// this.renderTruckOrder();
		this.renderSample();
		this.setPosition(MapValues.logicToPosition(-16, -16));
		// this.setPosition(cc.p(1136 / 2, 640 / 2));
		this.setScale(this.currentScale);
		this.initBorder();
		this.initEvent();
		cc.json(this.getContentSize());
		cc.json(this.LEFT_LIMIT);
	},

	initBorder: function() {
		var dotLeft = new cc.Sprite(res.DOT2_PNG);
		var dotRight = new cc.Sprite(res.DOT2_PNG);
		var dotTop = new cc.Sprite(res.DOT2_PNG);
		var dotBottom = new cc.Sprite(res.DOT2_PNG);
		this.LEFT_LIMIT = MapValues.logicToPosition(0, 32);
		this.RIGHT_LIMIT = MapValues.logicToPosition(32, 0);
		this.TOP_LIMIT = MapValues.logicToPosition(0, 0);
		this.BOTTOM_LIMIT = MapValues.logicToPosition(32, 32);

		this.TOP_LIMIT.y += 100;
		this.LEFT_LIMIT.x -= 100;
		this.RIGHT_LIMIT.x += 100;
		this.BOTTOM_LIMIT.y -= 100;

		dotLeft.setPosition(this.LEFT_LIMIT);
		dotRight.setPosition(this.RIGHT_LIMIT);
		dotTop.setPosition(this.TOP_LIMIT);
		dotBottom.setPosition(this.BOTTOM_LIMIT);
		this.addChild(dotLeft);
		this.addChild(dotRight);
		this.addChild(dotTop);
		this.addChild(dotBottom);
	},

	renderGrassBlock: function(width, height) {
		for (var i = -3; i <= 12; i++) {
			for (var j = -3; j <= 12; j++) {
				if (i + j > -2 && i + j < 20 && j - i < 10 && i - j < 10) {
					var sprite = new cc.Sprite(res.GRASS_PNG);
					sprite.setPosition(MapValues.logicToPosition(4 * i, 4 * j));
					sprite.y += 30 * (j + i);
					sprite.x += 30 * (j - i);
					this.addChild(sprite);
				}
			}
		}

		if (__DEBUG) {
			// Debug
			for (var i = 0; i < width; i++) {
				for (var j = 0; j < height; j++) {
					var sprite = new cc.Sprite(res.GRASS_BLOCK);
					sprite.setPosition(MapValues.logicToPosition(i, j));
					sprite.setAnchorPoint(cc.p(0.5, 1));
					this.addChild(sprite);
				}
			}
		}
	},

	renderRoad: function() {
		for (var i = 17; i >= 0; i--) {
			var sprite = new cc.Sprite(res.ROAD_PNG);
			this.addChild(sprite);
			sprite.setPosition(MapValues.logicToPosition(2 * i, 35));
			// sprite.setAnchorPoint(anchorPoint);
			sprite.y += i * 4;
		}
	},

	renderRoad2: function() {
		for (var i = 16; i > 8; i--) {
			var sprite = new cc.Sprite(res.ROAD_02_PNG);
			this.addChild(sprite);
			sprite.setPosition(MapValues.logicToPosition(16, 2 * i));
			// sprite.setAnchorPoint(anchorPoint);
		}
		var spriteNoiDuong = new cc.Sprite(res.NOI_DUONG_PNG);
		this.addChild(spriteNoiDuong);
		spriteNoiDuong.setPosition(MapValues.logicToPosition(16, 33));
		spriteNoiDuong.x += 40;
		spriteNoiDuong.y += 10;
	},

	renderNhaChinh: function() {
		var sprite = new cc.Sprite(res.NHA_CHINH_PNG);
		var contentSize = sprite.getContentSize();
		var pos = cc.p(14, 14);
		var blockSizeX = 4;
		var blockSizeY = 4;

		sprite.setPosition(MapValues.logicToPosition(pos.x, pos.y));
		sprite.x += contentSize.width / 2;
		sprite.y += contentSize.height / 2;

		sprite.x -= blockSizeX * MapValues.iLength / 2;

		var point2 = MapValues.logicToPosition(pos.x, pos.y);
		var point1 = MapValues.logicToPosition(pos.x - blockSizeX, pos.y - blockSizeY);

		var dx = point2.x - point1.x;
		var dy = point2.y - point1.y;

		sprite.x += dx;
		sprite.y += dy;

		this.addChild(sprite);
	},

	renderSong: function() {
		var f = 34; // From
		var t = 40; // To
		var drawNode = new cc.DrawNode();
		drawNode.drawPoly([
			MapValues.logicToPosition(f, f),
			MapValues.logicToPosition(t, f),
			MapValues.logicToPosition(t, 0),
			MapValues.logicToPosition(f, 0)
		], cc.color(52, 141, 162));
		this.addChild(drawNode);

		for (var i = 0; i <= 8; i++) {
			var sprite = new cc.Sprite(res.SONG_1);
			sprite.setPosition(MapValues.logicToPosition(f, i * 4));
			this.addChild(sprite);
		}
		for (var i = 0; i <= 16; i++) {
			var sprite = new cc.Sprite(res.SONG_2);
			sprite.setPosition(MapValues.logicToPosition(t, i * 2));
			this.addChild(sprite);
		}
	},

	renderNui: function() {
		for (var i = 0; i <= 8; i++) {
			var sprite = new cc.Sprite(res.NUI_PNG);
			sprite.setPosition(MapValues.logicToPosition(-3, i * 4));
			this.addChild(sprite);
		}
		var mo02Sprite = new cc.Sprite(res.MO_02);
		mo02Sprite.setPosition(MapValues.logicToPosition(-3, 21));
		this.addChild(mo02Sprite);
	},

	renderDuongRay: function() {
		for (var i = -1; i < 16; i++) {
			var sprite = new cc.Sprite(res.RAY_TAU);
			sprite.setPosition(MapValues.logicToPosition(-7, i * 2));
			sprite.x += -33 * i;
			sprite.y += -13 * i;
			this.addChild(sprite);
		}
		var mo01Sprite = new cc.Sprite(res.MO_01);
		mo01Sprite.setPosition(MapValues.logicToPosition(-7, 20));
		this.addChild(mo01Sprite);
	},

	renderTruckOrder: function() {
		var truckOrder = new cc.Sprite(res.TRUCK_ORDER_BG_PNG);
		var contentSize = truckOrder.getContentSize();

		truckOrder.setPosition(MapValues.logicToPosition(13, 19));
		truckOrder.x += contentSize.width / 2;
		truckOrder.y += contentSize.height / 2;

		var blockSizeX = 1;
		var blockSizeY = 2;

		truckOrder.x -= blockSizeX * MapValues.iLength / 2;
		truckOrder.y += 30;

		var dx = (blockSizeY - blockSizeX) * MapValues.iLength / 2;
		var dy = (blockSizeY + blockSizeX) / Math.sqrt(3) * MapValues.iLength / 2;
		
		truckOrder.x -= dx;
		truckOrder.y -= dy;

		this.addChild(truckOrder);
	},

	renderForest: function() {
		var basePoint = MapValues.logicToPosition(-18, 16);
		var basePoint2 = MapValues.logicToPosition(16, -18);
		var basePoint3 = MapValues.logicToPosition(16, 48);
		var basePoint4 = MapValues.logicToPosition(48, 16);

		for (var i = 0; i <= 3; i++) {
			for (var j = 0; j <= (3 - i); j++) {
				var sprite = new cc.Sprite(res.NHOM_CAY_1);
				sprite.setPosition(cc.p(basePoint.x + 730 * i, basePoint.y - 300 * j));
				this.addChild(sprite);
			}
		}

		for (var i = 0; i <= 4; i++) {
			for (var j = 0; j <= (4 - i); j++) {
				var sprite = new cc.Sprite(res.NHOM_CAY_1);
				sprite.setPosition(cc.p(basePoint2.x - 730 * i, basePoint2.y - 300 * j));
				sprite.setScaleX(-1);
				this.addChild(sprite);
			}
		}

		for (var i = 0; i <= 3; i++) {
			for (var j = 0; j <= (3 - i); j++) {
				var sprite = new cc.Sprite(res.NHOM_CAY_2);
				sprite.setPosition(cc.p(basePoint3.x + 600 * i, basePoint3.y + 260 * j));
				this.addChild(sprite);
			}
		}

		for (var i = 0; i <= 3; i++) {
			for (var j = 0; j <= (3 - i); j++) {
				var sprite = new cc.Sprite(res.NHOM_CAY_2);
				sprite.setScaleX(-1);
				sprite.setPosition(cc.p(basePoint4.x - 600 * i, basePoint4.y + 260 * j));
				this.addChild(sprite);
			}
		}
	},

	move: function(dx, dy) {
		cc.log(dx + " : " + dy);
		var newX = this.x + dx;
		var newY = this.y + dy;
		var scale = this.currentScale;

		if (-newX > (this.LEFT_LIMIT.x * this.currentScale + this.width * (1 - this.currentScale) / 2) 
				&& -newX < (this.RIGHT_LIMIT.x * this.currentScale + this.width * (-1 - this.currentScale) / 2)
		) {
			this.x = newX;
		}
		if (-newY > (this.BOTTOM_LIMIT.y * this.currentScale + this.height * (1 - this.currentScale) / 2)
				&& -newY < (this.TOP_LIMIT.y * this.currentScale + this.height * (-1 - this.currentScale) / 2)
		) {
			this.y += dy;
		}
		// cc.json(this.getPosition());
	},

	renderSample: function() {
		var bakery = fr.createAnimationById(resAniId.Bagia, this);
		this.addChild(bakery);
		bakery.setPosition(MapValues.logicToPosition(4, 5));
		bakery.gotoAndPlay('1', -1);
		var Lamb = fr.createAnimationById(resAniId.bakery, this);
		this.addChild(Lamb);
		Lamb.setPosition(MapValues.logicToPosition(4, 5));
		Lamb.gotoAndPlay('loop', -1);
		Lamb.setAnchorPoint(cc.p(0, 0));
		bakery.setLocalZOrder(2);
		Lamb.setLocalZOrder(1);
	},

	initEvent: function() {
		var touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                return true;
            },
            onTouchMoved: function(touch, event) {
            	var delta = touch.getDelta();
       			this.move(delta.x, delta.y);
            }.bind(this),
            onTouchEnded: function (touch, event) {}
        });
        cc.eventManager.addListener(touchListener, this);

        var mouseListener = cc.EventListener.create({
			event: cc.EventListener.MOUSE,
			onMouseScroll: this.handleMouse.bind(this)
		});
		cc.eventManager.addListener(mouseListener, this);
		this.centerPoint = cc.p(this.getContentSize().width / 2, this.getContentSize().height / 2);

		var keyboardListener = cc.EventListener.create({
			event: cc.EventListener.KEYBOARD,
			onKeyPressed: this.handleKeyboard.bind(this)
		});
		cc.eventManager.addListener(keyboardListener, this);
		this.__dX = 0;
		this.__dY = 0;
	},

	handleMouse: function(e) {
		var lstScale = this.currentScale;
		var winSize = cc.winSize;
		var cex = this.centerPoint.x + this.getPosition().x;
		var cey = this.centerPoint.y + this.getPosition().y;
		var cursorX = e.getLocation().x;
		var cursorY = e.getLocation().y;

		var _d = - this.x - (this.LEFT_LIMIT.x * this.currentScale + this.width * (1 - this.currentScale) / 2);
		cc.log("_d = " + _d);
		if (_d <= 0) {
			cc.log("No");
			cursorX = 0;
		}

		var cx = - cursorX + cex;
		var cy = - cursorY + cey;

		if (e.getScrollY() === 1) {
			if (this.currentScale > 0.16) {
				this.currentScale = this.currentScale - SCALE_RATIO;
				this.setScale(this.currentScale);
				var dx = - SCALE_RATIO * cx / lstScale;
				var dy = - SCALE_RATIO * cy / lstScale;
				this.x += dx;
				this.y += dy;
			}
		} else {
			if (this.currentScale < 2) {
				this.currentScale = this.currentScale + SCALE_RATIO;
				this.setScale(this.currentScale);
				// action
				var dx = SCALE_RATIO * cx / lstScale;
				var dy = SCALE_RATIO * cy / lstScale;
				this.x += dx;
				this.y += dy;
			}
		}
		cc.log(this.currentScale);
	},

	handleKeyboard: function(keycode, event) {
		switch (keycode) {
			case 38: // UP
				this.debugSprite.y++;
				this.__dY++;
				break;
			case 40: // DOWN
				this.debugSprite.y--;
				this.__dY--;
				break;
			case 37: // LEFT
				this.debugSprite.x--;
				this.__dX--;
				break;
			case 39: // RIGHT
				this.debugSprite.x++;
				this.__dX++;
				break;
			default:
				cc.log("Unhandled key")
		}
		cc.log(this.__dX + " " + this.__dY);
	}
});
