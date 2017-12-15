package model;

import config.enums.ErrorLog;

import java.util.ArrayList;
import java.util.List;

public class MyShop {
    
    private int maxSlot;
    private List<ProductSale> productList;
    private long lastTimeNpcCome;
    
    
    public MyShop(int maxSlot) {
            super();
        
        this.maxSlot = maxSlot;
        this.productList = new ArrayList<>();
        this.lastTimeNpcCome = 0;
    }


    public void setMaxSlot(int maxSlot) {
        this.maxSlot = maxSlot;
    }

    public int getMaxSlot() {
        return maxSlot;
    }

    public void setProductList(List<ProductSale> productList) {
        this.productList = productList;
    }

    public List<ProductSale> getProductList() {
        return productList;
    }

    public void setLastTimeNpcCome(long lastTimeNpcCome) {
        this.lastTimeNpcCome = lastTimeNpcCome;
    }

    public long getLastTimeNpcCome() {
        return lastTimeNpcCome;
    }


//
    public short sell(ZPUserInfo user, int slot, ProductSale product){
        if (this.productList.size() < this.maxSlot){
            if (user.getAsset().getQuantityOfTwoStorageByProductId(product.getProduct().getTypeItem()) >= product.getProduct().getQuantity()){
                if (user.reduceGold(product.getPrice())){
                    
                    this.productList.add(product);
                    product.setSlot(slot);
                    user.getAsset().takeItemToStorageById(product.getProduct().getTypeItem(), product.getProduct().getQuantity());

//                    return true;
                    return ErrorLog.SUCCESS.getValue();
                }
                return ErrorLog.ERROR_GOLD_NOT_REDUCE.getValue();
            }
            return ErrorLog.ERROR_STORAGE_NOT_REDUCE.getValue();
        }
        return ErrorLog.ERROR_OVER_MAX_SLOT.getValue();
//        return false;
    }
    
    public boolean buy(){
        /*
         * NOT YET STARTED
         */
        return false;
    }
    
    
    public int getProductIdBySlot(int slot){
        for (int i = 0; i < this.productList.size(); i++){
            if (this.productList.get(i).getSlot() == slot){
                return i;
            }
        }
        return -1;
    }
    
      
    public short receiveMoneyFromSoldProduct(ZPUserInfo user, int slot){
        int index = this.getProductIdBySlot(slot);
        if (index < 0){
            return ErrorLog.ERROR_NOT_EXIST_SLOT.getValue();
        }
        
        if (this.productList.get(index).isIsSold()){
            user.addGold(this.productList.get(index).getPrice());

            this.productList.remove(index);
            
            return ErrorLog.SUCCESS.getValue();
        }
        return ErrorLog.ERROR_NOT_EXIST_SLOT.getValue();
    }
    
    
    public boolean unlockSlot(){
        /*
         * NOT YET STARTED
         */
        return false;
    }
}
