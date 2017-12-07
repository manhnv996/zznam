package model;

import config.enums.AnimalLodgeEnum;
import config.enums.MachineTypeEnum;

import config.jsonobject.MachineConfig;

import config.utils.ConfigContainer;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


public class Machine extends ConstructedObject {

    private int id;
    private MachineTypeEnum type;
    private int slot;
    private long startTime;
    private List<String> productQueue;

    public Machine(int id, MachineTypeEnum type, int slot, long startBuildTime, boolean boostBuild, boolean completed, int x, int y) {
        super(startBuildTime, boostBuild, completed, x, y);
        
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
    
    public int getRetainTime() {
        MachineConfig machineConfig = ConfigContainer.getMachineConfigByType(this.type.toString());
        long curTime = new Date().getTime();
        int buildTime = (int) Math.floor((curTime - getStartBuildTime()) / 1000);
        int retainTime = machineConfig.time - buildTime;
        return retainTime;
    }
}
