var MapBlockSprite = cc.Sprite.extend({
	lx: 0,
	ly: 0,

	ctor: function(resource, blockSizeX, blockSizeY, x, y) {
		this._super(resource);
		this.blockSizeX = blockSizeX;
		this.blockSizeY = blockSizeY;
		this.setLogicPosition(x, y);
	},

    // Override there methods in inherited class
    onClick: function() {},
    onBeginClick: function() {},
    onEndClick: function() {},

    // Register touch event, call this in constructor
	registerTouchEvents: function() {
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

        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var touchLocation = touch.getLocation();
                var location = MapValues.screenPositionToMapPosition(touchLocation.x, touchLocation.y);
                this.touchListener.__isMoved = false;
                // Check if is click inside sprite
                if (rayCasting(location, this.boundingPoints)) {
                    this.onBeginClick();
                    return true;
                }
                return false;
            }.bind(this),

            onTouchMoved: function(touch, event) {
                // Move map and disable onclick
                this.touchListener.__isMoved = true;
                var delta = touch.getDelta();
                MapLayer.instance.move(delta.x, delta.y);
            }.bind(this),
            
            onTouchEnded: function(touch, event) {
                this.onEndClick();
                !this.touchListener.__isMoved && this.onClick();
            }.bind(this)
        });
        cc.eventManager.addListener(this.touchListener, this.lx + this.ly +  + MapConfigs.offsetEventPriority);
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
    if (this.__isAnimation) {
        // Do not calculate with animations
        this.setLocalZOrder(this.lx + this.ly);
        this.setPosition(MapValues.logicToPosition(lx, ly));
        return;
    }
    var contentSize = this.getContentSize();
    var point2 = MapValues.logicToPosition(lx, ly);
    var point1 = MapValues.logicToPosition(
        lx - this.blockSizeX,
        ly - this.blockSizeY
    );

    var dx = contentSize.width / 2 + 2 * point2.x - 
            point1.x - this.blockSizeX * MapValues.iLength / 2;
    var dy = contentSize.height / 2 + 2 * point2.y - point1.y;
    
    this.setLocalZOrder(this.lx + this.ly);
    this.setPosition(cc.p(dx, dy));
}

cc.Node.prototype.getLogicPosition = function() {
    return cc.p(this.lx, this.ly);
}
