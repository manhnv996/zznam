/**
 * Created by CPU60075_LOCAL on 04/12/2017.
 */

var ConstructedCompletedSprite = AnimationSprite.extend({
    blockSize: null,

    ctor: function (id, x, y, typeBuilding, blockSizeX, blockSizeY) {

        this._super(resAniId.Nha_hoanthanh, blockSizeX, blockSizeY, x, y,
            typeBuilding);

        this.blockSizeX = blockSizeX;
        this.blockSizeY = blockSizeY;
        //var scale = blockSize / 4;
        //cc.log("scale", scale);
        this.content.setScale(this.blockSizeX / 4, this.blockSizeY / 4);
        this.id = id;
        this.typeBuilding = typeBuilding;
        this.play("1");

        this.registerTouchEvents({ lockMove: true });
    },

    onClick: function () {
        SoundCtrl.instance.playSoundEffect(res.func_click_button_mp3, false);
        ConstructedCtrl.instance.completedBuild(this.id, this.typeBuilding);
        this.removeFromParent(true);
    },

    _offset: function () {
        var p;
        if (this.blockSizeX === 2) {
            p = MapValues.logicToPosition(this.blockSizeX - 5, this.blockSizeY - 3);
        } else if (this.blockSizeX === 3) {
            p = MapValues.logicToPosition(this.blockSizeX - 7, this.blockSizeY - 4);
            p.y += 58;
        }
        else {
            p = MapValues.logicToPosition(this.blockSizeX - 10, this.blockSizeY - 6);
        }
        return p;
    }
});