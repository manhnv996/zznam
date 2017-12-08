package model;

import java.util.Date;

public class ConstructedObject extends CoordinateObject {
    private boolean boostBuild;
    private boolean completed;
    private long startBuildTime;
    
    public ConstructedObject(long startBuildTime, boolean boostBuild, boolean completed, int x, int y) {
        super(x, y);
        this.completed = completed;
        this.boostBuild = boostBuild;
        this.startBuildTime = startBuildTime;
    }
    
    public boolean isBoostBuild() {
        return this.boostBuild;
    }
    
    public boolean isCompleted() {
        return this.completed;
    }
    
    public long getStartBuildTime() {
        return this.startBuildTime;    
    }
    
    public void setCompleted() {
        this.completed = true;
    }
    
    public void setBoostBuild() {
        this.boostBuild = true;
    }
    
}
