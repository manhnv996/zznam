/**
 * Created by CPU60075_LOCAL on 19/11/2017.
 */

var GameShop = cc.Class.extend({
    maxField: 6,

    getMaxField: function () {
        return this.maxField;
    },

    setMaxField: function (max) {
        this.maxField = max;
    }
});