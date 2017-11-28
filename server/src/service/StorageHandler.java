package service;

import bitzero.server.entities.User;
import bitzero.server.extensions.BaseClientRequestHandler;

import bitzero.server.extensions.data.DataCmd;

import cmd.CmdDefine;

import cmd.receive.gameshop.RequestBuyMapObject;

import cmd.receive.storage.RequestBuyTool;

import cmd.receive.storage.RequestUpgradeStorage;

import cmd.send.demo.ResponseErrorCode;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import config.enums.ErrorLog;

import config.enums.ProductType;
import config.enums.StorageType;

import java.io.FileNotFoundException;
import java.io.FileReader;

import model.Storage;
import model.ZPUserInfo;

import org.apache.commons.lang.exception.ExceptionUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class StorageHandler extends BaseClientRequestHandler{
    
    public static short STORAGE_MULTI_IDS = 8000;
    private final Logger logger = LoggerFactory.getLogger("StorageHandler");
    public StorageHandler() {
        super();
    }

    @Override
    public void handleClientRequest(User user, DataCmd dataCmd) {
        try {
            switch (dataCmd.getId()) {
                //
                case CmdDefine.BUY_TOOL_REQUEST:
                    RequestBuyTool req = new RequestBuyTool(dataCmd);
                    
                    processBuyTool(user, req);
                    break;
                case CmdDefine.UPGRADE_STORAGE_REQUEST:
                    RequestUpgradeStorage reqUpgrade = new RequestUpgradeStorage(dataCmd);
                    
                    processUpgrade(user, reqUpgrade);
                    break;
            }
            
                
        } catch (Exception e) {
            logger.warn("PLANT HANDLER EXCEPTION " + e.getMessage());
            logger.warn(ExceptionUtils.getStackTrace(e));
        }

    }
    
    //Buy Tool
    public void processBuyTool (User user, RequestBuyTool req) {
        ZPUserInfo userInfo = null;
        try {
            userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
        } catch (Exception e) {
            e.printStackTrace();  
        }
        if (userInfo == null) {
            return;    
        }
         //process
        JsonParser parser = new JsonParser();
        JsonObject obj = null;
        try {
            obj = parser.parse(new FileReader("src/config/json/tool.json")).getAsJsonObject();
        } catch (FileNotFoundException e) {
             e.printStackTrace();
        }
        
        int price = obj.get(req.productType).getAsJsonObject().get("price").getAsInt();
        //check enough ruby
        if ((price * req.number) <= userInfo.getRuby()) {
            if (userInfo.reduceRuby(price * req.number)) {
                if (userInfo.getAsset().getWarehouse().addItem(req.productType, req.number)) {
                    System.out.println("Buy Tool Success!" + req.productType + " " + req.number);
                    System.out.println("User ruby " + userInfo.getRuby());
                    send(new ResponseErrorCode(ErrorLog.SUCCESS.getValue()), user);
                } else {
                    send(new ResponseErrorCode(ErrorLog.ERROR_CANT_ADD_TOOL.getValue()), user);
                    return;
                }
            } else {
                send(new ResponseErrorCode(ErrorLog.ERROR_BUY_TOOL_RUBY_NOT_REDUCE.getValue()), user);
                return;
            }
        } else {
            send(new ResponseErrorCode(ErrorLog.ERROR_BUY_TOOL_RUBY_NOT_ENOUGH.getValue()), user);
            return;
        }
        
        //save data
        try {
            userInfo.saveModel(user.getId());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    //Upgrade Storage
    public void processUpgrade (User user, RequestUpgradeStorage reqUpgrade) {
        ZPUserInfo userInfo = null;
        try {
            userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
        } catch (Exception e) {
            e.printStackTrace();  
        }
        if (userInfo == null) {
            return;    
        }
        
        //process
        JsonParser parser = new JsonParser();
        JsonArray obj = null;
        
        String product1 = null;
        String product2 = null;
        String product3 = null;
        int number1 = 0;
        int number2 = 0;
        int number3 = 0;
        
        Storage storage = null;
        
        try {
            if (StorageType.FOOD_STORAGE.toString().equals(reqUpgrade.storageType)) {
                storage = userInfo.getAsset().getFoodStorage();
                obj = parser.parse(new FileReader("src/config/json/upgradeSiloConfigs.json")).getAsJsonArray();
                number1 = obj.get(reqUpgrade.level).getAsJsonObject().get("tool_nail").getAsInt();
                number2 = obj.get(reqUpgrade.level).getAsJsonObject().get("tool_screw").getAsInt();
                number3 = obj.get(reqUpgrade.level).getAsJsonObject().get("tool_woodPanel").getAsInt();
                
                product1 = ProductType.TOOL_NAIL;
                product2 = ProductType.TOOL_SCREW;
                product3 = ProductType.TOOL_WOODPANEL;
            } else {
                storage = userInfo.getAsset().getWarehouse();
                obj = parser.parse(new FileReader("src/config/json/upgradeWareConfigs.json")).getAsJsonArray();
                number1 = obj.get(reqUpgrade.level).getAsJsonObject().get("tool_bolt").getAsInt();
                number2 = obj.get(reqUpgrade.level).getAsJsonObject().get("tool_plank").getAsInt();
                number3 = obj.get(reqUpgrade.level).getAsJsonObject().get("tool_ductTape").getAsInt();
                
                product1 = ProductType.TOOL_BOLT;
                product2 = ProductType.TOOL_PLANK;
                product3 = ProductType.TOOL_DUCTTAPE;
            }
//            System.out.println(obj.get(0).getAsJsonObject().get("capacity").getAsInt());
            
        } catch (FileNotFoundException e) {
             e.printStackTrace();
        }
//        System.out.println("Storage Type" + reqUpgrade.storageType.equals(StorageType.FOOD_STORAGE));
        if (storage.upgradeLevel(userInfo, product1, number1, product2, number2, product3, number3)) { 
            //set New Capacity
            storage.setCapacity(obj.get(reqUpgrade.level).getAsJsonObject().get("capacity").getAsInt());
            
            send(new ResponseErrorCode(ErrorLog.SUCCESS.getValue()), user);
//            System.out.println("Upgrade Success " + storage.upgradeLevel(user, product1, number1, product2, number2, product3, number3));
//            System.out.println("Storge Item Nail " + userInfo.getAsset().getWarehouse().getItemQuantity(product1));
//            System.out.println("Storage New Capacity " + reqUpgrade.storageType + " " + storage.getStoragetype() + " " + storage.getCapacity());
            System.out.println("Level new " + storage.getStoragetype() + " " + storage.getLevel());
        } else {
            send(new ResponseErrorCode(ErrorLog.ERROR_UPGRADE_FAIL.getValue()), user);
            return;
        }
        
        //save data
        try {
            userInfo.saveModel(user.getId());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
