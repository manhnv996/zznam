package model;

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

public class ZPUserInfo extends DataModel {
    // Zing me
    public int id;
    public String name;
    
    private int level = 1;
    private int gold = 0;
    private int ruby = 10;
    private long exp = 0L;
    
    private Asset asset;
    private int[][] map;
    

    public ZPUserInfo(int _id, Asset asset) {
        super();
        
        id = _id;
        
        this.level = 10;
        this.gold = 10;
        this.ruby = 10;
        this.exp = 0L;
        
        this.asset = asset;
        this.map = new int[32][32];
        // Copy map from default map
        for (int i = 0; i < 32; i++) {
            for (int j = 0; j < 32; j++) {
                this.map[i][j] = ConfigContainer.defaultMap[i][j];
            }
        }
    }
    
    public ZPUserInfo(int _id, String _name) {
        super();
        id = _id;
        name = _name;
//        position = new Point(0, 0);
    }

    
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
    
    public int[][] getMap() {
        return this.map;    
    }
    
    
    //
//    public String toString() {
//        return String.format("%s|%s", new Object[] { id, name });
//    }


    
}
