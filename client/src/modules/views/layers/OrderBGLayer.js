
var OrderBGLayer = CommonPopup.extend({

    ctor:function(){
        this._super("BẢNG ĐƠN HÀNG", res.bgTruckOrder, true);

    },

    showBG: function () {
        if (MainGuiLayer.instance.isShowPopup == false){
            this.instance  = new OrderBGLayer("BẢNG ĐƠN HÀNG", res.bgTruckOrder, true);

            MainGuiLayer.instance.addChild(this.instance);

            MainGuiLayer.instance.isShowPopup = true;
        }
    }
});