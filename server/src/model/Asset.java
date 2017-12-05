package model;

import java.util.ArrayList;
import java.util.List;

import util.database.DataModel;

public class Asset {
    
    private Storage foodStorage;
    private Storage warehouse;
    private List<Field> fieldList;
    private List<NatureThing> natureThingList;
    private List<AnimalLodge> animalLodgeList;
    private List<Machine> machineList;
    
    public Asset(Storage foodStorage,
                 Storage warehouse, 
                 List<Field> fieldList,
                 List<NatureThing> natureThingList,
                 List<AnimalLodge> animalLodgeList,
                 List<Machine> machineList
                 ) {
        super();
        
        this.foodStorage = foodStorage;
        this.warehouse = warehouse;
        
        this.fieldList = fieldList == null ? new ArrayList<Field>() : fieldList;
        this.natureThingList = natureThingList == null ? new ArrayList<NatureThing>() : natureThingList;
        this.animalLodgeList = animalLodgeList == null ? new ArrayList<AnimalLodge>() : animalLodgeList;
        this.machineList = machineList == null ? new ArrayList<Machine>() : machineList;
    }

    
    public Storage getFoodStorage() {
        return foodStorage;
    }

    public Storage getWarehouse() {
        return warehouse;
    }

    public List<Field> getFieldList() {
        return fieldList;
    }
    
    public List<Machine> getMachineList ()  {
        return this.machineList;
    }
    
    
    
    //
    public boolean addField(Field field){
        this.fieldList.add(field);
        if (field.getFieldId() == 0) {
            field.setFieldId(fieldList.size());
        }
        return true;
    }
    
    public Field getFieldById(int fieldId){
        for (int i = 0; i < this.fieldList.size(); i++){
            if (this.fieldList.get(i).getFieldId() == fieldId){
                return this.fieldList.get(i);
            }
        }
        
        return null;
    }
    
    public Field getFieldByPosition(int xl, int yl){
        for (int i = 0; i < this.fieldList.size(); i++){
            if (this.fieldList.get(i).getX() == xl && 
                this.fieldList.get(i).getY() == yl ){
                
                return this.fieldList.get(i);
                
            }
        }
        
        return null;
    }
    
    public List<NatureThing> getNatureThingList() {
        return this.natureThingList;    
    }
    
    public List<AnimalLodge> getAnimalLodgeList() {
        return this.animalLodgeList;
    }
    
    public void addAnimalLodge(AnimalLodge lodge) {
        this.animalLodgeList.add(lodge);
        if (lodge.getId() == 0) {
            lodge.setId(animalLodgeList.size());    
        }
    }
    
    public void addMachine (Machine machine) {
        this.machineList.add(machine);
        if (machine.getId() == 0) {
            machine.setId(machineList.size());
        }
    }
    
    public Machine getMachineById (int id) {
        for (int i = 0; i < this.machineList.size(); i++) {
            if(machineList.get(i).getId() == id) {
                return machineList.get(i);
            }
        }
        return null;
    }
}
