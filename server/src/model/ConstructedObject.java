package model;

public class ConstructedObject extends CoordinateObject {
    private boolean completed;
    private long startBuildTime;
    private int id;
    
    public ConstructedObject(int id, long startBuildTime, boolean completed, int x, int y) {
        super(x, y);
        this.completed = false;
        this.startBuildTime = startBuildTime;
        this.id = id;
    }
    
    public int getId() {
        return this.id;
    }
    
    public boolean isCompleted() {
        return this.completed;
    }
    
    public long getStartBuildTime() {
        return this.startBuildTime;    
    }
}
