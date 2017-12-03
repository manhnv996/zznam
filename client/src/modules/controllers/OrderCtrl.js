
var OrderCtrl = cc.Class.extend({

    onShowOrderBG: function () {
        // var orderList = user.getAsset().getOrderList();

        // MainGuiLayer.instance.addChild(OrderBGLayer.instance);
        //OrderBGLayer.instance.showBG();
        // if (BaseGUILayer.instance._blockLayout != null){
        //     BaseGUILayer.instance.removeBlockListener();
        // }
        BaseGUILayer.instance.removeAllChildren();
        BaseGUILayer.instance.showOrderLayer();
    },

    onMakeOrder: function (orderId) {

        var orderSelected = user.getAsset().getOrderById(orderId);

        if (orderSelected != null){
            if (orderSelected.makeOrder() == true){

                testnetwork.connector.sendMakeOrder(orderId);

            } else {
                var missionItem = orderSelected.checkCondition();
                /*
                INPROGRESS
                 */

                // BaseGUILayer.instance.removeAllChildren();
                BaseGUILayer.instance.removeBlockListener();
                BaseGUILayer.instance.showSuggestBuyMissionItem(missionItem[0]);

                // for (var i = 0; i < missionItem.length; i++){
                //     cc.log(missionItem[i].typeItem + ", " + missionItem[i].quantity);
                // }
            }
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

                testnetwork.connector.sendBuyItemByRubi(storageMissingItem.typeItem, storageMissingItem.quantity);
                return true;
            } else {
                user.addRuby(rubiBuy);  //recovery
                return false;
            }
        }
        return false;
    }


});
OrderCtrl.instance = new OrderCtrl();
