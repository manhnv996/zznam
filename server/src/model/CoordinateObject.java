package model;

import util.database.DataModel;

public class CoordinateObject extends DataModel {
    
    private int x;
    private int y;
    
    public CoordinateObject(int x, int y) {
        super();
        
        this.x = x;
        this.y = y;
    }
    
    
    public int getX(){
        return this.x;
    }
    public int getY(){
        return this.y;
    }

    public void setX(int x) {
        this.x = x;
    }

    public void setY(int y) {
        this.y = y;
    }
    
    
}
