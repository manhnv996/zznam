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
                //this.sendLoginRequest();
                cc.log(gv.username +"====" + gv.password);
                this.sendLoginRequest(gv.username, gv.password);

                break;
            case gv.CMD.USER_LOGIN:
                this.sendGetUserInfo();

                MainScene.instance = new MainScene();
                cc.director.runScene(MainScene.instance);

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
                // cc.log("RECEIVE GAME_INFO: ", JSON.parse(packet.gameInfoJson));
                cc.log("RECEIVE GAME_INFO: ");

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
    sendLoginRequest: function (username, password) {
        cc.log("sendLoginRequest");
        cc.log("sendingLoginRequest with: " + username + "===" + password);
        //this.getSessionKeyAndUserId();
        var xhr = cc.loader.getXMLHttpRequest();
        var url = "http://myplay.apps.zing.vn/sso3/login.php?username=" + username + "&password=" + password;
        xhr.open("GET", url);
        xhr.setRequestHeader("Content-Type", "text/plain");
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && ( xhr.status >= 200 && xhr.status <= 207 )) {
                var httpStatus = xhr.statusText;
                var response = xhr.responseText;
                var jsonData = JSON.parse(response);
                var error = jsonData["error"];
                var accessToken = jsonData["sessionKey"];
                var userid = jsonData["userid"];

                if (error == "0") {
                    var url2 = "http://zplogin.g6.zing.vn/?service_name=getSessionKey&gameId=100&distribution=&clientInfo=&social=zingme&accessToken=";
                    cc.log("HTTP Response : error : " + error);
                    xhr.open("GET", url2 + accessToken);
                    xhr.setRequestHeader("Content-Type", "text/plain");
                    xhr.send();
                    xhr.onreadystatechange = function () {
                        cc.log("Networking away");

                        if (xhr.readyState == 4 && ( xhr.status >= 200 && xhr.status <= 207 )) {
                            var httpStatus = xhr.statusText;
                            cc.log(httpStatus);

                            var response = xhr.responseText;
                            //cc.log(response);

                            //parse to json object;
                            var jsonData = JSON.parse(response);
                            var error2 = jsonData["error"];
                            var sessionKey2 = jsonData["sessionKey"];
                            var openId = jsonData["openId"];
                            var expired_time = jsonData["expired_time"];
                            cc.log("HTTP Response : error2 : " + error2);
                            cc.log("HTTP Response : sessionKey2 : " + sessionKey2);
                            //cc.log("HTTP Response : openId : " + openId);
                            //cc.log("HTTP Response : expired_time : " + expired_time);
                            var pk = this.gameClient.getOutPacket(CmdSendLogin);
                            pk.pack(sessionKey2, userid);
                            this.gameClient.sendPacket(pk);
                        }
                    }.bind(this, userid);
                }
            }
        }.bind(this);
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



