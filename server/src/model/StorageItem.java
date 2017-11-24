package model;

import util.database.DataModel;

public class StorageItem extends DataModel {
    
    private String typeItem;
//    private String []resourceItem;
    private int quantity;
    
    public StorageItem(String typeItem, int quantity) {
        super();
        
        this.typeItem = typeItem;
//        this.resourceItem = resourceItem;
        this.quantity = quantity;
    }

    
    public String getTypeItem() {
        return typeItem;
    }

    public int getQuantity() {
        return quantity;
    }
    
    
    
    public boolean addQuantity(int value){
        this.quantity += value;
        return true;
    }
    public boolean reduceQuantity(int value){
        if (this.quantity >= value){
            this.quantity -= value;
            return true;
        }
        return false;
    }
}
