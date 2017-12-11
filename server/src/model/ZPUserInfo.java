package model;

import config.enums.AnimalLodgeEnum;
import config.enums.MachineTypeEnum;
import config.enums.MapItemEnum;
import config.enums.ProductType;
import config.enums.StorageType;

import java.awt.Point;

import java.util.Date;

import org.json.JSONException;
import org.json.JSONObject;

import service.DemoHandler.DemoDirection;
import service.DemoHandler.MaxPosition;

import util.database.DataModel;
import config.utils.ConfigContainer;

import java.util.List;

public class ZPUserInfo extends DataModel {
    // Zing me
    public int id;
    public String name;
    
    private int level = 1;
    private int gold = 0;
    private int ruby = 0;
    private long exp = 0L;
    
    private Asset asset;
//    private int[][] map;
    private MapAlias map;
    

    public ZPUserInfo(int _id, Asset asset) {
        super();
        
        id = _id;
        
        this.level = 16;
        this.gold = 20;
        this.ruby = 10;

        this.exp = 0L;
        this.name = "";
        
        this.asset = asset;
//        this.map = new int[32][32];
        // Copy map from default map
//        for (int i = 0; i < 32; i++) {
//            for (int j = 0; j < 32; j++) {
//                this.map[i][j] = ConfigContainer.defaultMap[i][j];
//            }
//        }
//                System.out.println("abcxyz");

        this.map = new MapAlias();
        // Add silo to map
        Storage silo = this.asset.getFoodStorage();
        this.map.addMapAlias(silo.getX(), silo.getY(), 
                     ConfigContainer.mapConfig.Silo.size.width,
                     ConfigContainer.mapConfig.Silo.size.height,
                     MapItemEnum.SILO);
        // Add warehouse to map
        Storage warehouse = this.asset.getWarehouse();
        this.map.addMapAlias(warehouse.getX(), warehouse.getY(),
                    ConfigContainer.mapConfig.Warehouse.size.width,
                    ConfigContainer.mapConfig.Warehouse.size.height,
                    MapItemEnum.WAREHOUSE);
        // Add Fields to map
        List<Field> fieldList = this.asset.getFieldList();
        for (int i = 0; i < fieldList.size(); i++) {
            Field field = fieldList.get(i);
            this.map.addMapAlias(field.getX(), field.getY(),
                    ConfigContainer.mapConfig.Field.size.width,
                    ConfigContainer.mapConfig.Field.size.height,
                    MapItemEnum.FIELD);
        }
        
        // Add Lodge to map
        List<AnimalLodge> lodgeList = this.asset.getAnimalLodgeList();
        for (int i = 0; i < lodgeList.size(); i++) {
            AnimalLodge lodge = lodgeList.get(i);
            if (lodge.getType() == AnimalLodgeEnum.chicken_habitat) {
                this.map.addMapAlias(lodge.getX(), lodge.getY(), 
                    ConfigContainer.mapConfig.ChickenLodge.size.width,
                    ConfigContainer.mapConfig.ChickenLodge.size.height,
                    MapItemEnum.LODGE);
            } else if (lodge.getType() == AnimalLodgeEnum.cow_habitat) {
                this.map.addMapAlias(lodge.getX(), lodge.getY(), 
                    ConfigContainer.mapConfig.CowLodge.size.width,
                    ConfigContainer.mapConfig.CowLodge.size.height,
                    MapItemEnum.LODGE);
            } else {
                System.out.println("[E] Unhandled animal lodge type " + lodge.getType().toString());    
            }
        }
        
        // Add Machine to map 
        List<Machine> machineList = this.asset.getMachineList();
        for (int i = 0; i < machineList.size(); i++) {
            Machine machine = machineList.get(i);
            if (machine.getType() == MachineTypeEnum.bakery_machine) {
                this.map.addMapAlias(machine.getX(), machine.getY(), 
                    ConfigContainer.mapConfig.Machine.Bakery_Machine.size.width,
                    ConfigContainer.mapConfig.Machine.Bakery_Machine.size.height,
                    MapItemEnum.MACHINE);
            } else if (machine.getType() == MachineTypeEnum.food_machine) {
                this.map.addMapAlias(machine.getX(), machine.getY(), 
                    ConfigContainer.mapConfig.Machine.Food_Machine.size.width,
                    ConfigContainer.mapConfig.Machine.Food_Machine.size.height,
                    MapItemEnum.MACHINE);
            } else if (machine.getType() == MachineTypeEnum.butter_machine) {
                this.map.addMapAlias(machine.getX(), machine.getY(), 
                    ConfigContainer.mapConfig.Machine.Butter_Machine.size.width,
                    ConfigContainer.mapConfig.Machine.Butter_Machine.size.height,
                    MapItemEnum.MACHINE);
            } else if (machine.getType() == MachineTypeEnum.sugar_machine) {
                this.map.addMapAlias(machine.getX(), machine.getY(), 
                    ConfigContainer.mapConfig.Machine.Sugar_Machine.size.width,
                    ConfigContainer.mapConfig.Machine.Sugar_Machine.size.height,
                    MapItemEnum.MACHINE);
            } else if (machine.getType() == MachineTypeEnum.popcorn_machine) {
                this.map.addMapAlias(machine.getX(), machine.getY(), 
                    ConfigContainer.mapConfig.Machine.Popcorn_Machine.size.width,
                    ConfigContainer.mapConfig.Machine.Popcorn_Machine.size.height,
                    MapItemEnum.MACHINE);
            } else{
                System.out.println("[E] Unhandled machine type " + machine.getType().toString());    
            }
        }
    }
    
//    public ZPUserInfo(int _id, String _name) {
//        super();
//        id = _id;
//        name = _name;
////        position = new Point(0, 0);
//    }

    
    public Asset getAsset() {
        return asset;
    }

    public void setAsset(Asset asset) {
        this.asset = asset;
    }

    public int getId() {
        return id;
    }

    public int getLevel() {
        return level;
    }

    public int getGold() {
        return gold;
    }

    public int getRuby() {
        return ruby;
    }

    public long getExp() {
        return exp;
    }

    public void addGold(int value) {
        this.gold += value;
    }
    
    public void addExp(int value) {
        this.exp += value;
        /*
         * not yet started
         */
    }
    
    public void addRuby(int value) {
        this.ruby += value;
    }
    
    public boolean reduceGold(int value){
        if (this.gold >= value){
            this.gold -= value;
            return true;
        }
        return false;
    }
    
    public boolean reduceRuby(int value){
        if (this.ruby >= value){
            this.ruby -= value;
            return true;
        }
        return false;
    }
    
    public MapAlias getMap() {
//        public int[][] getMap() {
        return map;    
    }
    
    public void setMap(MapAlias map) {
        this.map = map;    
    }
    
    public String getName() {
        return this.name;    
    }
    
    public void setName(String name) {
        this.name = name;    
    }
    
    //
//    public String toString() {
//        return String.format("%s|%s", new Object[] { id, name });
//    }


    
}
