package model;

import config.enums.ErrorLog;

import config.enums.NPCresAni;

import config.jsonobject.ProductConfig;

import config.utils.OrderNPCUtil;
import config.utils.OrderUtil;

import config.utils.ProductUtil;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.List;

public class OrderNPC {
    
    private int orderId;
    private StorageItem orderItem;
    private int orderPrice;
    private final int orderExp = 5;
    private long waittingTime;
    
    private String npcResAni;
    
    
    public OrderNPC(ZPUserInfo user) {
        super();
        
//        this.orderItem = null;
//        super.setWaittingTime(new Date().getTime());        
        this.waittingTime = 0;
        this.createOrder(user);
    }


    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }



    public void setOrderItem(ZPUserInfo user) {
        
        this.orderItem = OrderNPCUtil.randomProductConfByCategory(user, OrderNPCUtil.randomCategoryNPC());
    }

    public StorageItem getOrderItem() {
        return orderItem;
    }


    public void setOrderPrice() {
        if (this.orderItem == null){
            this.orderPrice = 0;
            
            return;
        }
        
        ProductConfig product = ProductUtil.getProductConfObjByType(this.orderItem.getTypeItem());
        this.orderPrice = (int) this.orderItem.getQuantity() * product.maxPrice / 2;
    }

    public int getOrderPrice() {
        if (this.orderItem == null){
            this.orderPrice = 0;
            
            return 0;
        }
        
        ProductConfig product = ProductUtil.getProductConfObjByType(this.orderItem.getTypeItem());
        this.orderPrice = (int) this.orderItem.getQuantity() * product.maxPrice / 2;
        
        return this.orderPrice;
    }

    public int getOrderExp() {
        if (this.orderItem != null){
            return this.orderExp;
        }
        return 0;
    }


    public void setWaittingTime(long waittingTime) {
        this.waittingTime = waittingTime;
    }

    public long getWaittingTime() {
        return waittingTime;
    }


//    public List<String> getNpcResAniRemain(ZPUserInfo user) {
//        List<String> resRemain = new ArrayList<>();
//        for (int i = 0; i < NPCresAni.getListNPCresAni().length; i++){
//            resRemain.add(NPCresAni.getListNPCresAni()[i]);
//        }
//        Collections.sort(resRemain);
//        for (int j = 0; j < resRemain.size(); j++){
//            
//        }
//        List<String> resCurr = new ArrayList<>();
//        for (int i = 0; i < user.getAsset().getOrderNPCList().size(); i++){
//            resCurr.add(user.getAsset().getOrderNPCList().get(i).getNpcResAni());
//        }
//        Collections.sort(resRemain);
//        
//        for (int i = 0; i < resRemain.size(); i++){
//            for (int j = 0; j < resCurr.size(); j++){
//                if (resRemain.get(i).co)
//            }
//        }
//    }

    public void setNpcResAni(ZPUserInfo user) {
        List<String> filter = new ArrayList<>();
        List<OrderNPC> npcList = user.getAsset().getOrderNPCList();
        for (int i = 0; i < npcList.size(); i++){
            filter.add(npcList.get(i).getNpcResAni());
        }
        
        List<String> listRes = NPCresAni.getListNPCresAni();
        List<String> collect = new ArrayList<>(NPCresAni.filterRes(listRes, filter));
        
        this.npcResAni = collect.get((int) Math.floor(Math.random() * (listRes.size() - filter.size()) * 0.99));
    }

    public String getNpcResAni() {
        return npcResAni;
    }



    //    @Override
    public short createOrder(ZPUserInfo user) {
        if ((this.waittingTime + OrderNPCUtil.getNPCRemainTime(user.getLevel()) * 60 * 1000 - 5000) <= new Date().getTime()){
//        if ((this.waittingTime + OrderNPCUtil.getNPCRemainTime(user.getLevel()) * 5 * 1000 - 5000) <= new Date().getTime()){

            this.waittingTime = 0;
            this.setOrderItem(user);
            
            this.setOrderPrice();
            
            this.setNpcResAni(user);
//            return true;
            return ErrorLog.SUCCESS.getValue();
        }
        
        return ErrorLog.SUCCESS.getValue();
    }
    
    
    
    //
//    @Override
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
        this.setWaittingTime(new Date().getTime());
        this.orderItem = null;
        
        return ErrorLog.SUCCESS.getValue();
    }
    
    
    
    public short makeOrderByRuby(ZPUserInfo user) {
        if (this.orderItem == null){
            /*
             * done
             * RETURN FALSE;
             */
            return ErrorLog.ERROR_ORDER_NOT_COMPLETE.getValue();
        }
        
        StorageItem missingItem = new StorageItem(this.orderItem.getTypeItem(), user.getAsset().getQuantityOfTwoStorageByProductId(this.orderItem.getTypeItem()));
        
    
        if (missingItem.getQuantity() > 0){
            if (this.orderItem.getTypeItem().contains("crop_")){
                if (!user.getAsset().getFoodStorage().takeItem(missingItem.getTypeItem(), missingItem.getQuantity())){
                    return ErrorLog.ERROR_STORAGE_NOT_REDUCE.getValue();
                }
            } else {
                if (!user.getAsset().getWarehouse().takeItem(missingItem.getTypeItem(), missingItem.getQuantity())){
                    return ErrorLog.ERROR_STORAGE_NOT_REDUCE.getValue();
                }
            }
        }
        
        user.addGold(this.getOrderPrice());
        user.addExp(this.getOrderExp());
        //        
        this.setWaittingTime(new Date().getTime());
        this.orderItem = null;
        
        return ErrorLog.SUCCESS.getValue();
    }
    
    
    
    
//    @Override
    public short cancelOrder(){
        //        
        this.setWaittingTime(new Date().getTime());
        this.orderItem = null;
        
        this.setOrderPrice();
        
        return ErrorLog.SUCCESS.getValue();
        /*
         * done
         */
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
//    private StorageItem orderItem;
//    
//    public OrderNPC(ZPUserInfo user) {
//        super();
//        
////        this.orderItem = null;
////        super.setWaittingTime(new Date().getTime());        
//        this.setWaittingTime(0);
//        this.createOrder(user);
//    }
//
//
//    public void setOrderItem(ZPUserInfo user) {
//        
//        this.orderItem = OrderNPCUtil.randomProductConfByCategory(user, OrderNPCUtil.randomCategoryNPC());
//    }
//
//    public StorageItem getOrderItem() {
//        return orderItem;
//    }
//
//
//    @Override
//    public int getOrderPrice() {
//        // TODO Implement this method
//        /*
//         * done
//         */
//        if (this.orderItem != null){
//            ProductConfig product = ProductUtil.getProductConfObjByType(this.orderItem.getTypeItem());
//            return (int) this.orderItem.getQuantity() * product.maxPrice / 2;
//        }
//        return 0;
//    }
//
//    @Override
//    public int getOrderExp() {
//        // TODO Implement this method
//        /*
//         * done
//         */
//        if (this.orderItem != null){
//            return 5;
//        }
//        return 0;
//    }
//
//
//
//    //    @Override
//    public short createOrder(ZPUserInfo user) {
//        if ((super.getWaittingTime() + OrderNPCUtil.getNPCRemainTime(user.getLevel()) * 60 * 1000 - 5000) <= new Date().getTime()){
//            
//            this.setOrderItem(user);
//            super.setWaittingTime(0);
//            
////            return true;
//            return ErrorLog.SUCCESS.getValue();
//        }
//        
//        return ErrorLog.SUCCESS.getValue();
//    }
//    
//    
//    
//    //
//    @Override
//    public short makeOrder(ZPUserInfo user){
//        
//        if (this.orderItem == null){
//            /*
//             * done
//             * RETURN FALSE;
//             */
//            return ErrorLog.ERROR_ORDER_NOT_COMPLETE.getValue();
//        }
//        
//        if (this.orderItem.getTypeItem().contains("crop_")){
//            if (!user.getAsset().getFoodStorage().takeItem(this.orderItem.getTypeItem(), this.orderItem.getQuantity())){
//                return ErrorLog.ERROR_STORAGE_NOT_REDUCE.getValue();
//            }
//        } else {
//            if (!user.getAsset().getWarehouse().takeItem(this.orderItem.getTypeItem(), this.orderItem.getQuantity())){
//                return ErrorLog.ERROR_STORAGE_NOT_REDUCE.getValue();
//            }
//        }
//        
//        user.addGold(this.getOrderPrice());
//        user.addExp(this.getOrderExp());
//        //        
//        super.setWaittingTime(new Date().getTime());
//        this.orderItem = null;
//        
//        return ErrorLog.SUCCESS.getValue();
//    }
//    
////    @Override
//    public short cancelOrder(ZPUserInfo user){
//        //        
//        super.setWaittingTime(new Date().getTime());
//        this.orderItem = null;
//        
//        return ErrorLog.SUCCESS.getValue();
//        /*
//         * done
//         */
//    }
    
    
    

}
