/**
 * Created by CPU60135_LOCAL on 11/28/2017.
 */

var FoodGringer = AnimationSprite.extend({
    ctor: function(x, y) {
        this._super(resAniId.feed_mill, 4, 4, x, y, MapItemEnum.FOOD_GRINDER);
        // this.content = fr.createAnimationById(resAniId.bakery, this);
        // this.content.gotoAndPlay('loop', -1);
        // this.addChild(this.content);
        this.play("loop1");
        this.registerTouchEvents();
    },

    onClick: function() {
        cc.log("food gringer is clicked");
    },

    onBeginClick: function() {
        cc.log("food gringer on begin click");
    },

    onEndClick: function() {
        cc.log("food gringer on end click");
    }
});

