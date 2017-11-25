
var Coordinate = cc.Class.extend({

    x: 0,
    y: 0,
    ctor: function (x, y) {
        //
        //this._super();
    //     this.render(x, y);
    // },
    // render: function (x, y) {
        //
        this.x = x;
        this.y = y;

        // this.setLogicPosition(x, y);

    },

    getCurrX: function () {
        return this.x;
    },
    getCurrY: function () {
        return this.y;
    },
    setCoordinate: function (x, y) {
        this.x = x;
        this.y = y;
    },


    //
    setLogicPosition: function(x, y) {
        if (!x) {
            x = 0;
        }
        if (!y) {
            y = 0;
        }
        if (x.x) {
            y = x.y;
            x = x.x;
        }
        this.x = x;
        this.y = y;
        //var contentSize = this.getContentSize();
        // var point2 = MapValues.logicToPosition(x, y);
        // var point1 = MapValues.logicToPosition(x - this.blockSizeX, y - this.blockSizeY);

        //var dx = contentSize.width / 2 + 2 * point2.x - point1.x - this.blockSizeX * MapValues.iLength / 2;
        //var dy = contentSize.height / 2 + 2 * point2.y - point1.y;
        //var dx = this.width / 2 + 2 * point2.x - point1.x - this.blockSizeX * MapValues.iLength / 2;
        //var dy = this.height / 2 + 2 * point2.y - point1.y;

        //this.setLocalZOrder(this.x + this.y);
        //this.setPosition(cc.p(dx, dy));
    },

    getLogicPosition: function() {
        return cc.p(this.x, this.y);
    }

});