package model;

public class NatureThing extends CoordinateObject {
    private String type;
    private int id;
    
    public NatureThing(int id, String type, int x, int y) {
        super(x, y);
        this.id = id;
        this.type = type;
    }
    
    public String getType() {
        return this.type;    
    }
    
    public int getId() {
        return this.id;    
    }
}
