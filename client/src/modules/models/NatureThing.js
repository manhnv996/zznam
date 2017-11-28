/**
 * Created by CPU60133_LOCAL on 11/7/2017.
 */

var NatureThing = CoordinatedObject.extend({
	type: '',
	id: 0,

    ctor: function (coordinate, type, id) {
        //
        this._super(coordinate);
        this.type = type;
        this.id = id;
    },
    // render: function () {
    //     //

    // }

});