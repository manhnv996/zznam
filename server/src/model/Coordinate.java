package model;

import util.database.DataModel;

public class Coordinate extends DataModel {
    
    private int x;
    private int y;
    
    public Coordinate(int x, int y) {
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
    
}
