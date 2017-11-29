package model;

import config.enums.AnimalLodgeEnum;
import config.enums.MachineTypeEnum;

import java.util.ArrayList;
import java.util.List;


public class Machine extends ConstructedObject {

    private int id;
    private MachineTypeEnum type;
    private List<String> listType;
    private int slot;
    private long startBuildTime;
    
    public Machine(int id, MachineTypeEnum type, long startBuildTime, boolean completed, int x, int y) {
        super(startBuildTime, completed, x, y);
        
        this.listType = new ArrayList<>();
        this.id = id;
        this.type = type;
    }
}
