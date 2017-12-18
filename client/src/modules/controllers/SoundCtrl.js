/**
 * Created by CPU60075_LOCAL on 12/15/2017.
 */

var SoundCtrl = cc.Class.extend({

    isOnMusic: function () {
        if (!cc.sys.localStorage.getItem("music") || cc.sys.localStorage.getItem("music") === "true") {
            return true;
        }
        return false;
    },

    isOnEffect: function (){
        if (!cc.sys.localStorage.getItem("effect") || cc.sys.localStorage.getItem("effect") === "true") {
            return true;
        }
        return false;
    },

    setMusic: function (btn, resOn, resOff) {
        if(this.isOnMusic()) {
            audioEngine.playEffect(res.func_click_button_mp3, false);
            //audioEngine.setMusicVolume(0);
            audioEngine.pauseMusic();
            cc.sys.localStorage.setItem("music", "false");
            btn.loadTextureNormal(resOff);
        } else {
            //audioEngine.setMusicVolume(1);
            audioEngine.resumeMusic();
            cc.sys.localStorage.setItem("music", "true");
            btn.loadTextureNormal(resOn);
        }
        cc.log("music", cc.sys.localStorage.getItem("music"));
        cc.log("audioEngine.getMusicVolume", audioEngine.getMusicVolume());
    },

    setEffect: function (btn, resOn, resOff) {
        if(this.isOnEffect()) {
            audioEngine.playEffect(res.func_click_button_mp3, false);
            audioEngine.setEffectsVolume(0);
            cc.sys.localStorage.setItem("effect", "false");
            btn.loadTextureNormal(resOff);
        } else {
            audioEngine.setEffectsVolume(1);
            cc.sys.localStorage.setItem("effect", "true");
            btn.loadTextureNormal(resOn);
        }
        cc.log("effect", cc.sys.localStorage.getItem("effect"));
        cc.log("audioEngine.getEffectsVolume", audioEngine.getEffectsVolume());
    },

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