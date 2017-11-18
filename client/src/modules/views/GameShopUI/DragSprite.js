/**
 * Created by CPU60075_LOCAL on 11/17/2017.
 */

var DragSprite = MapBlockSprite.extend({

    ctor: function (item, position) {
        this._super(item.nameIconShop, item.width, item.height, position.x, position.y);
        cc.log(this.getContentSize());
    }

});
