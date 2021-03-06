
// var lstScale = 1.0;
var SCALE_RATIO = 0.05;
var __DEBUG = false;

var MapLayer = cc.Layer.extend({
	LEFT_LIMIT: null,
	RIGHT_LIMIT: null,
	TOP_LIMIT: null,
	BOTTOM_LIMIT: null,
	touchCount: 0,

	touchesMap: null,
	lstDistance: 0,

// //		  flow plant and crop
// 	fieldList: [],


	ctor: function() {
		this._super();
		this.touchesMap = { length: 0 };

		// Init limit points of map
		this.initBorder();

		this.renderGrassBlock();
		this.renderSong();
		this.renderRoad();
		this.renderRoad2();
		this.renderNui();
		this.renderHoaDa();
		this.renderForest();
		this.renderDuongRay();

		// Move to MapCtrl
		// this.renderDefaultConstruct();
		// this.renderSample();
		this.setScale(0.4);
		// Set map to center of screen, Note that setting scale before setting position.
		// Make start animation
		var center = cc.p(MapConfigs.Init.width / 2, MapConfigs.Init.height / 2 + 4);
		this.moveToLogic(center);
		// cc.log("Move to", center);
		// this.setPosition(cc.p((this.width / 2 - center.x) * this.scale, (this.height / 2 - center.y) * this.scale));
		this.initEvent();
	},

	onEnter: function() {
		this._super();
		center = cc.p(MapConfigs.Init.width / 2, MapConfigs.Init.height / 2);
		this.moveToLogic(center, 2);
	},

	initBorder: function() {
		this.LEFT_LIMIT = MapValues.logicToPosition(0, MapConfigs.Init.height);
		this.RIGHT_LIMIT = MapValues.logicToPosition(MapConfigs.Init.width, 0);
		this.TOP_LIMIT = MapValues.logicToPosition(0, 0);
		this.BOTTOM_LIMIT = MapValues.logicToPosition(MapConfigs.Init.width, MapConfigs.Init.height);

		// Set padding
		this.TOP_LIMIT.y += MapConfigs.Init.padding.top;
		this.LEFT_LIMIT.x -= MapConfigs.Init.padding.left;
		this.RIGHT_LIMIT.x += MapConfigs.Init.padding.right;
		this.BOTTOM_LIMIT.y -= MapConfigs.Init.padding.bottom;

		// Show red point of each limit point.
		if (__DEBUG) {
			var dotLeft = new cc.Sprite(res.DOT2_PNG);
			var dotRight = new cc.Sprite(res.DOT2_PNG);
			var dotTop = new cc.Sprite(res.DOT2_PNG);
			var dotBottom = new cc.Sprite(res.DOT2_PNG);
			var dotCenter = new cc.Sprite(res.DOT2_PNG);

			dotLeft.setPosition(this.LEFT_LIMIT);
			dotRight.setPosition(this.RIGHT_LIMIT);
			dotTop.setPosition(this.TOP_LIMIT);
			dotBottom.setPosition(this.BOTTOM_LIMIT);
			dotCenter.setPosition(cc.p(this.width / 2, this.height / 2));

			dotLeft.setLocalZOrder(5);
			dotRight.setLocalZOrder(5);
			dotTop.setLocalZOrder(5);
			dotBottom.setLocalZOrder(5);
			dotCenter.setLocalZOrder(5);

			this.addChild(dotLeft);
			this.addChild(dotRight);
			this.addChild(dotTop);
			this.addChild(dotBottom);
			this.addChild(dotCenter);
		}
	},

	renderGrassBlock: function() {
		// Grass sprite overlaps another grass sprite by its half size.
		var sampleGrassSprite = new cc.Sprite(res.GRASS_PNG);
		var blockSize = sampleGrassSprite.getContentSize();
		var horizontal = (this.RIGHT_LIMIT.x - this.LEFT_LIMIT.x) / blockSize.width;
		var vertical = (this.TOP_LIMIT.y - this.BOTTOM_LIMIT.y) / blockSize.height;
		var startPoint = cc.p(this.LEFT_LIMIT.x, this.TOP_LIMIT.y);

		for (var i = 0; i < vertical * 2 + 1; i++) {
			for (var j = 0; j < horizontal * 2 + 1; j++) {
				var sprite = new cc.Sprite(res.GRASS_PNG);
				sprite.setPosition(
					startPoint.x + j * blockSize.width / 2,
					startPoint.y - i * blockSize.height / 2
				);
				this.addChild(sprite);
			}
		}

		if (__DEBUG) {
			// Debug
			for (var i = 0; i < MapConfigs.Init.width; i++) {
				for (var j = 0; j < MapConfigs.Init.height; j++) {
					var sprite = new cc.Sprite(res.GRASS_BLOCK);
					sprite.setPosition(MapValues.logicToPosition(i, j));
					sprite.setAnchorPoint(cc.p(0.5, 1));
					this.addChild(sprite);
				}
			}
		}
	},

	renderRoad: function() {
		var config = MapConfigs.Road;
		for (var i = 0; i <= MapConfigs.Init.width / config.blockSizeX; i++) {
			var sprite = new cc.Sprite(res.ROAD_PNG);
			this.addChild(sprite);
			sprite.setPosition(MapValues.logicToPosition(
				config.blockSizeX * i,
				config.position.y
			));
			// sprite.y += i * config.blockSizeY;
		}
	},

	renderRoad2: function() {
		var config = MapConfigs.Road2;
		for (var i = (MapConfigs.Road.position.y - 3) / config.blockSizeY; i > config.startPoint; i--) {
			var sprite = new cc.Sprite(res.ROAD_02_PNG);
			this.addChild(sprite);
			sprite.setPosition(MapValues.logicToPosition(config.position.x, 2 * i));
		}
		var spriteNoiDuong = new cc.Sprite(res.NOI_DUONG_PNG);
		this.addChild(spriteNoiDuong);
		spriteNoiDuong.setPosition(MapValues.logicToPosition(
			config.position.x,
			MapConfigs.Road.position.y - 2
		));
		// spriteNoiDuong.x += config.joinSegmentOffset.x;
		// spriteNoiDuong.y += config.joinSegmentOffset.y;
	},

	// Moved to MapCtrl
	renderDefaultConstruct: function() {
		this.addChild(new NhaChinhSprite(MapConfigs.NhaChinh.position));
		this.addChild(new TruckOrderSprite(MapConfigs.TruckOrder.position));
		this.addChild(new MailBoxSprite(MapConfigs.MailBox.position));
		this.addChild(new RoadShopSprite(MapConfigs.RoadShop.position));
	},

	renderSong: function() {
		// Render riverbed
		var drawNode = new cc.DrawNode();
		drawNode.drawPoly([
			MapValues.logicToPosition(MapConfigs.Song.startX, MapConfigs.Song.endY),
			MapValues.logicToPosition(MapConfigs.Song.endX, MapConfigs.Song.endY),
			MapValues.logicToPosition(MapConfigs.Song.endX, MapConfigs.Song.startY),
			MapValues.logicToPosition(MapConfigs.Song.startX, MapConfigs.Song.startY)
		], cc.color(MapConfigs.Song.color));
		this.addChild(drawNode);

		// Render first riverside
		var riverSide1BlockSizeY = MapConfigs.Song.riverside1.blockSizeY;
		for (var i = 0; i <= MapConfigs.Init.height / riverSide1BlockSizeY; i++) {
			var sprite = new cc.Sprite(res.SONG_1);
			sprite.setPosition(MapValues.logicToPosition(
				MapConfigs.Song.startX,
				i * riverSide1BlockSizeY
			));
			this.addChild(sprite);
		}

		var riverSide2BlockSizeY = MapConfigs.Song.riverside2.blockSizeY;
		// Render last riverside
		for (var i = 0; i <= MapConfigs.Init.height / riverSide2BlockSizeY; i++) {
			var sprite = new cc.Sprite(res.SONG_2);
			sprite.setPosition(MapValues.logicToPosition(
				MapConfigs.Song.endX,
				i * riverSide2BlockSizeY
			));

			this.addChild(sprite);
		}

		// Render harbor
		var harborConfig = MapConfigs.Song.harbor;
		var harbor = new MapBlockSprite(res.HABOR,
				harborConfig.blockSizeX, harborConfig.blockSizeY);
		harbor.setLogicPosition(harborConfig.position);
		this.addChild(harbor);
	},

	renderNui: function() {
		var nuiConfig = MapConfigs.Nui;
		for (var i = 0; i <= MapConfigs.Init.height / nuiConfig.blockSizeY; i++) {
			var sprite = new cc.Sprite(res.NUI_PNG);
			sprite.setPosition(MapValues.logicToPosition(
				nuiConfig.x,
				i * nuiConfig.blockSizeY
			));
			if (i === 0) {
				sprite.setLocalZOrder(2);
			}
			this.addChild(sprite);
		}
		var mo02Sprite = new cc.Sprite(res.MO_02);
		mo02Sprite.setPosition(MapValues.logicToPosition(
			nuiConfig.x,
			Math.round(MapConfigs.Init.height * 0.75)
		));
		this.addChild(mo02Sprite);
	},

	renderDuongRay: function() {
		var duongRayConfig = MapConfigs.DuongRay;
		for (var i = 0; i < MapConfigs.Init.height / duongRayConfig.blockSizeY; i++) {
			var sprite = new cc.Sprite(res.RAY_TAU);
			sprite.setPosition(MapValues.logicToPosition(
				duongRayConfig.position.x,
				i * duongRayConfig.blockSizeY
			));
			sprite.x += duongRayConfig.offset.x * i;
			sprite.y += duongRayConfig.offset.y * i;
			this.addChild(sprite);
		}
		var mo01Sprite = new cc.Sprite(res.MO_01);
		mo01Sprite.setPosition(MapValues.logicToPosition(
			duongRayConfig.position.x,
			Math.round(MapConfigs.Init.height * 0.6)
		));
		this.addChild(mo01Sprite);
	},

	renderForest: function() {
		// Render top-left forest
		(function() {
			var config = MapConfigs.Forest.topLeft;
			var lineXl = config.position.x;
			var overlapX = config.overlap.x;
			var overlapY = config.overlap.y;

			var sprite = new cc.Sprite(res.NHOM_CAY_1);
			var contentSize = sprite.getContentSize();

			var startX = this.LEFT_LIMIT.x; // because of anchor 1,0
			var startY = MapValues.yLinearByXl(lineXl, startX);
			while (startY <= this.TOP_LIMIT.y) {
				var countX = Math.round((this.TOP_LIMIT.y - startY) / (contentSize.height - overlapY));
				for (var i = countX; i >= 0; i--) {
					var sprite = new cc.Sprite(res.NHOM_CAY_1);
					sprite.setPosition(
						startX,
						startY + i * (contentSize.height - overlapY)
					);
					sprite.setAnchorPoint(cc.p(0.5, 0));
					this.addChild(sprite);
				}
				startX += contentSize.width - overlapX;
				startY = MapValues.yLinearByXl(lineXl, startX);
			}
		}.bind(this))();

		// Render top-right forest
		(function() {
			var config = MapConfigs.Forest.topRight;
			var lineYl = config.position.y;
			var overlapX = config.overlap.x;
			var overlapY = config.overlap.y;

			var sprite = new cc.Sprite(res.NHOM_CAY_1);
			var contentSize = sprite.getContentSize();

			var startX = this.RIGHT_LIMIT.x;
			var startY = MapValues.yLinearByYl(lineYl, startX);
			while (startY <= this.TOP_LIMIT.y) {
				var countX = Math.round((this.TOP_LIMIT.y - startY) / (contentSize.height - overlapY));
				for (var i = countX; i >= 0; i--) {
					var sprite = new cc.Sprite(res.NHOM_CAY_1);
					sprite.setPosition(
						startX,
						startY + i * (contentSize.height - overlapY)
					);
					sprite.setAnchorPoint(cc.p(0.5, 0));
					sprite.setScaleX(-1);
					this.addChild(sprite);
				}
				startX -= contentSize.width - overlapX;
				startY = MapValues.yLinearByYl(lineYl, startX);
			}
		}.bind(this))();

		// Render bottom-left forest
		(function() {
			var config = MapConfigs.Forest.bottomLeft;
			var lineYl = config.position.y;
			var overlapX = config.overlap.x;
			var overlapY = config.overlap.y;

			var sprite = new cc.Sprite(res.NHOM_CAY_2);
			var contentSize = sprite.getContentSize();

			var startX = this.LEFT_LIMIT.x;
			var startY = MapValues.yLinearByYl(lineYl, startX);
			while (startY >= this.BOTTOM_LIMIT.y) {
				var countX = Math.round((startY - this.BOTTOM_LIMIT.y) / (contentSize.height - overlapY));
				for (var i = 0; i <= countX; i++) {
					var sprite = new cc.Sprite(res.NHOM_CAY_2);
					sprite.setPosition(
						startX,
						startY - i * (contentSize.height - overlapY)
					);
					sprite.setAnchorPoint(0.5, 1);
					this.addChild(sprite);
				}
				startX += contentSize.width - overlapX;
				startY = MapValues.yLinearByYl(lineYl, startX);
			}
		}.bind(this))();

		// Render bottom-right forest
		(function() {
			var config = MapConfigs.Forest.bottomRight;
			var lineXl = config.position.x;
			var overlapX = config.overlap.x;
			var overlapY = config.overlap.y;

			var sprite = new cc.Sprite(res.NHOM_CAY_2);
			var contentSize = sprite.getContentSize();

			var startX = this.RIGHT_LIMIT.x;
			var startY = MapValues.yLinearByXl(lineXl, startX);
			while (startY >= this.BOTTOM_LIMIT.y) {
				var countX = Math.round((startY - this.BOTTOM_LIMIT.y) / (contentSize.height - overlapY));
				for (var i = 0; i <= countX; i++) {
					var sprite = new cc.Sprite(res.NHOM_CAY_2);
					sprite.setPosition(
						startX,
						startY - i * (contentSize.height - overlapY)
					);
					sprite.setAnchorPoint(0.5, 1);
					sprite.setScaleX(-1);
					this.addChild(sprite);
				}
				startX -= contentSize.width - overlapX;
				startY = MapValues.yLinearByXl(lineXl, startX);
			}
		}.bind(this))();
	},

	renderHoaDa: function() {
		var _res = [];
		for (var i = 0; i < MapConfigs.Init.width; i++) {
			_res.push(Math.round(Math.random() * 10 ) % 3);
		}
		var resArr = [res.STONE_12, res.STONE_13, res.HOA_2, res.HOA_1];
		for (var i = 0; i < 32; i++) {
			var sprite = new cc.Sprite(resArr[_res[i]]);
			sprite.setPosition(MapValues.logicToPosition(i, -1));
			this.addChild(sprite);
		}
		// var _resStone12 = [cc.p(8, 38), cc.p(12, 38), cc.p(18, 38), cc.p(24, 37),
		// 		cc.p(42, 12), cc.p(42, 16), cc.p(41, 21),
		// 		cc.p(6, -3), cc.p(14, -4), cc.p(17, -5), cc.p(18, -3)
		// ];
		// for (var i = 0; i < _resStone12.length; i++) {
		// 	var sprite = new cc.Sprite(res.STONE_12);
		// 	sprite.setPosition(MapValues.logicToPosition(_resStone12[i].x, _resStone12[i].y));
		// 	this.addChild(sprite);
		// }
		// var _resStone12_2 = [cc.p(-9, 23)];
		// for (var i = 0; i < _resStone12_2.length; i++) {
		// 	var sprite = new cc.Sprite(res.STONE_13);
		// 	sprite.setPosition(MapValues.logicToPosition(_resStone12_2[i].x, _resStone12_2[i].y));
		// 	this.addChild(sprite);
		// 	sprite.setLocalZOrder(2);
		// }
		// var _resHoa2 = [
		// 	cc.p(10, 38), cc.p(15, 37), cc.p(15, 38),
		// 	cc.p(42, 10), cc.p(41, 14), cc.p(41, 18),
		// 	cc.p(42, 19), cc.p(42, 23), cc.p(4, -4),
		// 	cc.p(20, -4), cc.p(21, -3)
		// ];
		// for (var i = 0; i < _resHoa2.length; i++) {
		// 	var sprite = new cc.Sprite(res.HOA_2);
		// 	sprite.setPosition(MapValues.logicToPosition(
		// 		_resHoa2[i].x,
		// 		_resHoa2[i].y
		// 	));
		// 	this.addChild(sprite);
		// }
		// var _resHoa2_2 = [cc.p(-9, 21), cc.p(15, -4)];
		// for (var i = 0; i < _resHoa2_2.length; i++) {
		// 	var sprite = new cc.Sprite(res.HOA_2);
		// 	sprite.setPosition(MapValues.logicToPosition(
		// 		_resHoa2_2[i].x,
		// 		_resHoa2_2[i].y
		// 	));
		// 	this.addChild(sprite);
		// }
		// var _res_grass = [
		// 	{"x":0,"y":9,"v":0},{"x":0,"y":19,"v":1},{"x":1,"y":8,"v":0},
		// 	{"x":2,"y":13,"v":1},{"x":2,"y":28,"v":0},{"x":3,"y":8,"v":1},
		// 	{"x":3,"y":24,"v":1},{"x":3,"y":29,"v":1},{"x":4,"y":7,"v":0},
		// 	{"x":4,"y":29,"v":1},{"x":5,"y":21,"v":0},{"x":6,"y":11,"v":1},
		// 	{"x":6,"y":12,"v":0},{"x":6,"y":19,"v":0},{"x":8,"y":4,"v":0},
		// 	{"x":8,"y":14,"v":1},{"x":9,"y":19,"v":0},{"x":10,"y":3,"v":0},
		// 	{"x":10,"y":10,"v":1},{"x":12,"y":5,"v":0},{"x":12,"y":22,"v":0},
		// 	{"x":13,"y":0,"v":0},{"x":13,"y":7,"v":0},{"x":15,"y":6,"v":1},
		// 	{"x":16,"y":5,"v":1},{"x":17,"y":1,"v":0},
		// 	{"x":17,"y":10,"v":1},{"x":17,"y":14,"v":0},{"x":17,"y":15,"v":0},
		// 	{"x":18,"y":1,"v":1},{"x":18,"y":12,"v":1},{"x":18,"y":16,"v":1},
		// 	{"x":18,"y":29,"v":0},{"x":20,"y":13,"v":1},{"x":21,"y":12,"v":1},
		// 	{"x":22,"y":24,"v":1},{"x":23,"y":3,"v":1},{"x":23,"y":8,"v":1},
		// 	{"x":23,"y":18,"v":0},{"x":24,"y":2,"v":0},{"x":24,"y":9,"v":0},
		// 	{"x":24,"y":25,"v":1},{"x":25,"y":17,"v":0},{"x":25,"y":18,"v":1},
		// 	{"x":26,"y":0,"v":1},{"x":26,"y":11,"v":1},{"x":26,"y":12,"v":0},
		// 	{"x":26,"y":31,"v":0},{"x":27,"y":1,"v":0},{"x":27,"y":31,"v":0},
		// 	{"x":28,"y":6,"v":1},{"x":29,"y":10,"v":0},{"x":30,"y":5,"v":1},
		// 	{"x":30,"y":20,"v":1},{"x":31,"y":4,"v":1},{"x":31,"y":8,"v":0},
		// 	{"x":31,"y":20,"v":1}
		// ];
		// for (var i = 0; i < _res_grass.length; i++) {
		// 	var sprite = new cc.Sprite(
		// 		_res_grass[i].v === 0 ? res.GRASS_TREE_1 : res.GRASS_TREE_2
		// 	);
		// 	sprite.setPosition(MapValues.logicToPosition(
		// 		_res_grass[i].x,
		// 		_res_grass[i].y
		// 	));
		// 	this.addChild(sprite);
		// }
		// var _res_tree_outside = [
		// 	{ x: 8, y: -4, v: 1 },
		// 	{ x: 12, y: -3, v: 0 },
		// 	{ x: 15, y: -3, v: 1 },
		// 	{ x: 28, y: -4, v: 0 },
		// 	{ x: 23, y: -4, v: 1 },
		// 	{ x: 24, y: -5, v: 1 }
		// ];
		// for (var i = 0; i < _res_tree_outside.length; i++) {
		// 	var sprite = new cc.Sprite(
		// 		_res_tree_outside[i].v === 0
		// 		? res.CAY_02_OUT
		// 		: res.CAY_01_OUT
		// 	);
		// 	sprite.setPosition(MapValues.logicToPosition(
		// 		_res_tree_outside[i].x,
		// 		_res_tree_outside[i].y
		// 	));
		// 	sprite.setLocalZOrder(2);
		// 	this.addChild(sprite);
		// }
	},

	renderSample: function() {
		// var bakery = fr.createAnimationById(resAniId.bakery, this);
		// this.bakery = bakery;
		// bakery.setPosition(MapValues.logicToPosition(4, 5));
		// bakery.gotoAndPlay('loop', -1);
		// this.setScale(0.7);
		// this.addChild(bakery);
		// cc.log(bakery.getBoundingBox());



		var bakery = new BakerySprite(20, 20);
		this.bakery = bakery;
		// setInterval(function() {
		// 	cc.log(bakery._getContentSize());
		// }, 500);

		this.addChild(this.bakery);


		var foodGringer = new FoodGringer(20, 20);
		//this.foodGringer = foodGringer;
		this.addChild(foodGringer);
		cc.log(foodGringer.getContentSize());

		// var Lamb = fr.createAnimationById(resAniId.bakery, this);
		// this.addChild(Lamb);
		// Lamb.setLogicPosition(4, 5);
		// Lamb.gotoAndPlay('loop', -1);
		// Lamb.setAnchorPoint(cc.p(0, 0));
		// bakery.setLocalZOrder(2);
		// Lamb.setLocalZOrder(1);
	},

	initEvent: function() {
		this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function (touch, event) {
				var mousePos = touch.getLocation();
				var position = MapValues.screenPositionToLogic(mousePos.x, mousePos.y);
				position.x = Math.floor(position.x);
				position.y = Math.floor(position.y);
				if (__DEBUG) {
					cc.log('Map Clicked', position);
				}

            	// Stop inertia and capture velocity
            	// cc.log("Map Begin");
            	this.uninertia();
				InertiaEngine.instance.init(mousePos);

				// // Disable planting popup
				// PopupLayer.instance.disableAllPopup();
                TablePopupLayer.instance.removeUpdateDisableListener();
            	if (!this.lock) {
            		if (this.touchesMap.length < 2) {
		            	// cc.log("Began", touch.getID());
		            	this.touchesMap[touch.getID()] = touch.getLocation();
						this.touchesMap.length++;
						//cc.log(this.touchesMap);
	            	}
	            	if (this.touchesMap.length === 1) {
	            		InertiaEngine.instance.init(touch.getLocation());
						PopupLayer.instance.disableAllPopup();
	            		// this.uninertia();
	            	} else if (this.touchesMap.length === 2) { // === 2
	            		InertiaEngine.instance.stop();
	            		var p1 = touch.getLocation();

	            		var p2 = null;
	            		for (var k in this.touchesMap) {
	            			if (k != touch.getID() && !isNaN(k)) {
	            				p2 = this.touchesMap[k];
	            				break;
	            			}
	            		}
	            		// cc.log(this.touchesMap);
	            		this.lstDistance = caculateDistance(p1, p2);
	            	}
            	}
            	if (__DEBUG) {
            		var lp = MapValues.screenPositionToLogic(touch.getLocation().x, touch.getLocation().y);
            		cc.log("Map Clicked", lp, user.getModelObjectAtMap(lp.x, lp.y));
            	}
				return true;
            }.bind(this),
            onTouchMoved: function(touch, event) {
            	// cc.log("Update");
            	if (!this.lock) {
            		// Not lock moving
            		this.touchesMap[touch.getID()] = touch.getLocation();
	            	if (this.touchesMap.length === 1) {
						InertiaEngine.instance.setPoint(touch.getLocation());
	            		var delta = touch.getDelta();
	       				this.move(delta.x, delta.y);
	            	} else { // this.touchMap.lenght === 2
	            		// Zoom
	            		// caculate distance
	            		var p1 = touch.getLocation();
	            		var p2 = null;
	            		for (var k in this.touchesMap) {
	            			if (k != touch.getID() && !isNaN(k)) {
	            				p2 = this.touchesMap[k];
	            				break;
	            			}
	            		}
	            		var distance = caculateDistance(p1, p2);
	            		var deltaDistance = distance - this.lstDistance;
	            		this.lstDistance = distance;
	            		// cc.log(deltaDistance);
	            		this.zoomBy(deltaDistance / 40, cc.p((p1.x + p2.x) / 2, (p1.y + p2.y) / 2));
	            	}
            	}
            	// Add new move position to InertialEngine
    			// var t = this.touchesList.find(function(_) { return _.getID() === touch.getID()});
    			// cc.log("Ref", t.getLocation());
    			// cc.log("Ori", touch.getLocation());
            }.bind(this),
            onTouchEnded: function (touch, event) {
            	// Caculate velocity and add ineria
				// var velocity = InertiaEngine.instance.stopAndGetVelocity(touch.getLocation());
				// // cc.log("v =", this.velocity);
				// this.inertia(velocity);

				// PopupLayer.instance.disablePopup();
				// PopupLayer.instance.disableProgressBarInprogress();
            	if (!this.lock) {
            		if (this.touchesMap[touch.getID()]) {
	            		delete this.touchesMap[touch.getID()];
		            	this.touchesMap.length--;
		            	// cc.log(this.touchesMap);

	            	}
	            	if (InertiaEngine.instance.isRecording()) {
						var velocity = InertiaEngine.instance.stopAndGetVelocity(touch.getLocation());
						this.inertia(velocity);
	            	}
            	}
			}.bind(this)
        });
        // cc.eventManager.addListener(this.touchListener, 10 * Math.max(MapConfigs.Init.width + 5, MapConfigs.Init.height + 5));
        cc.eventManager.addListener(this.touchListener, 50);

        cc.log("Register map touch event with priority", 50);
        var mouseListener = cc.EventListener.create({
			event: cc.EventListener.MOUSE,
			onMouseScroll: function(e) {
				this.zoomBy(-e.getScrollY(), e.getLocation());
			}.bind(this)
		});
		cc.eventManager.addListener(mouseListener, this);

		this.centerPoint = cc.p(
			this.getContentSize().width / 2,
			this.getContentSize().height / 2
		);

		var keyboardListener = cc.EventListener.create({
			event: cc.EventListener.KEYBOARD,
			onKeyPressed: this.handleKeyboard.bind(this)
		});
		cc.eventManager.addListener(keyboardListener, this);
		this.__dX = 0;
		this.__dY = 0;
	},

	lock: false,
	lockMap: function(lock) {
		if (lock) {
			// Remove all touches in map
			this.touchesMap = {
				length: 0
			};
		}
		this.lock = lock;
	},

	move: function(dx, dy) {
		var newX = this.x + dx;
		var newY = this.y + dy;

		var leftX = (this.LEFT_LIMIT.x - this.width / 2) * this.scale + this.width / 2;
		var rightX = (this.RIGHT_LIMIT.x - this.width / 2) * this.scale - this.width / 2;
		var topY = (this.TOP_LIMIT.y - this.height / 2) * this.scale - this.height / 2;
		var bottomY = (this.BOTTOM_LIMIT.y - this.height / 2) * this.scale + this.height / 2;

		if (-newX < leftX) {
			newX = -leftX;
		} else if (-newX > rightX) {
			newX = -rightX;
		}

		if (-newY < bottomY) {
			newY = -bottomY;
		} else if (-newY > topY) {
			newY = -topY;
		}

		this.setPosition(newX, newY);
//
		// PopupLayer.instance.disablePopup();
		// PopupLayer.instance.disableProgressBarInprogress();
	},

	moveToLogic: function(lx, ly, time) {
		if (lx.x) {
			time = ly;
			ly = lx.y;
			lx = lx.x;
		}
		var p = MapValues.logicToPosition(lx, ly);
		var caculateP = cc.p((this.width / 2 - p.x) * this.scale, (this.height / 2 - p.y) * this.scale);
		if (time) {
			// cc.log("Time", time);
			var action = new cc.MoveTo(time, caculateP).easing(cc.easeExponentialOut());
			this.runAction(action);
		} else {
			this.setPosition(caculateP);
		}
	},

	moveBy: function(x, y, time) {
		if (x.x) {
			time = y;
			y = x.y;
			x = x.x;
		}
		if (time) {
			cc.log("Time", time);
			var action = new cc.MoveBy(time, cc.p(x, y)).easing(cc.easeExponentialOut());
			this.runAction(action);
			// cc.log("Run action");
		} else {
			this.setPosition(cc.p(x, y));
		}
	},

	zoomBy: function(sign, cursor) {
		var standartSign = sign * this.scale;
		var deltaScale = Math.round(SCALE_RATIO * sign * 1000) / 1000;
		var currentScale = Math.round(this.scale * 1000) / 1000;
		var newScale = Math.round((currentScale + deltaScale) * 1000) / 1000;

		if (newScale < 0.15) {
			newScale = 0.15;
			deltaScale = newScale - currentScale;
		}
		if (newScale > 2) {
			newScale = 2;
			deltaScale = newScale - currentScale;
		}

		if (newScale !== currentScale) {
			var cx = this.centerPoint.x + this.x - cursor.x;
			var cy = this.centerPoint.y + this.y - cursor.y;
			var dx = deltaScale * cx / currentScale;
			var dy = deltaScale * cy / currentScale;
			this.setScale(newScale);
			this.move(dx, dy);
		}


		////
		//MachineLayer.instance.disablePopup();

        TablePopupLayer.instance.removeUpdateDisableListener();
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
			case 90:
				this.zoom(0.5, cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
				break;
			case 88:
				this.zoom(-0.5, cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
				break;
			default:
				cc.log("Unhandled key " + keycode);
		}
		cc.log("Debug Sprite delta: " + this.__dX + " " + this.__dY);
	},





// //		////
    getIndexOfFieldList: function (fieldId) {
        if (fieldId == null){
            return null;
        }
        for (var i = 0; i < this.fieldList.length; i++){
            if (this.fieldList[i].fieldId == fieldId){
                return i;
            }
        }
        return null;
    },
	// //

	runAnimationPlantting: function(fieldId, seedType){
		// var index = this.getIndexOfFieldList(fieldId);
		var field = this.fieldList.find(function(f) {
			return f.fieldId === fieldId;
		})
		if (field){
			field.plantAnimation(seedType);
		}

	},

	runAnimationCrop: function (fieldId, seedType, callback) {
		cc.log("Run animation crop");
		var index = this.getIndexOfFieldList(fieldId);
		if (index != null){
			this.fieldList[index].cropAnimation(seedType, callback);

			this.fieldList[index].changeTexture(res.field);
		}
	},


	// //
	getNPCByOrderNPCId: function (orderNPCId) {
		if (orderNPCId == null){
			return null;
		}
		for (var i = 0; i < this.npcList.length; i++){
			if (this.npcList[i].orderId == orderNPCId){
				return this.npcList[i];
			}
		}
		return null;
	},

	getIndexByOrderNPCId: function (orderNPCId) {
		if (orderNPCId == null){
			return null;
		}
		for (var i = 0; i < this.npcList.length; i++){
			if (this.npcList[i].orderId == orderNPCId){
				return i;
			}
		}
		return null;
	},
//	  //


	inertia: function(velocity) {
		if (!this.scheduling) {
			this.scheduling = true;
			this.scheduleUpdate();
		}
		this.velocity = velocity;
		// cc.log("velocity", velocity);
	},

	uninertia: function() {
		if (this.scheduling) {
			this.unscheduleUpdate();
			this.scheduling = false;
		}
		// cc.log("Stop action");
		this.stopAllActions();
	},

	update: function(dt) {
		var dx = this.velocity.x * dt;
		var dy = this.velocity.y * dt;
		if (dx * dx + dy * dy < 0.5) {
			// return this.uninertia();
			this.unscheduleUpdate();
			this.scheduling = false;
			return;
		}
		var reduce = Math.pow(0.93, dt * 60);
		// cc.log("Reduce", reduce);
		this.velocity.x *= reduce;
		this.velocity.y *= reduce;
		this.move(dx, dy);
	}
});
