/**
 * Created by CPU60133_LOCAL on 11/9/2017.
 */

var MapCtrl = cc.Class.extend({
    // Map property referenced to user.map
    map: null, // [{ type: MapItemEnum, [anotherKey]: [anotherValue] }]

    init: function() {
        // MapLayer.instance.addChild(new ODatSprite(10, 10));
        this.map = user.map; // Pass to user map
        this.initMapArray();
        this.renderNaturalThings();
        // MapLayer.instance.addChild(new SiloSprite(20, 20));
        // MapLayer.instance.addChild(new WareHouseSprite(18, 24));
    },

    initMapArray: function() {
        for (var i = 0; i < MapConfigs.Init.width; i++) {
            this.map.push([]);
            for (var j = 0; j < MapConfigs.Init.height; j++) {
                this.map[i].push(MapItemEnum.EMPTY);
            }
        }

        // Nha chinh
        var NhaChinhConfigs = MapConfigs.NhaChinh;
        this.addMapAlias(NhaChinhConfigs.position.x, NhaChinhConfigs.position.y,
                NhaChinhConfigs.blockSizeX, NhaChinhConfigs.blockSizeY,
                MapItemEnum.NHA_CHINH);
        var nhaChinh = new NhaChinhSprite(NhaChinhConfigs.position);
        MapLayer.instance.addChild(nhaChinh);

        // Truck Order
        var TruckOrderConfigs = MapConfigs.TruckOrder;
        this.addMapAlias(TruckOrderConfigs.position.x, TruckOrderConfigs.position.y,
                TruckOrderConfigs.blockSizeX, TruckOrderConfigs.blockSizeY,
                MapItemEnum.TRUCK_ORDER);
        var truckOrder = new TruckOrderSprite(TruckOrderConfigs.position);
        MapLayer.instance.addChild(truckOrder);

        // Mailbox
        var MailBoxConfigs = MapConfigs.MailBox;
        this.addMapAlias(MailBoxConfigs.position.x, MailBoxConfigs.position.y,
                MailBoxConfigs.blockSizeX, MailBoxConfigs.blockSizeY,
                MapItemEnum.MAIL_BOX);
        var mailBox = new MailBoxSprite(MailBoxConfigs.position);
        MapLayer.instance.addChild(mailBox);

        // Roadshop
        var RoadShopConfigs = MapConfigs.RoadShop;
        this.addMapAlias(RoadShopConfigs.position.x, RoadShopConfigs.position.y,
                RoadShopConfigs.blockSizeX, RoadShopConfigs.blockSizeY,
                MapItemEnum.ROAD_SHOP);
        var roadShop = new RoadShopSprite(RoadShopConfigs.position);
        MapLayer.instance.addChild(roadShop);

    },

    _showDebugMap: function() {
        for (var i = 0; i < user.map.length; i++) {
            var str = '';
            for (var j = 0; j < user.map[i].length; j++) {
                if (this.map[i][j] === MapItemEnum.EMPTY) {
                    str += '0';
                } else {
                    str += "*";
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
        this.checkValidBlock(sprite.lx, sprite.ly, sprite.blockSizeX, sprite.blockSizeY);
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

    renderNaturalThings: function() {
        var configs = cc.loader.getRes("config/mapInit.json");
        for (var k in configs) {
            var item = configs[k];
            switch (item.id) {
                case "forest_big_tree_1":
                    break;
                case "forest_small_tree_1":
                    break;
                case "forest_big_stone_1":
                    break;
                case "forest_small_stone_1":
                    break;
                case "forest_big_tree_2":
                    break;
                case "forest_small_tree_2":
                    break;
                case "forest_swamp":
                    break;
                default:
                    return cc.log("Unhandled natural", item.id);
            }
        }
    }
});

// Moved to MainScene.js
// MapCtrl.instance = new MapCtrl();

//MapCtrl.instance.showMe();
