/**
 * Created by CPU60133_LOCAL on 11/9/2017.
 */

var MapCtrl = cc.Class.extend({
    map: [], // [{ type: MapItemEnum, [anotherKey]: [anotherValue] }]

    init: function() {
        // MapLayer.instance.addChild(new ODatSprite(10, 10));
        MapLayer.instance.addChild(new SiloSprite(20, 20));
        MapLayer.instance.addChild(new WareHouseSprite(18, 24));
    },

    showMe: function() {
        cc.log("I am here");
    },
    getField: function(x, y) {
        /*
         DONE
         */
        var pointLogic = MapValues.screenPositionToLogic(x, y);
        return user.getAsset().getFieldByLogicPosition(Math.floor(pointLogic.x), Math.floor(pointLogic.y));
    }
});

MapCtrl.instance = new MapCtrl();

//MapCtrl.instance.showMe();