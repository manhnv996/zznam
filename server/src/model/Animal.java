package model;

import config.enums.AnimalEnum;

public class Animal {
    private boolean feeded;
    private long feededTime;
    private int id;
    private AnimalEnum type;
    
    public Animal(int id, AnimalEnum type) {
        this.id = id;
        this.feededTime = 0;
        this.feeded = false;
        this.type = type;
    }
    
    public Animal(AnimalEnum type) {
        this.id = 0;
        this.feededTime = 0;
        this.feeded = false;
        this.type = type;
    }
    
    public boolean isFeeded() {
        return this.feeded;    
    }
    
    public long getFeededTime() {
        return this.feededTime;
    }
    
    public int getId() {
        return this.id;
    }
    
    public void setId(int id) {
        this.id = id;    
    }
    
    public AnimalEnum getType() {
        return this.type;    
    }
}
