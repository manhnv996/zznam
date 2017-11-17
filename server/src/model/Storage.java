package model;

import java.util.List;

public abstract class Storage extends CoordinateObject {
    
    private int capacity;
    private List<StorageItem> itemList;
    
    public Storage(Coordinate coordinate, int capacity) {
        super(coordinate);
        
        this.capacity = capacity;
    }
    
    
    public abstract boolean upgrade();
    
}
