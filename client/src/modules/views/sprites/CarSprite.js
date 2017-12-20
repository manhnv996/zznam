
var CarSprite = AnimationSprite.extend({

    price: 0,
    exp: 0,

    car: null,
    isStatus: 0,

    ctor: function (x, y, car) {
        // this._super(res.orderPaper);
        this._super(resAniId.Oto_2016,
            MapConfigs.Car.size.width,
            MapConfigs.Car.size.height,
            x, y,
            MapItemEnum.CAR
        );


        this.car = car;
        this.isStatus = car.getStatus();

        if (car.getStatus() == DeliveryStatus.RECEIVABLE){
            this.play("8");

        } else {
            this.play("1");
        }

        // this.addEventListener();
         this.registerTouchEvents({ lockMove: true });
    },



    onClick: function() {
        cc.log("Car clicked", this.getLocalZOrder(), this.lx, this.ly, this.blockSizeX, this.blockSizeY);
        /*
        done
         */
        if (this.isStatus == DeliveryStatus.RECEIVABLE) {
            this.actionReceive();
        } else {

            OrderCtrl.instance.onShowOrderBG();
        }
    },
    onBeginClick: function() {
        this.setColor(cc.color(200, 200, 200));
    },

    onEndClick: function() {
        this.setColor(cc.color(255, 255, 255));
    },




    /////
    updateCarStatus: function (car) {
        this.car = car;
        this.isStatus = car.getStatus();
    },


    prepareItem: function (productId) {
        var item = new ProductSprite(getProductIconById(productId), null);
        item.setPosition(cc.p(0, this.height * 0.9));
        item.setScale(1.5);
        this.addChild(item);
        item.fadeOutProduct();
    },

    runPrepare: function (productList) {
        var action = cc.sequence(
            cc.delayTime(0.6),
            cc.callFunc(function () {
                if (this.indexCurr < this.sumProduct){
                    this.prepareItem(productList[this.indexCurr].typeItem);
                    this.runPrepare(productList);
                }
                this.indexCurr ++;
            }.bind(this))
        );
        this.runAction(action);
    },

    delivery: function (productList) {
        this.sumProduct = productList.length;
        this.indexCurr = 0;
        this.runPrepare(productList);

        if (this.isStatus == DeliveryStatus.EMPTY){
            this.play("2");
            var action = cc.sequence(
                cc.delayTime(0.6 * this.sumProduct + 2),
                cc.callFunc(function () {
                    this.delivery2();
                }.bind(this))
            );
            this.runAction(action);
        }

        this.isStatus = DeliveryStatus.DELIVERY;
    },
    delivery2: function () {
        this.play("2");
        var action = cc.sequence(
            cc.moveTo(2, MapValues.logicToPosition(0, 10)),
            cc.callFunc(function () {
                this.delivery3();
            }.bind(this))
        );
        this.runAction(action);
    },
    delivery3: function () {
        this.play("3");
        var action = cc.sequence(
            cc.moveTo((0.2 * 2 * Math.sqrt(2)), MapValues.logicToPosition(-2, 12)),
            cc.callFunc(function () {
                this.delivery4();
            }.bind(this))
        );
        this.runAction(action);
    },
    delivery4: function () {
        this.play("4");
        var action = cc.sequence(
            cc.moveTo(2.6, MapValues.logicToPosition(-15, 12)),
            cc.callFunc(function () {
                this.delivery5();
            }.bind(this))
        );
        this.runAction(action);
    },
    delivery5: function () {
        this.play("5");
        this.content.setPosition(MapValues.logicToPosition(15, 12));
        var action = cc.sequence(
            cc.moveTo(2.6, MapValues.logicToPosition(2, 12)),
            cc.callFunc(function () {
                this.delivery6();
            }.bind(this))
        );
        this.runAction(action);
    },
    delivery6: function () {
        this.play("6");
        var action = cc.sequence(
            cc.moveTo((0.2 * 2 * Math.sqrt(2)), MapValues.logicToPosition(0, 10)),
            cc.callFunc(function () {
                this.delivery7();
            }.bind(this))
        );
        this.runAction(action);
    },
    delivery7: function () {
        this.play("7");
        var action = cc.sequence(
            cc.moveTo(2, MapValues.logicToPosition(0, 0)),
            cc.callFunc(function () {
                this.delivery8();
            }.bind(this))
        );
        this.runAction(action);
    },
    delivery8: function () {
        this.play("8");
        this.isStatus = DeliveryStatus.RECEIVABLE;
    },


    actionReceive: function () {
        this.play("1");
        /*
        done
         */
        OrderCtrl.instance.onReceiveDelivery();
        this.isStatus = DeliveryStatus.EMPTY;
    },


    // Make offset
    _offset: function() {
        return cc.p(0, 50);
    }
});