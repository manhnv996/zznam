package model;

import util.database.DataModel;

public class User extends DataModel {
    
    private int uid;
    
    private int level;
    private int gold;
    private int ruby;
    private int exp;
    
    private Asset asset;
    
    
    
    public User(Asset asset) {
        super();
        
        this.level = 1;
        this.gold = 0;
        this.ruby = 10;
        this.exp = 0;
        
        this.asset = asset;
    }
}
