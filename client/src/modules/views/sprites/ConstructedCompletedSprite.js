/**
 * Created by CPU60075_LOCAL on 04/12/2017.
 */

var ConstructedCompletedSprite = AnimationSprite.extend({
    blockSize: null,

    ctor: function (id, x, y, typeBuilding, blockSize) {
        var w;
        var h;
        if (blockSize === 2) {
            w = 2;
            h = 2;
        } else if (blockSize === 3) {
            w = 3;
            h = 3;
        } else {
            w = 4;
            h = 4;
        }
        this._super(resAniId.Nha_hoanthanh, w, h, x, y,
            typeBuilding);

        this.blockSize = blockSize;
        //var scale = blockSize / 4;
        //cc.log("scale", scale);
        this.content.setScale(this.blockSize / 4);
        this.id = id;
        this.typeBuilding = typeBuilding;
        this.play("1");

        this.registerTouchEvents();
    },

    onEndClick: function () {
        audioEngine.playEffect(res.func_click_button_mp3, false);
        ConstructedCtrl.instance.completedBuild(this.id, this.typeBuilding);
        this.removeFromParent(true);
    },

    _offset: function () {
        var p;
        if (this.blockSize === 2) {
            p = MapValues.logicToPosition(this.blockSize - 5, this.blockSize - 3);
        } else if (this.blockSize === 3) {
            p = MapValues.logicToPosition(this.blockSize - 7, this.blockSize - 4);
            p.y += 58;
        }
        else {
            p = MapValues.logicToPosition(this.blockSize - 10, this.blockSize - 6);
        }
        return p;
    }
});