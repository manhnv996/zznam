/**
 * Created by CPU60135_LOCAL on 11/30/2017.
 */


var MachineLayer = cc.Layer.extend({
    machineId: null,
    machine :null,
    backgroundSprite: null,
    productList: [],
    QueueList: [],
    slotSprite: null,
    buySlotSprite: null,
    labelMaChineName: null,
    labelTime: null,
    lx: 0,
    ly: 0,
    ctor:function(machineId,lx, ly ){
        this._super();
        this.machineId = machineId;
        this.lx  = lx;
        this.ly = ly;






    },
    showPopup: function (machineId, lx, ly) {
        this.backgroundSprite = new cc.Sprite(res.popup5);
        var machineScreenPosition = MapValues.logicToScreenPosition(lx, ly);
        cc.log(this.lx + "---" + this.ly);

        this.backgroundSprite.setPosition(machineScreenPosition.x, machineScreenPosition.y);


        this.addChild(this.backgroundSprite);


    },
    disablePopup: function(){
        //cc.log("disvisible");
        this.disablePopupBackground();

        //this.disableItemOfPopup(productType);

    },
    disablePopupBackground: function () {
        if (this.backgroundSprite != null) {

            this.backgroundSprite.setVisible(false);
            this.backgroundSprite.removeFromParent(true);

            this.backgroundSprite = null;
        }
    }

});



var Square = cc.Sprite.extend({
    ctor:function(){
        this._super();

    }
})