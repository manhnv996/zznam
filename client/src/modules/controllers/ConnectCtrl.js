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
	},

	logout: function() {
		cc.sys.localStorage.removeItem("session");
        cc.eventManager.removeAllListeners();
        ScheduleLoop.instance.clearAllSchedule(); // Flush cached
        LoginScene.instance = new LoginScene();
        fr.GsnClient.destroyInstance(); // Disconect server
        cc.director.runScene(LoginScene.instance);
	}
});

ConnectCtrl.instance = new ConnectCtrl();
