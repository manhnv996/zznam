package model;

import config.enums.AnimalEnum;

import config.utils.ConfigContainer;

public class Animal {
    private boolean feeded;
    private long feededTime;
    private int id;
    private AnimalEnum type;
    
    public Animal(int id, AnimalEnum type) {
        this.id = id;
        this.feededTime = System.currentTimeMillis();
        this.feeded = false;
        this.type = type;
    }
    
    public Animal(AnimalEnum type) {
        this.id = 0;
        this.feededTime = System.currentTimeMillis();
        this.feeded = false;
        this.type = type;
    }
    
    public boolean isFeeded() {
        return this.feeded;    
    }
    
    public long getFeededTime() {
        return this.feededTime;
    }
    
    public void setFeededTime(long time) {
        this.feededTime = time;    
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

    public void setFeeded(boolean feeded) {
        this.feeded = feeded;
    }

    public void feed() {
        this.feeded = true;
        this.feededTime = System.currentTimeMillis();
    }

    public void harvest() {
        this.feeded = false;
    }
    
    public void boost() {
        if (this.type == AnimalEnum.chicken) {
            this.feededTime -= ConfigContainer.animalConfig.chicken.time * 1000;
        } else if (this.type == AnimalEnum.cow) {
            this.feededTime -= ConfigContainer.animalConfig.cow.time * 1000;
        }
    }
}
