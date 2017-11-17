package model;

import java.util.List;

import util.database.DataModel;

public class Asset extends DataModel {
    
    private FoodStorage foodStorage;
    private Warehouse warehouse;
    private List<Field> fieldList;
    
    public Asset(FoodStorage foodStorage, Warehouse warehouse, List<Field> fieldList) {
        super();
        
        this.foodStorage = foodStorage;
        this.warehouse = warehouse;
        this.fieldList = fieldList;
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
            if (this.fieldList.get(i).getCoordinate().getX() == xl && 
                this.fieldList.get(i).getCoordinate().getY() == yl ){
                
                return this.fieldList.get(i);
                
            }
        }
        
        return null;
    }
}
