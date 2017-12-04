/**
 * Created by CPU60075_LOCAL on 03/12/2017.
 */

var ConstructedSprite = AnimationSprite.extend({
    typeObject: null,
    id: null,

    ctor: function (id, w, h, x, y, type) {
        var aniId;
        var nameAni;
        if (w == 2 && h == 2){
            aniId = resAniId.Nhadangxay2x2;
            nameAni = "2";
        } else if (w == 3 && h == 3) {
            aniId = resAniId.Nhadangxay3x3;
            nameAni = "3";
        } else {
            aniId = resAniId.Nhdangxay4x4;
            nameAni = "4";
        }
        this._super(aniId, w, h, x, y , MapItemEnum.CONSTRUCTED);

        this.id = id;
        this.typeObject = type;

        this.play(nameAni);

        this.registerTouchEvents();
        MapLayer.instance.debugSprite = this;
    },

    onClick: function () {
        //cc.log("Click nha dang xay");
        ConstructedCtrl.instance.selectConstructedObject(this.id, this.typeObject);
    },

    _offset: function() {
        var p = MapValues.logicToPosition(- this.blockSizeX, 0);
        p.y += 20;
        return p;
    }
});
