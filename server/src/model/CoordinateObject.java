package model;

import util.database.DataModel;

public class CoordinateObject extends DataModel {
    
    private Coordinate coordinate;
    
    public CoordinateObject(Coordinate coordinate) {
        super();
        
        this.coordinate = coordinate;
    }
    
    public Coordinate getCoordinate(){
        return this.coordinate;
        
    }
}
