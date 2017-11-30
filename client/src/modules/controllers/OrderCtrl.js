
var OrderCtrl = cc.Class.extend({

    onShowOrderBG: function () {
        var orderList = user.getAsset().getOrderList();

        // MainGuiLayer.instance.addChild(OrderBGLayer.instance);
        OrderBGLayer.instance.showBG();
    }

});
OrderCtrl.instance = new OrderCtrl();
