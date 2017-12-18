package model;

import config.enums.DeliveryStatus;
import config.enums.ErrorLog;

public class Car {
    
    private int deliveryPrice;
    private int deliveryExp;
    
    private short status;
    
    public Car() {
        super();
        
        this.updateDelivery(0, 0);
    }


    public void setDeliveryPrice(int deliveryPrice) {
        this.deliveryPrice = deliveryPrice;
    }

    public int getDeliveryPrice() {
        return deliveryPrice;
    }

    public void setDeliveryExp(int deliveryExp) {
        this.deliveryExp = deliveryExp;
    }

    public int getDeliveryExp() {
        return deliveryExp;
    }

    public void setStatus(short status) {
        this.status = status;
    }

    public short getStatus() {
        return status;
    }



    public void updateDelivery(int deliveryPrice, int deliveryExp){
        this.deliveryPrice = deliveryPrice;
        this.deliveryExp = deliveryExp;
        
        if (this.deliveryPrice > 0) {
            this.status = DeliveryStatus.RECEIVABLE.getValue();
        } else {
            this.status = DeliveryStatus.EMPTY.getValue();
        }
    }

    //
    public short receive(ZPUserInfo user){
        if (this.getStatus() == DeliveryStatus.RECEIVABLE.getValue()){
            user.addGold(this.deliveryPrice);
            user.addExp(this.deliveryExp);
            //
            this.updateDelivery(0, 0);
            
            return ErrorLog.SUCCESS.getValue();
        }
        return ErrorLog.ERROR_ORDER_NOT_COMPLETE.getValue();
    }

}
