package config.jsonobject.map;

public class NaturalObject {
    public int id;
    public String type;
    public int x;
    public int y;
    
    public NaturalObject(String id, String type, String x, String y) {
        this.type = type;
        this.id = Integer.parseInt(id);
        this.x = Integer.parseInt(x);
        this.y = Integer.parseInt(y);
    }
}
