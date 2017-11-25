/**
 * Created by CPU60133_LOCAL on 11/7/2017.
 */

var Animal = cc.Class.extend({

    isFeeded: false,
    feededTime: null,

    ctor: function (isFeeded, feefedTime) {
        //
        //this._super();

    //     this.render(isFeeded, feefedTime);

    // },
    // render: function (isFeeded, feefedTime) {
        //
        this.isFeeded = isFeeded;
        this.feededTime = feefedTime;
    },
    feed: function () {
        //boolean
    },
    getProduct: function () {
        //productType
        return ProductTypes.GOOD_EGG;
    },
    getFeedProduct: function () {
        return ProductTypes.FOOD_CHICKEN;
    },
    getTimeFinish: function () {
        //date

    }

});