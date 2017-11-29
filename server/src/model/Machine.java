package model;

import config.enums.AnimalLodgeEnum;
import config.enums.MachineTypeEnum;

import java.util.ArrayList;
import java.util.List;


public class Machine extends ConstructedObject {

    private int id;
    private MachineTypeEnum type;
    private List<String> listProductType;
    private int slot;
    private long startBuildTime;
    
    public Machine(int id, MachineTypeEnum type, int slot, long startBuildTime, boolean completed, int x, int y) {
        super(startBuildTime, completed, x, y);
        
        this.listProductType = new ArrayList<>();
        this.id = id;
        this.type = type;
        this.slot = slot;
    }
    
    public List<String> getListProductType() {
        return this.listProductType;
    }
    
    public int getId () {
        return this.id;
    }
    
    public void setId (int id) {
        this.id = id;
    }
}
