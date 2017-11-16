
var CoordinatedObject = cc.Class.extend({

    coordinate: null,
    
    ctor: function (coordinate) {
        //
        //this._super();

        this.render(coordinate);
    },
    render: function (coordinate) {
        //
        this.coordinate = coordinate;
    },

    getCoordinate: function() {
        cc.log("called:");
        return this.coordinate;
    },

    changeCoordinate: function (coordinate) {
        //return boolean

    }
});