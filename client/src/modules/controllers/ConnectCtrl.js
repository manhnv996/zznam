var ConnectCtrl = cc.Class.extend({
	onDisconnected: function() {
		cc.eventManager.removeAllListeners();
        ScheduleLoop.instance.clearAllSchedule(); // Flush cached
		cc.director.getRunningScene().disconnected();
		// Reconnect after here
		this.reconnect();
	},

	onConnectFailed: function() {
		cc.director.getRunningScene().connectFailed();
		this.reconnect();
	},

	reconnect: function() {
		setTimeout(function() {
			cc.log("Reconnect");
			gv.gameClient.connect();
		}, 5000);
	}
});

ConnectCtrl.instance = new ConnectCtrl();
