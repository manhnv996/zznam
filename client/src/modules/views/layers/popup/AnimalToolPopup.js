var AnimalToolPopup = TablePopup.extend({
    popupItemList: null,
    foodTool: null,
    harvestTool: null,

	ctor: function(lx, ly, type, mode) {
        // this._super(res.popup2, lx - 1.5, ly - 1.5, { width: 0, height: 0 });
		this._super(res.popup2, lx, ly, { width: 150, height: 180 });
        this.type = type;
        this.popupItemList = [];
        // cc.log("Type", type);
        // cc.log("Mode", mode);
        if (mode === 1) {
            this.renderFoodTool();
            this.renderHarvestTool();
        } else {
            this.renderFoodTool(true);
        }
	},

    renderFoodTool: function(center) {
        this.foodTool = new AnimalFoodSprite(this, this.type);
        if (center) {
            this.foodTool.setPosition(this._bg.x, this._bg.y);
        } else {
            this.foodTool.setPosition(this._bg.x - this.foodTool.width / 2, this._bg.y);
        }
        this.popupItemList.push(this.foodTool);
        this.addChild(this.foodTool);
        this.foodTool.onActive = function() {
            if (this.harvestTool) {
                this.harvestTool.removeFromParent();
            }
            TablePopupLayer.instance._layout._bg.setVisible(false);
        }.bind(this);
    },

    renderHarvestTool: function(center) {
        this.harvestTool = new AnimalHarvestSprite(this, this.type);
        if (center) {
            this.harvestTool.setPosition(this._bg.x, this._bg.y);
        } else {
            this.harvestTool.setPosition(this._bg.x + this.foodTool.width / 2, this._bg.y);
        }
        this.popupItemList.push(this.harvestTool);
        this.addChild(this.harvestTool);
        this.harvestTool.onActive = function() {
            if (this.foodTool) {
                this.foodTool.removeFromParent();
            }
            TablePopupLayer.instance._layout._bg.setVisible(false);
        }.bind(this);
    },

	disablePopup: function(seedId){
        this.disablePopupBackground();

        //this.disableItemOfPopup(seedId);

    },

    //
    disablePopupBackground: function () {
        if (this._bg != null) {

            this._bg.setVisible(false);
            //this._bg.removeFromParent(true);

            //this._bg = null;
        }
        //if (this.btTurnPage != null){
        //    this.btTurnPage.setVisible(false);
        //    this.btTurnPage.removeFromParent(true);
        //    this.btTurnPage = null;
        //}
    }
});
