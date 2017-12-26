/**
 * Created by CPU60075_LOCAL on 24/12/2017.
 */

var AppleTreeSprite = AnimationSprite.extend({
    ctor: function () {
        this._super(resAniId.CayTao, 1, 1, 10, 15, MapItemEnum.APPLE);

        this.play("small_idle");

        this.registerTouchEvents();
    },

    onClick: function () {
        this.play("small_select");
        cc.log("Tao is clicked");
    }
});