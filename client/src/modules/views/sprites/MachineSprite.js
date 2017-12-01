/**
 * Created by CPU60135_LOCAL on 11/29/2017.
 */
/**
 * Created by CPU60135_LOCAL on 11/28/2017.
 */

var MachineSprite = AnimationSprite.extend({

    machineId: null,
    machine:null,
    aniState: "idle",
    ctor: function(machineId, aniId, blockSizeX, blockSizeY, x, y, mapAliasType) {
        this.machineId = machineId;
        //this._super(aniId, blockSizeX, blockSizeY, lx, ly, mapAliasType)
        this._super(aniId, MapConfigs.Bakery.size.width, MapConfigs.Bakery.size.width, x, y, MapItemEnum.FOOD_GRINDER);
        this.play(this.aniState);
        this.machine = user.getAsset().getMachineList().find(function(f){
            return f.machineId === machineId;
        })

        this.registerTouchEvents();
    },

    onClick: function() {
        cc.log(this.machineId + " on click");
        MachineLayer.instance.showPopup(this.machineId, this.lx, this.ly);

    },

    onBeginClick: function() {
        cc.log(this.machineId + " on begin click");
        this.play("selected");

    },

    onEndClick: function() {
        cc.log(this.machineId + " on end click");
    }
});

