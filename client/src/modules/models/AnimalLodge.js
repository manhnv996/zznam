
var AnimalLodge = ConstructedObject.extend({
    animalList: null,
    id: 0,
    type: '',

    ctor: function (coordinate, startBuildTime, completed, type, id, animalList) {
        //
        this._super(startBuildTime, completed, coordinate);
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
    }

});