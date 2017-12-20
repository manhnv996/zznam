/**
 * Created by KienVN on 10/2/2017.
 */

gv.CMD = gv.CMD ||{};
gv.CMD.HAND_SHAKE = 0;
gv.CMD.USER_LOGIN = 1;

gv.CMD.USER_INFO = 1001;
gv.CMD.GET_USER = 1002; // New

gv.CMD.ADD_USER_MONEY = 1101;

gv.CMD.MOVE = 2001;


//
gv.CMD.GAME_INFO = 5099;
gv.CMD.RESPONSE_ERROR_CODE = 5098;

gv.CMD.PLANT = 5001;
gv.CMD.CROP = 5002;
gv.CMD.PLANT_BOOST = 5003;
gv.CMD.BUY_ITEM_BY_RUBI = 5004;

//gv.CMD.RECEIVE_FIELD_STATUS = 5011;
gv.CMD.RESPONSE_SYNC_USER_INFO = 5081;
gv.CMD.RESPONSE_SYNC_FIELD_STATUS = 5082;
gv.CMD.RESPONSE_SYNC_STORAGE = 5083;
gv.CMD.RESPONSE_SYNC_FOOD_STORAGE_ITEM = 5084;

//
gv.CMD.MAKE_ORDER = 10001;
gv.CMD.CANCEL_ORDER = 10002;
gv.CMD.CREATE_NEW_ORDER = 10003;
gv.CMD.BOOST_WAIT_ORDER = 10004;
gv.CMD.RECEIVE_DELIVERY_CAR = 10009;

gv.CMD.MAKE_ORDER_NPC = 10011;
gv.CMD.CANCEL_ORDER_NPC = 10012;
gv.CMD.CREATE_NEW_ORDER_NPC = 10013;

gv.CMD.RESPONSE_SYNC_ORDER = 10081;
gv.CMD.RESPONSE_SYNC_CAR = 10089;
gv.CMD.RESPONSE_SYNC_ORDER_NPC = 10091;

//
gv.CMD.SELL_PRODUCT = 13001;
gv.CMD.BUY_PRODUCT = 13002;
gv.CMD.RECEIVE_MONEY_FROM_SOLD_PRODUCT = 13003;
gv.CMD.CANCEL_SELL_PRODUCT = 13004;
gv.CMD.UNLOCK_SLOT_MY_SHOP = 13005;

gv.CMD.RESPONSE_SYNC_PRODUCT_SALE = 13081;


// Map
gv.CMD.MOVE_FIELD = 6001;
gv.CMD.MOVE_STORAGE = 6002;
gv.CMD.MOVE_MAP_BLOCK = 6003;
gv.CMD.RESPONSE_MOVE = 6100;

//Shop
gv.CMD.BUY_MAP_OBJECT_REQUEST = 7001;
gv.CMD.BUY_MAP_OBJECT_BY_RUBY = 7002;
gv.CMD.BUY_ANIMAL = 7003;
gv.CMD.BUY_ANIMAL_BY_RUBY = 7004;
gv.CMD.RESPONSE_BUY_OBJECT = 7100;

//Storage
gv.CMD.BUY_TOOL_REQUEST = 8001;
gv.CMD.UPGRADE_STORAGE_REQUEST = 8002;
gv.CMD.RESPONSE_UPGRADE_STORAGE = 8100;
gv.CMD.RESPONSE_BUY_TOOL_UPGRADE = 8101;

//Constructed
gv.CMD.BUID_COMPLETED = 9001;
gv.CMD.BOOST_BUILD = 9002;

// Animal
gv.CMD.ANIMAL_HARVEST = 12001;
gv.CMD.ANIMAL_FEED = 12002;
gv.CMD.ANIMAL_BOOST = 12003;

// Nature
gv.CMD.NATURE_COLLECT = 15001;

testnetwork = testnetwork||{};
testnetwork.packetMap = {};


// Friend
gv.CMD.FRIEND_GET_LIST = 14001;
gv.CMD.FRIEND_GET_INFO = 14002;

/** Outpacket */

//Handshake
CmdSendHandshake = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(gv.CONTROLLER_ID.SPECIAL_CONTROLLER);
            this.setCmdId(gv.CMD.HAND_SHAKE);
        },
        putData:function(){
            //pack
            this.packHeader();
            //update
            this.updateSize();
        }
    }
);
CmdSendUserInfo = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.USER_INFO);
        },
        pack:function(){
            this.packHeader();
            this.updateSize();
        }
    }
);

CmdSendLogin = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.USER_LOGIN);
        },
        pack:function(user){
            // user = sessionley
            this.packHeader();
            this.putString(user);
            this.updateSize();
        }
    }
);

CmdSendMove = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.MOVE);
        },
        pack:function(direction){
            this.packHeader();
            this.putShort(direction);
            this.updateSize();
        }
    }
);


//
CmdSendPlant = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.PLANT);
        },
        pack:function(fieldId, productType){
            this.packHeader();

            this.putShort(fieldId);
            this.putString(productType);

            this.updateSize();
        }
    }
);

CmdSendCrop = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.CROP);
        },
        pack:function(fieldId){
            this.packHeader();

            this.putShort(fieldId);
            // this.putString(productType);

            this.updateSize();
        }
    }
);

CmdSendPlantBoost = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.PLANT_BOOST);
        },
        pack:function(fieldId){
            this.packHeader();

            this.putShort(fieldId);
            // this.putString(productType);

            this.updateSize();
        }
    }
);

CmdSendBuyItemByRubi = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.BUY_ITEM_BY_RUBI);
        },
        pack:function(productType, quantity){
            this.packHeader();

            this.putString(productType);
            this.putInt(quantity);

            this.updateSize();
        }
    }
);

////
CmdSendMakeOrder = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.MAKE_ORDER);
        },
        pack:function(orderId, rubyBuy){
            this.packHeader();

            this.putInt(orderId);
            this.putInt(rubyBuy);

            this.updateSize();
        }
    }
);

CmdSendCancelOrder = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.CANCEL_ORDER);
        },
        pack:function(orderId){
            this.packHeader();

            this.putInt(orderId);

            this.updateSize();
        }
    }
);

CmdSendCreateNewOrder = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.CREATE_NEW_ORDER);
        },
        pack:function(orderId){
            this.packHeader();

            this.putInt(orderId);

            this.updateSize();
        }
    }
);

CmdSendBoostWaitOrder = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.BOOST_WAIT_ORDER);
        },
        pack:function(orderId){
            this.packHeader();

            this.putInt(orderId);

            this.updateSize();
        }
    }
);

CmdSendReceiceDeliveryCar = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.RECEIVE_DELIVERY_CAR);
        },
        pack:function(price, exp){
            this.packHeader();

            this.putInt(price);
            this.putInt(exp);

            this.updateSize();
        }
    }
);

//
CmdSendMakeOrderNpc = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.MAKE_ORDER_NPC);
        },
        pack:function(orderId, rubyBuy){
            this.packHeader();

            this.putInt(orderId);
            this.putInt(rubyBuy);

            this.updateSize();
        }
    }
);

CmdSendCancelOrderNpc = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.CANCEL_ORDER_NPC);
        },
        pack:function(orderId){
            this.packHeader();

            this.putInt(orderId);

            this.updateSize();
        }
    }
);

CmdSendCreateNewOrderNpc = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.CREATE_NEW_ORDER_NPC);
        },
        pack:function(orderId){
            this.packHeader();

            this.putInt(orderId);

            this.updateSize();
        }
    }
);
////

CmdSendSellProduct = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.SELL_PRODUCT);
        },
        pack:function(intSlot, productType, quantity, price){
            this.packHeader();

            this.putInt(intSlot);
            this.putString(productType);
            this.putInt(quantity);
            this.putInt(price);

            this.updateSize();
        }
    }
);

CmdSendBuyProduct = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.BUY_PRODUCT);
        },
        pack:function(userId, intSlot){
            this.packHeader();

            this.putLong(userId);
            this.putInt(intSlot);

            this.updateSize();
        }
    }
);

CmdSendReceiveMoneyFromProduct = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.RECEIVE_MONEY_FROM_SOLD_PRODUCT);
        },
        pack:function(intSlot){
            this.packHeader();

            this.putInt(intSlot);

            this.updateSize();
        }
    }
);

CmdSendCancelSellProduct = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.CANCEL_SELL_PRODUCT);
        },
        pack:function(intSlot){
            this.packHeader();

            this.putInt(intSlot);

            this.updateSize();
        }
    }
);

CmdSendUnlockSlotMyShop = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.UNLOCK_SLOT_MY_SHOP);
        },
        pack:function(){
            this.packHeader();

            this.updateSize();
        }
    }
);
////

// Map
CmdSendMoveStorage = fr.OutPacket.extend({
    ctor: function() {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.MOVE_STORAGE);
    },
    pack: function(type, x, y) {
        this.packHeader();
        this.putShort(type);
        this.putInt(x);
        this.putInt(y);
        this.updateSize();
    }
});

CmdSendMoveField = fr.OutPacket.extend({
    ctor: function() {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.MOVE_FIELD);
    },
    pack: function(id, x, y) {
        this.packHeader();
        this.putInt(id);
        this.putInt(x);
        this.putInt(y);
        this.updateSize();
    }
});

CmdSendMoveMapBlock = fr.OutPacket.extend({
    ctor: function() {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.MOVE_MAP_BLOCK);
    },
    pack: function(type, id, x, y) {
        this.packHeader();
        this.putInt(type);
        this.putInt(id);
        this.putInt(x);
        this.putInt(y);
        this.updateSize();
    }
});

CmdSendBuyMapObjectRequest = fr.OutPacket.extend({
    ctor: function () {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.BUY_MAP_OBJECT_REQUEST);
    },
    pack: function (id, type, x, y) {
        this.packHeader();
        this.putInt(id);
        this.putString(type);
        this.putInt(x);
        this.putInt(y);
        this.updateSize();
    }
});

CmdSendBuyMapObjectByRuby = fr.OutPacket.extend({
    ctor: function () {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.BUY_MAP_OBJECT_BY_RUBY);
    },
    pack: function (id, type, x, y) {
        this.packHeader();
        this.putInt(id);
        this.putString(type);
        this.putInt(x);
        this.putInt(y);
        this.updateSize();
    }
});

CmdSendBuyToolRequest = fr.OutPacket.extend({
    ctor: function () {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.BUY_TOOL_REQUEST );
    },
    pack: function (productType, number) {
        this.packHeader();
        this.putString(productType);
        this.putInt(number);
        this.updateSize();
    }
});

CmdSendUpgradeStorageRequest = fr.OutPacket.extend({
    ctor: function () {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.UPGRADE_STORAGE_REQUEST);
    },
    pack: function (storageType) {
        this.packHeader();
        this.putString(storageType);
        //this.putInt(level);
        this.updateSize();
    }
});

CmdSendGetUser = fr.OutPacket.extend({
    ctor: function() {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.GET_USER);
    },
    pack: function() {
        this.packHeader();
        this.updateSize();
    }
});

CmdSendBuildCompleted = fr.OutPacket.extend({
    ctor: function () {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.BUID_COMPLETED);
    },
    pack: function (id, typeBuilding) {
        this.packHeader();
        this.putInt(id);
        this.putInt(typeBuilding);
        this.updateSize();
    }
});

// Animal
CmdSendAnimalHarvest = fr.OutPacket.extend({
    ctor: function() {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.ANIMAL_HARVEST);
    },
    pack: function(lodgeId, animalId) {
        this.packHeader();
        this.putInt(lodgeId);
        this.putInt(animalId);
        this.updateSize();
    }
});

CmdSendAnimalFeed = fr.OutPacket.extend({
    ctor: function() {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.ANIMAL_FEED);
    },
    pack: function(lodgeId, animalId) {
        this.packHeader();
        this.putInt(lodgeId);
        this.putInt(animalId);
        this.updateSize();
    }
});

CmdSendAnimalBoost = fr.OutPacket.extend({
    ctor: function() {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.ANIMAL_BOOST);
    },
    pack: function(lodgeId, animalId) {
        this.packHeader();
        this.putInt(lodgeId);
        this.putInt(animalId);
        this.updateSize();
    }
});

CmdSendBoostBuild = fr.OutPacket.extend({
    ctor: function () {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.BOOST_BUILD);
    },
    pack: function (id, typeBuilding) {
        this.packHeader();
        this.putInt(id);
        this.putInt(typeBuilding);
        this.updateSize();
    }
});

CmdSendBuyAnimal = fr.OutPacket.extend({
    ctor: function () {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.BUY_ANIMAL);
    },
    pack: function (lodgeId, animalId, animalType, lx, ly) {
        this.packHeader();
        this.putInt(lodgeId);
        this.putInt(animalId);
        this.putString(animalType);
        this.putInt(lx);
        this.putInt(ly);
        this.updateSize();
    }
});

CmdSendBuyAnimalByRuby = fr.OutPacket.extend({
    ctor: function () {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.BUY_ANIMAL_BY_RUBY);
    },
    pack: function (lodgeId, animalId, animalType, lx, ly) {
        this.packHeader();
        this.putInt(lodgeId);
        this.putInt(animalId);
        this.putString(animalType);
        this.putInt(lx);
        this.putInt(ly);
        this.updateSize();
    }
});

CmdSendCollectNatureThing = fr.OutPacket.extend({
    ctor: function() {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.NATURE_COLLECT);
    },
    pack: function(id) {
        this.packHeader();
        this.putInt(id);
        this.updateSize();
    }
});

CmdSendFriendGetList = fr.OutPacket.extend({
    ctor: function () {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.FRIEND_GET_LIST);
    },
    pack: function () {
        this.packHeader();
        this.updateSize();
    }
});

CmdSendFriendGetInfo = fr.OutPacket.extend({
    ctor: function() {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.FRIEND_GET_INFO);
    },
    pack: function(id) {
        this.packHeader();
        this.putInt(id);
        this.updateSize();
    }
});

CmdSendAddMoney = fr.OutPacket.extend({
    ctor: function() {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.ADD_USER_MONEY);
    },
    pack: function(number, type) {
        this.packHeader();
        this.putInt(number);
        this.putInt(type);
        this.updateSize();
    }
});


/**
 * InPacket
 */

//Handshake
testnetwork.packetMap[gv.CMD.HAND_SHAKE] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.token = this.getString();
        }
    }
);

testnetwork.packetMap[gv.CMD.USER_LOGIN] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
        }
    }
);


testnetwork.packetMap[gv.CMD.USER_INFO] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            //this.token = this.getInt();
            //this.name = this.getString();
            //this.x = this.getInt();
            //this.y = this.getInt();

        }
    }
);

testnetwork.packetMap[gv.CMD.MOVE] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.x = this.getInt();
            this.y = this.getInt();
        }
    }
);


//
testnetwork.packetMap[gv.CMD.PLANT] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){

            /*
             CLOSED, not used
             */
            // this.errorLog = this.getShort();
        }
    }
);

testnetwork.packetMap[gv.CMD.CROP] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){

            /*
             CLOSED, not used
             */
            // this.errorLog = this.getShort();
        }
    }
);

testnetwork.packetMap[gv.CMD.PLANT_BOOST] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){

            /*
             CLOSED, not used
             */
            // this.errorLog = this.getShort();
        }
    }
);

testnetwork.packetMap[gv.CMD.BUY_ITEM_BY_RUBI] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){

            /*
             CLOSED, not used
             */
            // this.errorLog = this.getShort();

        }
    }
);

testnetwork.packetMap[gv.CMD.GAME_INFO] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){

            this.gameInfoJson = this.getString();
        }
    }
);

testnetwork.packetMap[gv.CMD.RESPONSE_ERROR_CODE] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){

            /*
             DONE
             */
            this.errorLog = this.getShort();
        }
    }
);

testnetwork.packetMap[gv.CMD.RESPONSE_SYNC_USER_INFO] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){

            /*
             DONE
             */
            this.level = this.getInt();
            this.gold = this.getInt();
            this.ruby = this.getInt();
            this.exp = this.getLong();

        }
    }
);

testnetwork.packetMap[gv.CMD.RESPONSE_SYNC_FIELD_STATUS] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){

            /*
             DONE
             */
            this.fieldId = this.getInt();
            this.plantType = this.getString();
            this.longPlantedTime = this.getLong();

        }
    }
);

testnetwork.packetMap[gv.CMD.RESPONSE_SYNC_STORAGE] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){

            /*
             DONE
             */
            // this.storageJsonString = this.getString();

            this.storage = this.unpackStorage();
        },

        unpackStorage: function() {
            var storage = {};
            storage.x = this.getInt();
            storage.y = this.getInt();
            storage.storageType = this.getString();
            storage.capacity = this.getInt();
            storage.level = this.getInt();
            // Unpack storage item list
            storage.itemList = [];
            var size = this.getInt();
            for (var i = 0; i < size; i++) {
                storage.itemList.push(this.unpackStorageItem());
            }
            return storage;
        },
        unpackStorageItem: function() {
            var item = {};
            item.typeItem = this.getString();
            item.quantity = this.getInt();
            return item;
        },

    }
);

testnetwork.packetMap[gv.CMD.RESPONSE_SYNC_FOOD_STORAGE_ITEM] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){

            /*
             DONE
             */
            this.productType = this.getString();
            this.quantity = this.getInt();

        }
    }
);

////
testnetwork.packetMap[gv.CMD.RESPONSE_SYNC_ORDER] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){

            /*
             DONE
             */
            this.order = this.unpackOrder();

        },

        unpackOrder: function () {
            var order = {};
            order.orderId = this.getInt();

            // Get each item
            var itemListSize = this.getInt();
            order.itemList = [];
            for (var i = 0; i < itemListSize; i++) {
                order.itemList.push(this.unpackStorageItem());
            }

            order.orderPrice = this.getInt();
            order.orderExp = this.getInt();
            order.waittingTime = this.getLong();

            return order;
        },

        unpackStorageItem: function() {
            var item = {};
            item.typeItem = this.getString();
            item.quantity = this.getInt();
            return item;
        },

    }
);

testnetwork.packetMap[gv.CMD.RESPONSE_SYNC_CAR] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){

            /*
             INPROGRESS
             */
            this.deliveryPrice = this.getInt();
            this.deliveryExp = this.getInt();

        }

    }
);

testnetwork.packetMap[gv.CMD.RESPONSE_SYNC_ORDER_NPC] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){

            this.orderNPC = this.unpackOrderNPC();
        },

        unpackOrderNPC: function () {
            var order = {};
            order.orderId = this.getInt();

            var itemIsNull = this.getInt();
            if (itemIsNull == 0){
                order.orderItem = null;
            } else {
                order.orderItem = this.unpackStorageItem();
            }

            order.orderPrice = this.getInt();
            order.orderExp = this.getInt();
            order.waittingTime = this.getLong();

            order.npc_res = this.getString();

            return order;
        },

        unpackStorageItem: function() {
            var item = {};
            item.typeItem = this.getString();
            item.quantity = this.getInt();
            return item;
        },

    }
);
///

testnetwork.packetMap[gv.CMD.RESPONSE_SYNC_PRODUCT_SALE] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){

            /*
             done
             */
            this.productSale = this.unpackProductSale();

        },

        unpackProductSale: function () {
            var product = {};

            product.slot = this.getInt();

            var itemIsNull = this.getInt();
            if (itemIsNull == 0){
                product.product = null;
            } else {
                product.product = this.unpackStorageItem();
            }
            product.price = this.getInt();
            product.isSold = this.getBool();

            return product;
        },

        unpackStorageItem: function() {
            var item = {};
            item.typeItem = this.getString();
            item.quantity = this.getInt();
            return item;
        },

    }
);
////

testnetwork.packetMap[gv.CMD.RESPONSE_BUY_OBJECT] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },
    readData: function () {
        this.error = this.getShort();
    }
});

testnetwork.packetMap[gv.CMD.RESPONSE_UPGRADE_STORAGE] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },
    readData: function () {
        this.error = this.getShort();
    }
});

testnetwork.packetMap[gv.CMD.RESPONSE_BUY_TOOL_UPGRADE] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },
    readData: function () {
        this.error = this.getShort();
    }
});

// Map
testnetwork.packetMap[gv.CMD.RESPONSE_MOVE] = fr.InPacket.extend({
    ctor: function() {
        this._super();
    },
    readData: function() {
        this.error = this.getInt();
    }
});

// New get Info
testnetwork.packetMap[gv.CMD.GET_USER] = fr.InPacket.extend({
    ctor: function() {
        this._super();
        this.user = {};
        this.user.asset = {};
    },

    readData: function() {
        // WARNING: DO NOT CHANGE THE ORDERS
        this.unpackBasicInfo();
        this.unpackMap();
        this.unpackFieldList();
        this.unpackNatureThingList();
        this.unpackStorages();
        this.unpackOrderList();
        this.unpackOrderNPCList();
        this.unpackCar();
        this.unpackAnimalLodges();
        this.unpackMachines();
        this.unpackMyShop();
    },

    unpackBasicInfo: function() {
        this.user.id = this.getInt();
        this.user.name = this.getString();
        this.user.level = this.getInt();
        this.user.gold = this.getInt();
        this.user.ruby = this.getInt();
        this.user.exp = parseInt(this.getLong()); // Warning, framwork return string
    },

    unpackMap: function() {
        this.user.map = [];
        for (var i = 0; i < MapConfigs.Init.width; i++) {
            this.user.map.push([]);
            for (var j = 0; j < MapConfigs.Init.height; j++) {
                this.user.map[i].push(this.getInt());
            }
        }
    },

    unpackFieldList: function() {
        this.user.asset.fieldList = [];
        // Get field list size
        var size = this.getInt();
        // Get each field
        for (var i = 0; i < size; i++) {
            this.user.asset.fieldList.push(this.unpackField());
        }
    },

    unpackField: function() {
        var field = {};
        field.x = this.getInt();
        field.y = this.getInt();
        field.fieldId = this.getInt();
        field.plantType = this.getString();
        field.plantedTime = parseInt(this.getLong()); // Warning
        return field;
    },

    unpackNatureThingList: function() {
        this.user.asset.natureThingList = [];
        var size = this.getInt();
        for (var i = 0; i < size; i++) {
            this.user.asset.natureThingList.push(this.unpackNatureThing());
        }
    },

    unpackNatureThing: function() {
        var natureThing = {};
        natureThing.x = this.getInt();
        natureThing.y = this.getInt();
        natureThing.id = this.getInt();
        natureThing.type = this.getString();
        return natureThing;
    },

    unpackStorages: function() {
        this.user.asset.foodStorage = this.unpackStorage();
        this.user.asset.warehouse = this.unpackStorage();
    },

    unpackStorage: function() {
        var storage = {};
        storage.x = this.getInt();
        storage.y = this.getInt();
        storage.storageType = this.getString();
        storage.capacity = this.getInt();
        storage.level = this.getInt();
        // Unpack storage item list
        storage.itemList = [];
        var size = this.getInt();
        for (var i = 0; i < size; i++) {
            storage.itemList.push(this.unpackStorageItem());
        }
        return storage;
    },

    unpackStorageItem: function() {
        var item = {};
        item.typeItem = this.getString();
        item.quantity = this.getInt();
        return item;
    },

    //
    unpackOrderList: function() {
        this.user.asset.orderList = [];
        // Get orderList size
        var size = this.getInt();
        // Get each order
        for (var i = 0; i < size; i++) {
            this.user.asset.orderList.push(this.unpackOrder());
        }
    },
    unpackOrder: function () {
        var order = {};
        order.orderId = this.getInt();

        // Get each item
        var itemListSize = this.getInt();
        order.itemList = [];
        for (var i = 0; i < itemListSize; i++) {
            order.itemList.push(this.unpackStorageItem());
        }

        order.orderPrice = this.getInt();
        order.orderExp = this.getInt();
        order.waittingTime = this.getLong();

        return order;
    },
    unpackCar: function () {
        this.user.asset.car = {};
        this.user.asset.car.deliveryPrice = this.getInt();
        this.user.asset.car.deliveryExp = this.getInt();
    },
    //
    unpackOrderNPCList: function() {
        this.user.asset.orderNPCList = [];
        // Get orderList size
        var size = this.getInt();
        // Get each order
        for (var i = 0; i < size; i++) {
            this.user.asset.orderNPCList.push(this.unpackOrderNPC());
        }
    },
    unpackOrderNPC: function () {
        var order = {};
        order.orderId = this.getInt();

        var itemIsNull = this.getInt();
        if (itemIsNull == 0){
            order.orderItem = null;
        } else {
            order.orderItem = this.unpackStorageItem();
        }

        order.orderPrice = this.getInt();
        order.orderExp = this.getInt();
        order.waittingTime = this.getLong();

        order.npc_res = this.getString();

        return order;
    },
    //

    unpackAnimalLodges: function() {
        var size = this.getInt();
        this.user.asset.animalLodgeList = [];
        for (var i = 0; i < size; i++) {
            this.user.asset.animalLodgeList.push(this.unpackAnimalLodge());
        }
    },

    unpackAnimalLodge: function() {
        var lodge = {};

        lodge.type = this.getString();
        lodge.x = this.getInt();
        lodge.y = this.getInt();
        lodge.id = this.getInt();

        // Unpack animal list
        lodge.animalList = [];
        var size = this.getInt();
        for (var i = 0; i < size; i++) {
            lodge.animalList.push(this.unpackAnimal());
        }

        return lodge;
    },

    unpackAnimal: function() {
        var animal = {};

        animal.type = this.getString();
        animal.id = this.getInt();
        animal.feeded = this.getInt() ? true : false;
        animal.feededTime = parseInt(this.getLong());
        animal.passedTime = parseInt(this.getLong());
        return animal;
    },

    unpackMachines: function () {
        var size = this.getInt();
        this.user.asset.machineList = [];
        for (var i = 0; i < size; i++) {
            this.user.asset.machineList.push(this.unpackMachine());
        }
    },

    unpackMachine: function () {
        var machine = {};

        machine.id = this.getInt();
        machine.type = this.getString();
        machine.x = this.getInt();
        machine.y = this.getInt();
        machine.slot = this.getInt();
        machine.startTime = parseInt(this.getLong());
        machine.boostBuild = this.getInt() ? true : false;
        machine.completed = this.getInt() ? true : false;
        machine.startBuildTime = parseInt(this.getLong());
        machine.remainBuildTime = this.getInt();

        machine.productQueue = [];
        var size = this.getInt();
        for (var i = 0; i < size; i++) {
            machine.productQueue.push(this.getString());
        }

        return machine;
    },

    //
    unpackMyShop: function () {
        var myShop = {};

        myShop.maxSlot = this.getInt();

        myShop.productList = [];
        var size = this.getInt();
        for (var i = 0; i < size; i++){
            myShop.productList.push(this.unpackProductSale());  //
        }
        myShop.lastTimeNpcCome = this.getLong();

        this.user.asset.myShop = myShop;
    },

    unpackProductSale: function () {
        var product = {};

        product.slot = this.getInt();

        var itemIsNull = this.getInt();
        if (itemIsNull == 0){
            product.product = null;
        } else {
            product.product = this.unpackStorageItem();
        }
        product.price = this.getInt();
        product.isSold = this.getBool();

        return product;
    }

});

testnetwork.packetMap[gv.CMD.ANIMAL_HARVEST] = fr.InPacket.extend({
    ctor: function() {
        this._super();
    },
    readData: function() {
        this.error = this.getInt();
    }
});

testnetwork.packetMap[gv.CMD.ANIMAL_FEED] = fr.InPacket.extend({
    ctor: function() {
        this._super();
    },
    readData: function() {
        this.error = this.getInt();
    }
});

testnetwork.packetMap[gv.CMD.ANIMAL_BOOST] = fr.InPacket.extend({
    ctor: function() {
        this._super();
    },
    readData: function() {
        this.error = this.getInt();
    }
});

testnetwork.packetMap[gv.CMD.NATURE_COLLECT] = fr.InPacket.extend({
    ctor: function() {
        this._super();
    },
    readData: function() {
        this.error = this.getInt();
    }
});

testnetwork.packetMap[gv.CMD.FRIEND_GET_LIST] = fr.InPacket.extend({
    ctor: function() {
        this._super();
    },
    readData: function() {
        this.idList = [];
        var size = this.getInt();
        for (var i = 0; i < size; i++) {
            this.idList.push(this.getInt());
        }
    }
});

testnetwork.packetMap[gv.CMD.FRIEND_GET_INFO] 
        = testnetwork.packetMap[gv.CMD.GET_USER]; // Same
