package model;

import config.enums.ErrorLog;

import config.jsonobject.ProductConfig;

import config.utils.OrderNPCUtil;
import config.utils.OrderUtil;

import config.utils.ProductUtil;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class OrderNPC extends Order {
    
    private StorageItem orderItem;
    
    public OrderNPC(ZPUserInfo user) {
        super();
        
//        this.orderItem = null;
//        super.setWaittingTime(new Date().getTime());        
        this.setWaittingTime(0);
        this.createOrder(user);
    }


    public void setOrderItem(ZPUserInfo user) {
        
        this.orderItem = OrderNPCUtil.randomProductConfByCategory(user, OrderNPCUtil.randomCategoryNPC());
    }

    public StorageItem getOrderItem() {
        return orderItem;
    }


    @Override
    public int getOrderPrice() {
        // TODO Implement this method
        /*
         * done
         */
        if (this.orderItem != null){
            ProductConfig product = ProductUtil.getProductConfObjByType(this.orderItem.getTypeItem());
            return (int) this.orderItem.getQuantity() * product.maxPrice / 2;
        }
        return 0;
    }

    @Override
    public int getOrderExp() {
        // TODO Implement this method
        /*
         * done
         */
        if (this.orderItem != null){
            return 5;
        }
        return 0;
    }



    //    @Override
    public short createOrder(ZPUserInfo user) {
        if ((super.getWaittingTime() + OrderNPCUtil.getNPCRemainTime(user.getLevel()) * 60 * 1000 - 5000) <= new Date().getTime()){
            
            this.setOrderItem(user);
            super.setWaittingTime(0);
            
//            return true;
            return ErrorLog.SUCCESS.getValue();
        }
        
        return ErrorLog.SUCCESS.getValue();
    }
    
    
    
    //
    @Override
    public short makeOrder(ZPUserInfo user){
        
        if (this.orderItem == null){
            /*
             * done
             * RETURN FALSE;
             */
            return ErrorLog.ERROR_ORDER_NOT_COMPLETE.getValue();
        }
        
        if (this.orderItem.getTypeItem().contains("crop_")){
            if (!user.getAsset().getFoodStorage().takeItem(this.orderItem.getTypeItem(), this.orderItem.getQuantity())){
                return ErrorLog.ERROR_STORAGE_NOT_REDUCE.getValue();
            }
        } else {
            if (!user.getAsset().getWarehouse().takeItem(this.orderItem.getTypeItem(), this.orderItem.getQuantity())){
                return ErrorLog.ERROR_STORAGE_NOT_REDUCE.getValue();
            }
        }
        
        user.addGold(this.getOrderPrice());
        user.addExp(this.getOrderExp());
        //        
        super.setWaittingTime(new Date().getTime());
        this.orderItem = null;
        
        return ErrorLog.SUCCESS.getValue();
    }
    
//    @Override
    public short cancelOrder(ZPUserInfo user){
        //        
        super.setWaittingTime(new Date().getTime());
        this.orderItem = null;
        
        return ErrorLog.SUCCESS.getValue();
        /*
         * done
         */
    }
    
    
    

}
