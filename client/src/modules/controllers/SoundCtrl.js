/**
 * Created by CPU60075_LOCAL on 12/15/2017.
 */

var SoundCtrl = cc.Class.extend({
    _isOnEffect: null,
    _isOnMusic: null,

    preloadEffect : function (soundPath) {
        cc.audioEngine.preloadEffect(soundPath);
    },

    playSoundEffect: function (soundPath, isLoop) {
        //cc.log("playSoundEffect: " + soundPath);
        if (soundPath == undefined) {
            cc.log("soundPath == undefined");
        }
        if (this._isOnEffect) {
            isLoop = typeof isLoop !== 'undefined' ? isLoop : false;
            return cc.audioEngine.playEffect(soundPath, isLoop);
        }
    },

    playMusic: function(musicPath, isLoop) {
        isLoop = typeof  isLoop !== 'undefined' ? isLoop : true;
        cc.audioEngine.playMusic(musicPath, isLoop);
        // cc.log("MUSIC", this._isOnMusic);
        if (!this._isOnMusic) {
            // cc.log("Pause music");
            cc.audioEngine.pauseMusic();
        }
    },

    // Fix bug when hide then show
    reloadMusicConfig: function() {
        if (!this._isOnMusic) {
            cc.log("Pause music");
            cc.audioEngine.pauseMusic();
        }
    },

    setMusic: function () {
        if (this._isOnMusic) {
            cc.audioEngine.pauseMusic();
        } else {
            cc.audioEngine.resumeMusic();
        }
        this._isOnMusic = !this._isOnMusic;
        this.saveSetting();
        //cc.log("music", cc.sys.localStorage.getItem("music"));
    },

    setEffect: function () {
        this._isOnEffect = !this._isOnEffect;
        this.saveSetting();
        //cc.log("effect", cc.sys.localStorage.getItem("effect"));
    },

    isOnMusic: function () {
        return cc.sys.localStorage.getItem("music") === "true";
    },

    isOnEffect: function () {
        return cc.sys.localStorage.getItem("effect") === "true";
    },

    loadSetting : function() {
        this._isOnEffect = this.isOnEffect();
        this._isOnMusic = this.isOnMusic();
        cc.log(this._isOnEffect, this._isOnMusic);
    },

    saveSetting : function() {
        cc.sys.localStorage.setItem("music", this._isOnMusic.toString());
        cc.sys.localStorage.setItem("effect", this._isOnEffect.toString());
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