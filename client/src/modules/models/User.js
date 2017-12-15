
var User = cc.Class.extend({

    level: 1,    //int
    gold: 0,
    ruby: 0,
    exp: 0,
    asset: null,
    map: [],
    
    ctor: function (asset, map) {
        //
        //this._super();

    //     this.render(asset);

    // },
    // render: function (asset) {
        //
        //this.level = 1;
        //this.gold = 100;
        //this.ruby = 100;
        //this.exp = 0;

        this.asset = asset;
        this.map = map || this.map;
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
        this.gold += parseInt(number);

        //
        MainGuiLayer.instance.labelGold.setString(this.gold);
    },
    addRuby: function (number) {
        this.ruby += parseInt(number);

        //
        MainGuiLayer.instance.labelRuby.setString(this.ruby);
    },
    addExp: function (number) {
        /*
        DONE
         */

        if (this.exp + parseInt(number)> getLevelupObjById(this.level + 1).exp){
            this.level ++;
            var expCurr = this.exp;
            this.exp = 0;
            this.addExp(expCurr + parseInt(number) - getLevelupObjById(user.level).exp);
            MainGuiLayer.instance.labelLevel.setString(this.level);

            if (this.getAsset().getOrderList().length < getNumberOfOrderByLevel(this.level)){
                testnetwork.connector.sendCreateNewOrder(this.getAsset().getOrderList().length);
            }

        } else {
            this.exp += parseInt(number);
        }

        //MainGuiLayer.instance.labelExp.setString(this.exp + " / " + getLevelupObjById(this.level + 1).exp);
        MainGuiLayer.instance.setExpPecent();
    },

    reduceGold: function (number) {
        if (this.getGold() >= parseInt(number)){
            this.gold -= parseInt(number);

            //
            MainGuiLayer.instance.labelGold.setString(this.gold);
            return true;
        }
        return false;

    },
    reduceRuby: function (number) {
        if (this.getRuby() >= parseInt(number)){
            this.ruby -= parseInt(number);

            //
            MainGuiLayer.instance.labelRuby.setString(this.ruby);
            return true;
        }
        return false;
    },

    getModelObjectAtMap: function(lx, ly) {
        ly = Math.floor(lx.y || ly);
        lx = Math.floor(lx.x || lx);
        // Check for click outside of x
        if (!this.map[lx]) {
            return null;
        }
        var type = this.map[lx][ly];
        switch (type) {
            case MapItemEnum.LODGE:
                return {
                    type: type,
                    model: this.asset.getLodgeByPosition(lx, ly)
                }
            default:
                return null;
        }
    }
});
