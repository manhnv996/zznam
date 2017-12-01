
var OrderCtrl = cc.Class.extend({

    onShowOrderBG: function () {
        // var orderList = user.getAsset().getOrderList();

        // MainGuiLayer.instance.addChild(OrderBGLayer.instance);
        OrderBGLayer.instance.showBG();
    },

    onMakeOrder: function (orderId) {

        var orderSelected = user.getAsset().getOrderById(orderId);

        if (orderSelected != null){
            if (orderSelected.checkCondition() == true){
                cc.log("TRUEEEE");

                orderSelected.makeOrder();
                testnetwork.connector.sendMakeOrder(orderId);

                // CommonPopup.instance.onSelectClose();
                // this.onShowOrderBG();
            } else {
                var missionItem = orderSelected.checkCondition();
                for (var i = 0; i < missionItem.length; i++){
                    cc.log(missionItem[i].typeItem + ", " + missionItem[i].quantity);
                }
            }
        }
    },

    onCancelOrder: function (orderId) {
        //
        var orderSelected = user.getAsset().getOrderById(orderId);

        if (orderSelected != null){

            orderSelected.cancelOrder();
            testnetwork.connector.sendCancelOrder(orderId);

            // CommonPopup.instance.onSelectClose();
            // this.onShowOrderBG();
        }
    }

});
OrderCtrl.instance = new OrderCtrl();
