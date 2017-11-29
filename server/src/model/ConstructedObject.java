package model;

public class ConstructedObject extends CoordinateObject {
    private boolean completed;
    private long startBuildTime;
    
    public ConstructedObject(long startBuildTime, boolean completed, int x, int y) {
        super(x, y);
        this.completed = completed;
        this.startBuildTime = startBuildTime;
    }
    
    public boolean isCompleted() {
        return this.completed;
    }
    
    public long getStartBuildTime() {
        return this.startBuildTime;    
    }
}
