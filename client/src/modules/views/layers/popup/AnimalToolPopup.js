var AnimalToolPopup = TablePopup.extend({
    popupItemList: [],
	ctor: function(lx, ly, type) {
		this._super(res.popup2, lx, ly, { width: 0, height: 0 });

		var tool = new AnimalFoodSprite(this, type);
		tool.setPosition(this._bg.x, this._bg.y);
		this.popupItemList.push(tool);
		this.addChild(tool);
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
