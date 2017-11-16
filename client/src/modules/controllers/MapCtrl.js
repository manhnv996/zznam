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
         Check previous block and current block
         */
        var pointLogic = MapValues.positionToLogic(x, y);
        return user.getAsset().getFieldByLogicPosition(pointLogic.x, pointLogic.y);
    }
});
MapCtrl.instance = new MapCtrl();

//MapCtrl.instance.showMe();