package service;

import bitzero.server.entities.User;
import bitzero.server.extensions.BaseClientRequestHandler;
import bitzero.server.extensions.data.DataCmd;

import cmd.CmdDefine;
import cmd.receive.demo.RequestBuyItemByRubi;

import cmd.receive.demo.RequestCrop;
import cmd.receive.demo.RequestMove;

import cmd.receive.demo.RequestPlant;
import cmd.receive.demo.RequestPlantBoost;
import cmd.send.demo.ResponseBuyItemByRubi;
import cmd.send.demo.ResponseFieldStatus;

import cmd.send.demo.ResponseMove;

import config.enums.ErrorLog;
import config.utils.ProductUtil;

import extension.FresherExtension;

import java.awt.Point;

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
            if (userInfo == null){
//                send(new ResponseFieldStatus(ErrorLog.ERROR_USER_NOT_FOUND.getValue(), null), user);
                return;
            }
            
            
            /*
             * DONE
             */
            short errorCode = userInfo.getAsset().getFieldById(plant.fieldId).plant(userInfo, plant.productType);
                
//            userInfo.getAsset().getFoodStorage().saveModel(user.getId());
//            userInfo.getAsset().getFoodStorage().getItemList()
//                    .get(userInfo.getAsset().getFoodStorage().getStorageItem(plant.productType)).saveModel(user.getId());
//            userInfo.getAsset().getFieldById(plant.fieldId).saveModel(user.getId());
            userInfo.saveModel(user.getId());
            

            //
            if (errorCode == ErrorLog.SUCCESS.getValue()){
                send(new ResponseFieldStatus(errorCode, null), user);
            
            } else {
                send(new ResponseFieldStatus(errorCode, userInfo.getAsset().getFieldById(plant.fieldId)), user);
            }
            
            
        } catch (Exception e) {
        }
    }
    
    public void processCrop(User user, RequestCrop crop){
        try {
            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
            if (userInfo == null){
//                send(new ResponseFieldStatus(ErrorLog.ERROR_USER_NOT_FOUND.getValue(), null), user);
                return;
            }
            
            
            short errorCode = userInfo.getAsset().getFieldById(crop.fieldId).crop(userInfo);

            //
            if (errorCode == ErrorLog.SUCCESS.getValue()){
                send(new ResponseFieldStatus(errorCode, null), user);
                userInfo.saveModel(user.getId());
            
            } else {
                send(new ResponseFieldStatus(errorCode, userInfo.getAsset().getFieldById(crop.fieldId)), user);
            }
            
            
        } catch (Exception e) {
        }
    }
    
    public void processPlantBoost(User user, RequestPlantBoost boost){
        try {
            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
            if (userInfo == null){
//                send(new ResponseFieldStatus(ErrorLog.ERROR_USER_NOT_FOUND.getValue(), null), user);
                return;
            }
            
            
            short errorCode = userInfo.getAsset().getFieldById(boost.fieldId).boost(userInfo);
            
            userInfo.saveModel(user.getId());

            //
            if (errorCode == ErrorLog.SUCCESS.getValue()){
                send(new ResponseFieldStatus(errorCode, null), user);
            
            } else {
                send(new ResponseFieldStatus(errorCode, userInfo.getAsset().getFieldById(boost.fieldId)), user);
            }
            
            
        } catch (Exception e) {
        }
    }
    
    public void processBuyItemByRubi(User user, RequestBuyItemByRubi buyItem){
        try {
            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
            if (userInfo == null){
//                send(new ResponseBuyItemByRubi(ErrorLog.ERROR_USER_NOT_FOUND.getValue(), buyItem.productType), user);
                return;
            }
            
            int rubi = ProductUtil.getProductObjByType(buyItem.productType).rPrice;
            if (userInfo.reduceRuby(rubi)){
                if (userInfo.getAsset().getFoodStorage().addItem(buyItem.productType, 1)){
                    
                    userInfo.saveModel(user.getId());
                    send(new ResponseBuyItemByRubi(ErrorLog.SUCCESS.getValue(), buyItem.productType), user);
                } else {
                    
                    userInfo.addRuby(rubi);     //recovery
                    send(new ResponseBuyItemByRubi(ErrorLog.ERROR_STORAGE_NOT_ADD.getValue(), buyItem.productType), user);
                }
            } else {
                send(new ResponseBuyItemByRubi(ErrorLog.ERROR_RUBY_NOT_REDUCE.getValue(), buyItem.productType), user);
            }
            
        } catch (Exception e) {
        }
    }
//    /////////
    
    
    
    
}
