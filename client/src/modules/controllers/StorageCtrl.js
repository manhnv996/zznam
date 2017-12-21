/**
 * Created by CPU60075_LOCAL on 24/11/2017.
 */

var StorageCtrl = cc.Class.extend({

    upgrageSilo: function (level) {
        cc.log(level);
        if (user.getAsset().getFoodStorage().upgrade(ProductTypes.TOOL_NAIL, res.upgradeSilo[level + 1].tool_nail,
                ProductTypes.TOOL_SCREW, res.upgradeSilo[level + 1].tool_screw,
                ProductTypes.TOOL_WOODPANEL, res.upgradeSilo[level + 1].tool_woodPanel)) {

            user.getAsset().getFoodStorage().setCapacity(res.upgradeSilo[level + 1].capacity);
            this.effectUpgrade(res.upgradeSilo[level].capacity, res.upgradeSilo[level + 1].capacity);
            BaseGUILayer.instance.removeBlockListener();
            //send server
            testnetwork.connector.sendUpgradeStorage(StorageTypes.FOOD_STORAGE, (level + 1));
        } else {
            cc.log("Upgrade Silo fail");
        }
    },

    upgradeWare: function (level) {
        if (user.getAsset().getWarehouse().upgrade(ProductTypes.TOOL_BOLT, res.upgradeWarehouse[level + 1].tool_bolt,
                ProductTypes.TOOL_DUCTTAPE, res.upgradeWarehouse[level + 1].tool_ductTape,
                ProductTypes.TOOL_PLANK, res.upgradeWarehouse[level + 1].tool_plank)) {

            user.getAsset().getWarehouse().setCapacity(res.upgradeWarehouse[level + 1].capacity);
            this.effectUpgrade(res.upgradeWarehouse[level].capacity, res.upgradeWarehouse[level + 1].capacity);
            BaseGUILayer.instance.removeBlockListener();
            //send server
            testnetwork.connector.sendUpgradeStorage(StorageTypes.WAREHOUSE, (level + 1));
        }
    },

    effectUpgrade: function (curLevel, nextLevel) {
        SoundCtrl.instance.playSoundEffect(res.func_upgrade_storage_mp3, false);
        AnimateEventLayer.instance.upgradeStorageSuccess(curLevel, nextLevel);
    }
});