package service;

import bitzero.server.entities.User;
import bitzero.server.extensions.BaseClientRequestHandler;

import bitzero.server.extensions.data.DataCmd;

import cmd.CmdDefine;

import cmd.receive.constructed.RequestAddProduct;
import cmd.receive.constructed.RequestBoostProduct;
import cmd.receive.constructed.RequestBoostBuild;
import cmd.receive.constructed.RequestBuildCompleted;
import cmd.receive.constructed.RequestBuyRawMaterial;
import cmd.receive.constructed.RequestCollectProduct;
import cmd.receive.constructed.RequestUnlockSlot;
import cmd.receive.gameshop.RequestBuyMapObject;

import cmd.send.constructed.ResponseBoostBuild;
import cmd.send.constructed.ResponseBuildComplete;
import cmd.send.demo.ResponseErrorCode;

import cmd.send.demo.ResponseSyncStorage;
import cmd.send.demo.ResponseSyncUserInfo;

import config.enums.ErrorLog;
import config.enums.MapItemEnum;

import config.jsonobject.MachineConfig;

import config.jsonobject.ProductConfig;
import config.jsonobject.machine.RawMaterial;

import config.utils.ConfigContainer;

import config.utils.ProductUtil;

import java.util.ArrayList;
import java.util.Date;

import model.Machine;
import model.Storage;
import model.ZPUserInfo;

import org.apache.commons.lang.exception.ExceptionUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ConstructedHandler extends BaseClientRequestHandler{
    public static final short FIRST_PRICE_BUY_SLOT = 6;
    public static final short NEXT_PRICE_BUY_SLOT = 3;
    public static final short SPEED_UP = 1;
    public static final ProductConfig[] PRODUCTS_CONFIG = ProductUtil.toProductConfigArray();
    public static short CONSTRUCTED_MULTI_IDS = 9000;
    private final Logger logger = LoggerFactory.getLogger("ConstructedHandler");
    
    public ConstructedHandler() {
        super();
    }

    @Override
    public void handleClientRequest(User user, DataCmd dataCmd) {
        try {
            switch (dataCmd.getId()) {
                //
                case CmdDefine.BUILD_COMPLETED_REQUEST:
                    RequestBuildCompleted req = new RequestBuildCompleted(dataCmd);
                    processBuildCompleted(user, req);
                    break;
                case CmdDefine.BOOST_BUILD_REQUEST:
                    RequestBoostBuild reqBoost = new RequestBoostBuild(dataCmd);
                    proccessBoostBuild(user, reqBoost);
                    break;
                case CmdDefine.BOOST_PRODUCT:
                    RequestBoostProduct reqBoostProduct = new RequestBoostProduct(dataCmd);
                    processBoostProduct(user, reqBoostProduct);
                    break;                
                case CmdDefine.UNLOCK_SLOT:
                    RequestUnlockSlot reqUnlockSlot = new RequestUnlockSlot(dataCmd);
                    processUnlockSlot(user, reqUnlockSlot);
                    break;
                case CmdDefine.COLLECT_PRODUCT:
                    RequestCollectProduct reqCollectProduct = new RequestCollectProduct(dataCmd);     
                    processCollectProduct(user, reqCollectProduct);
                    break;                
                case CmdDefine.ADD_PRODUCT:
                    RequestAddProduct reqAddProduct = new RequestAddProduct(dataCmd);
                    processAddProduct(user, reqAddProduct);
                    break;
                case CmdDefine.BUY_RAW_MATERIAL:
                    RequestBuyRawMaterial reqBuyRawMaterial = new RequestBuyRawMaterial(dataCmd);                
                    processBuyRawMaterial(user, reqBuyRawMaterial);
                    break;                
                   
                }
        
            
        } catch (Exception e) {
            logger.warn("PLANT HANDLER EXCEPTION " + e.getMessage());
            logger.warn(ExceptionUtils.getStackTrace(e));
        }

    }
    
    public void processBuildCompleted (User user, RequestBuildCompleted req) {
        ZPUserInfo userInfo = null;
        try {
            userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
        } catch (Exception e) {
            e.printStackTrace();  
        }
        if (userInfo == null) {
            return;    
        }
        /**
         *  Process in here
         */

        switch (req.typeBuilding) {
            case MapItemEnum.MACHINE:
                Machine machineModel = userInfo.getAsset().getMachineById(req.id);
                MachineConfig machineConfig = ConfigContainer.getMachineConfigByType(machineModel.getType().toString());
                int totalTime = machineConfig.time * 1000;
                long startBuildTime = machineModel.getStartBuildTime();
                long curTime = new Date().getTime();
                System.out.println("((curTime - startBuildTime) >= totalTime || machineModel.isBoostBuild()) " + ((curTime - startBuildTime) >= totalTime || machineModel.isBoostBuild()));
                
                if ((curTime - startBuildTime) >= totalTime || machineModel.isBoostBuild()) {
                    machineModel.setCompleted();
                    userInfo.addExp(machineConfig.buildExp);
                    System.out.println("Build Completed " + machineModel.getType());
                    send(new ResponseBuildComplete(ErrorLog.SUCCESS.getValue()), user);
                } else {
                    send(new ResponseBuildComplete(ErrorLog.ERROR_COMPLETED_BUIDING_FAIL.getValue()), user);
                    return;
                }
                break;
        }
        
        
        try {
            userInfo.saveModel(user.getId());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    public void proccessBoostBuild (User user, RequestBoostBuild reqBoost) {
        ZPUserInfo userInfo = null;
        try {
            userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
        } catch (Exception e) {
            e.printStackTrace();  
        }
        if (userInfo == null) {
            return;    
        }
        
        /**
         * Process in here
         */
        
        switch (reqBoost.typeBuilding) {
            case MapItemEnum.MACHINE:
                Machine machineModel = userInfo.getAsset().getMachineById(reqBoost.id);
                MachineConfig machineConfig = ConfigContainer.getMachineConfigByType(machineModel.getType().toString());
                long startTime = machineModel.getStartBuildTime();
                long curTime = new Date().getTime();
                
                int rubyReduce = (int) Math.floor((curTime - startTime) / (machineConfig.reduceRubyTime * 1000));
                int ruby = machineConfig.buildExpress - rubyReduce;
                System.out.println("(machineConfig.reduceRubyTime * 1000) " + (machineConfig.reduceRubyTime * 1000));
                System.out.println("(curTime - startTime) " + (curTime - startTime));

                System.out.println("machineConfig.reduceRubyTime " + ruby);
                System.out.println("user Ruby  " + userInfo.getRuby());

                if (ruby > userInfo.getRuby()) {
                    send(new ResponseBoostBuild(ErrorLog.ERROR_RUBY_NOT_ENOUGH.getValue()), user);
                    return;
                } 
                
                if (!userInfo.reduceRuby(ruby)) {
                    send(new ResponseBoostBuild(ErrorLog.ERROR_RUBY_NOT_REDUCE.getValue()), user);
                    return;
                }
                System.out.println("user Ruby after  " + userInfo.getRuby());
                machineModel.setBoostBuild();
                send(new ResponseBoostBuild(ErrorLog.SUCCESS.getValue()), user);
            break;
        }

        try {
            userInfo.saveModel(user.getId());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void processBoostProduct(User user, RequestBoostProduct reqBoostProduct) {
        try {
            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
        //            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(1, ZPUserInfo.class);
            if (userInfo == null){
        //                send(new ResponseFieldStatus(ErrorLog.ERROR_USER_NOT_FOUND.getValue(), null), user);
                return;
            }
            
            Machine machineModel = userInfo.getAsset().getMachineById(reqBoostProduct.machineId);
//            MachineConfig machineConfig = ConfigContainer.getMachineConfigByType(machineModel.getType().toString());
            int userRuby = userInfo.getRuby();
            if (userRuby > SPEED_UP){
                if (machineModel.boostProduct()){
                    if (userInfo.reduceRuby(SPEED_UP)){
                        System.out.println(" 208 SPEED_UP"); 
                        userInfo.saveModel(user.getId());
                        send(new ResponseErrorCode(ErrorLog.SUCCESS.getValue()), user);
                    }
                    else {
                        send(new ResponseSyncUserInfo(ErrorLog.ERROR_RUBY_NOT_INCREASE.getValue(), userInfo), user);
                    }
                } else {
                    send(new ResponseSyncUserInfo(ErrorLog.ERROR_RUBY_NOT_INCREASE.getValue(), userInfo), user);
                }
            }
            System.out.println(" 208 after send");    
            
//            try {
//                userInfo.saveModel(user.getId());
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
        } 
        catch (Exception e) {
            System.out.println("exception 143");   
        }
        
        
    }

    private void processUnlockSlot(User user, RequestUnlockSlot reqUnlockSlot) {
        try {
            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
        //            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(1, ZPUserInfo.class);
            if (userInfo == null){
        //                send(new ResponseFieldStatus(ErrorLog.ERROR_USER_NOT_FOUND.getValue(), null), user);
                return;
            }
            
            /*
             * Process here babe
             */
            Machine machineModel = userInfo.getAsset().getMachineById(reqUnlockSlot.machineId);
            //            MachineConfig machineConfig = ConfigContainer.getMachineConfigByType(machineModel.getType().toString());
            int userRuby = userInfo.getRuby();
            int machineSlot = machineModel.getSlot();
            int ruby = 0;
            if (machineSlot == 2){
                ruby = FIRST_PRICE_BUY_SLOT;
            } else {
                ruby = NEXT_PRICE_BUY_SLOT;
            }
            if (userRuby > ruby){
                if (machineModel.unlockSlot()){
                    if (userInfo.reduceRuby(ruby)){
                        send(new ResponseErrorCode(ErrorLog.SUCCESS.getValue()), user);
                    }
                    else {
                        send(new ResponseSyncUserInfo(ErrorLog.ERROR_RUBY_NOT_INCREASE.getValue(), userInfo), user);
                        //todo logic Response SyncMachine
                    }
                } else {
                    send(new ResponseSyncUserInfo(ErrorLog.ERROR_RUBY_NOT_INCREASE.getValue(), userInfo), user);
                    //todo logic Response SyncMachine
                }
            }
            System.out.println(" 258 after send");    
            userInfo.saveModel(user.getId());
            
            
          
            System.out.println("before send");
            send(new ResponseSyncUserInfo(ErrorLog.ERROR_RUBY_NOT_INCREASE.getValue(), userInfo), user);
            System.out.println("after send");    
        } 
        catch (Exception e) {
            System.out.println("exception 143");   
        }
    }

    private void processCollectProduct(User user, RequestCollectProduct reqCollectProduct) {
        try {
            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
        //            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(1, ZPUserInfo.class);
            if (userInfo == null){
        //                send(new ResponseFieldStatus(ErrorLog.ERROR_USER_NOT_FOUND.getValue(), null), user);
                return;
            }
            
            /*
             * Process here babe
             */
            System.out.println("before send 294");
            Machine machineModel = userInfo.getAsset().getMachineById(reqCollectProduct.machineId);
            Storage warehouse = userInfo.getAsset().getWarehouse();
            int curr = warehouse.getCurrentQuantity();
            int capacity  = warehouse.getCapacity();
            if (curr < capacity){
                String productType = machineModel.collectProduct();
                if (productType != null){
                    System.out.println(productType); 
                    warehouse.addItem(productType, 1); // todo add item per capacity of each product
                    userInfo.addExp(ProductUtil.getProductConfObjByType(productType).exp);
                    send(new ResponseErrorCode(ErrorLog.SUCCESS.getValue()), user);
        
                } else {
                    //todo sync machine
                    short errorCode = ErrorLog.ERROR_STORAGE_NOT_ADD.getValue();
                    send(new ResponseSyncStorage(errorCode, warehouse), user);
                    send(new ResponseSyncUserInfo(errorCode, userInfo), user);
                }
            } else{
                //todo sync machine
                short errorCode = ErrorLog.ERROR_STORAGE_NOT_REDUCE.getValue();
                send(new ResponseSyncStorage(errorCode, warehouse), user);
                send(new ResponseSyncUserInfo(errorCode, userInfo), user);
            }
            
           
            System.out.println(" 319 after send");    
            userInfo.saveModel(user.getId());
        } 
        catch (Exception e) {
            System.out.println("exception 323");   
        }
    }

    private void processAddProduct(User user, RequestAddProduct reqAddProduct) {
        try {
            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
            if (userInfo == null){
                return;
            }
            /*
             * Process here babe
             */
            Machine machineModel = userInfo.getAsset().getMachineById(reqAddProduct.machineId);
            String productType  = reqAddProduct.productType;
//            MachineConfig machineConfig = ConfigContainer.getMachineConfigByType(machineModel.getType().toString());
            ArrayList<RawMaterial>  rawMaterialList  = ConfigContainer.getRawMaterialList(machineModel.getType().toString(), productType);
//            System.out.println("343" + rawMaterialList.get(0).);
            boolean flag = true;
            for (RawMaterial item : rawMaterialList) {
                   int currQuan = userInfo.getAsset().getQuantityOfTwoStorageByProductId(item.rawMaterialId);
                System.out.println("347" + currQuan + "  " + item.quantity);
                if (currQuan < item.quantity){
                    flag = false;
                }
              }
            if (flag){
              
                if (machineModel.addProduct(productType)){
                    System.out.println("290 addProductSuccess");
                    for (RawMaterial item : rawMaterialList) {
                        if (item.rawMaterialId.indexOf("crop_") >= 0){
                            userInfo.getAsset().getFoodStorage().takeItem(item.rawMaterialId, item.quantity);
                    //                        int currQuan = userInfo.getAsset().getQuantityOfTwoStorageByProductId(item.rawMaterialId);
                    //                        System.out.println("347" + currQuan + "  " + item.quantity);
                        } else{
                            userInfo.getAsset().getWarehouse().takeItem(item.rawMaterialId, item.quantity);
                    //                        int currQuan = userInfo.getAsset().getQuantityOfTwoStorageByProductId(item.rawMaterialId);
                    //                        System.out.println("347" + currQuan + "  " + item.quantity);
                        }
                    } 
                    
                } else {
                    System.out.println("290 addProductFailed");
                    short errorCode = ErrorLog.ERROR_STORAGE_NOT_REDUCE.getValue();
                    send(new ResponseSyncStorage(errorCode,  userInfo.getAsset().getFoodStorage()), user);
                    send(new ResponseSyncStorage(errorCode,  userInfo.getAsset().getWarehouse()), user);
                }
                }{
                    
                }
            
           
            
            System.out.println(" 297 after send");    
            userInfo.saveModel(user.getId());  
        } 
        catch (Exception e) {
            System.out.println("exception 303");   
        }
    }

    private void processBuyRawMaterial(User user, RequestBuyRawMaterial reqBuyRawMaterial) {
        try {
            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
        //            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(1, ZPUserInfo.class);
            if (userInfo == null){
        //                send(new ResponseFieldStatus(ErrorLog.ERROR_USER_NOT_FOUND.getValue(), null), user);
                return;
            }
            
            /*
             * Process here babe
             */
            
//           
            Machine machineModel = userInfo.getAsset().getMachineById(reqBuyRawMaterial.machineId);
            String productType  = reqBuyRawMaterial.productType;
//            MachineConfig machineConfig = ConfigContainer.getMachineConfigByType(machineModel.getType().toString());
            ArrayList<RawMaterial>  rawMaterialList  = ConfigContainer.getRawMaterialList(machineModel.getType().toString(), productType);
                    System.out.println("zznam " + rawMaterialList.get(0).rawMaterialId + "====" + rawMaterialList.get(0).quantity);
            boolean flag = true;
            int ruby = 0;
            
            for (RawMaterial item : rawMaterialList) {
                   int currQuan = userInfo.getAsset().getQuantityOfTwoStorageByProductId(item.rawMaterialId);
                System.out.println("347" + currQuan + "  " + item.quantity);
                if (currQuan < item.quantity){
                    flag = false;
                    //calculate ruby need to buy for each raw material item
                    ruby += findProductConfig(item.rawMaterialId).rubiMuaNgay * (item.quantity - currQuan);
                }
              }
            if (!flag){
                int userRuby = userInfo.getRuby();
                if (userRuby >= ruby) {
                   
                    if (machineModel.addProduct(productType)){
                        System.out.println("290 addProductSuccess");
                        userInfo.reduceRuby(ruby);
                        for (RawMaterial item : rawMaterialList) {
//                            System.out.println("347" + item.rawMaterialId + "  " + item.quantity + "   "+item.rawMaterialId);
                            int currQuan = userInfo.getAsset().getQuantityOfTwoStorageByProductId(item.rawMaterialId);
                            
                            if (item.rawMaterialId.indexOf("crop_") >= 0){
                                userInfo.getAsset().getFoodStorage().takeItem(item.rawMaterialId, (currQuan > item.quantity) ? item.quantity: currQuan);
                        //                                            int currQuanTest = userInfo.getAsset().getQuantityOfTwoStorageByProductId(item.rawMaterialId);
                        //                                            System.out.println("447" + currQuanTest + "  " + item.quantity);
                                
                            } else{
                                userInfo.getAsset().getWarehouse().takeItem(item.rawMaterialId, (currQuan > item.quantity) ? item.quantity: currQuan);
                        //                                            int currQuanTest = userInfo.getAsset().getQuantityOfTwoStorageByProductId(item.rawMaterialId);
                        //                                            System.out.println("447" + currQuanTest + "  " + item.quantity);
                            }
                        } 
                        userInfo.saveModel(user.getId());  
                        
                    } else {
                        System.out.println("290 addProductFailed");
                        short errorCode = ErrorLog.ERROR_STORAGE_NOT_REDUCE.getValue();
                        send(new ResponseSyncStorage(errorCode,  userInfo.getAsset().getFoodStorage()), user);
                        send(new ResponseSyncStorage(errorCode,  userInfo.getAsset().getWarehouse()), user);
                    }
                }
            }
            
           
            System.out.println(" 297 after send");    
        } 
        catch (Exception e) {
            System.out.println("exception 143");   
        }
    }
    
    public ProductConfig findProductConfig(String productType){
        for (ProductConfig item: PRODUCTS_CONFIG){
            if (item.id.equalsIgnoreCase(productType)){
                return item;
            }
        }
        return null;
    }
}

