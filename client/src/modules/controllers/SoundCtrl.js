/**
 * Created by CPU60075_LOCAL on 12/15/2017.
 */

var SoundCtrl = cc.Class.extend({

    getKeySoundAnimalSelect: function (animalSprite) {
        var lodgeModel = user.asset.getLodgeById(animalSprite.parent.id);
        if (lodgeModel.type === AnimalLodgeType.chicken_habitat) {
            return res.ani_chicken_select_mp3;
        } else if (lodgeModel.type === AnimalLodgeType.cow_habitat) {
            return res.ani_cow_select_mp3;
        } else {
            return null;
        }
    }
});