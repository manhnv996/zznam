/**
 * Created by KienVN on 5/21/2015.
 */

gv.CONTROLLER_ID = {
    SPECIAL_CONTROLLER:0
}

var GameClient = cc.Class.extend(
    {
        ctor: function () {
            this.loadConfig();

            this.receivePacketSignal = new signals.Signal();
            this.packetFactory = new InPacketFactory();

            return true;
        },

        createTcpClient: function() {
            this._tcpClient = fr.GsnClient.getInstance();
            this._tcpClient.setFinishConnectListener(this.onFinishConnect.bind(this));
            this._tcpClient.setDisconnectListener(this.onDisconnected.bind(this));
            this._tcpClient.setReceiveDataListener(this._onReceived.bind(this));
        },

        loadConfig: function () {
            var fileName = "ipConfig.json";
            var jsonData = cc.loader.getRes(fileName);
            if (jsonData == null) {
                cc.log("Load ip config errorr");
            }else
            {
                this._serverName = jsonData.server[chooseServer];
                this._port = jsonData.port;
            }
        },
        getNetwork: function () {
            return this._tcpClient;
        },
        connect: function () {
            this.createTcpClient();
            cc.log("Connect to server: " + this._serverName + ":" + this._port);
            this._tcpClient.connect(this._serverName, this._port);

        },
        sendPacket: function (pk) {
            this.getNetwork().send(pk);
            gv.poolObjects.push(pk);
        },
        getInPacket: function (cmd, pkg) {
            return this.packetFactory.createPacket(cmd, pkg);
        },
        getOutPacket: function (objClass) {
            var pk = gv.poolObjects.get(objClass);
            pk.reset();
            return pk;
        },

        onFinishConnect:function(isSuccess)
        {
            // cc.log("onFinishConnect:" + isSuccess);
            if (isSuccess) {
                //fr.getCurrentScreen().onConnectSuccess();

                var pk = gv.gameClient.getOutPacket(CmdSendHandshake);
                pk.putData();
                gv.gameClient.getNetwork().send(pk);
                gv.poolObjects.push(pk);
            } else {
                //fr.getCurrentScreen().onConnectFail(gv.gameClient._serverName + ":" + gv.gameClient._port);
                // this._tcpClient.disconnect();
                fr.GsnClient.destroyInstance();
                ConnectCtrl.instance.onConnectFailed();
            }
        },
        onDisconnected:function()
        {
            // cc.director.runScene(new LoadingScene());
            // cc.log("onDisconnected");
            ConnectCtrl.instance.onDisconnected();
        },
        _onReceived:function(cmd, pkg)
        {
            // cc.log("_onReceived:", cmd);
            var packet = gv.gameClient.getInPacket(cmd,pkg);
            if(packet == null)
                return;
            this.onReceivedPacket(cmd,packet);
            //pool
            gv.poolObjects.push(packet);
        },
        onReceivedPacket:function(cmd, packet)
        {
            this.receivePacketSignal.dispatch(cmd, packet);
        }
    }
);