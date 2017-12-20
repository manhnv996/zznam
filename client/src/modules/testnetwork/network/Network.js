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
                cc.log(packet);
                // this.sendGetUserInfo(); // Old. Do not use
                // this.sendGetServerTime();
                // MainScene.instance = new MainScene();
                // cc.director.runScene(MainScene.instance);

                break;
            // Time
            case gv.CMD.GET_SERVER_TIME:
                cc.log("GET_SERVER_TIME");
                var serverStartTime = packet.time;
                var clientStartTime = new Date().getTime();
                gv.deltaTime = clientStartTime - serverStartTime;
                cc.log("[TIME] Client time", clientStartTime);
                cc.log("[TIME] Server time", serverStartTime);
                cc.log("[TIME] Delta", gv.deltaTime);
                cc.log("[TIME] Test, current time:", getTime());
                this.sendGetUser();
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
            case gv.CMD.GAME_INFO: // Old
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
            case gv.CMD.GET_USER: // New
                cc.log("[N] RECEIVE GET_USER");
                // process packet.user here
                home = true;
                onReceiveUser(packet.user);
                break;

            case gv.CMD.RESPONSE_ERROR_CODE:
                cc.log("RECEIVE RESPONSE_ERROR_CODE: ", packet.errorLog);

                break;

            case gv.CMD.RESPONSE_SYNC_FIELD_STATUS:
                cc.log("RECEIVE RESPONSE_SYNC_FIELD_STATUS: ", packet.fieldId);
                //

                var fieldSelected = user.getAsset().getFieldById(packet.fieldId);
                fieldSelected.setPlantType(packet.plantType);

                var plantedTime = getDate();
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

                //
                MainGuiLayer.instance.labelGold.setString(user.gold);
                MainGuiLayer.instance.labelRuby.setString(user.ruby);
                MainGuiLayer.instance.labelExp.setString(user.exp);

                break;

            case gv.CMD.RESPONSE_SYNC_STORAGE:
                // cc.log("RECEIVE RESPONSE_SYNC_STORAGE: ", packet.storageJsonString);
                cc.log("RECEIVE RESPONSE_SYNC_STORAGE: ", packet.storage);
                /*
                 Done
                 */

                // Update Storage
                var storageUpdate = new Storages(
                    new Coordinate(packet.storage.x,
                        packet.storage.y),
                    packet.storage.storageType,
                    packet.storage.capacity,
                    packet.storage.level
                );
                // Add Storage itemlist
                for (var i = 0; i < packet.storage.itemList.length; i++){
                    storageUpdate.addItem(
                        packet.storage.itemList[i].typeItem,
                        packet.storage.itemList[i].quantity
                    );
                }

                //
                if (packet.storage.storageType == StorageTypes.FOOD_STORAGE){
                    user.asset.foodStorage = null;
                    user.asset.foodStorage = storageUpdate;
                } else {
                    user.asset.warehouse = null;
                    user.asset.warehouse = storageUpdate;
                }

                break;

            case gv.CMD.RESPONSE_SYNC_ORDER:
                cc.log("RECEIVE RESPONSE_SYNC_ORDER: ", packet.order);
                /*
                 Done
                 */
                var orderSelected = user.getAsset().getOrderById(packet.order.orderId);

                if (orderSelected != null){

                    orderSelected.itemList = packet.order.itemList;
                    orderSelected.orderPrice = packet.order.orderPrice;
                    orderSelected.orderExp = packet.order.orderExp;
                    orderSelected.waittingTime = new Date(parseInt(packet.order.waittingTime));

                }
                else {
                    var order = new Order(
                        packet.order.orderId,
                        packet.order.itemList,
                        packet.order.orderPrice,
                        packet.order.orderExp
                    );
                    order.waittingTime = new Date(parseInt(packet.order.waittingTime));

                    user.getAsset().addOrder(order);
                }

                ////
                TruckOrderSprite.instance.initTruckOrder();
                // OrderCtrl.instance.onShowOrderBG();
                if (BaseGUILayer.instance._layout != null){
                    BaseGUILayer.instance._layout.initInfo();
                }

                TablePopupLayer.instance.runUpdateOrderWaittingTime();
                break;

            case gv.CMD.RESPONSE_SYNC_CAR:
                cc.log("RECEIVE RESPONSE_SYNC_CAR: ");
                /*
                 done
                 */

                var car = user.getAsset().getCar();
                car.updateDelivery(packet.deliveryPrice, packet.deliveryExp);

                CarSprite.instance.updateCarStatus(car);

                break;

            case gv.CMD.RESPONSE_SYNC_ORDER_NPC:
                cc.log("RECEIVE RESPONSE_SYNC_ORDER_NPC: ", packet.orderNPC);
                /*
                 NOT YET STARTED
                 */

                //Order NPC List
                var orderNPCSelected = user.getAsset().getOrderNPCById(packet.orderNPC.orderId);

                orderNPCSelected.orderItem = packet.orderNPC.orderItem;
                orderNPCSelected.orderPrice = packet.orderNPC.orderPrice;
                orderNPCSelected.orderExp = packet.orderNPC.orderExp;

                orderNPCSelected.waittingTime = new Date(parseInt(packet.orderNPC.waittingTime));

                orderNPCSelected.npc_res = packet.orderNPC.npc_res;


                if (orderNPCSelected.checkStatus() == OrderStatusTypes.REALIZABLE){
                    //
                    //MapLayer.instance.getNPCByOrderNPCId(orderNPCSelected.orderId).setResume();
                    var index = MapLayer.instance.getIndexByOrderNPCId(orderNPCSelected.orderId);
                    if (index != null){
                        MapLayer.instance.getNPCByOrderNPCId(orderNPCSelected.orderId).changeTexture(orderNPCSelected);
                        MapLayer.instance.getNPCByOrderNPCId(orderNPCSelected.orderId).runScheduleWalkingBack();
                        MapLayer.instance.getNPCByOrderNPCId(orderNPCSelected.orderId).stopScheduleUpdateOrderNPC();
                    }
                    //
                } else {
                    // //
                    // // MapLayer.instance.getNPCByOrderNPCId(orderNPCSelected.orderId).setPause();
                    // if (MapLayer.instance.getNPCByOrderNPCId(orderNPCSelected.orderId) != null){
                    //     MapLayer.instance.getNPCByOrderNPCId(orderNPCSelected.orderId).setPause();
                    // }
                    //
                    // //
                }

                break;
            //
            case gv.CMD.RESPONSE_SYNC_PRODUCT_SALE:
                cc.log("RESPONSE_SYNC_PRODUCT_SALE: ", packet.productSale);

                /*
                inprogress
                 */
                var productSaleSelected = user.getAsset().getMyShop().getProductBySlot(packet.productSale.slot);
                productSaleSelected.updateProductSale(new StorageItem(packet.productSale.typeItem, packet.productSale.quantity),
                    packet.productSale.price);
                productSaleSelected.isSold = packet.productSale.isSold;


                break;
            ////

            case gv.CMD.RESPONSE_MOVE:
                cc.log("RESPONSE_MOVE Error: ", packet.error);
                if (packet.error !== 0) {
                    cc.log("[E] Error occurs!");
                }
                break;
            case gv.CMD.ANIMAL_HARVEST:
                cc.log("ANIMAL_HARVEST Error:", packet.error);
                if (packet.error !== 0) {
                    cc.log('[E] Error occurs!');
                }
                break;
            case gv.CMD.ANIMAL_FEED:
                cc.log("ANIMAL_FEED Error:", packet.error);
                if (packet.error !== 0) {
                    cc.log('[E] Error occurs!');
                }
                break;
            case gv.CMD.ANIMAL_BOOST:
                cc.log("ANIMAL_BOOST Error:", packet.error);
                if (packet.error !== 0) {
                    cc.log('[E] Error occurs!');
                }

            case gv.CMD.RESPONSE_BUY_OBJECT:
                cc.log("BUY_OBJECT Error:", packet.error);
                if (packet.error !== 0) {
                    cc.log('[E] Error occurs!');
                }
                break;

            case gv.CMD.RESPONSE_UPGRADE_STORAGE:
                cc.log("UPGRADE_STORAGE Error:", packet.error);
                if (packet.error !== 0) {
                    cc.log('[E] Error occurs!');
                }
                break;
            case gv.CMD.RESPONSE_BUY_TOOL_UPGRADE:
                cc.log("BUY_TOOL_UPGRADE Error:", packet.error);
                if (packet.error !== 0) {
                    cc.log('[E] Error occurs!');
                }
                break;
            case gv.CMD.NATURE_COLLECT:
                cc.log("NATURE_COLLECT Error:", packet.error);
                if (packet.error !== 0) {
                    cc.log('[E] Error occurs');
                }
                break;
            case gv.CMD.FRIEND_GET_LIST:
                cc.log("FRIEND_GET_LIST");
                cc.log(packet.idList);
                var id = packet.idList[0] || user.id; // or last id
                cc.log("[F] Choose", id);
                this.sendFriendGetInfo(id);
                break;
            case gv.CMD.FRIEND_GET_INFO:
                cc.log("FRIEND_GET_INFO");
                home = false;
                onReceiveUser(packet.user);
                break;
        }
    },
    sendGetUserInfo:function() // Old
    {
        cc.log("sendGetUserInfo");
        var pk = this.gameClient.getOutPacket(CmdSendUserInfo);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },

    sendGetUser: function() {
        cc.log("[N] sendGetUser");
        var pk = this.gameClient.getOutPacket(CmdSendGetUser);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },

    sendLoginRequest: function(username, password) {
        cc.log("Send login request", username, password);
        var ATTEMP_TO_TRY = 5;
        var failedToConnect = function() {
            return cc.log("Check your network connection");
        }

        var invalidUsernamePassword = function() {
            return cc.log("Invalid username or password");
        }

        // Not modify after here
        var that = this;
        var getSessionProcess = function(userid, sessionKey, attemp) {
            var url = "https://zplogin.g6.zing.vn/?service_name=getSessionKey" 
                + "&gameId=100&distribution=&clientInfo=" 
                + "&social=zingme&accessToken=" + sessionKey;
            request.get(url, function(err, response) {
                if (err) {
                    if (attemp === ATTEMP_TO_TRY) {
                        return failedToConnect();
                    }
                    cc.log("Retry attemp", attemp + 1);
                    return getSessionProcess(userid, sessionKey, attemp + 1);
                }
                // Save session
                cc.sys.localStorage.setItem("session", response.sessionKey);
                return that.sendLoginSession(response.sessionKey, userid);
            });
        }

        var loginProcess = function(user, pass, attemp) {
            var url = "https://myplay.apps.zing.vn/sso3/login.php?username=" 
                    + username + "&password=" + password;
            request.get(url, function(err, response) {
                if (err) {
                    if (attemp === ATTEMP_TO_TRY) {
                        return failedToConnect();
                    }
                    cc.log("Retry attemp", attemp + 1);
                    return loginProcess(user, pass, attemp + 1);
                }
                if (parseInt(response.error) !== 0) {
                    return invalidUsernamePassword();
                }
                var sessionKey = response.sessionKey;
                var userid = response.userid;
                return getSessionProcess(userid, sessionKey, 0);
            });
        }

        // return this.sendLoginSession("aWQ9Mjg5OTMxMzYmdXNlcm5hbWU9enpuYW1zcG96ejc5JnNvY2lhbD16aW5nbWUmc29jaWFsbmFtZT1OYW0rRnNwJmF2YXRhcj1odHRwJTNBJTJGJTJGemluZ3BsYXkuc3RhdGljLmc2Lnppbmcudm4lMkZpbWFnZXMlMkZ6cHAlMkZ6cGRlZmF1bHQucG5nJnRpbWU9MTUxMzc1NjExMSZvdGhlcj1kZWZhdWx0JTNBJTNBJTNBJTNBMjg5OTMxMzYlM0ElM0ExMDAmdG9rZW5LZXk9ODAzMjRmYmNmOTJmOTc1OTQ1NDY0MmMwZWYwNmNjOTM=", 0);
        // return this.sendLoginSession("aWQ9NDgzNjk4NzI2JnVzZXJuYW1lPWZyZXNoZXIwMDEmc29jaWFsPXppbmdtZSZzb2NpYWxuYW1lPWZyZXNoZXIwMDEmYXZhdGFyPWh0dHAlM0ElMkYlMkZ6aW5ncGxheS5zdGF0aWMuZzYuemluZy52biUyRmltYWdlcyUyRnpwcCUyRnpwZGVmYXVsdC5wbmcmdGltZT0xNTEzNzU2MjE1Jm90aGVyPWRlZmF1bHQlM0ElM0ElM0ElM0E0ODM2OTg3MjYlM0ElM0ExMDAmdG9rZW5LZXk9YWFmNTVlN2MwNTk5Y2ZkMGEyMWM5MDI4NjA5NDYwYmM=", 0);
        var ss = cc.sys.localStorage.getItem("session");
        if (ss) {
            return this.sendLoginSession(ss, 0);
        } else {
            return loginProcess(username, password, 0);
        }
    },

    sendLoginSession: function(sessionKey, userid) {
        var pk = this.gameClient.getOutPacket(CmdSendLogin);
        pk.pack(sessionKey, userid);
        this.gameClient.sendPacket(pk);
        cc.log("ss", sessionKey);
    },

    // _sendLoginRequest: function (username, password) {
    //     cc.log("sendLoginRequest");
    //     cc.log("sendingLoginRequest with: " + username + "===" + password);
    //     //this.getSessionKeyAndUserId();
    //     var xhr = cc.loader.getXMLHttpRequest();
    //     var url = "https://myplay.apps.zing.vn/sso3/login.php?username=" + username + "&password=" + password;
    //     xhr.open("GET", url);
    //     xhr.setRequestHeader("Content-Type", "text/plain");
    //     xhr.onreadystatechange = function () {
    //         if (xhr.readyState == 4 && ( xhr.status >= 200 && xhr.status <= 207 )) {
    //             var httpStatus = xhr.statusText;
    //             var response = xhr.responseText;
    //             var jsonData = JSON.parse(response);
    //             var error = jsonData["error"];
    //             var accessToken = jsonData["sessionKey"];
    //             var userid = jsonData["userid"];

    //             if (error == "0") {
    //                 var url2 = "https://zplogin.g6.zing.vn/?service_name=getSessionKey&gameId=100&distribution=&clientInfo=&social=zingme&accessToken=";
    //                 cc.log("HTTP Response : error : " + error);
    //                 var xhr2 = cc.loader.getXMLHttpRequest();
    //                 xhr2.open("GET", url2 + accessToken);
    //                 xhr2.setRequestHeader("Content-Type", "text/plain");
    //                 xhr2.onreadystatechange = function () {
    //                     cc.log("Networking away");

    //                     if (xhr2.readyState == 4 && ( xhr2.status >= 200 && xhr2.status <= 207 )) {
    //                         var httpStatus = xhr2.statusText;
    //                         cc.log(httpStatus);

    //                         var response = xhr2.responseText;
    //                         //cc.log(response);

    //                         //parse to json object;
    //                         var jsonData = JSON.parse(response);
    //                         var error2 = jsonData["error"];
    //                         var sessionKey2 = jsonData["sessionKey"];
    //                         var openId = jsonData["openId"];
    //                         var expired_time = jsonData["expired_time"];
    //                         cc.log("HTTP Response : error2 : " + error2);
    //                         cc.log("HTTP Response : sessionKey2 : " + sessionKey2);
    //                         //cc.log("HTTP Response : openId : " + openId);
    //                         //cc.log("HTTP Response : expired_time : " + expired_time);
    //                         var pk = this.gameClient.getOutPacket(CmdSendLogin);
    //                         pk.pack(sessionKey2, userid);
    //                         this.gameClient.sendPacket(pk);
    //                     }
    //                 }.bind(this, userid);
    //                 xhr2.send();
    //             }
    //         }
    //     }.bind(this);
    //     xhr.send();
    // },
    
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
    sendBuyItemByRubi: function (productType, quantity) {
        cc.log("sendBuyItemByRubi: " + productType);
        var pk = this.gameClient.getOutPacket(CmdSendBuyItemByRubi);
        pk.pack(productType, quantity);
        this.gameClient.sendPacket(pk);
    },
    ///
    sendMakeOrder: function (orderId, rubyBuy) {
        cc.log("sendMakeOrder: " + orderId);
        var pk = this.gameClient.getOutPacket(CmdSendMakeOrder);
        pk.pack(orderId, rubyBuy);
        this.gameClient.sendPacket(pk);
    },
    sendCancelOrder: function (orderId) {
        cc.log("sendCancelOrder: " + orderId);
        var pk = this.gameClient.getOutPacket(CmdSendCancelOrder);
        pk.pack(orderId);
        this.gameClient.sendPacket(pk);
    },
    sendCreateNewOrder: function (orderId) {
        cc.log("sendCreateNewOrder: " + orderId);
        var pk = this.gameClient.getOutPacket(CmdSendCreateNewOrder);
        pk.pack(orderId);
        this.gameClient.sendPacket(pk);
    },
    sendBoostWaitOrder: function (orderId) {
        cc.log("sendBoostWaitOrder: " + orderId);
        var pk = this.gameClient.getOutPacket(CmdSendBoostWaitOrder);
        pk.pack(orderId);
        this.gameClient.sendPacket(pk);
    },
    sendReceiceDeliveryCar: function (price, exp) {
        cc.log("sendReceiceDeliveryCar: ", price, exp);
        var pk = this.gameClient.getOutPacket(CmdSendReceiceDeliveryCar);
        pk.pack(price, exp);
        this.gameClient.sendPacket(pk);
    },
    //
    sendMakeOrderNpc: function (orderId, rubyBuy) {
        cc.log("sendMakeOrderNpc: " + orderId);
        var pk = this.gameClient.getOutPacket(CmdSendMakeOrderNpc);
        pk.pack(orderId, rubyBuy);
        this.gameClient.sendPacket(pk);
    },
    sendCancelOrderNpc: function (orderId) {
        cc.log("sendCancelOrderNpc: " + orderId);
        var pk = this.gameClient.getOutPacket(CmdSendCancelOrderNpc);
        pk.pack(orderId);
        this.gameClient.sendPacket(pk);
    },
    sendCreateNewOrderNpc: function (orderId) {
        cc.log("sendCreateNewOrderNpc: " + orderId);
        var pk = this.gameClient.getOutPacket(CmdSendCreateNewOrderNpc);
        pk.pack(orderId);
        this.gameClient.sendPacket(pk);
    },
    //
    sendSellProduct: function (intSlot, productType, quantity, price) {
        cc.log("sendSellProduct: " + intSlot);
        var pk = this.gameClient.getOutPacket(CmdSendSellProduct);
        pk.pack(intSlot, productType, quantity, price);
        this.gameClient.sendPacket(pk);
    },
    sendBuyProduct: function (userId, intSlot) {
        cc.log("sendBuyProduct: ", intSlot, userId);
        var pk = this.gameClient.getOutPacket(CmdSendBuyProduct);
        pk.pack(userId, intSlot);
        this.gameClient.sendPacket(pk);
    },
    sendReceiveMoneyFromProduct: function (intSlot) {
        cc.log("sendReceiveMoneyFromProduct: " + intSlot);
        var pk = this.gameClient.getOutPacket(CmdSendReceiveMoneyFromProduct);
        pk.pack(intSlot);
        this.gameClient.sendPacket(pk);
    },
    sendCancelSellProduct: function (intSlot) {
        cc.log("sendCancelSellProduct: " + intSlot);
        var pk = this.gameClient.getOutPacket(CmdSendCancelSellProduct);
        pk.pack(intSlot);
        this.gameClient.sendPacket(pk);
    },
    sendUnlockSlotMyShop: function () {
        cc.log("sendUnlockSlotMyShop: ");
        var pk = this.gameClient.getOutPacket(CmdSendUnlockSlotMyShop);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },
    ///

    // Map
    sendMoveStorage: function(type, x, y) {
        cc.log("Send move Storage", type);
        var pk = this.gameClient.getOutPacket(CmdSendMoveStorage);
        pk.pack(type, x, y);
        this.gameClient.sendPacket(pk);
    },

    sendMoveField: function(id, x, y) {
        cc.log("Send move Field", id, x, y);
        var pk = this.gameClient.getOutPacket(CmdSendMoveField);
        pk.pack(id, x, y);
        this.gameClient.sendPacket(pk);
    },

    sendMoveMapBlock: function(type, id, x, y) {
        cc.log("Send move map block", type, id, x, y);
        var pk = this.gameClient.getOutPacket(CmdSendMoveMapBlock);
        pk.pack(type, id, x, y);
        this.gameClient.sendPacket(pk);
    },

    sendBuyMapObjectRequest: function (id, type, x, y) {
        cc.log("Send buy map object request " + x + " " + y);
        var pk = this.gameClient.getOutPacket(CmdSendBuyMapObjectRequest);
        pk.pack(id, type, x, y);
        this.gameClient.sendPacket(pk);
    },

    sendBuyMapObjectByRuby: function (id, type, x, y) {
        cc.log("Send buy map object by ruby");
        var pk = this.gameClient.getOutPacket(CmdSendBuyMapObjectByRuby);
        pk.pack(id, type, x, y);
        this.gameClient.sendPacket(pk);
    },

    sendBuyTool: function (productType, number) {
        cc.log("Buy Tool");
        var pk = this.gameClient.getOutPacket(CmdSendBuyToolRequest);
        pk.pack(productType, number);
        this.gameClient.sendPacket(pk);
    },

    sendUpgradeStorage: function (storageType) {
        cc.log("Upgrade " + storageType);
        var pk = this.gameClient.getOutPacket(CmdSendUpgradeStorageRequest);
        pk.pack(storageType);
        this.gameClient.sendPacket(pk);
    },

    sendBuildCompleted: function (id, typeBuilding) {
        cc.log("Send Completed Building");
        var pk = this.gameClient.getOutPacket(CmdSendBuildCompleted);
        pk.pack(id, typeBuilding);
        this.gameClient.sendPacket(pk);
    },

    sendAnimalHarvest: function(lodgeId, animalId) {
        cc.log("Send Animal Harvest");
        var pk = this.gameClient.getOutPacket(CmdSendAnimalHarvest);
        pk.pack(lodgeId, animalId);
        this.gameClient.sendPacket(pk);
    },

    sendAnimalFeed: function(lodgeId, animalId) {
        cc.log("Send Animal Feed", lodgeId, animalId);
        var pk = this.gameClient.getOutPacket(CmdSendAnimalFeed);
        pk.pack(lodgeId, animalId);
        this.gameClient.sendPacket(pk);
    },

    sendAnimalBoost: function(lodgeId, animalId) {
        cc.log("Send Animal Boost", lodgeId, animalId);
        var pk = this.gameClient.getOutPacket(CmdSendAnimalBoost);
        pk.pack(lodgeId, animalId);
        this.gameClient.sendPacket(pk);
    },
    
    sendBoostBuild: function (id, typeBuilding) {
        cc.log("Send Boost Build");
        var pk = this.gameClient.getOutPacket(CmdSendBoostBuild);
        pk.pack(id, typeBuilding);
        this.gameClient.sendPacket(pk);
    },

    sendBuyAnimal: function (lodgeId, animalId, animalType, lx, ly) {
        cc.log("Send Buy Animal", + animalType);
        var pk = this.gameClient.getOutPacket(CmdSendBuyAnimal);
        pk.pack(lodgeId, animalId, animalType, lx, ly);
        this.gameClient.sendPacket(pk);
    },

    sendBuyAnimalByRuby: function (lodgeId, animalId, animalType, lx, ly) {
        cc.log("Send Buy Animal", +animalType);
        var pk = this.gameClient.getOutPacket(CmdSendBuyAnimalByRuby);
        pk.pack(lodgeId, animalId, animalType, lx, ly);
        this.gameClient.sendPacket(pk);
    },

    sendNatureCollect: function(id) {
        cc.log("Send Nature collect");
        var pk = this.gameClient.getOutPacket(CmdSendCollectNatureThing);
        pk.pack(id);
        this.gameClient.sendPacket(pk);
    },

    // Friend
    sendFriendGetList: function() {
        cc.log("Send Friend get list");
        var pk = this.gameClient.getOutPacket(CmdSendFriendGetList);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },

    sendFriendGetInfo: function(id) {
        cc.log("Send Friend get info", id);
        var pk = this.gameClient.getOutPacket(CmdSendFriendGetInfo);
        pk.pack(id);
        this.gameClient.sendPacket(pk);
    },

    sendAddMoney: function (number, type) {
        cc.log("Send add money");
        var pk = this.gameClient.getOutPacket(CmdSendAddMoney);
        pk.pack(number, type);
        this.gameClient.sendPacket(pk);
    },

    sendGetServerTime: function() {
        cc.log("Send get server time");
        var pk = this.gameClient.getOutPacket(CmdSendGetServerTime);
        pk.pack();
        this.gameClient.sendPacket(pk);
    }
});
