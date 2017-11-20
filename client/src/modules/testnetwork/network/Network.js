/**
 * Created by KienVN on 10/2/2017.
 */

var gv = gv||{};
var testnetwork = testnetwork||{};

testnetwork.Connector = cc.Class.extend({
    ctor:function(gameClient)
    {
        this.gameClient = gameClient;
        gameClient.packetFactory.addPacketMap(testnetwork.packetMap);
        gameClient.receivePacketSignal.add(this.onReceivedPacket, this);
        this._userName = "username";
    },
    onReceivedPacket:function(cmd, packet)
    {
        cc.log("onReceivedPacket:", cmd);
        switch (cmd)
        {
            case gv.CMD.HAND_SHAKE:
                this.sendLoginRequest();
                break;
            case gv.CMD.USER_LOGIN:
                this.sendGetUserInfo();
                //fr.getCurrentScreen().onFinishLogin();
                break;
            case gv.CMD.USER_INFO:
                //fr.getCurrentScreen().onUserInfo(packet.name, packet.x, packet.y);
                break;
            case gv.CMD.MOVE:
                cc.log("MOVE:", packet.x, packet.y);
                //fr.getCurrentScreen().updateMove(packet.x, packet.y);
                break;

            //
            case gv.CMD.PLANT:
                cc.log("RECEIVE PLANT: " );
                //
                break;
            case gv.CMD.CROP:
                cc.log("RECEIVE CROP: " );
                //
                break;
            case gv.CMD.PLANT_BOOST:
                cc.log("RECEIVE PLANT_BOOST: " );
                //
                break;
            //
            case gv.CMD.RECEIVE_FIELD_STATUS:
                cc.log("RECEIVE RECEIVE_FIELD_STATUS: ", packet.errorLog);
                //
                if (packet.errorLog != ErrorLog.SUCCESS){
                    /*
                    NOT Success
                    INPROGRESS (update field status)
                     */

                    // fieldSelected = user.getAsset().getFieldById(packet.fieldId);
                    // fieldSelected.setPlantType(packet.plantType);
                    //
                    // var plantedTime = new Date();
                    // plantedTime.setTime(packet.plantedTime);
                    // fieldSelected.setPlantedTime(plantedTime);
                }
                break;
            case gv.CMD.BUY_ITEM_BY_RUBI:
                cc.log("RECEIVE BUY_ITEM_BY_RUBI", packet.errorLog);
                //
                if (packet.errorLog != ErrorLog.SUCCESS){
                    //Recovery

                    // if (user.getAsset().getFoodStorage().takeItem(packet.productType, 1)){
                    //     user.addRuby(getProductObjByType(packet.productType).rPrice);
                    // }
                }
                break;
        }
    },
    sendGetUserInfo:function()
    {
        cc.log("sendGetUserInfo");
        var pk = this.gameClient.getOutPacket(CmdSendUserInfo);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },
    sendLoginRequest: function () {
        cc.log("sendLoginRequest");
        var pk = this.gameClient.getOutPacket(CmdSendLogin);
        pk.pack(this._userName);
        this.gameClient.sendPacket(pk);
    },
    sendMove:function(direction){
        cc.log("SendMove:" + direction);
        var pk = this.gameClient.getOutPacket(CmdSendMove);
        pk.pack(direction);
        this.gameClient.sendPacket(pk);
    },

    //
    //
    sendPlant: function (fieldId, productType) {
        cc.log("sendPlant: " + fieldId + ", type: " + productType);
        var pk = this.gameClient.getOutPacket(CmdSendPlant);
        pk.pack(fieldId, productType);
        this.gameClient.sendPacket(pk);
    },
    sendCrop: function (fieldId) {
        cc.log("sendCrop: " + fieldId);
        var pk = this.gameClient.getOutPacket(CmdSendCrop);
        // pk.pack(fieldId, productType);
        pk.pack(fieldId);
        this.gameClient.sendPacket(pk);
    },
    sendPlantBoost: function (fieldId) {
        cc.log("sendPlantBoost: " + fieldId);
        var pk = this.gameClient.getOutPacket(CmdSendCrop);
        pk.pack(fieldId);
        this.gameClient.sendPacket(pk);
    },
    sendBuyItemByRubi: function (productType) {
        cc.log("sendBuyItemByRubi: " + productType);
        var pk = this.gameClient.getOutPacket(CmdSendBuyItemByRubi);
        pk.pack(productType);
        this.gameClient.sendPacket(pk);
    }

});



