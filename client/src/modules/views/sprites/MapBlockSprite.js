var MapBlockSprite = cc.Sprite.extend({
    lx: 0,
    ly: 0,
    mapAliasType: 0,
    boundingPoints: null,

    // Flag variable
    moveSpriteMode: false, // Active moving sprite mode
    touchMoved: false, // When touch move, disable onClick
    arrowShowed: false, // When hold long time to show arrow => moving

    // Auto move
    autoMoveVer: 0,
    autoMoveHor: 0,

    // Last touch location
    lstMouse: null,
    eventOption: null,

    // On moving sprite mode. Logic position
    originalPosition: null,
    lstLocation: null,

    ctor: function(resource, blockSizeX, blockSizeY, x, y, mapAliasType) {
        this._super(resource);
        this.blockSizeX = blockSizeX;
        this.blockSizeY = blockSizeY;
        this.mapAliasType = mapAliasType;
        this.eventOption = { lockMove: false };
        this.setLogicPosition(x, y);
    },

    // Override there methods in inherited class
    onClick: function(lx, ly) {},
    onBeginClick: function() {},
    onEndClick: function() {},
    onFinishMove: function(lx, ly) {},

    // Register touch event, call this in constructor
    registerTouchEvents: function(option) {
        this.eventOption = option || this.eventOption;
        if (!this.eventOption.force && !home) {
            return;
        }
        this.caculateBoundingPoints();
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan.bind(this),
            onTouchMoved: this.onTouchMoved.bind(this),
            onTouchEnded: this.onTouchEnded.bind(this)
        });
        cc.eventManager.addListener(this.touchListener, this.getPriority());
    },

    onTouchBegan: function(touch) {
        var touchLocation = touch.getLocation();
        this.touchMoved = false; // enable onClick event if false
        this.lstMouse = touchLocation;
        this.totalMovedDistance = 0;
        // this.moveSpriteMode = false; // Enable moving sprite
        this.autoMoveVer = 0;
        this.autoMoveHor = 0;

        // Disable all popup
        //PopupLayer.instance.disableAllPopup();
        TablePopupLayer.instance.removeUpdateDisableListener();

        var location = MapValues.screenPositionToMapPosition(
            touchLocation.x, touchLocation.y);
        // Check if is click inside sprite
        if (rayCasting(location, this.boundingPoints)) {
            // Inside sprite
            this.onBeginClick();
            if (this.moveSpriteMode === true) {
                // When sprite is in moving mode
                // cc.log("Continue schedule update");
                this.schedule(this.movingUpdate);
                // Do not capture velocity in here
                return true;
            }
            // Stop Map inertia and capture velocity
            // MapLayer.instance.uninertia();
            // InertiaEngine.instance.init(touchLocation);
            if (!this.eventOption.lockMove) {
                // When sprite is normal
                // cc.log("Start schedule outOfHoldTimeCallback");
                this.scheduleOnce(this.outOfHoldTimeCallback, 0.5);
                this.touchListener.scheduling = true;
                this.arrowShowed = false;
            }
            return true;
        } else { // When priority is highest
            // Outside sprite
            if (this.moveSpriteMode) {
                // On click outside
                this.moveSpriteMode = false;
                MapLayer.instance.lockMap(false);
                this.unschedule(this.movingUpdate); // unschedule if represent
                // Finish move
                var newLocation = this.lstLocation;
                var originalPosition = this.originalPosition;
                // cc.log("Finish move to", newLocation);
                if (MapCtrl.instance.checkValidBlock(newLocation.x, newLocation.y, this.blockSizeX, this.blockSizeY)) {
                    this.setLogicPosition(newLocation);

                    // Callback when successfully moved
                    // check if original location is different with new location
                    if (newLocation.x !== originalPosition.x ||
                        newLocation.y !== originalPosition.y
                    ) {
                        this.onFinishMove(newLocation.x, newLocation.y);
                    }
                } else {
                    this.setLogicPosition(originalPosition);
                }
                // Recovery to map alias
                MapCtrl.instance.addSpriteAlias(this);
                // Reupdate event priority and zOrder
                this.updateEventPriority();
                // Disable tint action and set default color
                this.stopAllActions();
                this.runningTint = false;
                this.setColor(cc.color(255, 255, 255));
            }
            return false;
        }
    },

    onTouchMoved: function(touch) {
        var location = touch.getLocation();
        var lstMouse = this.lstMouse;
        // Add new move position to InertialEngine
        // InertiaEngine.instance.setPoint(location);

        // Move map and disable onclick
        if (!this.touchMoved) {
            this.totalMovedDistance += caculateDistance(lstMouse, location);
            // Check threshold
            if (this.totalMovedDistance > 10) {
                this.touchMoved = true;
                if (this.touchListener.scheduling) {
                    // When callback didnot be excuted and move
                    this.touchListener.scheduling = false;
                    // cc.log("Canceled schedule outOfHoldTimeCallback");
                    this.unschedule(this.outOfHoldTimeCallback);
                }
            }
        }

        // If arrow is showed
        if (this.arrowShowed) {
            this.totalMovedDistance += caculateDistance(lstMouse, location);
            if (this.totalMovedDistance > 10) {
                this.arrowShowed = false;
                PopupLayer.instance.removeArrow();
            }
        }

        this.lstMouse = location;

        if (this.moveSpriteMode) {
            var winSize = cc.winSize;
            var BORDER_AUTO_MOVE = 100;

            // Auto moving when mouse nears borders
            if (location.x < BORDER_AUTO_MOVE) {
                this.autoMoveHor = -1;
            } else if (winSize.width - location.x < BORDER_AUTO_MOVE) {
                this.autoMoveHor = 1;
            } else {
                this.autoMoveHor = 0;
            }

            if (location.y < BORDER_AUTO_MOVE) {
                this.autoMoveVer = -1;
            } else if (winSize.height - location.y < BORDER_AUTO_MOVE) {
                this.autoMoveVer = 1;
            } else {
                this.autoMoveVer = 0;
            }
        } else {
            // Move map
            // var delta = touch.getDelta();
            // MapLayer.instance.move(delta.x, delta.y);
        }
    },

    onTouchEnded: function(touch, event) {
        this.onEndClick();
        PopupLayer.instance.removeArrow();

        if (this.touchListener.scheduling) {
            // When callback didnot be executed 
            this.touchListener.scheduling = false;
            // cc.log("Canceled schedule outOfHoldTimeCallback");
            this.unschedule(this.outOfHoldTimeCallback);
        }

        if (this.moveSpriteMode) {
            if (!MapCtrl.instance.checkValidBlock(this.lstLocation.x,
                    this.lstLocation.y, this.blockSizeX, this.blockSizeY)) {
                this.setLogicPosition(this.originalPosition, true);
                // Restore to original position
                MapLayer.instance.moveToLogic(this.originalPosition, 2);
                // Show notification
                BaseGUILayer.instance.notifyCantPut(touch.getLocation());
                this.runningTint = true;
                this.setColor(cc.color(255, 255, 255));
                var action = new cc.Sequence([
                    new cc.TintBy(0.8, -100, -100, -100),
                    new cc.TintBy(0.8, 100, 100, 100)]);
                this.runAction(new cc.RepeatForever(action));
            }
            // cc.log('Unschedule update');
            this.unschedule(this.movingUpdate);
        } else {
            // Push last location and get velocity
            // var velocity = InertiaEngine.instance.stopAndGetVelocity(touch.getLocation());
            // MapLayer.instance.inertia(velocity);
        }
        if (!this.touchMoved && !this.moveSpriteMode) {
            // caculate logic position and pass to onClick
            var lp = MapValues.screenPositionToLogic(this.lstMouse.x, this.lstMouse.y);
            this.onClick(lp.x, lp.y);
        }
    },

    outOfHoldTimeCallback: function() {
        // cc.log("outOfHoldTimeCallback started");
        // Set lock scheduling to false after started
        this.touchListener.scheduling = false;
        // disable onClick event after long click
        this.touchMoved = true;
        this.arrowShowed = true;
        PopupLayer.instance.showArrow(this.lstMouse.x, this.lstMouse.y + 50,
            this.startMovingSpriteMode.bind(this));
    },

    startMovingSpriteMode: function() {
        InertiaEngine.instance.stopAndGetVelocity();
        MapLayer.instance.lockMap(true);
        this.moveSpriteMode = true;
        // this.lstMouse = touchLocation;
        // Enable highest priority for this listener and zOrder
        this.updateEventPriority(40);
        this.setLocalZOrder(1000);

        // Enable Tint action
        var action = new cc.Sequence([
            new cc.TintBy(0.8, -100, -100, -100),
            new cc.TintBy(0.8, 100, 100, 100)]);
        this.runAction(new cc.RepeatForever(action));
        this.runningTint = true;

        // Save original position
        this.originalPosition = this.getLogicPosition();
        this.lstLocation = this.originalPosition;
        // Remove itself from map alias
        MapCtrl.instance.removeSpriteAlias(this);
        // cc.log("Move sprite mode activated");
        // ScheduleUpdate automove
        // cc.log('Start schedule update');
        this.schedule(this.movingUpdate);
    },

    // Update eventPriority when change location, called in setLogicPosition
    updateEventPriority: function(priority) {
        if (this.touchListener) {
            cc.eventManager.setPriority(this.touchListener, priority || this.getPriority());
        }
    },

    updateZOrder: function(zOrder) {
        this.setLocalZOrder(
            zOrder || this.getPriority()
        );
    },

    getPriority: function() {
        // return parseInt(ListenerPriority.offsetEventPriority + (
        //     this.lx + this.blockSizeX > this.ly + this.blockSizeY
        //     ? (this.ly + this.blockSizeY + (this.lx + this.blockSizeX) / 32) * 10
        //     : (this.lx + this.blockSizeX + (this.ly + this.blockSizeY) / 32) * 10
        // ));
        // return (this.lx + this.blockSizeX + (this.ly + this.blockSizeY) / 32) * 50
        // + (this.ly + this.blockSizeY + (this.lx + this.blockSizeX) / 32) * 50;
        // return (this.lx + this.blockSizeX + (this.ly + this.blockSizeY) / 32) * 100;
        // return (this.lx + this.ly + this.blockSizeY + this.blockSizeX);
        // return parseInt(Math.min(this.lx + this.blockSizeX, this.ly + this.blockSizeY));
        var lp = this.getPriorityPoint();
        // return (
        //     lp.x > lp.y
        //     ? lp.y * 20 + lp.x * 2
        //     : lp.x * 20 + lp.y * 2
        // );
        return ListenerPriority.offsetEventPriority + lp.x + lp.y;
        // return ListenerPriority.offsetEventPriority + Math.min(lp.x, lp.y);
    },

    getPriorityPoint: function() {
        // return cc.p(
        //     this.lx - this.blockSizeX,
        //     this.ly + this.blockSizeY / 2
        // );
        return cc.p(
            this.lx + this.blockSizeX / 2,
            this.ly + this.blockSizeY / 2
        );
    },

    showDebugPriorityPoint: function() {
        var dot = new cc.Sprite(res.DOT2_PNG);
        var lp = this.getPriorityPoint();
        dot.setPosition(MapValues.logicToPosition(lp.x, lp.y));
        dot.setLocalZOrder(10000);
        MapLayer.instance.addChild(dot);
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
        // var topLeftPoint = cc.p(
        //     leftPoint.x,
        //     bottomPoint.y + contentSize.height
        // );
        var topLeftPoint = cc.p(
            bottomPoint.x - contentSize.width / 2,
            bottomPoint.y + contentSize.height
        );
        // var topRightPoint = cc.p(
        //     rightPoint.x,
        //     bottomPoint.y + contentSize.height
        // );
        var topRightPoint = cc.p(
            bottomPoint.x + contentSize.width / 2,
            bottomPoint.y + contentSize.height
        );
        // Polygon with 5 verts
        this.boundingPoints = [
            bottomPoint, leftPoint, topLeftPoint,
            topRightPoint, rightPoint
        ];
        return this.boundingPoints;
    },

    _showBoundingPoints: function() {
        this.caculateBoundingPoints();
        for (var i = 0; i < this.boundingPoints.length; i++) {
            var dot = new cc.Sprite(res.DOT2_PNG);
            dot.setLocalZOrder(1000);
            dot.setPosition(this.boundingPoints[i]);
            MapLayer.instance.addChild(dot);
        }

        var dot6 = new cc.Sprite(res.DOT_PNG);
        dot6.setPosition(MapValues.logicToPosition(this.lx, this.ly));
        dot6.setLocalZOrder(1000);
        MapLayer.instance.addChild(dot6);
    },

    movingUpdate: function(dt) {
        var location = this.lstMouse;
        var logic = MapValues.screenPositionToLogic(location.x, location.y);
        logic.x = Math.floor(logic.x);
        logic.y = Math.floor(logic.y);
        if (this.lstLocation.x !== logic.x ||
            this.lstLocation.y !== logic.y) {
            // cc.log("Map Alias", this.mapAliasType);
            // cc.log("move to", logic, MapCtrl.instance.checkValidBlock(logic.x, logic.y, this.blockSizeX, this.blockSizeY, this.mapAliasType));
            this.lstLocation = logic;
            this.setLogicPosition(logic, true);
            if (MapCtrl.instance.checkValidBlock(logic.x, logic.y, this.blockSizeX, this.blockSizeY)) {
                if (!this.runningTint) {
                    this.runningTint = true;
                    this.setColor(cc.color(255, 255, 255));
                    var action = new cc.Sequence([
                        new cc.TintBy(0.8, -100, -100, -100),
                        new cc.TintBy(0.8, 100, 100, 100)]);
                    this.runAction(new cc.RepeatForever(action));
                }
            } else {
                if (this.runningTint) {
                    this.stopAllActions();
                    this.runningTint = false;
                    this.setColor(cc.color(255, 100, 100));
                }
            }

        }
        if (this.autoMoveHor || this.autoMoveVer) {
            var dx = this.autoMoveHor * dt * 250;
            var dy = this.autoMoveVer * dt * 250;
            MapLayer.instance.move(-dx, -dy);
        }
    },

    removeFromParent: function(flag) {
        this._super(flag);
        //cc.log("Remove", this.touchListener);
        if (this.touchListener) {
            cc.eventManager.removeListener(this.touchListener);
            this.touchListener = null;
        }
    },

    removeTouchEvents: function() {
        if (this.touchListener) {
            cc.eventManager.removeListener(this.touchListener);
            this.touchListener = null;
        }
    },

    // updatePriorityMode:
    // 1: ZOrder only
    // undefined: all
    // true: not update
    setLogicPosition: function(lx, ly, updatePriorityMode) {
        lx = lx || 0;
        ly = ly || 0;
        if (typeof lx === 'object') {
            updatePriorityMode = ly;
            ly = lx.y;
            lx = lx.x;
        }
        this.lx = lx;
        this.ly = ly;
        // Update event priority

        if (this.boundingPoints) {
            // Recaculate. if not exists boundingPoints, do not caculate
            this.caculateBoundingPoints();
        }
        if (!updatePriorityMode) {
            this.updateEventPriority();
            this.updateZOrder();
            // Math.max(this.lx + this.blockSizeX, this.ly + this.blockSizeY));
            // this.setLocalZOrder(this.lx + this.blockSizeX +this.ly + this.blockSizeY);
        }

        if (updatePriorityMode === 1) {
            this.updateZOrder();
        }

        if (this.__isAnimation) {
            // Do not calculate with animations. Set dirrectly position
            // if (this.__fixNaturePosition) {
            //     // Add half of blocksize to position, for nature things.
            //     this.setPosition(MapValues.logicToPosition(lx + this.blockSizeX / 2, ly + this.blockSizeY / 2));
            // } else if (this.__fixVungNuoc) {
            //     // Make offset of VungNuoc

            // } else {
            //     this.setPosition(MapValues.logicToPosition(lx, ly));
            // }
            var pOffset = this._offset();
            var p = MapValues.logicToPosition(lx, ly);
            p.x += pOffset.x;
            p.y += pOffset.y;
            // if (this.natureId === 1) {
            // cc.log(pOffset);
            // }
            this.setPosition(p);
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
    },

    getLogicPosition: function() {
        return cc.p(this.lx, this.ly);
    }
});
