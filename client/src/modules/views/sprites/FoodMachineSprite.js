/**
 * Created by CPU60075_LOCAL on 12/8/2017.
 */

var FoodMachineSprite = AnimationSprite.extend({

    id: null,

    ctor: function(foodMachineId, x, y) {
        this._super(resAniId.feed_mill, 3, 3, x, y, MapItemEnum.FOOD_GRINDER);
        this.id = foodMachineId;

        this.play("idle");
        this.registerTouchEvents();
    },

    onClick: function() {
        cc.log("feed mill is clicked " + this.id);
        this.play("selected");
        cc.audioEngine.playEffect(res.tools_food_produce, false);
    },

    onFinishMove: function (lx, ly) {
        user.asset.getMachineById(this.id).coordinate.x = lx;
        user.asset.getMachineById(this.id).coordinate.y = ly;
        testnetwork.connector.sendMoveMapBlock(MapItemEnum.MACHINE, this.id, lx, ly);
    }

});