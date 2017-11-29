package model;

public class Animal {
    private boolean feeded;
    private long feededTime;
    private int id;
    
    public Animal(int id) {
        this.id = id;
        this.feededTime = 0;
        this.feeded = false;
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
}
