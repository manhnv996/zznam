
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
    addAnimal: function (animal) {
        this.animalList.push(animal);
        if(animal.id === 0){
            animal.id = this.animalList.length;
        }
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
        var currentTime = getTime();
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
        this.animalList.forEach(function(animal) {
            if (animal.feeded) {
                if (animal.feededTime > time) {
                    time = animal.feededTime;
                }
            }
        });
        return time;
    },

    getAnimalLastFeededTime: function() {
        var obj = this.animalList[0];
        this.animalList.forEach(function(animal) {
            if (animal.feeded) {
                if (animal.feededTime > obj.feededTime) {
                    obj = animal;
                }
            }
        });
        return obj;
    },

    harvestableCount: function() {
        var count = 0;
        var currentTime = getTime();
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
    },

    isHungry: function() {
        for (var i = 0; i < this.animalList.length; i++) {
            if (!this.animalList[i].feeded) {
                return true;
            }
        }
        return false;
    },

    canHarvest: function() {
        var crtTime = getTime();
        var harvestTime = AnimalConfig[this.type.split('_')[0]].time * 1000;

        for (var i = 0; i < this.animalList.length; i++) {
            var animal = this.animalList[i];
            if (animal.feeded) {
                var duration = crtTime - animal.feededTime;
                if (duration > harvestTime) {
                    return true;
                }
            }
        }
        return false;
    },

    getAnimalById: function(id) {
        return this.animalList.find(function(animal) {
            return animal.id === id;
        });
    }

});
