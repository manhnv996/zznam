package model;

import config.enums.ErrorLog;
import config.enums.FieldStatusType;
import config.enums.ProductType;
import static config.utils.ProductUtil.getProductObjByType;
import java.util.Date;

public class Field extends CoordinateObject {
    
    private int fieldId;
    private String plantType;
    private Date plantedTime;
    
    public Field(int fieldId, int x, int y) {
        super(x, y);
        
        this.fieldId = fieldId;
        this.init();
    }
    
    public void init(){
        this.plantType = null;
        this.plantedTime = null;
    }

    public String getPlantType() {
        return plantType;
    }

    public void setPlantType(String plantType) {
        this.plantType = plantType;
    }

    public Date getPlantedTime() {
        return plantedTime;
    }

    public void setPlantedTime(Date plantedTime) {
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
                this.setPlantedTime(new Date());

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

                //  add exp
                user.addExp(getProductObjByType((this.plantType)).harvestExp);

                String productCrop = this.plantType;
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
    
    public Date getCropTime(){
        if (this.plantType == null){
            return null;
        }

        long intTime = this.plantedTime.getTime();
        Date cropTime = new Date();
        
        //cropTime.setTime(parseTime + getProductObjByType(this.plantType).time * 1000);
        cropTime.setTime(intTime + 6000);     //HERE IS TEST

        return cropTime;
    }
    
    public FieldStatusType checkStatus(){
        
        if (this.plantType != null){
            Date currentTime = new Date();

            if (currentTime.after(this.getCropTime())){
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
                
                //this.plantedTime.setTime(intDate - getProductObjByType(this.plantType).time * 1000);
                this.plantedTime.setTime(intDate - 6000);   //HERE IS TEST

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
