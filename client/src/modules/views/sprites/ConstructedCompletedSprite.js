/**
 * Created by CPU60075_LOCAL on 04/12/2017.
 */

var ConstructedCompletedSprite = AnimationSprite.extend({
     ctor: function (id, x, y, typeBuilding, typeObject) {
         this._super(resAniId.Nha_hoanthanh, 4, 4, x, y,
             typeObject);

         this.id = id;
         this.typeBuilding = typeBuilding;
         this.play("1");

         this.registerTouchEvents();
     },

    onClick: function () {
        ConstructedCtrl.instance.completedBuild(this.id, this.typeBuilding);
        this.removeFromParent(true);
    },

    _offset: function () {
        var p = MapValues.logicToPosition(- 6, - 2);
        return p;
    }
});