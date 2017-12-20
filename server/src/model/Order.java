package model;

import config.enums.ErrorLog;

import config.jsonobject.ProductConfig;

import config.utils.OrderUtil;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import util.database.DataModel;

public class Order extends DataModel{
    
    private int orderId;
    private List<StorageItem> itemList;
    
    private int orderPrice;
    private int orderExp;
    
    private long waittingTime;
    
    
    public Order(){
        super();
        
    }
    
    public Order(ZPUserInfo user, int level) {
        super();
        
        this.waittingTime = 0;
        this.createOrder(user, level);
    }
    


    public short createOrder(ZPUserInfo user, int level){
        if ((this.waittingTime + OrderUtil.getRemainTime(level) * 60 * 1000 - 5000) <= new Date().getTime()){
            this.setItemList(user, level);
            this.setOrderPrice(level);
            this.setOrderExp(level);
            
            this.waittingTime = 0;
            
            return ErrorLog.SUCCESS.getValue();
        }
        return ErrorLog.SUCCESS.getValue();
    }
    

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getOrderId() {
        return orderId;
    }

//
    public void setItemList(ZPUserInfo user, int level) {
        List<ProductConfig> productList = OrderUtil.randomTypeProduct(user, level);
        this.itemList = OrderUtil.randomQuantityOfProductList(level, productList);
        
    }

    public List<StorageItem> getItemList() {
        return itemList;
    }


//
    public void setOrderPrice(int level) {
        this.orderPrice = OrderUtil.getOrderPrice(level, itemList);
        
    }

    public int getOrderPrice() {
        return orderPrice;
    }

    public void setOrderExp(int level) {
        this.orderExp = OrderUtil.getOrderExp(level, this.itemList);
        
    }

    public int getOrderExp() {
        return orderExp;
    }

    public void setWaittingTime(long waittingTime) {
        this.waittingTime = waittingTime;
    }

    public long getWaittingTime() {
        return waittingTime;
    }
    
    
    
    //
    public List<StorageItem> checkMissingItem(ZPUserInfo user){
        
        List<StorageItem> missingItemList = new ArrayList<>();
        for (int i = 0; i < this.itemList.size(); i++){
            if (this.itemList.get(i).getQuantity() > user.getAsset().getQuantityOfTwoStorageByProductId(this.itemList.get(i).getTypeItem())){
                missingItemList.add(new StorageItem(this.itemList.get(i).getTypeItem(),
                    this.itemList.get(i).getQuantity() - user.getAsset().getQuantityOfTwoStorageByProductId(this.itemList.get(i).getTypeItem())));
            }
        }
        return missingItemList;
    }
    
    public List<StorageItem> checkRemainItem(ZPUserInfo user){
        
        List<StorageItem> remainItemList = new ArrayList<>();
        for (int i = 0; i < this.itemList.size(); i++){
            if (this.itemList.get(i).getQuantity() <= user.getAsset().getQuantityOfTwoStorageByProductId(this.itemList.get(i).getTypeItem())){
                remainItemList.add(new StorageItem(this.itemList.get(i).getTypeItem(), this.itemList.get(i).getQuantity()));
            } else if (user.getAsset().getQuantityOfTwoStorageByProductId(this.itemList.get(i).getTypeItem()) > 0){
                remainItemList.add(new StorageItem(this.itemList.get(i).getTypeItem(), user.getAsset().getQuantityOfTwoStorageByProductId(this.itemList.get(i).getTypeItem())));
            }
        }
        return remainItemList;
    }
    
    
    
    //
    public short makeOrder(ZPUserInfo user){
        
        for (int i = 0; i < this.itemList.size(); i++){
            if (user.getAsset().getFoodStorage().takeItem(this.itemList.get(i).getTypeItem(), this.itemList.get(i).getQuantity())){
                continue;
            } else if (user.getAsset().getWarehouse().takeItem(this.itemList.get(i).getTypeItem(), this.itemList.get(i).getQuantity())){
                continue;
            } else {
                
                return ErrorLog.ERROR_STORAGE_NOT_REDUCE.getValue();
            }
        }
        
        //
        user.getAsset().getCar().updateDelivery(this.getOrderPrice(), this.getOrderExp());
        //        
        this.waittingTime = 0;
        this.createOrder(user, user.getLevel());
        
        return ErrorLog.SUCCESS.getValue();
    }
    
    
    public short makeOrderByRuby(ZPUserInfo user){
        List<StorageItem> remainItemList = this.checkRemainItem(user);
        for (int i = 0; i < remainItemList.size(); i++){
            if (user.getAsset().getFoodStorage().takeItem(remainItemList.get(i).getTypeItem(), remainItemList.get(i).getQuantity())){
                continue;
            } else if (user.getAsset().getWarehouse().takeItem(remainItemList.get(i).getTypeItem(), remainItemList.get(i).getQuantity())){
                continue;
            } else {
                
                return ErrorLog.ERROR_STORAGE_NOT_REDUCE.getValue();
            }
        }
        
        //
        user.getAsset().getCar().updateDelivery(this.getOrderPrice(), this.getOrderExp());
        //        
        this.waittingTime = 0;
        this.createOrder(user, user.getLevel());
        
        return ErrorLog.SUCCESS.getValue();
    }
    
    
    
    public short cancelOrder(){
        this.itemList = new ArrayList<>();
        this.orderPrice = 0;
        this.orderExp = 0;
        
        this.waittingTime = new Date().getTime();
        
        return ErrorLog.SUCCESS.getValue();
    }
    
    public short boostWait(ZPUserInfo user){
        
        if (user.reduceRuby(3)){
            //        
            this.waittingTime = 0;
            this.createOrder(user, user.getLevel());
            
            return ErrorLog.SUCCESS.getValue();
        }
        
        return ErrorLog.ERROR_RUBY_NOT_REDUCE.getValue();
    }

}
