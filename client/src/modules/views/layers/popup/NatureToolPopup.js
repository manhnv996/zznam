var NatureToolPopup = TablePopup.extend({
	popupItemList: null,

	ctor: function(lx, ly, type, natureId) {
		var height = 180;
		switch (type) {
			case NaturalThingEnum.ROCK_SMALL:
			case NaturalThingEnum.ROCK_BIG:
			case NaturalThingEnum.VUNG_NUOC:
				height = 80;
				break;
		}
		this._super(res.popup1, lx, ly, { width: 150, height: height });
		NatureCtrl.instance.initNature(natureId);
		NatureCtrl.instance.unlock();
		switch (type) {
			case NaturalThingEnum.ROCK_SMALL:
				height = 100;
				this.renderBomb(natureId);
				break;
			case NaturalThingEnum.ROCK_BIG:
				height = 100;
				this.renderBombTNT(natureId);
				break;
			case NaturalThingEnum.PINE_SMALL:
			case NaturalThingEnum.PINE_BIG:
				this.renderCua(natureId);
				break;
			case NaturalThingEnum.TREE_SMALL:
			case NaturalThingEnum.TREE_BIG:
				this.renderRiu(natureId);
				break;
			case NaturalThingEnum.VUNG_NUOC:
				height = 100;
				this.renderXeng(natureId);
				break;
		}
	},

	renderBomb: function(natureId) {
		var quantity = user.asset.warehouse.getQuantity(ProductTypes.TOOL_DYNOMITE)
		var sprite = new NatureToolSprite(res.BOMB, quantity);
        sprite.setPosition(this._bg.x, this._bg.y);
        sprite.onMove = function(lx, ly) {
        	NatureCtrl.instance.cutDown(lx, ly);
        };
        this.addChild(sprite);
	},

	renderBombTNT: function(natureId) {
		var quantity = user.asset.warehouse.getQuantity(ProductTypes.TOOL_DEMOLITION_CHARGE);
		var sprite = new NatureToolSprite(res.BOMB_TNT, quantity);
        sprite.setPosition(this._bg.x, this._bg.y);
        sprite.onMove = function(lx, ly) {
        	NatureCtrl.instance.cutDown(lx, ly);
        };
        this.addChild(sprite);
	},

	renderCua: function(natureId) {
		var quantity = user.asset.warehouse.getQuantity(ProductTypes.TOOl_SAW);
		var sprite = new NatureToolSprite(res.CUA, quantity);
        sprite.setPosition(this._bg.x, this._bg.y);
        sprite.onMove = function(lx, ly) {
        	NatureCtrl.instance.cutDown(lx, ly);
        };
        this.addChild(sprite);
	},

	renderRiu: function(natureId) {
		var quantity = user.asset.warehouse.getQuantity(ProductTypes.TOOL_AXE);
		var sprite = new NatureToolSprite(res.RIU, quantity);
        sprite.setPosition(this._bg.x, this._bg.y);
        sprite.onMove = function(lx, ly) {
        	NatureCtrl.instance.cutDown(lx, ly);
        };
        this.addChild(sprite);
	},

	renderXeng: function(natureId) {
		var quantity = user.asset.warehouse.getQuantity(ProductTypes.TOOL_SHOVEL);
		var sprite = new NatureToolSprite(res.XENG, quantity);
        sprite.setPosition(this._bg.x, this._bg.y);
        sprite.onMove = function(lx, ly) {
        	NatureCtrl.instance.cutDown(lx, ly);
        };
        this.addChild(sprite);
	}
});
