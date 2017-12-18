
var OrderNPCLayer = BaseLayout.extend({

    orderNPC: null,

    ctor:function(orderNPC){

        this.orderNPC = orderNPC;
        this.orderId = orderNPC.getOrderId();

        //this._super();
        this._super(res.bgTruckOrder, "", false, false, true);

        this._bg.setVisible(false);

        //
        this.initOrderNPC(orderNPC);
    },

    initOrderNPC: function (orderNPC) {
        //
        this.npcSprite = new cc.Sprite(getNPCbackgroundByResAni(orderNPC.npc_res));
        this.npcSprite.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
        this.addChild(this.npcSprite);
        this.npcSprite.runAction(cc.MoveTo(0.175, cc.p(cc.winSize.width * 0.075, cc.winSize.height * 0.25)));

        //
        //this.slotNpc = new cc.Sprite(res.slotNpc);
        this.slotNpc = new ccui.ImageView(res.slotNpc);
        this.slotNpc.setPosition(cc.p(cc.winSize.width * 0.45, cc.winSize.height * 0.55));
        this.addChild(this.slotNpc);

        this.initOrderDetail(orderNPC);
        this.initOptional();
    },

    initOrderDetail: function (orderNPC) {
        //
        //var item = new cc.Sprite(getProductIconById(orderNPC.orderItem.typeItem));
        var item = new ccui.ImageView(getProductIconById(orderNPC.orderItem.typeItem));
        item.setPosition(cc.p(this.slotNpc.width * 0.3, this.slotNpc.height * 0.625));
        item.setScale(0.75);
        this.slotNpc.addChild(item);
//
//        var muiten = new cc.Sprite(res.muitenNpc);
        var muiten = new ccui.ImageView(res.muitenNpc);
        muiten.setPosition(cc.p(this.slotNpc.width * 0.5, this.slotNpc.height * 0.625));
        item.setScale(0.75);
        this.slotNpc.addChild(muiten);
//
//        var gold = new cc.Sprite(res.goldOrder);
        var gold = new ccui.ImageView(res.goldOrder);
        gold.setPosition(cc.p(this.slotNpc.width * 0.7, this.slotNpc.height * 0.6));
        gold.setScale(1.2);
        this.slotNpc.addChild(gold);

//
        var itemQuantity = this.initText(this.slotNpc.width * 0.2, this.slotNpc.height * 0.6, orderNPC.orderItem.quantity, res.FONT_OUTLINE_30);
        this.slotNpc.addChild(itemQuantity);

        var goldPrice = this.initText(this.slotNpc.width * 0.8, this.slotNpc.height * 0.6, orderNPC.orderPrice, res.FONT_OUTLINE_30);
        this.slotNpc.addChild(goldPrice);

//
        var getMsg = function () {
            return (Math.random() > 0.5) ? "Text_talk_info_npc_1_1" : "Text_talk_info_npc_1_2";
        };
        var msg = this.initText(this.slotNpc.width / 2, this.slotNpc.height * 0.825, getMsg(),
                                res.FONT_NORMAL_30);
        msg.setScale(0.9);
        msg.setColor(cc.color(139,69,19));
        this.slotNpc.addChild(msg);

//
        var msgCurr = this.initText(this.slotNpc.width * 0.45, this.slotNpc.height * 0.3,
            "Bạn đang có: ", res.FONT_NORMAL_20);
        msgCurr.setColor(cc.color(139,69,19));
        this.slotNpc.addChild(msgCurr);

        //
        var getQuantityCurr = function () {
            var q = user.getAsset().getQuantityOfTwoStorageByProductId(orderNPC.orderItem.typeItem);
            return (q > 0) ? q : "0";
        };
        var quantityCurr = this.initText(msgCurr.width * 1.25, msgCurr.height / 2, getQuantityCurr(), res.FONT_OUTLINE_20);
        msgCurr.addChild(quantityCurr);

        //
        //var itemCurr = new cc.Sprite(getProductIconById(orderNPC.orderItem.typeItem));
        var itemCurr = new ccui.ImageView(getProductIconById(orderNPC.orderItem.typeItem));
        itemCurr.setPosition(cc.p(msgCurr.width * 1.65, msgCurr.height * 0.6));
        itemCurr.setScale(0.5);
        msgCurr.addChild(itemCurr);
    },

    initOptional: function () {
        //
        this.btSell = this.initButton(this.slotNpc.x + this.slotNpc.width * 0.1, cc.winSize.height * 0.35, "text_btn_deleiver_npc", 0);
        this.addChild(this.btSell);
        this.btSell.addClickEventListener(this.sellEvent.bind(this));

        //
        this.btCancle = this.initButton(this.slotNpc.x + this.slotNpc.width * 0.1, cc.winSize.height * 0.35, "text_btn_delete_npc", 1);
        this.addChild(this.btCancle);
        this.btCancle.addClickEventListener(this.cancelEvent.bind(this));

        //
        this.btWait = this.initButton(this.slotNpc.x + this.slotNpc.width * 0.1, cc.winSize.height * 0.35, "text_btn_later_npc", 2);
        this.addChild(this.btWait);
        this.btWait.addClickEventListener(this.waitEvent.bind(this));
    },

    initButton: function (x, y, text, i) {
        //
        var button = new ccui.Button(res.answerNpc);
        button.setPosition(cc.p(x, y - button.height * i * 1.1));

        var msg = this.initText(button.width / 2, button.height / 2, text, res.FONT_OUTLINE_30);
        button.addChild(msg);

        return button;
    },

    initText: function (x, y, text, fntFile) {
        var msg = new cc.LabelBMFont(fr.Localization.text(text), fntFile);
        msg.setPosition(cc.p(x, y));

        return msg;
    },


    //
    sellEvent: function () {
        //
        OrderCtrl.instance.onMakeOrderNPC(this.orderId);

        //BaseGUILayer.instance.removeBlockListener();
    },
    waitEvent: function () {
        BaseGUILayer.instance.removeBlockListener();
    },
    cancelEvent: function () {
        OrderCtrl.instance.onCancelOrderNPC(this.orderId);

        BaseGUILayer.instance.removeBlockListener();
    }


});