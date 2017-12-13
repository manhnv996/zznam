/**
 * Created by CPU60133_LOCAL on 12/13/2017.
 */

var LevelupConfig = null;

function getLevelupObjById(level) {
    if (LevelupConfig == null){
        cc.loader.loadJson(res.levelupconfig, function (error, data) {
            LevelupConfig = data;
        });
    }
    for (var i = 0; i < LevelupConfig.length; i++) {
        if (LevelupConfig[i].Level == level) {
            return LevelupConfig[i];
        }
    }

    return null;
}
