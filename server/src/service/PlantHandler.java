package service;

import bitzero.server.entities.User;
import bitzero.server.extensions.BaseClientRequestHandler;
import bitzero.server.extensions.data.DataCmd;

import bitzero.util.socialcontroller.bean.UserInfo;

import cmd.CmdDefine;
import cmd.receive.demo.RequestBuyItemByRubi;

import cmd.receive.demo.RequestCrop;
import cmd.receive.demo.RequestMove;

import cmd.receive.demo.RequestPlant;
import cmd.receive.demo.RequestPlantBoost;
import cmd.send.demo.ResponseBuyItemByRubi;
import cmd.send.demo.ResponseErrorCode;
import cmd.send.demo.ResponseSyncFieldStatus;

import cmd.send.demo.ResponseMove;

import cmd.send.demo.ResponseSyncFoodStorageItem;

import cmd.send.demo.ResponseSyncStorage;
import cmd.send.demo.ResponseSyncUserInfo;

import config.enums.ErrorLog;
import config.utils.ProductUtil;

import extension.FresherExtension;

import java.awt.Point;

import model.Storage;
import model.StorageItem;
import model.ZPUserInfo;

import org.apache.commons.lang.exception.ExceptionUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class PlantHandler extends BaseClientRequestHandler {
    
    public static short PLANT_MULTI_IDS = 5000;
    private final Logger logger = LoggerFactory.getLogger("PlantHandler");
    
    public PlantHandler() {
        super();
    }

    @Override
    public void handleClientRequest(User user, DataCmd dataCmd) {
        try {
            switch (dataCmd.getId()) {
                //
                case CmdDefine.PLANT:
                    RequestPlant plant = new RequestPlant(dataCmd);
                    
                    processPlant(user, plant);
                    break;

                case CmdDefine.CROP:
                    RequestCrop crop = new RequestCrop(dataCmd);

                    processCrop(user, crop);
                    break;
                case CmdDefine.PLANT_BOOST:
                    RequestPlantBoost boost = new RequestPlantBoost(dataCmd);
                
                    processPlantBoost(user, boost);
                    break;
                case CmdDefine.BUY_ITEM_BY_RUBI:
                    RequestBuyItemByRubi buyItem = new RequestBuyItemByRubi(dataCmd);

                    processBuyItemByRubi(user, buyItem);
                    break;
            
            }
            
                
        } catch (Exception e) {
            logger.warn("PLANT HANDLER EXCEPTION " + e.getMessage());
            logger.warn(ExceptionUtils.getStackTrace(e));
        }

    }
    
//    /////////////
    public void processPlant(User user, RequestPlant plant){
        try {
            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
//            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(1, ZPUserInfo.class);
            if (userInfo == null){
//                send(new ResponseFieldStatus(ErrorLog.ERROR_USER_NOT_FOUND.getValue(), null), user);
                return;
            }
            
            
            /*
             * DONE
             */
            short errorCode = userInfo.getAsset().getFieldById(plant.fieldId).plant(userInfo, plant.productType);
            

            //
            if (errorCode == ErrorLog.SUCCESS.getValue()){
                send(new ResponseErrorCode(ErrorLog.SUCCESS.getValue()), user);

                userInfo.saveModel(user.getId());
//                userInfo.saveModel(1);
            } else {
                send(new ResponseSyncFieldStatus(errorCode, userInfo.getAsset().getFieldById(plant.fieldId)), user);
                
                if (errorCode == ErrorLog.ERROR_STORAGE_NOT_REDUCE.getValue()){
                    StorageItem storageItem = userInfo.getAsset().getFoodStorage().getItemList().get(userInfo.getAsset().getFoodStorage().getStorageItem(plant.productType));
                    
                    send(new ResponseSyncFoodStorageItem(errorCode, storageItem), user);
                }
            }
            
            
        } catch (Exception e) {
        }
    }
    
    public void processCrop(User user, RequestCrop crop){
        try {
            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
//            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(1, ZPUserInfo.class);
            if (userInfo == null){
//                send(new ResponseFieldStatus(ErrorLog.ERROR_USER_NOT_FOUND.getValue(), null), user);
                return;
            }
            
            
            short errorCode = userInfo.getAsset().getFieldById(crop.fieldId).crop(userInfo);

            //
            if (errorCode == ErrorLog.SUCCESS.getValue()){
                send(new ResponseErrorCode(ErrorLog.SUCCESS.getValue()), user);

                userInfo.saveModel(user.getId());
//                userInfo.saveModel(1);
            } else {
                send(new ResponseSyncFieldStatus(errorCode, userInfo.getAsset().getFieldById(crop.fieldId)), user);
                
                if (errorCode == ErrorLog.ERROR_STORAGE_NOT_ADD.getValue()){
                    StorageItem storageItem = userInfo.getAsset().getFoodStorage().getItemList().get(userInfo.getAsset().getFoodStorage().getStorageItem(
                                                                                                         userInfo.getAsset().getFieldById(crop.fieldId).getPlantType()));
                    
                    send(new ResponseSyncFoodStorageItem(errorCode, storageItem), user);
                }
            }
            
            
        } catch (Exception e) {
        }
    }
    
    public void processPlantBoost(User user, RequestPlantBoost boost){
        try {
            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
//            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(1, ZPUserInfo.class);
            if (userInfo == null){
//                send(new ResponseFieldStatus(ErrorLog.ERROR_USER_NOT_FOUND.getValue(), null), user);   
                return;
            }
            
            
            short errorCode = userInfo.getAsset().getFieldById(boost.fieldId).boost(userInfo);
            
            //
            if (errorCode == ErrorLog.SUCCESS.getValue()){
                send(new ResponseErrorCode(ErrorLog.SUCCESS.getValue()), user);

                userInfo.saveModel(user.getId());
//                userInfo.saveModel(1);
            } else {
                send(new ResponseSyncFieldStatus(errorCode, userInfo.getAsset().getFieldById(boost.fieldId)), user);
                
                if (errorCode == ErrorLog.ERROR_RUBY_NOT_REDUCE.getValue()){
                    send(new ResponseSyncUserInfo(errorCode, userInfo), user);
                }
            }
            
            
        } catch (Exception e) {
        }
    }
    
    public void processBuyItemByRubi(User user, RequestBuyItemByRubi buyItem){
        try {
            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
//            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(1, ZPUserInfo.class);
            if (userInfo == null){
//                send(new ResponseBuyItemByRubi(ErrorLog.ERROR_USER_NOT_FOUND.getValue(), buyItem.productType), user);
                return;
            }
            
            
//            int rubi = ProductUtil.getProductObjByType(buyItem.productType).rPrice;
            int rubi = ProductUtil.getProductConfObjByType(buyItem.productType).rubiMuaNgay * buyItem.quantity;
            
            if (userInfo.reduceRuby(rubi)){
//                if (userInfo.getAsset().getFoodStorage().addItem(buyItem.productType, buyItem.quantity)){
                if (userInfo.getAsset().addItemToStorageById(buyItem.productType, buyItem.quantity)){                

                    userInfo.saveModel(user.getId());
//                    userInfo.saveModel(1);
                    
                    send(new ResponseErrorCode(ErrorLog.SUCCESS.getValue()), user);
                    return;
                } else {
                    
                    userInfo.addRuby(rubi);     //recovery
                    
////                    send(new ResponseBuyItemByRubi(ErrorLog.ERROR_STORAGE_NOT_ADD.getValue(), buyItem.productType), user);
//                    send(new ResponseSyncUserInfo(ErrorLog.ERROR_RUBY_NOT_REDUCE.getValue(), userInfo), user);
//                    
//                    StorageItem storageItem = userInfo.getAsset().getFoodStorage().getItemList().get(userInfo.getAsset().getFoodStorage().getStorageItem(buyItem.productType));
//                    send(new ResponseSyncFoodStorageItem(ErrorLog.ERROR_STORAGE_NOT_ADD.getValue(), storageItem), user);
                }
            } 
//            else {
                
                System.out.println("before send");
                send(new ResponseSyncUserInfo(ErrorLog.ERROR_RUBY_NOT_REDUCE.getValue(), userInfo), user);
                System.out.println("after send");
////                StorageItem storageItem = userInfo.getAsset().getFoodStorage().getItemList().get(userInfo.getAsset().getFoodStorage().getStorageItem(buyItem.productType));
////                send(new ResponseSyncFoodStorageItem(ErrorLog.ERROR_STORAGE_NOT_ADD.getValue(), new StorageItem(buyItem.productType, -1)), user);
//                send(new ResponseSyncFoodStorageItem(ErrorLog.ERROR_STORAGE_NOT_ADD.getValue(), new StorageItem(buyItem.productType, - buyItem.quantity)), user);
            
            
                if (buyItem.productType.contains("crop_")){
                    Storage foodStorage = userInfo.getAsset().getFoodStorage();
                    send(new ResponseSyncStorage(ErrorLog.ERROR_STORAGE_NOT_ADD.getValue(), foodStorage), user);
                } else {
                    
                    Storage warehouse = userInfo.getAsset().getWarehouse();
                    send(new ResponseSyncStorage(ErrorLog.ERROR_STORAGE_NOT_ADD.getValue(), warehouse), user);
                }
            
//            }
            
        } catch (Exception e) {
        }
    }
//    /////////
    
    
    
    
}
