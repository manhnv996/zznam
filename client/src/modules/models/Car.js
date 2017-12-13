/**
 * Created by CPU60133_LOCAL on 12/6/2017.
 */

var Car = cc.Class.extend({
    
    deliveryPrice: 0,
    deliveryExp: 0,

    status: 0,

    ctor: function (deliveryPrice, deliveryExp) {
        //this.deliveryPrice = deliveryPrice;
        //this.deliveryExp = deliveryExp;

        this.updateDelivery(deliveryPrice, deliveryExp);
    },
    
    getStatus: function () {
        return this.status;
    },


    updateDelivery: function (price, exp) {
        this.deliveryPrice = price;
        this.deliveryExp = exp;

        if (this.deliveryPrice > 0) {
            this.status = DeliveryStatus.RECEIVABLE;
        } else {
            this.status = DeliveryStatus.EMPTY;
        }
    },

    receive: function () {
        if (this.getStatus() == DeliveryStatus.RECEIVABLE){
            user.addGold(this.deliveryPrice);
            user.addExp(this.deliveryExp);

            //
            this.updateDelivery(0, 0);
            return true;
        }
        return false;
    }
    
});
