

var CarSprite = AnimationSprite.extend({

    orderId: 0,
    order: null,

    ctor: function (x, y) {
        // this._super(res.orderPaper);
        this._super(resAniId.Oto_2016,
            2,
            1,
            x, y,
            MapItemEnum.CAR
        );

        this.play("1");


    },


    testSequenceEvent: function () {

        // // var callFunc = cc.CallFunc()
        // var callFunc = function(self){
        //     var second = cc.ScaleTo(1, 2);
        //     self.runAction(second);
        //     // alert("funct run");
        //     cc.log("ffcccrun")
        // };
        // this.runAction(cc.sequence(cc.moveBy(1, -50, 0), cc.ScaleTo(1, 0.5), cc.callFunc(callFunc(this), this)));
        // // var sequence1 = new cc.Sequence(action1, function () {
        // //     cc.log("ccccccdd");
        // // }, null);
        // // this.runAction(sequence1);


        // var array = [
        //     cc.p(0, 0),
        //     cc.p(cc.winSize.width / 2 - 30, 0),
        //     cc.p(cc.winSize.width / 2 - 30, cc.winSize.height - 80),
        //     cc.p(0, cc.winSize.height - 80),
        //     cc.p(0, 0)
        // ];
        //
        // var delay = cc.delayTime(0.25);
        // var action2 = cc.cardinalSplineBy(2, array, 1);
        // var reverse2 = action2.reverse();
        // var seq2 = cc.sequence(action2, delay.clone(), delay.clone(), delay.clone());
        //
        // this.x = cc.winSize.width / 2;
        // this.y = 50;
        // this.runAction(seq2);


        // var action2 = cc.sequence(
        //     cc.moveBy(1, cc.p(0, 50))
        // );
        // var onCallback1 = function (nodeExecutingAction) {
        //     cc.log("tackckckckc");
        //     this.runAction(action2);
        // };
        // var action = cc.sequence(
        //     cc.moveBy(1, cc.p(50, 0)),
        //     cc.callFunc(onCallback1.bind(this))  // 'this' is bound to the callback function using "bind"
        // );
        // this.runAction(action);



        var action11 = cc.sequence(
            cc.moveBy(1, cc.p(50, 0)),
            cc.callFunc(function (nodeExecutingAction, value) {
                this.runAction(new cc.moveBy(1, cc.p(0, 50)));
                this.control1 = "Value is: " + value;
                cc.log("Object:" + nodeExecutingAction + ". " + this.control1);
            }.bind(this, "Hello world"))
            // }, this, "Hello world")
        );
        this.runAction(action11);

    }



});