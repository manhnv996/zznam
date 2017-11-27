package service;

import bitzero.server.entities.User;
import bitzero.server.extensions.BaseClientRequestHandler;

import bitzero.server.extensions.data.DataCmd;

import cmd.CmdDefine;

import cmd.receive.gameshop.RequestBuyMapObject;

import cmd.receive.storage.RequestBuyTool;

import cmd.send.demo.ResponseErrorCode;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import config.enums.ErrorLog;

import java.io.FileNotFoundException;
import java.io.FileReader;

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
            }
            
                
        } catch (Exception e) {
            logger.warn("PLANT HANDLER EXCEPTION " + e.getMessage());
            logger.warn(ExceptionUtils.getStackTrace(e));
        }

    }
    
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
        
        try {
            userInfo.saveModel(user.getId());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
