package model;

import util.database.DataModel;

public class StorageItem extends DataModel {
    
    private String typeItem;
    private int quantity;
    
    public StorageItem(String typeItem, int quantity) {
        super();
        
        this.typeItem = typeItem;
        this.quantity = quantity;
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
