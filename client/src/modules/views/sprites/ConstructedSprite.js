/**
 * Created by CPU60075_LOCAL on 03/12/2017.
 */

var ConstructedSprite = AnimationSprite.extend({
    typeBuilding: null,
    id: null,

    ctor: function (id, w, h, x, y, typeBuilding) {
        var aniId;
        var nameAni;
        if (w === 2 && h === 2){
            aniId = resAniId.Nhadangxay2x2;
            nameAni = "2";
        } else if (w === 3 && h === 3) {
            aniId = resAniId.Nhadangxay3x3;
            nameAni = "3";
        } else {
            aniId = resAniId.Nhdangxay4x4;
            nameAni = "4";
        }
        this._super(aniId, w, h, x, y , MapItemEnum.CONSTRUCTED);

        this.id = id;
        this.typeBuilding = typeBuilding;

        this.play(nameAni);

        this.registerTouchEvents();
        //MapLayer.instance.debugSprite = this;

        this.scheduleUpdate();
    },

    onClick: function () {
        //cc.log("Click nha dang xay");
        ConstructedCtrl.instance.selectConstructedObject(this.id, this.typeBuilding);
    },

    _offset: function() {
        var p = MapValues.logicToPosition(- this.blockSizeX, 0);
        if (this.blockSizeX === 2) {
            p.y += 53;
        } else if (this.blockSizeX === 3) {
            p.y += 20;
        } else {
            p.y -= 15;
        }
        return p;
    },

    update: function (dt) {
        if (ConstructedCtrl.instance.checkBuildTime(this.id, this.typeBuilding)) {
            this.removeFromParent(true);
        };
    }
});
