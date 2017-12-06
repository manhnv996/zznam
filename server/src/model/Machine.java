package model;

import config.enums.AnimalLodgeEnum;
import config.enums.MachineTypeEnum;

import java.util.ArrayList;
import java.util.List;


public class Machine extends ConstructedObject {

    private int id;
    private MachineTypeEnum type;
    private int slot;
    private long startTime;
    private List<String> productQueue;

    public Machine(int id, MachineTypeEnum type, int slot, long startBuildTime, boolean completed, int x, int y) {
        super(startBuildTime, completed, x, y);
        
        this.productQueue = new ArrayList<>();
        this.id = id;
        this.type = type;
        this.slot = slot;
        this.startTime = 0;
    }
    
    public List<String> getProductQueue() {
        return this.productQueue;
    }
    
    public int getId () {
        return this.id;
    }
    
    public void setId (int id) {
        this.id = id;
    }
    
    public MachineTypeEnum getType () {
        return this.type;
    }
    
    public int getSlot () {
        return this.slot;
    }
    
    public long getStartTime () {
        return this.startTime;
    }
}
