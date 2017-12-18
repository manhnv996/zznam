package model;

import config.enums.ErrorLog;
import config.enums.FieldStatusType;
import config.enums.ProductType;
import static config.utils.ProductUtil.getProductObjByType;
import java.util.Date;
import java.util.zip.DataFormatException;

public class Field extends CoordinateObject {
    
    private int fieldId;
    private String plantType;
    private long plantedTime;
    
    public Field(int fieldId, int x, int y) {
        super(x, y);
        
        this.fieldId = fieldId;
        this.init();
    }
    
    public Field(int x, int y) {
        super(x, y);
        this.fieldId = 0;
    }
    
    public void init(){
        this.plantType = null;
        this.plantedTime = 0;
    }

    public String getPlantType() {
        return plantType;
    }

    public void setPlantType(String plantType) {
        this.plantType = plantType;
    }
    
    public long getPlantedTime() {
        return plantedTime;
    }

    public void setPlantedTime(long plantedTime) {
        this.plantedTime = plantedTime;
    }

    public int getFieldId(){
        return this.fieldId;
    }
    
    public void setFieldId(int fieldId){
        this.fieldId = fieldId;
        
    }


    //
    public short plant(ZPUserInfo user, String productType){
        //return error code
        if (checkStatus() == FieldStatusType.EMPTY) {
            if (user.getAsset().getFoodStorage().takeItem(productType, 1)){
                this.setPlantType(productType);
                this.setPlantedTime(new Date().getTime());

//                return true;
                return ErrorLog.SUCCESS.getValue();
            } else {
                return ErrorLog.ERROR_STORAGE_NOT_REDUCE.getValue();
            }
        }
        return ErrorLog.ERROR_FIELD_STATUS_NOT_EMPTY.getValue();
//        return false;
    }
    
    public short crop(ZPUserInfo user){
        if (this.checkStatus() == FieldStatusType.DONE){            
            if (user.getAsset().getFoodStorage().addItem(this.plantType, 2)){

                user.addExp(getProductObjByType((this.plantType)).harvestExp);
//                String productCrop = this.plantType;
                this.init();

//                return true;
                return ErrorLog.SUCCESS.getValue();
            } else {
                return ErrorLog.ERROR_STORAGE_NOT_ADD.getValue();
            }
        }
        return ErrorLog.ERROR_FIELD_STATUS_NOT_DONE.getValue();
//        return false;
    }
    
    public long getCropTime(){
        if (this.plantType == null){
            return 0;
        }
//        return (this.plantedTime + 6000);
        return (this.plantedTime + getProductObjByType(this.plantType).time * 1000);
    }
    
    public FieldStatusType checkStatus(){
        if (this.plantType != null){
            long currentTime = new Date().getTime();
            
            if (currentTime >= getCropTime()){
                return FieldStatusType.DONE;
            } else {
                return FieldStatusType.GROWING;
            }

        } else {
            return FieldStatusType.EMPTY;
        }        
    }
    
    public short boost(ZPUserInfo user){
        if (this.checkStatus() == FieldStatusType.GROWING){
            
            if (user.reduceRuby(1)){
                Date date = new Date();
                long intDate = date.getTime();  
                
                this.plantedTime = intDate - getProductObjByType(this.plantType).time * 1000;
//                this.plantedTime = intDate - 6000;   //HERE IS TEST

//                return true;
                return ErrorLog.SUCCESS.getValue();
            } else {
                return ErrorLog.ERROR_RUBY_NOT_REDUCE.getValue();
            }
        }
        return ErrorLog.ERROR_FIELD_STATUS_NOT_GROWING.getValue();
//        return false;
    }

}
