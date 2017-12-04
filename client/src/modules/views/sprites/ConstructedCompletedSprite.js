/**
 * Created by CPU60075_LOCAL on 04/12/2017.
 */

var ConstructedCompletedSprite = AnimationSprite.extend({
     ctor: function (id, x, y, type) {
         this._super(resAniId.Nha_hoanthanh, 4, 4, x, y,
             MapItemEnum.CONSTRUCTED_COMPLETED);

         this.id = id;
         this.type = type;
         this.play("1");
     },

    onClick: function () {
        ConstructedCtrl.instance.completedBuild(this.id, this.type);
    }
});