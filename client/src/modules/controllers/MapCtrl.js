/**
 * Created by CPU60133_LOCAL on 11/9/2017.
 */

var MapCtrl = cc.Class.extend({
    showMe: function() {
        cc.log("I am here");
    },
    getField: function(x, y) {
        /*
         INPROGRESS
         */
        //return new Field(new Coordinate(300, 300), 1);
        var pointLogic = MapValues.positionToLogic(x, y);
        //return user.getAsset().getFieldById(0);
        return user.getAsset().getFieldByLogicPosition(pointLogic.x, pointLogic.y);
    }
});
MapCtrl.instance = new MapCtrl();

//MapCtrl.instance.showMe();