/**
 * Created by CPU60075_LOCAL on 03/12/2017.
 */

var ConstructedSprite = AnimationSprite.extend({
    typeBuilding: null,
    id: null,
    buildTime: 0,

    ctor: function (id, w, h, x, y, typeBuilding, typeMapObject) {
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
        this._super(aniId, w, h, x, y ,typeMapObject);

        this.id = id;
        this.typeBuilding = typeBuilding;
        this.typeMapObject = typeMapObject;
        //cc.log("Constructed sprite id", this.id);

        //this.buildTime = ConstructedCtrl.instance.getBuildTime(id);
        this.buildExpress = ConstructedCtrl.instance.getBuildExpress(id);
        this.play(nameAni);

        this.registerTouchEvents();

        this.schedule(this.updateTime, 1);
    },

    onBeginClick: function () {
        //ConstructedCtrl.instance.selectConstructedObject(this.id, this.typeBuilding, this.buildExpress);
        if (_loadingBarConstructed) {
            //cc.log("!_loadingBarConstructed.parent" + !_loadingBarConstructed.parent);
            if (_loadingBarConstructed.parent) {
                _loadingBarConstructed.removeFromParent();
            }
            _loadingBarConstructed = null;
        }
    },

    onClick: function () {
        cc.log("Click nha dang xay " + this.id);
        ConstructedCtrl.instance.selectConstructedObject(this);
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

    updateTime: function (dt) {
        //cc.log("dt " + dt);
        //if (ConstructedCtrl.instance.checkBuildTime(this.id, this.typeBuilding, this.typeObject, dt)) {
        if (ConstructedCtrl.instance.checkBuildTime(this, dt)) {
            this.removeFromParent(true);
        }
    }
});
