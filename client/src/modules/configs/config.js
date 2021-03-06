var config = {};

var ProductType = null;
var GameInfo = null;


function getProductObjByType(productId) {
    if (ProductType == null){
        cc.loader.loadJson(res.cropconfig, function (error, data) {
            ProductType = data;
        });
    }
    for (var i = 0; i < ProductType.length; i++) {
        if (ProductType[i].id == productId) {
            return ProductType[i];
        }
    }

    return null;
}

function getSeedLevel(level) {
    if (ProductType == null){
        cc.loader.loadJson(res.cropconfig, function (error, data) {
            ProductType = data;
        });
    }
    var seedLevelList = [];
    for (var i = 0; i < ProductType.length; i++) {

        if (ProductType[i].level <= (level + 2)) {
            seedLevelList.unshift(ProductType[i].id);
        }
    }

    return seedLevelList;
}

function getSeedShow(level) {

    var seedLevel = getSeedLevel(level);
    var seedList = user.getAsset().getFoodStorage().getItemList();

    var seedShow = [];
    for (var i = 0; i < seedLevel.length; i++){
        if (user.getAsset().getFoodStorage().getQuantity(seedLevel[i]) == 0){
            if (getProductObjByType(seedLevel[i]).level <= user.getLevel()){
                seedShow.push(new StorageItem(seedLevel[i], 0));
            } else {
                seedShow.push(new StorageItem(seedLevel[i], null));
            }
        }
    }
    for (var i = 0; i < seedList.length; i++){
        seedShow.push(new StorageItem(seedList[i].getTypeItem(), seedList[i].getQuantityItem()));
    }

    seedShow.sort(function(a, b) {
        // cc.log("getProductObjByType" + getProductObjByType(a.getTypeItem()).id);
        if (getProductObjByType(a.getTypeItem()).level <= user.getLevel() || a.getQuantityItem() != null){
            return getProductObjByType(a.getTypeItem()).level - getProductObjByType(b.getTypeItem()).level;
        }

    });
    seedShow.reverse();

    return seedShow;
}

function getMachineConfigByType (type) {
    for(var i = 0; i < res.infoMachineItem.length; i++) {
        if (res.infoMachineItem[i].id === type) {
            return res.infoMachineItem[i];
        }
    }
}

function getProductConfigById (id) {
    for (var i = 0; i < res.storageItemResource.length; i++) {
        if (res.storageItemResource[i].id === id) {
            return res.storageItemResource[i];
        }
    }
    return null;
}

function getLodgeConfigById (id) {
    for (var i = 0; i < res.infoCoopItem.length; i++) {
        if (res.infoCoopItem[i].id === id) {
            return res.infoCoopItem[i];
        }
    }
    return null;
}

function fromGoldToRuby(gold) {
    var ruby = gold / 15;
    if(gold % 15) ruby++;
    ruby = Math.floor(ruby);
    return ruby;
}

function getResAniIdBySeedType(seedType) {
    switch (seedType) {
        case ProductTypes.CROP_WHEAT:
            return resAniId.Luanuoc;

        case ProductTypes.CROP_CORN:
            return resAniId.Ngo;

        case ProductTypes.CROP_CARROT:
            return resAniId.Carot;

        case ProductTypes.CROP_SOYBEAN:
            return resAniId.DauHL;

        case ProductTypes.CROP_SUGARCANE:
            return resAniId.Mia;


        //
        case ProductTypes.CROP_INDIGO:
            return resAniId.OaiHuong;

        case ProductTypes.CROP_CHILI:
            return resAniId.Ot;

        case ProductTypes.CROP_TOMATO:
            return resAniId.Cachua;

        case ProductTypes.CROP_STRAWBERRY:
            return resAniId.Dautay;

        default:
            return null;

    }

}

function getSeedImgBySeedTypeAndQuantity(seedType, quantity) {
    switch (seedType) {
        case ProductTypes.CROP_WHEAT:
            if (quantity == null){
                return res.crops_null;
            }
            return res.crops;

        case ProductTypes.CROP_CORN:
            if (quantity == null){
                return res.corn_null;
            }
            return res.corn;

        case ProductTypes.CROP_CARROT:
            if (quantity == null){
                return res.caroot_null;
            }
            return res.caroot;

        case ProductTypes.CROP_SOYBEAN:
            if (quantity == null){
                return res.sausages_null;
            }
            return res.sausages;

        case ProductTypes.CROP_SUGARCANE:
            if (quantity == null){
                return res.mia_null;
            }
            return res.mia;

        //
        case ProductTypes.CROP_INDIGO:
            if (quantity == null){
                return res.indigo_null;
            }
            return res.indigo;

        case ProductTypes.CROP_CHILI:
            if (quantity == null){
                return res.chili_null;
            }
            return res.chili;

        case ProductTypes.CROP_TOMATO:
            if (quantity == null){
                return res.tomato_null;
            }
            return res.tomato;

        case ProductTypes.CROP_STRAWBERRY:
            if (quantity == null){
                return res.strawberry_null;
            }
            return res.strawberry;

        default:
            return null;

    }

}



function updateGameInfo(gameInfoJson){
    var gameInfo = null;
    /*
    Read from json string
     */
    gameInfo = JSON.parse(gameInfoJson);


    var foodStorage = new Storages(new Coordinate(gameInfo.asset.foodStorage.x, gameInfo.asset.foodStorage.y),
        gameInfo.asset.foodStorage.storageType, gameInfo.asset.foodStorage.capacity, gameInfo.asset.foodStorage.level);
    for (var i = 0; i < gameInfo.asset.foodStorage.itemList.length; i++){
        foodStorage.addItem(gameInfo.asset.foodStorage.itemList[i].typeItem, gameInfo.asset.foodStorage.itemList[i].quantity);
    }
    //var siloSprite = new SiloSprite(foodStorage.getCoordinate().getCurrX(), foodStorage.getCoordinate().getCurrY());
    //MapLayer.instance.addChild(siloSprite);
    //MapCtrl.instance.addSpriteAlias(siloSprite);

    var warehouse = new Storages(new Coordinate(gameInfo.asset.warehouse.x, gameInfo.asset.warehouse.y),
        gameInfo.asset.warehouse.storageType, gameInfo.asset.warehouse.capacity, gameInfo.asset.warehouse.level);
    for (var i = 0; i < gameInfo.asset.warehouse.itemList.length; i++){
        warehouse.addItem(gameInfo.asset.warehouse.itemList[i].typeItem, gameInfo.asset.warehouse.itemList[i].quantity);
    }
    //var warehouseSprite = new WareHouseSprite(warehouse.getCoordinate().getCurrX(), warehouse.getCoordinate().getCurrY());
    //MapLayer.instance.addChild(warehouseSprite);
    //MapCtrl.instance.addSpriteAlias(warehouseSprite);

                        //foodStorage, warehouse, fieldList, animalLodgeList, machineList, natureThingList, myShop
    var asset = new Asset(foodStorage, warehouse, null, null, null, gameInfo.asset.natureThingList, null);
    user = new User(asset);

    user.level = gameInfo.level;
    user.gold = gameInfo.gold;
    user.ruby = gameInfo.ruby;
    user.exp = gameInfo.exp;
    user.map = gameInfo.map.map;
    for (var i = 0; i < gameInfo.asset.fieldList.length; i++){
        var field = new Field(new Coordinate(gameInfo.asset.fieldList[i].x, gameInfo.asset.fieldList[i].y), gameInfo.asset.fieldList[i].fieldId);

        // Moved render field to MapCtrl
        //field sprite
        // var fieldSprite = new FieldSprite(MapLayer.instance, field.getFieldId(), field.getCoordinate().getCurrX(), field.getCoordinate().getCurrY());
        // MapLayer.instance.addChild(fieldSprite);
        // MapLayer.instance.fieldList.push(fieldSprite);

        if (gameInfo.asset.fieldList[i].plantType){
            if (gameInfo.asset.fieldList[i].plantedTime !== 0){
                //
                var plantType = gameInfo.asset.fieldList[i].plantType;
                field.setPlantType(plantType);
                //
                var intTime = gameInfo.asset.fieldList[i].plantedTime;
                var plantedTime = getDate();
                plantedTime.setTime(intTime);

                field.setPlantedTime(plantedTime);

                // MapLayer.instance.runAnimationPlantting(field.getFieldId(), plantType);
            }
        }

        user.getAsset().addField(field);
    }

    MainScene.instance.onGettedData();
}

_.deepObjectExtend = function(target, source) {
    for (var prop in source)
        if (prop in target)
            _.deepObjectExtend(target[prop], source[prop]);
        else
            target[prop] = source[prop];
    return target;
}

// New
var bufUserInfo = {};
var receivedPacketCount = 0;
var userInfo = {}; // Blank it after done

function onReceiveUser(partUserInfo) {
    _.deepObjectExtend(userInfo, partUserInfo);
    receivedPacketCount++;
    if (receivedPacketCount < 4) {
        return; // Not process
    } else {
        user = new User();
        receivedPacketCount = 0;
    }

    // Add FoodStorage
    var foodStorage = new Storages(
        new Coordinate(userInfo.asset.foodStorage.x,
            userInfo.asset.foodStorage.y),
        userInfo.asset.foodStorage.storageType,
        userInfo.asset.foodStorage.capacity,
        userInfo.asset.foodStorage.level
    );
    // Add FoodStorage itemlist
    for (var i = 0; i < userInfo.asset.foodStorage.itemList.length; i++){
        foodStorage.addItem(
            userInfo.asset.foodStorage.itemList[i].typeItem,
            userInfo.asset.foodStorage.itemList[i].quantity
        );
    }
    
    // Add Warehouse
    var warehouse = new Storages(
        new Coordinate(userInfo.asset.warehouse.x,
            userInfo.asset.warehouse.y),
        userInfo.asset.warehouse.storageType,
        userInfo.asset.warehouse.capacity,
        userInfo.asset.warehouse.level
    );

    // Add Warehouse item list    
    for (var i = 0; i < userInfo.asset.warehouse.itemList.length; i++){
        warehouse.addItem(
            userInfo.asset.warehouse.itemList[i].typeItem,
            userInfo.asset.warehouse.itemList[i].quantity
        );
    }

    // Add NatureThingList
    var natureThingList = [];
    for (var i = 0; i < userInfo.asset.natureThingList.length; i++) {
        var natureThing = new NatureThing(
            new Coordinate(userInfo.asset.natureThingList[i].x,
                userInfo.asset.natureThingList[i].y),
            userInfo.asset.natureThingList[i].type,
            userInfo.asset.natureThingList[i].id
        );
        natureThingList.push(natureThing);
    }

    // Add Field list
    var fieldList = [];
    for (var i = 0; i < userInfo.asset.fieldList.length; i++) {
        var field = new Field(
            new Coordinate(userInfo.asset.fieldList[i].x,
                userInfo.asset.fieldList[i].y),
            userInfo.asset.fieldList[i].fieldId,
            userInfo.asset.fieldList[i].plantType || null,
            new Date(userInfo.asset.fieldList[i].plantedTime)
        );
        fieldList.push(field);
    }

    var animalLodgeList = [];
    for (var i = 0; i < userInfo.asset.animalLodgeList.length; i++) {
        var animalLodgeInfo = userInfo.asset.animalLodgeList[i];
        var animalList = [];
        
        for (var j = 0; j < animalLodgeInfo.animalList.length; j++) {
            var animalInfo = animalLodgeInfo.animalList[j];
            var remainTime = AnimalConfig[animalInfo.type].time * 1000 - animalInfo.passedTime;
            var animal = new Animal(
                animalInfo.type,
                animalInfo.id,
                animalInfo.feeded,
                animalInfo.feededTime,
                remainTime
            );
            // cc.log("[R]", animal.remainTime);
            animalList.push(animal);
        }

        var animalLodge = new AnimalLodge(
            new Coordinate(animalLodgeInfo.x, animalLodgeInfo.y),
            animalLodgeInfo.type,
            animalLodgeInfo.id,
            animalList
        );
        animalLodgeList.push(animalLodge);
    }

    var machineList = [];
    for (var i = 0; i < userInfo.asset.machineList.length; i++) {
        // cc.log("userInfo.asset.machineList[i] " + userInfo.asset.machineList.length);
        var machineInfo = userInfo.asset.machineList[i];
        cc.log(machineInfo.toString());
        var machine = new Machine(
            machineInfo.machineId,
            machineInfo.machineType,
            machineInfo.slot,
            machineInfo.startTime,
            machineInfo.productQueue,
            machineInfo.boostBuild,
            machineInfo.completed,
            machineInfo.startBuildTime,
            machineInfo.remainBuildTime,
            new Coordinate(machineInfo.x, machineInfo.y)
        );
        //var machine = new Machine(machineId, machineType, slot, startTime,  productQueue, boostBuild, completed, startBuildTime, remainBuildTime, coordinate);
        machineList.push(machine);
    }

    //Order List
    var orderList = [];
    for (var i = 0; i < userInfo.asset.orderList.length; i++) {
        var order = new Order(
            userInfo.asset.orderList[i].orderId,
            userInfo.asset.orderList[i].itemList,
            userInfo.asset.orderList[i].orderPrice,
            userInfo.asset.orderList[i].orderExp
        );
        order.waittingTime = new Date(parseInt(userInfo.asset.orderList[i].waittingTime));
        orderList.push(order);
    }

    //Order NPC List
    var orderNPCList = [];
    for (var i = 0; i < userInfo.asset.orderNPCList.length; i++) {
        var orderNPC = new OrderNPC(
            userInfo.asset.orderNPCList[i].orderId,
            userInfo.asset.orderNPCList[i].orderItem,
            userInfo.asset.orderNPCList[i].orderPrice,
            userInfo.asset.orderNPCList[i].orderExp,
            userInfo.asset.orderNPCList[i].npc_res
        );
        orderNPC.waittingTime = new Date(parseInt(userInfo.asset.orderNPCList[i].waittingTime));
        orderNPCList.push(orderNPC);
    }
    //
    var car = new Car(userInfo.asset.car.deliveryPrice, userInfo.asset.car.deliveryExp);
    //

    var myShop = new MyShop(userInfo.asset.myShop.maxSlot, userInfo.asset.myShop.productList, userInfo.asset.myShop.lastTimeNpcCome);


    var asset = new Asset(
        foodStorage, warehouse, fieldList, animalLodgeList,
        machineList, natureThingList, myShop,
        orderList, orderNPCList, car
    );

    // cc.log("Asset", asset);

    // Create user
    user = new User(asset, userInfo.map);
    // cc.log("user.map", userInfo.map.length);
    user.level = userInfo.level;
    user.gold = userInfo.gold;
    user.ruby = userInfo.ruby;
    user.exp = userInfo.exp;
    user.id = userInfo.id;
    user.name = userInfo.name;

    if (home) {
        gv.friendIds = gv.friendIds.filter(function(id) {
            return id != user.id;
        });
    }

    // cc.log("AnimalLodge", user.asset.animalLodgeList);
    MainScene.instance = new MainScene();
    cc.director.runScene(MainScene.instance);
    MainScene.instance.onGettedData();


    // /*
    //  */
    // cc.log("MYSHOP: " + userInfo.asset.myShop);
    // cc.log(userInfo.asset.myShop.maxSlot);
    // cc.log(userInfo.asset.myShop.productList);
    // cc.log(userInfo.asset.myShop.lastTimeNpcCome);

    userInfo = {}; // blank it after done
}
