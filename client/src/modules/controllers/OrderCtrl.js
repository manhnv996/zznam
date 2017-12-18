
var OrderCtrl = cc.Class.extend({

    onShowOrderBG: function () {
        if (BaseGUILayer.instance._layout != null){
            BaseGUILayer.instance.removeBlockListener();
        }
        BaseGUILayer.instance.showOrderLayer();
    },

    onMakeOrder: function (orderId) {
        var orderSelected = user.getAsset().getOrderById(orderId);

        if (orderSelected != null){
            if (orderSelected.makeOrder() == true){
                /*
                 runAction
                 */
                CarSprite.instance.delivery(orderSelected.itemList);
                //
                BaseGUILayer.instance.removeBlockListener();

                testnetwork.connector.sendMakeOrder(orderId, 0);

            } else {
                var missionItem = orderSelected.checkCondition();
                /*
                done
                 */
                BaseGUILayer.instance.removeBlockListener();
                BaseGUILayer.instance.showSuggestBuyMissionItem(missionItem, BuyItemTargetType.MAKE_ORDER, orderId);
            }
        }
    },

    onMakeOrderByRuby: function (storageMissingItemList, orderId) {
        var rubiBuy = 0;
        for (var i = 0; i < storageMissingItemList.length; i++){
            rubiBuy += getProductObjById(storageMissingItemList[i].typeItem).rubiMuaNgay * storageMissingItemList[i].quantity;
        }

        var orderSelected = user.getAsset().getOrderById(orderId);
        if (orderSelected != null){
            if (orderSelected.makeOrderByRuby(rubiBuy) == true){
                /*
                 runAction
                 */
                CarSprite.instance.delivery(orderSelected.itemList);
                //
                BaseGUILayer.instance.removeBlockListener();

                testnetwork.connector.sendMakeOrder(orderId, rubiBuy);

            } else {
                //
            }
        }

    },

    onReceiveDelivery: function () {
        if (user.getAsset().getCar().getStatus() == DeliveryStatus.RECEIVABLE){
            testnetwork.connector.sendReceiceDeliveryCar(user.getAsset().getCar().deliveryPrice, user.getAsset().getCar().deliveryExp);
            user.getAsset().getCar().receive();
        }
    },

    onCancelOrder: function (orderId) {
        //
        var orderSelected = user.getAsset().getOrderById(orderId);
        if (orderSelected != null){
            if (orderSelected.cancelOrder() == true){

                testnetwork.connector.sendCancelOrder(orderId);
            }
        }
    },

    onBoostWait: function (orderId) {
        var orderSelected = user.getAsset().getOrderById(orderId);
        if (orderSelected != null){
            if (orderSelected.boostWait() == true){

                testnetwork.connector.sendBoostWaitOrder(orderId);
            }
        }
    },


    buyMissingItem: function (storageMissingItem) {
        var rubiBuy = getProductObjById(storageMissingItem.typeItem).rubiMuaNgay * storageMissingItem.quantity;
        if (user.reduceRuby(rubiBuy)){
            if (user.getAsset().addItemToStorageById(storageMissingItem.typeItem, storageMissingItem.quantity)){
                //
                BaseGUILayer.instance.removeBlockListener();

                testnetwork.connector.sendBuyItemByRubi(storageMissingItem.typeItem, storageMissingItem.quantity);
                return true;
            } else {
                user.addRuby(rubiBuy);  //
                return false;
            }
        }
        return false;
    },


    /*
    for order npc
     */
    onMakeOrderNPC: function (orderId) {
        var orderNPCSelected = user.getAsset().getOrderNPCById(orderId);
        if (orderNPCSelected != null){
            if (orderNPCSelected.makeOrder() == true){

                testnetwork.connector.sendMakeOrderNpc(orderId, 0);
                /*
                 Run animation
                 */
                BaseGUILayer.instance.removeBlockListener();

                // //
                if (MapLayer.instance.getNPCByOrderNPCId(orderNPCSelected.orderId) != null){
                    MapLayer.instance.getNPCByOrderNPCId(orderNPCSelected.orderId).runScheduleWalkingOut(true);
                    MapLayer.instance.getNPCByOrderNPCId(orderNPCSelected.orderId).runScheduleUpdateOrderNPC();
                }
            } else {
                var missionItem = orderNPCSelected.checkCondition();
                /*
                 done
                 */
                BaseGUILayer.instance.removeBlockListener();
                BaseGUILayer.instance.showSuggestBuyMissionItem(missionItem, BuyItemTargetType.MAKE_ORDER_NPC, orderId);

            }
        }
    },

    onMakeOrderNPCByRuby: function (storageMissingItemList, orderId) {
        var rubiBuy = 0;
        for (var i = 0; i < storageMissingItemList.length; i++){
            rubiBuy += getProductObjById(storageMissingItemList[i].typeItem).rubiMuaNgay * storageMissingItemList[i].quantity;
        }

        var orderNPCSelected = user.getAsset().getOrderNPCById(orderId);
        if (orderNPCSelected != null){
            if (orderNPCSelected.makeOrderByRuby(rubiBuy) == true){

                testnetwork.connector.sendMakeOrderNpc(orderId, rubiBuy);
                /*
                done
                 */
                // //
                if (MapLayer.instance.getNPCByOrderNPCId(orderNPCSelected.orderId) != null){
                    MapLayer.instance.getNPCByOrderNPCId(orderNPCSelected.orderId).runScheduleWalkingOut(true);
                    MapLayer.instance.getNPCByOrderNPCId(orderNPCSelected.orderId).runScheduleUpdateOrderNPC();
                }

                BaseGUILayer.instance.removeBlockListener();
            } else {
                //

            }
        }
    },


    onCancelOrderNPC: function (orderId) {
        //
        var orderNPCSelected = user.getAsset().getOrderNPCById(orderId);
        if (orderNPCSelected != null){
            if (orderNPCSelected.cancelOrder() == true){

                testnetwork.connector.sendCancelOrderNpc(orderId);

                // //
                if (MapLayer.instance.getNPCByOrderNPCId(orderNPCSelected.orderId) != null){
                    MapLayer.instance.getNPCByOrderNPCId(orderNPCSelected.orderId).runScheduleWalkingOut(false);
                    MapLayer.instance.getNPCByOrderNPCId(orderNPCSelected.orderId).runScheduleUpdateOrderNPC();
                }
            }
        }
    },


});
// OrderCtrl.instance = new OrderCtrl();
