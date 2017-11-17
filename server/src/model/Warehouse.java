package model;

public class Warehouse extends Storage {
    
    public Warehouse(Coordinate coordinate, int capacity) {
        super(coordinate, capacity);
        
    }

    @Override
    public boolean upgrade() {
        // TODO Implement this method
        return false;
    }
}
