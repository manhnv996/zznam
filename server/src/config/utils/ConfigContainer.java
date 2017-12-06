package config.utils;

import com.google.gson.Gson;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import config.jsonobject.MapConfig;

import java.io.FileNotFoundException;
import java.io.FileReader;
import config.enums.MapItemEnum;

import config.jsonobject.MachineConfig;
import config.jsonobject.ShopCoopConfig;
import config.jsonobject.map.NaturalObject;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;


public class ConfigContainer {
    public static MapConfig mapConfig;
    private static Gson gson = new Gson();
    public static int[][] defaultMap;
    public static List<NaturalObject> defaultNatural;
    
    public static ShopCoopConfig[] shopCoopConfig;
    public static MachineConfig[] machineConfig;
    
    
    public static void init() {
        // Load map config
        try {
            mapConfig = gson.fromJson(new FileReader("src/config/json/mapconfig.json"), MapConfig.class);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        // Init default map
        defaultMap = new int[mapConfig.Init.width][mapConfig.Init.height];
        for (int i = 0; i < mapConfig.Init.width; i++) {
            for (int j = 0; j < mapConfig.Init.height; j++) {
                defaultMap[i][j] = 0;        
            }
        }

        // Add NhaChinh to map
        for (int i = 0; i < mapConfig.NhaChinh.size.width; i++) {
            for (int j = 0; j < mapConfig.NhaChinh.size.height; j++) {
                defaultMap[mapConfig.NhaChinh.position.x + i]
                    [mapConfig.NhaChinh.position.y + j] = MapItemEnum.NHA_CHINH;
            }
        }

        // Add TruckOrder to map
        for (int i = 0; i < mapConfig.TruckOrder.size.width; i++) {
            for (int j = 0; j < mapConfig.TruckOrder.size.height; j++) {
                defaultMap[mapConfig.TruckOrder.position.x + i]
                    [mapConfig.TruckOrder.position.y + j] = MapItemEnum.TRUCK_ORDER;
            }
        }

        // Add MailBox to map
        for (int i = 0; i < mapConfig.MailBox.size.width; i++) {
            for (int j = 0; j < mapConfig.MailBox.size.height; j++) {
                defaultMap[mapConfig.MailBox.position.x + i]
                    [mapConfig.MailBox.position.y + j] = MapItemEnum.MAIL_BOX;
            }
        }

        // Add RoadShop to map
        for (int i = 0; i < mapConfig.RoadShop.size.width; i++) {
            for (int j = 0; j < mapConfig.RoadShop.size.height; j++) {
                defaultMap[mapConfig.RoadShop.position.x + i]
                    [mapConfig.RoadShop.position.y + j] = MapItemEnum.ROAD_SHOP;
            }
        }

        // Add middle road to map
        // 15, 18 to 16, 31
        for (int i = mapConfig.Road.from.x; i <= mapConfig.Road.to.x; i++) {
            for (int j = mapConfig.Road.from.y; j <= mapConfig.Road.to.y; j++) {
                defaultMap[i][j] = MapItemEnum.ROAD;
            }
        }
        
        // Load init map config
        defaultNatural = new ArrayList<>();
        JsonParser parser = new JsonParser();
        JsonObject obj = null;
        try {
            obj = parser.parse(new FileReader("src/config/json/mapInit.json")).getAsJsonObject();
//            System.out.println("Get " + obj.get("1").getAsJsonObject().get("id").getAsString());
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        Set<Map.Entry<String, JsonElement>> entries = obj.entrySet();//will return members of your object
        for (Map.Entry<String, JsonElement> entry: entries) {
            JsonObject jobj = entry.getValue().getAsJsonObject();
            NaturalObject nobj = new NaturalObject(entry.getKey(), jobj.get("id").getAsString(), jobj.get("x").getAsString(), jobj.get("y").getAsString());
            defaultNatural.add(nobj);
            int x = Integer.parseInt(jobj.get("x").getAsString());
            int y = Integer.parseInt(jobj.get("y").getAsString());
            int width = 0;
            int height = 0;
            if (nobj.type.equals("forest_swamp") || nobj.type.equals("forest_big_stone_1")) {
                width = ConfigContainer.mapConfig.BigNatureThing.size.width;
                height = ConfigContainer.mapConfig.BigNatureThing.size.height;
            } else {
                width = ConfigContainer.mapConfig.SmallNatureThing.size.width;
                height = ConfigContainer.mapConfig.SmallNatureThing.size.height;
            }
            for (int i = 0; i < width; i++) {
                for (int j = 0; j < height; j++) {
                    defaultMap[x + i][y + j] = MapItemEnum.NATURE_THING;
                }
            }
//            System.out.println("[Value] " + jobj.get("id").getAsString());
        }
        try {
            shopCoopConfig = gson.fromJson(new FileReader("src/config/json/shopCoopconfig.json"), ShopCoopConfig[].class);
            machineConfig =  gson.fromJson(new FileReader("src/config/json/machineConfig.json"), MachineConfig[].class);
//            System.out.println(shopCoopConfig[0].type);
        } catch (FileNotFoundException e) {
            e.printStackTrace();    
        }
    }
    
    public static int getCoopPrice (String type) {
        for (int i = 0; i < shopCoopConfig.length; i++) {
            if (shopCoopConfig[i].type.equals(type)) {
                return shopCoopConfig[i].price;
            }
        }
        return 0;
    }
    
    public static int getMachineSlot (String type) {
        for (int i = 0; i< machineConfig.length; i++) {
            if (machineConfig[i].id.equals(type)) {
                return machineConfig[i].slot;
            }
        }
        return 0;
    }
    
    public static MachineConfig getMachineConfigByType (String type) {
        for (int i = 0; i< machineConfig.length; i++) {
            if (machineConfig[i].id.equals(type)) {
                return machineConfig[i];
            }
        }
        return null;
    }
    
    public static String toJSON(Object obj) {
        return gson.toJson(obj);
    }
}
