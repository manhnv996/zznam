
var lstScale = 1.0;

var MapLayer = (function() {
	var SCALE_RATIO = 0.05;
	var __DEBUG = true;

	return cc.Layer.extend({
		LEFT_LIMIT: null,
		RIGHT_LIMIT: null,
		TOP_LIMIT: null,
		BOTTOM_LIMIT: null,


//		  flow plant and crop
		fieldList: [],


		ctor: function() {
			this._super();
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
			this.renderDefaultConstruct();
			this.renderSample();
			this.setScale(0.4);
			// Set map to center of screen, Note that setting scale before setting position.
			var center = MapValues.logicToPosition(MapConfigs.Init.width / 2, MapConfigs.Init.height / 2);
			this.setPosition(cc.p((this.width / 2 - center.x) * this.scale, (this.height / 2 - center.y) * this.scale));
			this.initEvent();



			this.initFieldList();
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
				sprite.y += i * config.blockSizeY;
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
			spriteNoiDuong.x += config.joinSegmentOffset.x;
			spriteNoiDuong.y += config.joinSegmentOffset.y;
		},

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
					for (var i = countX; i >= 0; i--) {
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
					for (var i = countX; i >= 0; i--) {
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
			var resArr = [res.STONE_13, res.HOA_2, res.HOA_1];
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
			var bakery = fr.createAnimationById(resAniId.bakery, this);
			this.bakery = bakery;
			bakery.setPosition(MapValues.logicToPosition(4, 5));
			bakery.gotoAndPlay('loop', -1);
			this.setScale(0.7);
			this.addChild(bakery);
			cc.log(bakery.getBoundingBox());

			var Lamb = fr.createAnimationById(resAniId.bakery, this);
			this.addChild(Lamb);
			Lamb.setLogicPosition(4, 5);
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
					var mousePos = touch.getLocation();
					cc.log('Clicked', MapValues.screenPositionToLogic(mousePos.x, mousePos.y));
					return true;
	            },
	            onTouchMoved: function(touch, event) {
	            	var delta = touch.getDelta();
	       			this.move(delta.x, delta.y);
	            }.bind(this),
	            onTouchEnded: function (touch, event) {
					var target = event.getCurrentTarget();
					cc.log("sprite onTouchesEnded.. ");
					//

					//
					target.disableProgressBarAllFieldList();
					target.disablePopupAllFieldList();

				}
	        });
	        cc.eventManager.addListener(touchListener, this);

	        var mouseListener = cc.EventListener.create({
				event: cc.EventListener.MOUSE,
				onMouseScroll: function(e) {
					this.zoom(-e.getScrollY(), e.getLocation());
				}.bind(this)
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
		},

		zoom: function(sign, cursor) {
			var deltaScale = SCALE_RATIO * sign;
			
			var newScale = this.scale + deltaScale;
			if (newScale > 0.1 && newScale <= 2) {
				var cx = this.centerPoint.x + this.x - cursor.x;
				var cy = this.centerPoint.y + this.y - cursor.y;
				var dx = deltaScale * cx / this.scale;
				var dy = deltaScale * cy / this.scale;
				this.setScale(newScale);
				this.move(dx, dy);
			}
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





//		////
		initFieldList: function () {
			this.fieldList = [];

		},

		showSeedPopup: function (fieldId, seedList) {
            var index = this.getIndexOfFieldList(fieldId);

            if (index != null) {
                this.disablePopupAllFieldList();
                this.disableProgressBarAllFieldList();

                this.fieldList[index].showSeedPopup(fieldId, seedList);
            }
        },
        showToolPopup: function (fieldId) {
            var index = this.getIndexOfFieldList(fieldId);

            if (index != null) {
            	this.disablePopupAllFieldList();
            	this.disableProgressBarAllFieldList();

                this.fieldList[index].showToolPopup(fieldId);
            }
        },

		//
		disablePopupAllFieldList: function () {
			for (var i = 0; i < this.fieldList.length; i++){
				this.fieldList[i].disablePopup(null);

                this.fieldList[i].popupBackground = null;
                this.fieldList[i].popupItemList = [];
			}
        },
		//


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
		//


		runAnimationPlantting: function(fieldId, seedType){
			var index = this.getIndexOfFieldList(fieldId);
			if (index != null){

				this.fieldList[index].plantAnimation(seedType);

			}


		},

		runAnimationCrop: function (fieldId, seedType) {
			var index = this.getIndexOfFieldList(fieldId);
			if (index != null){
				this.fieldList[index].cropAnimation(seedType);

				this.fieldList[index].changeTexture(res.field);
			}

		},


		//
		showProgressBar: function (fieldId) {
			var index = this.getIndexOfFieldList(fieldId);
			if (index != null){
                this.disablePopupAllFieldList();
                this.disableProgressBarAllFieldList();

				this.fieldList[index].showProgressBarInprogress();
			}
		},
		disableProgressBarAllFieldList: function () {
			for (var i = 0; i < this.fieldList.length; i++){
				this.fieldList[i].disableProgressBarInprogress();
			}
		},
		//

		//
		showNoticeFullFoodStorageBG: function () {
            // this.bgNotice = new cc.Sprite(res.bgNotice);
            // this.bgNotice.setPosition(300, 300);
            // this.addChild(this.bgNotice);
            //
            // var msgFullFoodStorage = new cc.Sprite(res.msgFullFoodStorage);
            // this.setPosition(cc.p(this.bgNotice.width / 2, this.bgNotice.height / 2));
            // this.bgNotice.addChild(msgFullFoodStorage);

        }


	});
})();
