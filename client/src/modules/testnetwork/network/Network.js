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
            case gv.CMD.BUY_ITEM_BY_RUBI:
                cc.log("RECEIVE BUY_ITEM_BY_RUBI: ");
                //
                break;
//          ////
//            ////
            case gv.CMD.GAME_INFO:
                cc.log("RECEIVE GAME_INFO: ", packet.gameInfoJson);

                /*
                INPROGRESS
                read and update game info to client
                map info not yet started
                 */
                updateGameInfo(packet.gameInfoJson);
                break;
            //
            case gv.CMD.RESPONSE_ERROR_CODE:
                cc.log("RECEIVE RESPONSE_ERROR_CODE: ", packet.errorLog);

                break;

            case gv.CMD.RESPONSE_SYNC_FIELD_STATUS:
                cc.log("RECEIVE RESPONSE_SYNC_FIELD_STATUS: ", packet.fieldId);
                //

                var fieldSelected = user.getAsset().getFieldById(packet.fieldId);
                fieldSelected.setPlantType(packet.plantType);

                var plantedTime = new Date();
                plantedTime.setTime(packet.longPlantedTime);
                fieldSelected.setPlantedTime(plantedTime);

                if (packet.plantType != null){
                    if (packet.longPlantedTime != 0){
                        //
                        MapLayer.instance.runAnimationPlantting(fieldSelected.getFieldId(), fieldSelected.getPlantType());
                    }
                }

                break;

            case gv.CMD.RESPONSE_SYNC_FOOD_STORAGE_ITEM:
                cc.log("RECEIVE RESPONSE_SYNC_STORAGE_ITEM: ", packet.productType);

                var index = user.getAsset().getFoodStorage().getStorageItem(packet.productType);
                if (index != null){

                    if (packet.quantity < 0){
                        user.getAsset().getFoodStorage().takeItem(packet.productType, 1);

                    } else {
                        var storageItem = user.getAsset().getFoodStorage().getItemList()[index];

                        storageItem.typeItem = packet.productType;
                        storageItem.quantity = packet.quantity;
                    }

                } else {
                    user.getAsset().getFoodStorage().addItem(packet.productType, packet.quantity);
                }
                break;

            case gv.CMD.RESPONSE_SYNC_USER_INFO:
                cc.log("RECEIVE RESPONSE_SYNC_USER_INFO: ");

                user.level = packet.level;
                user.gold = packet.gold;
                user.ruby = packet.ruby;
                user.exp = packet.exp;

                break;

            case gv.CMD.RESPONSE_SYNC_STORAGE:
                cc.log("RECEIVE RESPONSE_SYNC_STORAGE: ", packet.storageJsonString);
                /*
                Not yet started
                 */
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
        var pk = this.gameClient.getOutPacket(CmdSendPlantBoost);
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



