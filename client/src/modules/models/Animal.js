/**
 * Created by CPU60133_LOCAL on 11/7/2017.
 */

var Animal = cc.Class.extend({

    feeded: false,
    feededTime: null,
    id: 0,
    type: '',
    remainTime: null,

    ctor: function (type, id, feeded, feefedTime, remainTime) {
        this.type = type;
        this.id = id;
        this.feeded = feeded || false;
        this.feededTime = feefedTime || 0;
        this.remainTime = remainTime;
        var that = this;
        this.loopIndex = ScheduleLoop.instance.registerScheduleOneSecond(function(dt) {
            that.remainTime -= dt * 1000;
        });
    },

    feed: function () {
        //boolean
        this.feeded = true;
        this.feededTime = new Date().getTime();
        this.remainTime = AnimalConfig[this.type].time * 1000;
    },

    harvest: function() {
        this.feeded = false;
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

    },

    // return in milisecond
    getRemainTime: function() {
        cc.log(this.type);
    },

    canHarvest: function() {
        if (!this.feeded) {
            return false;
        }
        var crtTime = new Date().getTime();
        var harvestTime = AnimalConfig[this.type].time * 1000;
        var duration = crtTime - this.feededTime;
        return (duration > harvestTime);
    },

    boost: function() {
        var time = AnimalConfig[this.type].time * 1000;
        this.feededTime -= time;
    }
});
