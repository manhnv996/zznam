package model;

import java.util.List;

import util.database.DataModel;

public class Order extends DataModel{
    
    private int orderId;
    private List<StorageItem> itemList;
    
    public Order(int orderId, List<StorageItem> itemList) {
        super();
        
        this.orderId = orderId;
        this.itemList = itemList;
    }


    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setItemList(List<StorageItem> itemList) {
        this.itemList = itemList;
    }

    public List<StorageItem> getItemList() {
        return itemList;
    }

    
    //
    public int getOrderPrice(){
        /*
         * agrs(tham so level, he so(=3.5))
         */
        return 0;
    }
    
    public int getOrderExp(){
        
        return 0;
    }
    
    
    

}
