var FriendCtrl = cc.Class.extend({
	ctor: function() {
		cc.log("FriendCtrl inited");
	},
	
	viewFriendHome: function(id) {
		cc.eventManager.removeAllListeners();
		// cc.eventManager.setEnabled(false);
        ScheduleLoop.instance.clearAllSchedule(); // Flush cached
		cc.director.runScene(new LoadingScene());
		testnetwork.connector.sendFriendGetList();
	},

	goHome: function() {
		cc.eventManager.removeAllListeners();
        ScheduleLoop.instance.clearAllSchedule(); // Flush cached
		// cc.eventManager.setEnabled(false);
		cc.director.runScene(new LoadingScene());
		testnetwork.connector.sendGetUser();
	}
});
