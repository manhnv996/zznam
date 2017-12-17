var AnimationSprite = MapBlockSprite.extend({
	__isAnimation: true,
	__boundingBox: null,
	// __fixNaturePosition: false,

	ctor: function(aniId, blockSizeX, blockSizeY, lx, ly, mapAliasType, fixNaturePosition) {
		this._super(undefined, blockSizeX, blockSizeY, lx, ly, mapAliasType);

		this.content = fr.createAnimationById(aniId, this);
		this.addChild(this.content);
		// Get boundingbox at first time
		this.__boundingBox = this.content.getBoundingBox();
		// if (fixNaturePosition) {
		// 	this.__fixNaturePosition = true;
		// }

		//
		//this.addEventListener();
	},


    //addEventListener: function () {
    //    //
    //    this.caculateBoundingPoints();
    //    this.clickListener = cc.EventListener.create({
    //        event: cc.EventListener.TOUCH_ONE_BY_ONE,
    //        swallowTouches: true,
    //        onTouchBegan: function (touch, event) {
    //            // // Disable all popup
    //            // PopupLayer.instance.disableAllPopup();
    //
    //            var touchLocation = touch.getLocation();
    //            var location = MapValues.screenPositionToMapPosition(touchLocation.x, touchLocation.y);
    //
    //            // Check if is click inside sprite
    //            if (rayCasting(location, this.boundingPoints)) {
    //                this.onBeginClick();
    //
    //                return true;
    //            }
    //            return false;
    //        }.bind(this),
    //        onTouchMoved: function (touch, event) {
    //            var delta = touch.getDelta();
    //            MapLayer.instance.move(delta.x, delta.y);
    //
    //        }.bind(this),
    //
    //        onTouchEnded: function (touch, event) {
    //            //
    //            this.onClick();
    //            this.onEndClick();
    //
    //        }.bind(this)
    //    });
    //    cc.eventManager.addListener(this.clickListener, this);
    //},

    clearListener: function() {
        cc.eventManager.removeListener(this.clickListener);
    },

	// Play animation
	play: function(aniName, callback) {
		this.content.gotoAndPlay(aniName, -1);
		this.content.setCompleteListener(callback);
	},

	//Finish animation
	//finish: function(aniName) {
	//	this.content.gotoAndPlay(aniName, 0);
	//},

    changeTexture: function (aniId) {
		this.removeAllChildrenWithCleanup(true);
        this.content = fr.createAnimationById(aniId, this);
        this.addChild(this.content);

        // Get boundingbox at first time
        this.__boundingBox = this.content.getBoundingBox();
    },

	// Override
	runAction: function(action) {
		this.content.runAction(action);
	},

	stopAllActions: function() {
		this.content.stopAllActions();
	},

	setColor: function(color) {
		this.content.setColor(color);
	},

	// Override
	getContentSize: function() {
		return {
			width: this.__boundingBox.width,
			height: this.__boundingBox.height
		};
		// return this.content.getBoundingBox();
	},

	// Override
	getBoundingBox: function() {
		// return this.__boundingBox;
		return this.content.getBoundingBox();
	},

	// Make offset
	_offset: function() {
		return cc.p(0, 0);
	}
});
