
var CoordinatedObject = cc.Class.extend({

    coordinate: null,
    // lx: 0,
    // ly: 0,

    ctor: function (coordinate) {
    // ctor: function (x, y) {
        //
        // this._super();

        // cc.log("ctor coordinateobject:");
        this.render(coordinate);
    },
    render: function (coordinate) {
        //
        this.coordinate = coordinate;
        // this.lx = x;
        // this.ly = y;
    },

    // //
    // getCurrX: function () {
    //     cc.log("called: getCoordinate coordinateobject" + this.lx);
    //     return this.lx;
    // },
    // getCurrY: function () {
    //     return this.ly;
    // },
    // //

    getCoordinate: function() {
        // cc.log(this.coordinate.getCurrX() + ", " + this.coordinate.getCurrY());
        return this.coordinate;
    },

    changeCoordinate: function (coordinate) {
        //return boolean

    }
});