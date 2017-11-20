package model;

import java.awt.Point;

import service.DemoHandler.DemoDirection;
import service.DemoHandler.MaxPosition;

import util.database.DataModel;

public class ZPUserInfo extends DataModel {
    // Zing me
    public int id;
    public String name;
    
    private int level = 1;
    private int gold = 0;
    private int ruby = 10;
    private long exp = 0L;
    
    private Asset asset;
    
    
    public Point position;

    public ZPUserInfo(Asset asset) {
        super();
        
        this.level = 1;
        this.gold = 0;
        this.ruby = 10;
        this.exp = 0L;
        
        this.asset = asset;
    }
    
    
    public ZPUserInfo(int _id, String _name) {
        super();
        id = _id;
        name = _name;
        position = new Point(0, 0);
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
    
    
    
    
    //
    public String toString() {
        return String.format("%s|%s", new Object[] { id, name });
    }
    
    public Point move(short direction){        
        if (direction == DemoDirection.UP.getValue()){
            position.x++;
        }
        else if (direction == DemoDirection.DOWN.getValue()){
            position.x--;
        }
        else if (direction == DemoDirection.RIGHT.getValue()){
            position.y++;
        }
        else{
            position.y--;
        }
        
        position.x = position.x % MaxPosition.X;
        position.y = position.y % MaxPosition.Y;
                
        return position;
    }
    
    

    
    
}
