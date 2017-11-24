
var User = cc.Class.extend({

    level: 1,    //int
    gold: 0,
    ruby: 0,
    exp: 0,
    asset: null,
    map: [],
    
    ctor: function (asset) {
        //
        //this._super();

        this.render(asset);

    },
    render: function (asset) {
        //
        this.level = 1;
        this.gold = 100;
        this.ruby = 100;
        this.exp = 0;

        this.asset = asset;
    },


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




    /*
    NOT YET STARTED
    SHOW Effect if Add or Reduce asset (call controller)
     */

    addGold: function (number) {
        this.gold += number;

        //
        MainGuiLayer.instance.labelGold.setString(this.gold);
    },
    addRuby: function (number) {
        this.ruby += number;

        //
        MainGuiLayer.instance.labelRuby.setString(this.ruby);
    },
    addExp: function (number) {
        this.exp += number;
        //bug
        /*
        NOT YET STARTED
        if level up
         */
    },

    reduceGold: function (number) {
        if (this.getGold() >= number){
            this.gold -= number;

            //
            MainGuiLayer.instance.labelGold.setString(this.gold);
            return true;
        }
        return false;

    },
    reduceRuby: function (number) {
        if (this.getRuby() >= number){
            this.ruby -= number;

            //
            MainGuiLayer.instance.labelRuby.setString(this.ruby);
            return true;
        }
        return false;
    }

});