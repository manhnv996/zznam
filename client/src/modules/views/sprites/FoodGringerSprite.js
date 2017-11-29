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
        CommonMachinePopup.instance = new CommonMachinePopup();
        this.addChild(CommonMachinePopup.instance);
    },

    onBeginClick: function() {
        cc.log("food gringer on begin click");
        this.setOpacity(180);
        if (this.plantSprite){
            this.plantSprite.setOpacity(180);
        }
    },

    onEndClick: function() {
        cc.log("food gringer on end click");
    }
});

