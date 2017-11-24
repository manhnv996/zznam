/**
 * Created by CPU60133_LOCAL on 11/7/2017.
 */

var Chicken = Animal.extend({

    isFeeded: false,
    feededTime: null,

    ctor: function (isFeeded, feefedTime) {
        //
        //this._super();
        Animal.prototype.init(isFeeded, feefedTime);

        // this.render();

    },
    // render: function () {
    //     //

    // },
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