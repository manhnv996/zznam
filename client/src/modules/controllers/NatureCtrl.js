var NatureCtrl = cc.Class.extend({
	lock: false,
	
	cutDown: function(natureId) {
		cc.log("Cut down", natureId);
	},

	unlock: function() {
		this.lock = false;
	}
});

