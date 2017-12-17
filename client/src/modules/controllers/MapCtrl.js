/**
 * Created by CPU60133_LOCAL on 11/9/2017.
 */

var MapCtrl = cc.Class.extend({
    // Map property referenced to user.map

    map: null, // [{ type: MapItemEnum, [anotherKey]: [anotherValue] }]
    ctor: function() {
        this.renderDefaultConstruct();
    },

    // Call when loaded data from server
    init: function() {
        // MapLayer.instance.addChild(new ODatSprite(10, 10));
        // cc.log("User map:", user.map.length);
        // for (var i = 0; i < user.map.length; i++) {
        //     var str = "";
        //     for (var j = 0; j < user.map[i].length; j++) {
        //         str += user.map[i] + " ";
        //     }
        //     cc.log(str);
        // }
        cc.log("MapCtrl inited");
        this.map = user.map; // Pass to user map

        // var debugUser = {} // Not show map
        // for (var k in user) {
        //     if (k !== 'map') {
        //         debugUser[k] = user[k];
        //     }
        // }
        // cc.log("User", debugUser);
        this.renderStorages();
        this.renderPlants();
        this.renderNaturalThings();
        this.renderAnimalLodges();
        //this.renderMachines();
        // cc.log("Silo", user.asset.foodStorage);
        // MapLayer.instance.addChild(new SiloSprite(20, 20));
        // MapLayer.instance.addChild(new WareHouseSprite(18, 24));
        InertiaEngine.instance = new InertiaEngine();
        MainScene.instance.addChild(InertiaEngine.instance);
        this.renderUserInfo();

        this.renderMachine();

        // Add sample
        // var chickenLodge = new ChickenLodgeSprite(18, 19);
        // MapLayer.instance.addChild(chickenLodge);
        // var cowLodge = new CowLodgeSprite(19, 11);
        // MapLayer.instance.addChild(cowLodge);
        // var cowLodge = new CowLodgeSprite(22, 19);
        // MapLayer.instance.addChild(cowLodge);
        //
        //var bakery = new BakerySprite(20, 20);
        //MapLayer.instance.addChild(bakery);
        //bakery.play("loop1");
        //
        this.renderNPC();
        TruckOrderSprite.instance.initTruckOrder();
    },

    renderStorages: function() {
        var silo = user.asset.foodStorage;
        var warehouse = user.asset.warehouse;
        SiloSprite.instance = new SiloSprite(silo.coordinate.x, silo.coordinate.y);
        WareHouseSprite.instance = new WareHouseSprite(warehouse.coordinate.x, warehouse.coordinate.y);
        MapLayer.instance.addChild(SiloSprite.instance);
        MapLayer.instance.addChild(WareHouseSprite.instance);

        // Add from server
        // this.addSpriteAlias(siloSprite);
        // this.addSpriteAlias(warehouseSprite);
    },

    renderUserInfo: function() {
        MainGuiLayer.instance.labelLevel.setString(user.getLevel());
        MainGuiLayer.instance.labelGold.setString(user.getGold());
        MainGuiLayer.instance.labelRuby.setString(user.getRuby());
        //MainGuiLayer.instance.labelExp.setString(user.getExp());
    },

    renderDefaultConstruct: function() {
        // for (var i = 0; i < MapConfigs.Init.width; i++) {
        //     this.map.push([]);
        //     for (var j = 0; j < MapConfigs.Init.height; j++) {
        //         this.map[i].push(0);
        //     }
        // }

        // Nha chinh
        var NhaChinhConfigs = MapConfigs.NhaChinh;
        // this.addMapAlias(NhaChinhConfigs.position.x, NhaChinhConfigs.position.y,
        //         NhaChinhConfigs.blockSizeX, NhaChinhConfigs.blockSizeY,
        //         MapItemEnum.NHA_CHINH);
        var nhaChinh = new NhaChinhSprite(NhaChinhConfigs.position);
        //MapLayer.instance.debugSprite = nhaChinh;
        MapLayer.instance.addChild(nhaChinh);

        // Truck Order
        var TruckOrderConfigs = MapConfigs.TruckOrder;
        // this.addMapAlias(TruckOrderConfigs.position.x, TruckOrderConfigs.position.y,
        //         TruckOrderConfigs.blockSizeX, TruckOrderConfigs.blockSizeY,
        //         MapItemEnum.TRUCK_ORDER);
        // var truckOrder = new TruckOrderSprite(TruckOrderConfigs.position);
        // MapLayer.instance.addChild(truckOrder);
        TruckOrderSprite.instance = new TruckOrderSprite(TruckOrderConfigs.position);
        MapLayer.instance.addChild(TruckOrderSprite.instance);

        // Mailbox
        var MailBoxConfigs = MapConfigs.MailBox;
        // this.addMapAlias(MailBoxConfigs.position.x, MailBoxConfigs.position.y,
        //         MailBoxConfigs.blockSizeX, MailBoxConfigs.blockSizeY,
        //         MapItemEnum.MAIL_BOX);
        var mailBox = new MailBoxSprite(MailBoxConfigs.position);
        MapLayer.instance.addChild(mailBox);

        // Roadshop
        var RoadShopConfigs = MapConfigs.RoadShop;
        // this.addMapAlias(RoadShopConfigs.position.x, RoadShopConfigs.position.y,
        //         RoadShopConfigs.blockSizeX, RoadShopConfigs.blockSizeY,
        //         MapItemEnum.ROAD_SHOP);
        var roadShop = new RoadShopSprite(RoadShopConfigs.position);
        MapLayer.instance.addChild(roadShop);
    },

    renderPlants: function() {
        var fieldList = user.asset.fieldList;
        for (var i = 0; i < fieldList.length; i++) {
            var field = fieldList[i];
            var fieldSprite = new FieldSprite(
                    field.getFieldId(),
                    field.getCoordinate().getCurrX(),
                    field.getCoordinate().getCurrY());
            MapLayer.instance.addChild(fieldSprite);
            if (field.plantType) {
                fieldSprite.createAni(field.plantType);

            }
            MapLayer.instance.fieldList.push(fieldSprite);
            
            // Add from server
            // this.addSpriteAlias(fieldSprite);
        }
    },

    renderNPC: function () {

        CarSprite.instance = new CarSprite(16, 23);
        MapLayer.instance.addChild(CarSprite.instance);

        MapLayer.instance.npcList = [];
        var orderNPCList = user.asset.orderNPCList;
        for (var i = 0; i < orderNPCList.length; i++){
            var npcSprite = new NPCSprite(16 + i, 20 - i, orderNPCList[i]);
            MapLayer.instance.addChild(npcSprite);

            // //
            MapLayer.instance.npcList.push(npcSprite);

            if (orderNPCList[i].checkStatus() == OrderStatusTypes.WAITTING){
                //
                MapLayer.instance.getNPCByOrderNPCId(orderNPCList[i].orderId).setPause();
                //
            }
        }

    },

    renderAnimalLodges: function() {
        var animalLodgeList = user.asset.animalLodgeList;
        cc.log("Render", animalLodgeList);
        for (var i = 0; i < animalLodgeList.length; i++) {
            var lodge = animalLodgeList[i];
            var lodgeSprite = null;
            if (lodge.type === AnimalLodgeType.cow_habitat) {
                lodgeSprite = new CowLodgeSprite(lodge.coordinate.x, lodge.coordinate.y);
                for (var j = 0; j < lodge.animalList.length; j++) {
                    var cowSprite = new CowSprite();
                    cowSprite.setId(lodge.animalList[i].id);
                    lodgeSprite.addCowSprite(cowSprite);
                }
            } else if (lodge.type === AnimalLodgeType.chicken_habitat) {
                lodgeSprite = new ChickenLodgeSprite(lodge.coordinate.x, lodge.coordinate.y);
                for (var j = 0; j < lodge.animalList.length; j++) {
                    var chickenSprite = new ChickenSprite();
                    chickenSprite.setId(lodge.animalList[i].id);
                    lodgeSprite.addChickenSprite(chickenSprite);
                }
            } else {
                cc.log("[E] Unhandled Animal lodge type", lodge.type);
            }
            lodgeSprite.setId(lodge.id);
            MapLayer.instance.addChild(lodgeSprite);
        }
    },
    /**
     *    Render Machines To Map
     */
    renderMachines: function () {
        //cc.log("Render machine to Map");
        var machineList = user.asset.c;
        for (var i = 0; i < machineList.length; i++) {
            var machine = machineList[i];
            var type = machine.type;
            var machineSprite;
            cc.log("machine", i, " id", machine.id, " machine.remainBuildTime", machine.remainBuildTime,
            " machine.boostBuild", machine.boostBuild);
            switch (type) {
                case "bakery_machine":
                    if (machine.completed) {
                        machineSprite = new BakerySprite(machine.id, machine.coordinate.x, machine.coordinate.y);
                    } else {
                        machineSprite = this.addConstructedSprite(machine.boostBuild, machine.remainBuildTime,
                            machine.id, MapConfigs.BakeryMachine.size.width, MapConfigs.BakeryMachine.size.height,
                            machine.coordinate.x, machine.coordinate.y);
                    }
                    break;
                case "food_machine":
                    if (machine.completed) {
                        machineSprite = new FoodMachineSprite(machine.id, machine.coordinate.x, machine.coordinate.y);
                    } else {
                        machineSprite = this.addConstructedSprite(machine.boostBuild, machine.remainBuildTime,
                            machine.id, MapConfigs.FoodMachine.size.width, MapConfigs.FoodMachine.size.height,
                            machine.coordinate.x, machine.coordinate.y);
                    }
                    break;
                case "butter_machine":
                    if (machine.completed) {
                        machineSprite = new ButterMachineSprite(machine.id, machine.coordinate.x, machine.coordinate.y);
                    } else {
                        machineSprite = this.addConstructedSprite(machine.boostBuild, machine.remainBuildTime,
                            machine.id, MapConfigs.ButterMachine.size.width, MapConfigs.ButterMachine.size.height,
                            machine.coordinate.x, machine.coordinate.y);
                    }
                    break;
                case "sugar_machine":
                    if (machine.completed) {
                        machineSprite = new SugarCaneSprite(machine.id, machine.coordinate.x, machine.coordinate.y);
                    } else {
                        machineSprite = this.addConstructedSprite(machine.boostBuild, machine.remainBuildTime,
                            machine.id, MapConfigs.SugarMachine.size.width, MapConfigs.SugarMachine.size.height,
                            machine.coordinate.x, machine.coordinate.y);
                    }
                    break;
                case "popcorn_machine":
                    if (machine.completed) {
                        machineSprite = new PopcornMachineSprite(machine.id, machine.coordinate.x, machine.coordinate.y);
                    } else {
                        machineSprite = this.addConstructedSprite(machine.boostBuild, machine.remainBuildTime,
                            machine.id, MapConfigs.PopcornMachine.size.width, MapConfigs.PopcornMachine.size.height,
                            machine.coordinate.x, machine.coordinate.y);
                    }
                    break;
            }

            MapLayer.instance.addChild(machineSprite);
            machineSprite.setLogicPosition(machine.coordinate.x, machine.coordinate.y, true);
        }
    },

    addConstructedSprite: function (boostBuild, remainBuildTime, id, width, height, x, y) {
        var machineSprite;
        if (boostBuild || !remainBuildTime) {
            machineSprite = new ConstructedCompletedSprite(id, x, y, MapItemEnum.MACHINE);
        } else {
            machineSprite = new ConstructedSprite(id, width, height, x, y, MapItemEnum.MACHINE);
        }
        return machineSprite;
    },

    _showDebugMap: function() {
        for (var i = 0; i < user.map.length; i++) {
            var str = '';
            for (var j = 0; j < user.map[i].length; j++) {
                if (this.map[i][j] === 0) {
                    str += '[]';
                } else {
                    str += this.map[i][j];
                    if (this.map[i][j] < 10) {
                        str += " "
                    }
                }
                
            }
            cc.log(str);
        }
    },

    showMe: function() {
        cc.log("I am here");
    },

    getObject: function(x, y) {
        /*
         DONE
         */
        var pointLogic = MapValues.screenPositionToLogic(x, y);

        return {"typeObject": user.map[Math.floor(pointLogic.x)][Math.floor(pointLogic.y)],
                "pointLogic": cc.p(Math.floor(pointLogic.x), Math.floor(pointLogic.y))};
    },

    checkValidPosition: function(x, y) {
        y = x.y || y;
        x = x.x || x;
        if (x < MapConfigs.Init.width && x >= 0 &&
            y < MapConfigs.Init.height && y >=0) {
            return this.map[x][y] === 0;
        } else {
            return false;
        }
    },

    // Check valid ***
    checkValidBlock: function(x, y, width, height) {
        for (var i = 0; i < width; i++) {
            for (var j = 0; j < height; j++) {
                // cc.log(x + i, y + j, this.map[x + i][y + j]);
                if (!this.checkValidPosition(x + i, y + j)) {
                    return false;
                }
            }
        }
        return true;
    },

    // Check valid of sprite
    checkValidBlockSprite: function(sprite) {
        return this.checkValidBlock(sprite.lx, sprite.ly, sprite.blockSizeX, sprite.blockSizeY);
    },

    removeMapAlias: function(x, y, width, height) {
        for (var i = 0; i < width; i++) {
            for (var j = 0; j < height; j++) {
                this.map[x + i][y + j] = 0;
                // cc.log("Remove", x + i, y + j, this.map[x + i][y + j]);
            }
        }
    },

    addMapAlias: function(x, y, width, height, type) {
        for (var i = 0; i < width; i++) {
            for (var j = 0; j < height; j++) {
                this.map[x + i][y + j] = type;
            }
        }
    },

    // Add to map matrix
    addSpriteAlias: function(sprite) {
        this.addMapAlias(sprite.lx, sprite.ly,
            sprite.blockSizeX, sprite.blockSizeY,
            sprite.mapAliasType
        );
    },

    removeSpriteAlias: function(sprite) {
        this.removeMapAlias(
            sprite.lx, sprite.ly,
            sprite.blockSizeX, sprite.blockSizeY
        );
    },

    /*
    var gr = [];
    var gr.Cayrung = Object.extend
    type = Cayrung
    new gr[type]();
    type -> ten class
    var l = {};
    l.forest_swamp = VungnuocSprite;
    */

    renderNaturalThings: function() {
        for (var i = 0; i < user.asset.natureThingList.length; i++) {

            var x = user.asset.natureThingList[i].coordinate.x;
            var y = user.asset.natureThingList[i].coordinate.y;
            var id = user.asset.natureThingList[i].id;
            var typeName = user.asset.natureThingList[i].type;
            if (typeName === 'forest_swamp') {
                var sprite = new VungnuocSprite(x, y, id);
                MapLayer.instance.addChild(sprite);
            } else if (typeName === 'forest_big_stone_1') {
                var sprite = new DatoSprite(x, y, id);
                MapLayer.instance.addChild(sprite);
            } else if (typeName === 'forest_small_stone_1' ) {
                var sprite = new DanhoSprite(x, y, id);
                MapLayer.instance.addChild(sprite);
            } else {
                // Trees
                var types = {
                    forest_small_tree_1: 1,
                    forest_big_tree_1: 2,
                    forest_big_tree_2: 3,
                    forest_small_tree_2: 4
                };
                var type = types[user.asset.natureThingList[i].type];
                if (type) {
                    var sprite = new CayRungSprite(x, y, type, id);
                    MapLayer.instance.addChild(sprite);
                } else {
                    cc.log("missing", user.asset.natureThingList[i].type);
                }
            }
        }

        // var sprite = new CayRungSprite(0, 2, 4, 1000);
        // MapLayer.instance.addChild(sprite);
        // sprite._showBoundingPoints();
        // var configs = cc.loader.getRes("config/mapInit.json");
        // for (var k in configs) {
        //     var item = configs[k];
        //     switch (item.id) {
        //         case "forest_big_tree_1":
        //             break;
        //         case "forest_small_tree_1":
        //             break;
        //         case "forest_big_stone_1":
        //             break;
        //         case "forest_small_stone_1":
        //             break;
        //         case "forest_big_tree_2":
        //             break;
        //         case "forest_small_tree_2":
        //             break;
        //         case "forest_swamp":
        //             break;
        //         default:
        //             return cc.log("Unhandled natural", item.id);
        //     }
        // }
    },

    renderMachine: function(){
        //(coordinate, startBuildTime, completed, machineId, machineType, productQueue)

        MapLayer.instance.machineSpriteList = [];

        var now = new Date().getTime();

        var coordinate = {x:24, y: 24};
        var machineId = "bakery_machine";
        var machineType = "bakery_machine";
        var slot = 9;
        var startTime =  now - 5* 60 * 1000 * 3;
        var boostBuild = true;
        var completed = true;
        var startBuildTime = now - 5* 60 * 1000 * 3;
        var remainBuildTime = "4343";
        var productQueue = ["product_bread", "product_corn_bread", "product_bread", "product_corn_bread", "product_bread", "product_corn_bread"];
        user.asset.machineList = [];
        //cc.log(MA_LOG_TAG + "450" + user.asset.machineList);
        //ctor: function (machineId, machineType, slot, startTime,  productQueue, boostBuild, completed, startBuildTime, remainBuildTime, coordinate) {        user.asset.addMachine(new Machine(coordinate, startBuildTime,startBuildTime,boostBuild , completed, machineId, machineType, productQueue,startTime));
        user.asset.addMachine(new Machine(machineId, machineType, slot, now -.2* 60 * 1000 * 3, productQueue, boostBuild, completed, startBuildTime, remainBuildTime,  {x:21, y: 24}));
        user.asset.addMachine(new Machine("food_machine", "food_machine", slot, startTime, [], boostBuild, completed, startBuildTime, remainBuildTime,  {x:18, y: 24}));
        user.asset.addMachine(new Machine("popcorn_machine", "popcorn_machine", slot, startTime, productQueue, boostBuild, completed, startBuildTime, remainBuildTime,  {x:24, y: 24}));

        //cc.log(MA_LOG_TAG + "462 " + user.asset.getMachineById("bakery_machine").machineType);
        //cc.log(MA_LOG_TAG + "462 " + user.asset.getMachineById("bakery_machine").productQueue);
        //cc.log(MA_LOG_TAG + "462" + user.asset.getMachineById("bakery_machine").getNumberOfCompletedProducts(now));

        //Machine.instance = new Machine();
        //Machine.instance.productQueue.push("product_bread");
        //Machine.instance.productQueue.push("product_bread");
        //Machine.instance.productQueue.push("product_bread");
        //Machine.instance.productQueue.push("product_bread");
        //Machine.instance.productQueue.push("product_corn_bread");
        //var now = new Date().getTime();
        //Machine.instance.machineType = MACHINE_LIST[1].machineType;
        //cc.log(MA_LOG_TAG + Machine.instance.machineType);
        //Machine.instance.setStartTime(now - 10 * 60 * 1000);
        //Machine.instance.updateCompletedProducts(now);
        //cc.log(MA_LOG_TAG +Machine.instance.completedProducts.toString());
        //cc.log(MA_LOG_TAG +Machine.instance.productQueue.toString());

        var spriteBakery = new MachineSprite("bakery_machine");
        MapLayer.instance.addChild(spriteBakery);
        MapLayer.instance.machineSpriteList.push(spriteBakery);
        var spriteFoodMachine = new MachineSprite("food_machine" );
        MapLayer.instance.addChild(spriteFoodMachine);
        MapLayer.instance.machineSpriteList.push(spriteFoodMachine);
        var spritePopcornMachine = new MachineSprite("popcorn_machine");
        MapLayer.instance.addChild(spritePopcornMachine);
        MapLayer.instance.machineSpriteList.push(spritePopcornMachine);


        //var spriteButterMachine = new MachineSprite("butter_machine");
        //MapLayer.instance.addChild(spriteButterMachine);
        //MapLayer.instance.machineSpriteList.push(spriteButterMachine);

         //var spriteSugarMachine = new MachineSprite("sugar_machine");
         //MapLayer.instance.addChild(spriteSugarMachine);


    }
});

// Moved to MainScene.js
// MapCtrl.instance = new MapCtrl();

//MapCtrl.instance.showMe();
