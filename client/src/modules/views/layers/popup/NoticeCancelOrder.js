
var NoticeCancelOrder = BaseLayout.extend({

    ctor: function (orderId) {
        this._super(res.bgNotice2, "TITLE_CONFIRM", true, false, true);

        //
        this.initComfirmCancel(orderId);
    },


    initComfirmCancel: function (orderId) {
//
//         var msgContent = new cc.LabelBMFont(fr.Localization.text("TEXT_NOT_ENOUGH_RESOURCE"), res.FONT_OUTLINE_30);
        var msgContent = new cc.LabelBMFont("Bạn muốn hủy đơn hàng này?", res.FONT_OUTLINE_30);
        msgContent.setPosition(cc.p(this._bg.width / 2, this._bg.height / 2));
        this._bg.addChild(msgContent);



        var btAccept = new ccui.Button(res.btTick);
        btAccept.setPosition(this._bg.width / 3, this._bg.height / 4);
        this._bg.addChild(btAccept);
        btAccept.addClickEventListener(function () {
            // //
            if (orderId != null){

                OrderCtrl.instance.onCancelOrder(orderId);
                BaseGUILayer.instance.removeBlockListener();
                BaseGUILayer.instance.showOrderLayer();
            }
        });

        var btCancel = new ccui.Button(res.btCancel);
        btCancel.setPosition(this._bg.width * 2 / 3, this._bg.height / 4);
        this._bg.addChild(btCancel);
        btCancel.addClickEventListener(function () {
            // //
            BaseGUILayer.instance.removeBlockListener();
            BaseGUILayer.instance.showOrderLayer();
        });

    }


});