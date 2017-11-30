/**
 * Created by CPU60133_LOCAL on 11/30/2017.
 */

var OrderSprite = cc.Sprite.extend({

    orderId: 0,
    order: null,

    ctor: function (orderId) {
        this._super(res.orderPaper);

        //
        this.orderId = orderId;
        this.order = user.getAsset().getOrderById(this.orderId);

        this.initEventListener();
    },


    initOrderPrice: function() {

        var price = new cc.LabelBMFont(this.order.orderPrice, res.FONT_OUTLINE_20);
        price.setPosition(this.width  * 2 / 5, this.height * 3.5 / 5);
        var gold = new cc.Sprite(res.goldOrder);
        //gold.setPosition(orderSprite.width  * 3.5 / 5, orderSprite.height * 3.5 / 5);
        gold.setPosition(price.width + gold.width / 2, price.height / 2);
        gold.setScale(0.5);

        this.addChild(price);
        price.addChild(gold);

        //
        var exp = new cc.LabelBMFont(this.order.orderExp, res.FONT_OUTLINE_20);
        exp.setPosition(this.width  * 2 / 5, this.height * 2.5 / 5);
        var star = new cc.Sprite(res.goldOrder);
        //gold.setPosition(orderSprite.width  * 3.5 / 5, orderSprite.height * 3.5 / 5);
        star.setPosition(exp.width + star.width / 2, exp.height / 2);
        star.setScale(0.5);

        this.addChild(exp);
        exp.addChild(star)

    },

    //
    initEventListener: function () {
        this.clickListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                //var target = this;
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    // cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);

                    return true;
                }
                return false;
            }.bind(this),
            onTouchMoved: function (touch, event) {

            }.bind(this),

            onTouchEnded: function (touch, event) {

                var target = event.getCurrentTarget();
                target.showOrderInfo();
                //
                var action1 = new cc.ScaleTo(0.13, 1.25);
                var action2 = new cc.ScaleTo(0.1, 1);
                this.runAction(cc.sequence(action1, cc.delayTime(0.01), action2));

            }.bind(this)
        });
        cc.eventManager.addListener(this.clickListener, this);
    },

    //
    showOrderInfo: function () {
        this.disableInfo();

        this.itemList = [];
        this.itemListModel = this.order.itemList;

        for (var i = 0; i < this.itemListModel.length; i++){
            var productSprite = new ProductSprite(getProductIconById(this.itemListModel[i].typeItem));
            OrderBGLayer.instance.orderInfo.addChild(productSprite);

            this.itemList.push(productSprite);

            productSprite.showQuantityCurr(user.getAsset().getQuantityOfTwoStorageByProductId(this.itemListModel[i].typeItem), this.itemListModel[i].quantity)
        }

        this.setupItemListPosition();
    },
    setupItemListPosition: function() {
        for (var i = 0; i < this.itemList.length; i++){
            this.itemList[i].setPosition(cc.p(this.itemList[i].width  * 3 / 4 + Math.abs(i % 3) * this.itemList[i].width,
                OrderBGLayer.instance.orderInfo.height + this.itemList[i].height * 1 / 3 - (Math.floor(i / 3) + 1) * this.itemList[i].height * 4 / 5));

            this.itemList[i].setScale(0.6);
        }
    },

    disableInfo: function() {
        OrderBGLayer.instance.orderInfo.removeAllChildrenWithCleanup(true);
    }


});
