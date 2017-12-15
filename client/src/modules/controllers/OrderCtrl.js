
var OrderCtrl = cc.Class.extend({

    onShowOrderBG: function () {
        // var orderList = user.getAsset().getOrderList();

        // MainGuiLayer.instance.addChild(OrderBGLayer.instance);
        //OrderBGLayer.instance.showBG();
        // if (BaseGUILayer.instance._blockLayout != null){
        //     BaseGUILayer.instance.removeBlockListener();
        // }
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
                //CarSprite.instance.updateOrder(orderSelected.orderPrice, orderSelected.orderExp);
                CarSprite.instance.delivery(orderSelected.itemList);
                //
                BaseGUILayer.instance.removeBlockListener();

                testnetwork.connector.sendMakeOrder(orderId, 0);

            } else {
                var missionItem = orderSelected.checkCondition();
                /*
                INPROGRESS
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
                //CarSprite.instance.updateOrder(orderSelected.orderPrice, orderSelected.orderExp);
                CarSprite.instance.delivery(orderSelected.itemList);
                //
                BaseGUILayer.instance.removeBlockListener();

                testnetwork.connector.sendMakeOrder(orderId, rubiBuy);

            } else {
                //

            }
        }

        ////
        //OrderCtrl.instance.onShowOrderBG();

    },

    onReceiveDelivery: function () {
        if (user.getAsset().getCar().receive()){
            audioEngine.playEffect(res.order_collect_money_from_car_mp3, false);
            testnetwork.connector.sendReceiceDeliveryCar(user.getAsset().getCar().deliveryPrice, user.getAsset().getCar().deliveryExp);

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
                user.addRuby(rubiBuy);  //recovery
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
                 Inprogress
                 Run animation
                 */
                BaseGUILayer.instance.removeBlockListener();

                // //
                // MapLayer.instance.getNPCByOrderNPCId(orderId).setPause();
                // MapLayer.instance.getNPCByOrderNPCId(orderId).actionGetOut1();
                // // //
                // //
                if (MapLayer.instance.getNPCByOrderNPCId(orderNPCSelected.orderId) != null){
                    MapLayer.instance.getNPCByOrderNPCId(orderNPCSelected.orderId).runScheduleWalkingOut(true);
                    MapLayer.instance.getNPCByOrderNPCId(orderNPCSelected.orderId).runScheduleUpdateOrderNPC();
                }
            } else {
                var missionItem = orderNPCSelected.checkCondition();
                /*
                 INPROGRESS
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
                INPROGRESS
                 */
                // //
                // MapLayer.instance.getNPCByOrderNPCId(orderId).setPause();
                // MapLayer.instance.getNPCByOrderNPCId(orderId).actionGetOut1();
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

                // // //
                // MapLayer.instance.getNPCByOrderNPCId(orderId).setPause();
                // MapLayer.instance.getNPCByOrderNPCId(orderId).actionGetOut1();
                // //
                if (MapLayer.instance.getNPCByOrderNPCId(orderNPCSelected.orderId) != null){
                    MapLayer.instance.getNPCByOrderNPCId(orderNPCSelected.orderId).runScheduleWalkingOut(false);
                    MapLayer.instance.getNPCByOrderNPCId(orderNPCSelected.orderId).runScheduleUpdateOrderNPC();
                }
            }
        }
        /*
        Inprogress
        Run animation
         */
    },


});
// OrderCtrl.instance = new OrderCtrl();
