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
        for (int i = 0; i < this.maxSlot; i++){
            ProductSale product = new ProductSale(i, null, 0);
            this.productList.add(product);
        }
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


////
//    public short sell(ZPUserInfo user, int slot, ProductSale product){
//        if (this.productList.size() < this.maxSlot){
//            if (user.getAsset().getQuantityOfTwoStorageByProductId(product.getProduct().getTypeItem()) >= product.getProduct().getQuantity()){
//                if (user.reduceGold(product.getPrice())){
//                    
//                    this.productList.add(product);
//                    product.setSlot(slot);
//                    user.getAsset().takeItemToStorageById(product.getProduct().getTypeItem(), product.getProduct().getQuantity());
//
////                    return true;
//                    return ErrorLog.SUCCESS.getValue();
//                }
//                return ErrorLog.ERROR_GOLD_NOT_REDUCE.getValue();
//            }
//            return ErrorLog.ERROR_STORAGE_NOT_REDUCE.getValue();
//        }
//        return ErrorLog.ERROR_OVER_MAX_SLOT.getValue();
////        return false;
//    }
    
//
    public short sell(ZPUserInfo user, int slot, StorageItem product, int price){
        int index = this.getProductIdBySlot(slot);
        if (index >= 0){
            if (user.getAsset().getQuantityOfTwoStorageByProductId(product.getTypeItem()) >= product.getQuantity()){
                
                user.getAsset().takeItemToStorageById(product.getTypeItem(), product.getQuantity());

                this.productList.get(index).updateProductSale(product, price);

                //                    return true;
                return ErrorLog.SUCCESS.getValue();
            }
            return ErrorLog.ERROR_STORAGE_NOT_REDUCE.getValue();
        }
        return ErrorLog.ERROR_OVER_MAX_SLOT.getValue();
//        return false;
    }
    
    public short buy(ZPUserInfo user, ZPUserInfo userSell, int slot){
        /*
         * inprogress
         */
        ProductSale productSale = userSell.getAsset().getMyShop().getProductBySlot(slot);
        if (productSale != null){
            if (productSale.getProduct() != null){
                if (user.reduceGold(productSale.getPrice())){
                    if (user.getAsset().addItemToStorageById(productSale.getProduct().getTypeItem(), 
                                                             productSale.getProduct().getQuantity())){
                        
                        productSale.updateProductSale(null, 0);
                        return ErrorLog.SUCCESS.getValue();
                    }
                    user.addGold(productSale.getPrice());
                }
            }
        }
        //
        return ErrorLog.ERROR_NOT_EXIST_SLOT.getValue();    //
    }
    
    
    public ProductSale getProductBySlot(int slot){
        for (int i = 0; i < this.productList.size(); i++){
            if (this.productList.get(i).getSlot() == slot){
                return this.productList.get(i);
            }
        }
        return null;
    }
    
    public int getProductIdBySlot(int slot){
        for (int i = 0; i < this.productList.size(); i++){
            if (this.productList.get(i).getSlot() == slot){
                return i;
            }
        }
        return -1;
    }
    
//      
//    public short receiveMoneyFromSoldProduct(ZPUserInfo user, int slot){
//        int index = this.getProductIdBySlot(slot);
//        if (index < 0){
//            return ErrorLog.ERROR_NOT_EXIST_SLOT.getValue();
//        }
//        
//        if (this.productList.get(index).isIsSold()){
//            user.addGold(this.productList.get(index).getPrice());
//
//            this.productList.remove(index);
//            
//            return ErrorLog.SUCCESS.getValue();
//        }
//        return ErrorLog.ERROR_NOT_EXIST_SLOT.getValue();
//    }
      
    public short receiveMoneyFromSoldProduct(ZPUserInfo user, int slot){
        int index = this.getProductIdBySlot(slot);
        if (index < 0){
            return ErrorLog.ERROR_NOT_EXIST_SLOT.getValue();
        }
        
        if (this.productList.get(index).isIsSold()){
            user.addGold(this.productList.get(index).getPrice());

            this.productList.get(index).updateProductSale(null, 0);

            return ErrorLog.SUCCESS.getValue();
        }
        return ErrorLog.ERROR_NOT_EXIST_SLOT.getValue();
    }
    
    public short cancelSell(ZPUserInfo user, int slot){
        /*
         * inprogress
         */
        ProductSale productSale = this.getProductBySlot(slot);
        if (productSale != null){
            if (productSale.getProduct() != null){
                if (user.getAsset().addItemToStorageById(productSale.getProduct().getTypeItem(), 
                                                         productSale.getProduct().getQuantity())){
                    
                    productSale.updateProductSale(null, 0);
                    return ErrorLog.SUCCESS.getValue();
                }
            }
        }
        //
        return ErrorLog.ERROR_NOT_EXIST_SLOT.getValue();    //
    }
    
    public short unlockSlot(ZPUserInfo user){
        /*
         *inprogress
         */
        if (user.reduceRuby(6)){
            this.maxSlot ++;
            
            ProductSale productSale = new ProductSale(this.maxSlot - 1, null, 0);
            this.productList.add(productSale);
            
            return ErrorLog.SUCCESS.getValue();
        }
        return ErrorLog.ERROR_RUBY_NOT_REDUCE.getValue();
    }
}
