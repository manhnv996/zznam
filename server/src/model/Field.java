package model;

import java.util.Date;

public class Field extends CoordinateObject {
    
    private int fieldId;
    private String plantType;
    private Date plantedTime;
    
    public Field(Coordinate coordinate, int fieldId) {
        super(coordinate);
        
        this.fieldId = fieldId;
    }
    
    
    public int getFieldId(){
        return this.fieldId;
    }
    
    public void setFieldId(int fieldId){
        this.fieldId = fieldId;
        
    }
    public Date getCropTime(){
        
        return new Date();
    }
    
    public boolean plant(String seedType){
        
        
        
        return false;
    }
    
    public FieldStatusType checkStatus(){
        if (this.plantType != null){
            Date currentTime = new Date();
    
            if (currentTime.after(getCropTime())){
                return FieldStatusType.DONE;
                
            } else {
                return FieldStatusType.GROWING;
            }
    
        } else {
            return FieldStatusType.EMPTY;
        }
    }
}
