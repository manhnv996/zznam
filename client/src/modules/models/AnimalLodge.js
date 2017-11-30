
var AnimalLodge = CoordinatedObject.extend({
    animalList: null,
    id: 0,
    type: '',

    ctor: function (coordinate, type, id, animalList) {
        //
        this._super(coordinate);
        this.type = type;
        this.id = id;
        this.animalList = animalList ? animalList : [];
    },
    // render: function () {
    //     //

    // },
    addAnimal: function () {
        //

    },
    getCurrentSlot: function () {
        //
        return this.animalList.length;
    },
    getType: function() {
        return this.type;
    }

});