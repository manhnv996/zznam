/**
 * Created by CPU60075_LOCAL on 24/11/2017.
 */

var StorageCtrl = cc.Class.extend({

    upgrageSilo: function (level) {
        cc.log(level);
        if (user.getAsset().getFoodStorage().upgrade(ProductTypes.TOOL_NAIL, res.upgradeSilo[level + 1].tool_nail,
                ProductTypes.TOOL_SCREW, res.upgradeSilo[level + 1].tool_screw,
                ProductTypes.TOOL_WOODPANEL, res.upgradeSilo[level + 1].tool_woodPanel)) {

            audioEngine.playEffect(res.func_upgrade_storage_mp3, false);
            user.getAsset().getFoodStorage().setCapacity(res.upgradeSilo[level + 1].capacity);

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

            audioEngine.playEffect(res.func_upgrade_storage_mp3, false);
            user.getAsset().getWarehouse().setCapacity(res.upgradeWarehouse[level + 1].capacity);
            //StorageLayer.instance._layoutStorage.removeFromParent(true);
            BaseGUILayer.instance.removeBlockListener();

            //send server
            testnetwork.connector.sendUpgradeStorage(StorageTypes.WAREHOUSE, (level + 1));
        }
    }
});