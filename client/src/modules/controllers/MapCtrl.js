/**
 * Created by CPU60133_LOCAL on 11/9/2017.
 */

var MapCtrl = cc.Class.extend({
    map: [], // [{ type: MapItemEnum, [anotherKey]: [anotherValue] }]

    init: function() {
        // MapLayer.instance.addChild(new ODatSprite(10, 10));
        this.initMapArray();
        this.renderNaturalThings();
        MapLayer.instance.addChild(new SiloSprite(20, 20));
        MapLayer.instance.addChild(new WareHouseSprite(18, 24));
    },

    initMapArray: function() {
        for (var i = 0; i < MapConfigs.Init.width; i++) {
            this.map.push([]);
            for (var j = 0; j < MapConfigs.Init.height; j++) {
                this.map[i].push(0);
            }
        }
        // Nha chinh
        var NhaChinhPosition = MapConfigs.NhaChinh.position;
        for (var i = 0; i < MapConfigs.NhaChinh.blockSizeX; i++) {
            for (var j = 0; j < MapConfigs.NhaChinh.blockSizeY; j++) {
                 this.map[i + NhaChinhPosition.x][j + NhaChinhPosition.y] = 1;
            }
        }
        var nhaChinh = new NhaChinhSprite(NhaChinhPosition);
        MapLayer.instance.addChild(nhaChinh);

        // Truck Order
        var TruckOrderPosition = MapConfigs.TruckOrder.position;
        for (var i = 0; i < MapConfigs.TruckOrder.blockSizeX; i++) {
            for (var j = 0; j < MapConfigs.TruckOrder.blockSizeY; j++) {
                 this.map[i + TruckOrderPosition.x][j + TruckOrderPosition.y] = 1;
            }
        }
        var truckOrder = new TruckOrderSprite(TruckOrderPosition);
        MapLayer.instance.addChild(truckOrder);

        var MailBoxPosition = MapConfigs.MailBox.position;
        for (var i = 0; i < MapConfigs.MailBox.blockSizeX; i++) {
            for (var j = 0; j < MapConfigs.MailBox.blockSizeY; j++) {
                 this.map[i + MailBoxPosition.x][j + MailBoxPosition.y] = 1;
            }
        }
        var mailBox = new MailBoxSprite(MailBoxPosition);
        MapLayer.instance.addChild(mailBox);

        var RoadShopPosition = MapConfigs.RoadShop.position;
        var roadShop = new RoadShopSprite(RoadShopPosition);
        for (var i = 0; i < MapConfigs.RoadShop.blockSizeX; i++) {
            for (var j = 0; j < MapConfigs.RoadShop.blockSizeY; j++) {
                 this.map[i + RoadShopPosition.x][j + RoadShopPosition.y] = 1;
            }
        }
        MapLayer.instance.addChild(roadShop);
        for (var i = 0; i < this.map.length; i++) {
            var str = '';
            for (var j = 0; j < this.map[i].length; j++) {
                if (this.map[i][j] === 1) {
                    str += '-';
                } else {
                    str += '0';
                }
            }
            cc.log(str);
        }
    },

    showMe: function() {
        cc.log("I am here");
    },
    getField: function(x, y) {
        /*
         DONE
         */
        var pointLogic = MapValues.screenPositionToLogic(x, y);
        return user.getAsset().getFieldByLogicPosition(Math.floor(pointLogic.x), Math.floor(pointLogic.y));
    },

    checkValidPosition: function(x, y) {
        y = x.y || y;
        x = x.x || x;
        if (x < MapConfigs.Init.width && x >= 0 &&
            y < MapConfigs.Init.height && x >=0) {

            return this.map[x][y] === 0;
        } else {
            return false;
        }
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

MapCtrl.instance = new MapCtrl();

//MapCtrl.instance.showMe();
