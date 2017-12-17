var AnimateEventLayer = cc.Layer.extend({
	iconPosition: null,
	textPosition: null,
	callerCount: 0,
	scheduling: false,

	ctor: function() {
		this._super();
		cc.log("Init Animate Event layer");
		this.iconPosition = cc.p(cc.winSize.width / 2 + 130, cc.winSize.height - 110);
		this.textPosition = cc.p(cc.winSize.width / 2 - 160, cc.winSize.height - 110);
		this.scheduleRemoveIconAndText = this.scheduleRemoveIconAndText.bind(this);
	},

	renderStorage: function(storageType) {
		this.storage = new cc.Sprite(storageType === StorageTypes.FOOD_STORAGE 
					? res.SILO_ICON : res.WAREHOUSE_ICON);
			this.storage.setScale(0.15);
			this.storage.setPosition(this.iconPosition);
			this.addChild(this.storage);

			this.text = new cc.LabelBMFont(
				fr.Localization.text(storageType === StorageTypes.FOOD_STORAGE ? 
					"NAME_SILO" : "NAME_WARE_HOUSE") + "113/250", res.FONT_OUTLINE_30);
			this.text.setPosition(this.textPosition);
			this.text.setAnchorPoint(cc.p(0, 0.5));
			this.addChild(this.text);
		},

	animate: function(x, y, storageType, productType, count, exp) {
		if (this.scheduling) {
			this.unschedule(this.scheduleRemoveIconAndText);
			this.scheduling = false;
		}

		if (this.callerCount === 0) {
			this.renderStorage(storageType);
		}
		
		this.animateExp(x, y, exp);
		if (productType) {
			this.callerCount++;
			var item = getProductIconById(productType);
			this.animateIcon(x, y, item, count);
		}
	},

	animateIcon: function(x, y, item, count) {
		var groupSprite = new cc.Sprite();
		groupSprite.setPosition(x, y);
		
		var sprite = new cc.Sprite(item);
		// sprite.setScale(0.5);
		if (count) {
			var countSprite = new cc.LabelBMFont("+" + count, res.FONT_OUTLINE_30);
			countSprite.setAnchorPoint(0, 0.5);
			countSprite.setPosition(cc.p(20, 0));
			groupSprite.addChild(countSprite);
		}
		var move = cc.moveTo(1.5, this.iconPosition).easing(cc.easeIn(3));
		groupSprite.runAction(cc.sequence(move, cc.callFunc(function() {
			groupSprite.removeFromParent(true);
			this.callerCount--;
			if (this.callerCount === 0) {
				this.scheduleOnce(this.scheduleRemoveIconAndText, 1);
				this.scheduling = true;
			}
		}.bind(this))));
		groupSprite.addChild(sprite);
		this.addChild(groupSprite);
	},

	animateExp: function(x, y, exp) {
		var groupSprite = new cc.Sprite();
		groupSprite.setPosition(x, y);
		var starPosition = MainGuiLayer.instance.imageLevel.getPosition();
		var star = new cc.Sprite(res.STAR_1_PNG);
		// star.setScale(0.5);
		groupSprite.addChild(star);

		var countSprite = new cc.LabelBMFont("+" + exp, res.FONT_OUTLINE_30);
		countSprite.setAnchorPoint(0, 0.5);
		countSprite.setPosition(cc.p(20, 0));
		groupSprite.addChild(countSprite);

		groupSprite.setPosition(x, y);
		
		var move = cc.moveTo(1.5, starPosition).easing(cc.easeIn(3));
		groupSprite.runAction(cc.sequence(move, cc.callFunc(function() {
			groupSprite.removeFromParent(true);
		})));

		groupSprite.setPosition(x, y);
		this.addChild(groupSprite);
	},

	scheduleRemoveIconAndText: function() {
		this.scheduling = false;
		this.removeIconAndText();
	},

	removeIconAndText: function() {
		this.storage.removeFromParent();
		this.text.removeFromParent();
	}
});
