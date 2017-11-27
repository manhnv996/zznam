package service;

import bitzero.server.entities.User;
import bitzero.server.extensions.BaseClientRequestHandler;
import bitzero.server.extensions.data.DataCmd;

import cmd.CmdDefine;

import cmd.receive.demo.RequestBuyItemByRubi;
import cmd.receive.demo.RequestCrop;
import cmd.receive.demo.RequestPlant;
import cmd.receive.demo.RequestPlantBoost;

import cmd.receive.gameshop.RequestBuyMapObject;

import cmd.send.demo.ResponseErrorCode;

import config.enums.ErrorLog;
import config.enums.MapItemEnum;

import config.jsonobject.ShopCoopConfig;

import config.utils.ConfigContainer;

import model.Field;
import model.ZPUserInfo;

import org.apache.commons.lang.exception.ExceptionUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GameShopBuyHandler extends BaseClientRequestHandler{
    
    public static short GAMESHOP_MULTI_IDS = 7000;
    private final Logger logger = LoggerFactory.getLogger("GameShopBuyHandler");
    
    public GameShopBuyHandler() {
        super();
    }
    
    @Override
    public void handleClientRequest(User user, DataCmd dataCmd) {
        try {
            switch (dataCmd.getId()) {
                //
                case CmdDefine.BUY_MAP_OBJECT_REQUEST:
                    RequestBuyMapObject req = new RequestBuyMapObject(dataCmd);
                    
                    processBuyMapObject(user, req);
                    break;
            }
            
                
        } catch (Exception e) {
            logger.warn("PLANT HANDLER EXCEPTION " + e.getMessage());
            logger.warn(ExceptionUtils.getStackTrace(e));
        }

    }
    
    public void processBuyMapObject(User user, RequestBuyMapObject req) {
        ZPUserInfo userInfo = null;
        try {
            userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
        } catch (Exception e) {
            e.printStackTrace();  
        }
        if (userInfo == null) {
            return;    
        }
        int width;
        int height;
        int price;
        int mapType;
        if (req.type.equals("field")) {
            width = ConfigContainer.mapConfig.Field.size.width;
            height = ConfigContainer.mapConfig.Field.size.height;
            price = ConfigContainer.getCoopPrice(req.type);
            mapType = MapItemEnum.FIELD;
        } else {
            return;
        }
        
        if (userInfo.getMap().checkValidBlock(req.x, req.y, width, height)) {
            if (price <= userInfo.getGold()) {
                userInfo.getMap().addMapAlias(req.x, req.y, width, height, mapType);
                switch (mapType) {
                    case MapItemEnum.FIELD:
                        Field fieldModel = new Field(req.id, req.x, req.y);
                        if (userInfo.getAsset().addField(fieldModel)) {
                            if (userInfo.reduceGold(price)) {
                                System.out.println("OK Buy");
                                send(new ResponseErrorCode((short) 0), user);
                            } else {
                                send(new ResponseErrorCode(ErrorLog.ERROR_BUY_GOLD_NOT_REDUCE.getValue()), user);
                                return;
                            }
                        } else {
                            //send error cant add field//////
                        //  System.out.println("Can't add field");
                            send(new ResponseErrorCode(ErrorLog.ERROR_BUY_CANT_ADD_FIELD.getValue()), user);
                            return;
                        }
                        break;
                }  
            } else {
//                System.out.println("Not enough gold");
                send(new ResponseErrorCode(ErrorLog.ERROR_BUY_GOLD_NOT_ENOUGH.getValue()), user);
                return;
            }
        } else {
//            System.out.println("Collision");
            send(new ResponseErrorCode(ErrorLog.ERROR_BUY_MAP_OBJECT_COLLISION.getValue()), user);
            return;
        }
        
        try {
            userInfo.saveModel(user.getId());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
