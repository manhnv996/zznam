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
    
    public Asset(Storage foodStorage, Storage warehouse, 
                 List<Field> fieldList, List<NatureThing> natureThingList) {
        super();
        
        this.foodStorage = foodStorage;
        this.warehouse = warehouse;
//        this.fieldList = (fieldList == null) ? new ArrayList<>() : fieldList;
        this.fieldList = new ArrayList<Field>();
        if (fieldList != null){
            this.fieldList = fieldList;
        }
        if (natureThingList == null) {
            this.natureThingList = new ArrayList<>();
        } else {
            this.natureThingList = natureThingList;
        }
        this.animalLodgeList = new ArrayList<>();
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
    
    
    
    
    //
    public boolean addField(Field field){
        
        this.fieldList.add(field);
        this.fieldList.get(this.fieldList.size() - 1).setFieldId(this.fieldList.size() - 1);
        
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
}
