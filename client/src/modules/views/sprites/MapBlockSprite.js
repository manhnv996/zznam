var MapBlockSprite = cc.Sprite.extend({
	lx: 0,
	ly: 0,
    mapAliasType: 0,
    boundingPoints: null,

	ctor: function(resource, blockSizeX, blockSizeY, x, y, mapAliasType) {
		this._super(resource);
		this.blockSizeX = blockSizeX;
		this.blockSizeY = blockSizeY;
        this.mapAliasType = mapAliasType;
		this.setLogicPosition(x, y);
	},

    // Override there methods in inherited class
    onClick: function() {},
    onBeginClick: function() {},
    onEndClick: function() {},
    onFinishMove: function(lx, ly) {},

    // Register touch event, call this in constructor
	registerTouchEvents: function() {
        this.caculateBoundingPoints();
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var touchLocation = touch.getLocation();
                var location = MapValues.screenPositionToMapPosition(touchLocation.x, touchLocation.y);
                
                this.touchListener.__isMoved = false;
                this.touchListener.__moveSprite = false;
                // Check if is click inside sprite
                if (rayCasting(location, this.boundingPoints)) {
                    this.onBeginClick();
                    this.touchListener.__timeout = setTimeout(function() {
                        // disable onClick event after long click
                        this.touchListener.__isMoved = true;

                        this.arrow = fr.createAnimationById(resAniId.Arrow1);
                        this.arrow.gotoAndPlay('1', -1, 1.0);
                        this.arrow.setPosition(cc.p(this.getContentSize().width / 2, this.getContentSize().height));
                        this.addChild(this.arrow);
                        this.arrow.setCompleteListener(function() {
                            // Activate move sprite mode
                            this.touchListener.__moveSprite = true;
                            this.touchListener.originalPosition = this.getLogicPosition();
                            this.touchListener.lstLocation = this.touchListener.originalPosition;
                            // Remove itself from map alias
                            MapCtrl.instance.removeSpriteAlias(this);
                            // cc.log("Move sprite mode activated");
                        }.bind(this));
                    }.bind(this), 500);
                    return true;
                } else {
                    // On click outside
                }
                return false;
            }.bind(this),

            onTouchMoved: function(touch, event) {
                // Move map and disable onclick
                this.touchListener.__isMoved = true;
                if (this.arrow) {
                    this.arrow.removeFromParent();
                    this.arrow = null;
                }
                if (!isNaN(this.touchListener.__timeout)) {
                    clearTimeout(this.touchListener.__timeout);
                    this.touchListener.__timeout = null;
                }
                if (this.touchListener.__moveSprite) {
                    // Move sprite
                    var location = touch.getLocation();
                    var logic = MapValues.screenPositionToLogic(location.x, location.y);
                    logic.x = Math.floor(logic.x);
                    logic.y = Math.floor(logic.y);
                    if (this.touchListener.lstLocation.x !== logic.x || 
                            this.touchListener.lstLocation.y !== logic.y) {
                        // cc.log("Map Alias", this.mapAliasType);
                        // cc.log("move to", logic, MapCtrl.instance.checkValidBlock(logic.x, logic.y, this.blockSizeX, this.blockSizeY, this.mapAliasType));
                        this.touchListener.lstLocation = logic;
                        this.setLogicPosition(logic);
                    }
                } else {
                    // Move map
                    var delta = touch.getDelta();
                    MapLayer.instance.move(delta.x, delta.y);
                }
            }.bind(this),
            
            onTouchEnded: function(touch, event) {
                this.onEndClick();
                if (this.arrow) {
                    this.arrow.removeFromParent();
                    this.arrow = null;
                }
                if (!isNaN(this.touchListener.__timeout)) {
                    clearTimeout(this.touchListener.__timeout);
                    this.touchListener.__timeout = null;
                }
                if (this.touchListener.__moveSprite) {
                    // Finish move
                    var newLocation = this.touchListener.lstLocation;
                    var originalPosition = this.touchListener.originalPosition;
                    // cc.log("Finish move to", newLocation);
                    if (MapCtrl.instance.checkValidBlock(newLocation.x, newLocation.y, this.blockSizeX, this.blockSizeY)) {
                        this.setLogicPosition(newLocation);
                        MapCtrl.instance.addSpriteAlias(this);
                        
                        // Callback when successfully moved
                        // checkif original location is different with new location
                        if (newLocation.x !== originalPosition.x || 
                            newLocation.y !== originalPosition.y
                        ) {
                            this.onFinishMove(newLocation.x, newLocation.y);
                        }
                    } else {
                        this.setLogicPosition(originalPosition);
                    }
                    // for (var i = 0; i < user.map.length; i++) {
                    //     var str = '';
                    //     for (var j = 0; j < user.map[i].length; j++) {
                    //         if (user.map[i][j].type === 0) {
                    //             str += '0';
                    //         } else if (user.map[i][j].type === undefined) {
                    //             str += "u";
                    //         } else {
                    //             str += "*";
                    //         }
                    //     }
                    //     cc.log(str);
                    // }
                }
                !this.touchListener.__isMoved && this.onClick();
            }.bind(this)
        });
        cc.eventManager.addListener(this.touchListener, 
                Math.min(this.lx + ListenerPriority.offsetEventPriority,
                        this.ly + ListenerPriority.offsetEventPriority));
	},

    // Update eventPriority when change location, called in setLogicPosition
    updateEventPriority: function(priority) {
        if (this.touchListener) {
            priority = priority || Math.min(this.lx + ListenerPriority.offsetEventPriority,
                        this.ly + ListenerPriority.offsetEventPriority);
            cc.eventManager.setPriority(this.touchListener, priority);
        }
    },

    // Called in setLogicPosition
    caculateBoundingPoints: function() {
        // Calculate bounding points
        //  TL---TR
        //  |*****|
        //  L*****R
        //   \***/
        //    \*/
        //     B
        var leftPoint = MapValues.logicToPosition(
            this.lx, 
            this.ly + this.blockSizeY
        );
        var rightPoint = MapValues.logicToPosition(
            this.lx + this.blockSizeX,
            this.ly);
        var bottomPoint = MapValues.logicToPosition(
            this.lx + this.blockSizeX,
            this.ly + this.blockSizeY
        );

        var contentSize = this.getContentSize();
        var topLeftPoint = cc.p(
            leftPoint.x,
            bottomPoint.y + contentSize.height
        );
        var topRightPoint = cc.p(
            rightPoint.x,
            bottomPoint.y + contentSize.height
        );

        // Polygon with 5 verts
        this.boundingPoints = [
            bottomPoint, leftPoint, topLeftPoint, 
            topRightPoint, rightPoint
        ];
    }
});

// Add logic position setting, getting
cc.Node.prototype.setLogicPosition = function(lx, ly) {
    lx = lx || 0;
    ly = ly || 0;
    if (typeof lx === 'object') {
        ly = lx.y;
        lx = lx.x;
    }
    this.lx = lx;
    this.ly = ly;
    // Update event priority
    this.updateEventPriority();

    if (this.boundingPoints) {
        // Recaculate. if not exists boundingPoints, do not caculate
        this.caculateBoundingPoints();
    }
    this.setLocalZOrder(Math.max(this.lx + this.blockSizeX, this.ly + this.blockSizeY));

    if (this.__isAnimation) {
        // Do not calculate with animations. Set dirrectly position
        this.setPosition(MapValues.logicToPosition(lx, ly));
        return;
    }
    // Recaculate with normal sprite
    var contentSize = this.getContentSize();
    var point2 = MapValues.logicToPosition(lx, ly);
    var point1 = MapValues.logicToPosition(
        lx - this.blockSizeX,
        ly - this.blockSizeY
    );

    var dx = contentSize.width / 2 + 2 * point2.x - 
            point1.x - this.blockSizeX * MapValues.iLength / 2;
    var dy = contentSize.height / 2 + 2 * point2.y - point1.y;
    
    this.setPosition(cc.p(dx, dy));
}

cc.Node.prototype.getLogicPosition = function() {
    return cc.p(this.lx, this.ly);
}
