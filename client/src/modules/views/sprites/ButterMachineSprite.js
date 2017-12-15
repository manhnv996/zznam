/**
 * Created by CPU60075_LOCAL on 12/8/2017.
 */

var ButterMachineSprite = AnimationSprite.extend({

    id: null,

    ctor: function(butterMachineId, x, y) {
        this._super(resAniId.Fairy, 4, 4, x, y, MapItemEnum.MACHINE);
        //this._super(resAniId.popcorn_pot, 3, 3, x, y, MapItemEnum.BAKERY);

        // this.content = fr.createAnimationById(resAniId.bakery, this);
        // this.content.gotoAndPlay('loop', -1);
        // this.addChild(this.content);

        this.id = butterMachineId;

        //this.play("1");
        this.play("idle");
        //
        this.registerTouchEvents();
    },

    onBeginClick: function() {
        this.play("selected");
        audioEngine.playEffect(res.tools_fairy_mp3, false);
    },

    onClick: function() {
        cc.log("feed mill is clicked " + this.id);
    },

    onFinishMove: function (lx, ly) {
        user.asset.getMachineById(this.id).coordinate.x = lx;
        user.asset.getMachineById(this.id).coordinate.y = ly;
        testnetwork.connector.sendMoveMapBlock(MapItemEnum.MACHINE, this.id, lx, ly);
    }

});