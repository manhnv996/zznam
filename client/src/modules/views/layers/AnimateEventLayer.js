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
			countSprite.setPosition(cc.p(22, 0));
			groupSprite.addChild(countSprite);
		}
		var move = cc.moveTo(1.5, this.iconPosition).easing(cc.easeIn(3));
		groupSprite.runAction(cc.sequence(move, cc.callFunc(function() {
			groupSprite.removeFromParent(true);
			var action = cc.sequence(cc.scaleTo(0.15, 0.2), cc.scaleTo(0.15, 0.15));
			this.storage.runAction(action);
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
		countSprite.setPosition(cc.p(22, 0));
		groupSprite.addChild(countSprite);

		groupSprite.setPosition(x, y);
		
		var move = cc.moveTo(1.5, starPosition).easing(cc.easeIn(3));
		groupSprite.runAction(cc.sequence(move, cc.callFunc(function() {
			groupSprite.removeFromParent(true);
			var action = cc.sequence(cc.scaleTo(0.15, 1.3), cc.scaleTo(0.15, 1.0));
			MainGuiLayer.instance.imageLevel.runAction(action);
		})));

		groupSprite.setPosition(x, y);
		this.addChild(groupSprite);
	},

	animateGold: function(x, y, gold) {
		var groupSprite = new cc.Sprite();
		var goldSprite = new cc.Sprite(res.gold_png);
		var countSprite = new cc.LabelBMFont("+" + gold, res.FONT_OUTLINE_30);
		countSprite.setAnchorPoint(0, 0.5);
		countSprite.setPosition(cc.p(22, 0));
		groupSprite.addChild(countSprite);
		groupSprite.addChild(goldSprite);
		groupSprite.setPosition(x, y);

		var goldPosition = MainGuiLayer.instance.imageGold.getPosition();

		var move = cc.moveTo(1.5, goldPosition).easing(cc.easeIn(3));
		groupSprite.runAction(cc.sequence(move, cc.callFunc(function() {
			groupSprite.removeFromParent();
			var action = cc.sequence(cc.scaleTo(0.15, 1.3), cc.scaleTo(0.15, 1.0));
			MainGuiLayer.instance.imageGold.runAction(action);
		})));

		this.addChild(groupSprite);
	},

	scheduleRemoveIconAndText: function () {
		this.scheduling = false;
		this.removeIconAndText();
	},

	removeIconAndText: function() {
		this.storage.removeFromParent();
		this.text.removeFromParent();
	},

	upgradeStorageSuccess: function (currentCapacity, nextCapacity) {
		this.currentCapacity = currentCapacity;
		this.nextCapacity = nextCapacity;

		this.upgradeSuccess = new ccui.Layout();
		this.upgradeSuccess.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
		this.upgradeSuccess.setAnchorPoint(cc.p(0.5, 0.5));
		this.upgradeSuccess.setContentSize(cc.size(cc.winSize.width, cc.winSize.height / 5 * 3));

		this.bgUpgradeStorage = new cc.Sprite(res.circle_png);
		this.bgUpgradeStorage.x = this.upgradeSuccess.width / 2;
		this.bgUpgradeStorage.y = this.upgradeSuccess.height / 2;
		var scale = this.upgradeSuccess.height / this.bgUpgradeStorage.getContentSize().height;
		this.bgUpgradeStorage.setScale(scale);
		this.bgUpgradeStorage.opacity = 200;
		this.bgUpgradeStorage.setColor(cc.color(255, 0, 0));
		this.upgradeSuccess.addChild(this.bgUpgradeStorage);

		var label = new cc.LabelBMFont(fr.Localization.text("text_upgrade_success"), res.FONT_OUTLINE_50);
		label.x = this.upgradeSuccess.width / 2;
		label.y = this.upgradeSuccess.height;
		this.upgradeSuccess.addChild(label);

		this.capacityUp = new cc.LabelBMFont(currentCapacity.toString(), res.FONT_OUTLINE_80);
		this.capacityUp.x = this.upgradeSuccess.width / 2;
		this.capacityUp.y = this.upgradeSuccess.height / 2;
		this.upgradeSuccess.addChild(this.capacityUp);
		this.addChild(this.upgradeSuccess);

		var action = new cc.RepeatForever(new cc.Sequence(cc.scaleTo(0.2, scale + 2), cc.delayTime(0.1), cc.scaleTo(0.2, scale)));
		this.bgUpgradeStorage.runAction(action);

		this.schedule(this.upStorageCapacity, 0.05);
	},

	upStorageCapacity: function (dt) {
		this.currentCapacity++;
		if (this.currentCapacity <= this.nextCapacity) {
			this.capacityUp.setString(this.currentCapacity.toString());
		} else if (this.currentCapacity === this.nextCapacity + 35){
			this.unschedule(this.upStorageCapacity);
			this.bgUpgradeStorage.stopAllActions();
			this.upgradeSuccess.removeFromParent(true);
		}
	}

});
