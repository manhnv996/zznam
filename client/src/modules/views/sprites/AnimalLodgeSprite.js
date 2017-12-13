var AnimalLodgeSprite = MapBlockSprite.extend({
	animalSpriteList: [],
	id: null,

	ctor: function(resGround, resFence, 
		offsetX, offsetY, fenceColumnWidth,
		blockSizeX, blockSizeY, lx, ly, mapItemType) {
		this._super(resGround, blockSizeX, blockSizeY, lx, ly, mapItemType);
		this.renderFence(resFence, offsetX, offsetY, fenceColumnWidth);
		this.registerTouchEvents();
	},

	renderFence: function(resFence, offsetX, offsetY, fenceColumnWidth) {
		var groundSize = this.getContentSize();
		var fenceSprite = new cc.Sprite(resFence);
		var fenceSize = fenceSprite.getContentSize();

		// Render topleft fence
		var topLeftStartPoint = cc.p(
			groundSize.width / 2 - fenceSize.width / 2,
			groundSize.height
		);

		for (var i = 0; i < this.blockSizeY; i++) {
			fenceSprite = new cc.Sprite(resFence);
			fenceSprite.setPosition(
				topLeftStartPoint.x - i * (fenceSize.height - offsetX),
				topLeftStartPoint.y - i * (fenceSize.width / 2 - offsetY)
			);
			this.addChild(fenceSprite);
		}

		var topRightStartPoint = cc.p(
			topLeftStartPoint.x + fenceSize.width - fenceColumnWidth,
			topLeftStartPoint.y
		);

		for (var i = 0; i < this.blockSizeX; i++) {
			fenceSprite = new cc.Sprite(resFence);
			fenceSprite.setScaleX(-1);
			fenceSprite.setPosition(
				topRightStartPoint.x + i * (fenceSize.height - offsetX),
				topRightStartPoint.y - i * (fenceSize.width / 2 - offsetY)
			);
			this.addChild(fenceSprite);
		}

		var bottomLeftStartPoint = cc.p(
			topLeftStartPoint.x - (this.blockSizeY - 1) * (fenceSize.height - offsetX),
			topLeftStartPoint.y - this.blockSizeY * (fenceSize.width / 2 - offsetY)
		);

		for (var i = 0; i < this.blockSizeX; i++) {
			fenceSprite = new cc.Sprite(resFence);
			fenceSprite.setScaleX(-1);
			fenceSprite.setPosition(
				bottomLeftStartPoint.x + i * (fenceSize.height - offsetX),
				bottomLeftStartPoint.y - i * (fenceSize.width / 2 - offsetY)
			);
			fenceSprite.setLocalZOrder(600);
			
			this.addChild(fenceSprite);
		}

		var bottomRightStartPoint = cc.p(
			topRightStartPoint.x + (this.blockSizeX - 1) * (fenceSize.height - offsetX),
			topRightStartPoint.y - this.blockSizeX * (fenceSize.width / 2 - offsetY)
		);

		for (var i = 0; i < this.blockSizeY; i++) {
			fenceSprite = new cc.Sprite(resFence);
			fenceSprite.setPosition(
				bottomRightStartPoint.x - i * (fenceSize.height - offsetX),
				bottomRightStartPoint.y - i * (fenceSize.width / 2 - offsetY)
			);
			fenceSprite.setLocalZOrder(600);

			this.addChild(fenceSprite);
		}
	},

	onBeginClick: function() {
		this.setColor(cc.color(155, 155, 155));
	},

	onEndClick: function() {
		this.setColor(cc.color(255, 255, 255));
	},

	caculateBoundingPoints: function() {
		this._super();
		var topPoint = MapValues.logicToPosition(
			this.lx,
			this.ly
		);
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
        this.boundingPoints = [
            bottomPoint, leftPoint, topPoint, rightPoint
        ];
	},

	addAnimalSprite: function(animalSprite) {
		this.addChild(animalSprite);
		animalSprite.setTag(TagClusters.Animal + animalSprite.id);
		this.animalSpriteList.push(animalSprite);
	},

	recaculatePositionOfAnimalSprite: function(x, y) {
		if (x.x) {
			y = x.y;
			x = x.x;
		}
		return cc.p(
			x + this.getContentSize().width / 2,
			y + this.getContentSize().height / 2
		);
	},

	setId: function(id) {
		this.id = id;
		// Cached lodge
		this.lodge = user.asset.getLodgeById(this.id);
	},

	onFinishMove: function(lx, ly) {
        cc.log("lodge moved to", lx, ly);
        
        this.lodge.coordinate.x = lx;
        this.lodge.coordinate.y = ly;
        // Send to server
        testnetwork.connector.sendMoveMapBlock(MapItemEnum.LODGE, this.id, lx, ly);
    },

    getAnimalIdsAroundPoint: function(lx, ly) {
    	var lp = cc.p(lx - this.lx, ly - this.ly);
    	var result = [];
    	// cc.log("List length", this.animalSpriteList.length);
    	this.animalSpriteList.forEach(function(animalSprite) {
    		var p = cc.p(animalSprite.lx, animalSprite.ly);
    		// cc.log(lx, ly, animalSprite.lx, animalSprite.ly);
    		if (caculateDistance(lp, p) < 0.5) {
    			result.push(animalSprite.id);
    		}
    	});
    	return result;
    }
});
