
var User = cc.Class.extend({

    level: 1,    //int
    gold: 0,
    ruby: 0,
    exp: 0,
    asset: Asset,

    ctor: function (asset) {
        //
        //this._super();

        this.render(asset);

    },
    render: function (asset) {
        //
        this.level = 1;
        this.gold = 0;
        this.ruby = 10;
        this.exp = 0;

        this.asset = asset;
    },

    //properties: {
    //    test: {
    //        default: 15,
    //
    //        get: function () {
    //            return this._test;
    //        },
    //        set: function (value) {
    //            this._test = value;
    //        }
    //    }
    //},


    getGold: function () {
        return this.gold;
    },
    getRuby: function () {
        return this.ruby;
    },
    getExp: function () {
        return this.exp;
    },
    getLevel: function () {
        return this.level;
    },
    getAsset: function () {
        return this.asset;
    },

    addGold: function (number) {
        this.gold += number;
    },
    addRuby: function (number) {
        this.ruby += number;
    },
    addExp: function (number) {
        this.exp += number;
        //bug
        /*
        INPROGRESS
        if level up
         */
    },

    reduceGold: function (number) {
        if (this.getGold() >= number){
            this.gold -= number;
            return true;
        }
        return false;

    },
    reduceRuby: function (number) {
        if (this.getRuby() >= number){
            this.ruby -= number;
            return true;
        }
        return false;
    }

});