package model;

import java.awt.Point;

import service.DemoHandler.DemoDirection;
import service.DemoHandler.MaxPosition;

import util.database.DataModel;

public class ZPUserInfo extends DataModel {
    // Zing me
    public int id;
    public String name;
    public long exp = 0L;
    public int level = 0;
    
    public Point position;

    public ZPUserInfo(int _id, String _name) {
        super();
        id = _id;
        name = _name;
        position = new Point(0, 0);
    }

    public String toString() {
        return String.format("%s|%s", new Object[] { id, name });
    }
    
    public Point move(short direction){        
        if (direction == DemoDirection.UP.getValue()){
            position.x++;
        }
        else if (direction == DemoDirection.DOWN.getValue()){
            position.x--;
        }
        else if (direction == DemoDirection.RIGHT.getValue()){
            position.y++;
        }
        else{
            position.y--;
        }
        
        position.x = position.x % MaxPosition.X;
        position.y = position.y % MaxPosition.Y;
                
        return position;
    }
}
