
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
    },

    getMaxRemainTime: function() {
        var max = 0;
        var animalType = this.type.split('_')[0];
        var timeToHarvest = AnimalConfig[animalType].time * 1000;
        var currentTime = new Date().getTime();
        this.animalList.forEach(function(animal) {
            var remainTime = timeToHarvest - (currentTime - animal.feededTime);
            if (remainTime > max) {
                max = remainTime;
            }
        });
        return max;
    },

    getAnimalCount: function() {
        return this.animalList.length;
    },

    getLastFeededTime: function() {
        var time = 0;
        var currentTime = new Date().getTime();
        this.animalList.forEach(function(animal) {
            if (animal.feeded) {
                if (animal.feededTime > time) {
                    time = animal.feededTime;
                }
            }
        });
        return time;
    },

    harvestableCount: function() {
        var count = 0;
        var currentTime = new Date().getTime();
        var totalTime = AnimalConfig[this.type.split('_')[0]].time * 1000;
        this.animalList.forEach(function(animal) {
            if (animal.feeded) {
                var remain = totalTime - (currentTime - animal.feededTime);
                if (remain <= 0) {
                    count++;
                }
            }
        });
        return count;
    }
});
