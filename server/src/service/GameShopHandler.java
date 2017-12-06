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

import cmd.receive.gameshop.RequestBuyMapObjectByRuby;

import cmd.send.demo.ResponseErrorCode;

import config.enums.ErrorLog;
import config.enums.MachineTypeEnum;
import config.enums.MapItemEnum;

import config.jsonobject.ShopCoopConfig;

import config.utils.ConfigContainer;

import java.util.Date;

import model.Field;
import model.Machine;
import model.ZPUserInfo;

import org.apache.commons.lang.exception.ExceptionUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GameShopHandler extends BaseClientRequestHandler{
    
    public static short GAMESHOP_MULTI_IDS = 7000;
    private final Logger logger = LoggerFactory.getLogger("GameShopBuyHandler");
    
    public GameShopHandler() {
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
                case CmdDefine.BUY_MAP_OBJECT_BY_RUBY:
                    RequestBuyMapObjectByRuby reqRuby = new RequestBuyMapObjectByRuby(dataCmd);
                    
                    processBuyObjectByRuby(user, reqRuby);
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
        } else if (req.type.equals("bakery_machine")) {
            width = ConfigContainer.mapConfig.Machine.Bakery_Machine.size.width;
            height = ConfigContainer.mapConfig.Machine.Bakery_Machine.size.height;
            price = ConfigContainer.getCoopPrice(req.type);
            mapType = MapItemEnum.BAKERY;
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
                                System.out.println("OK Buy FIELD");
                                send(new ResponseErrorCode(ErrorLog.SUCCESS.getValue()), user);
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
                    case MapItemEnum.BAKERY:
                        Machine machineModel = new Machine(req.id, MachineTypeEnum.bakery_machine, 
                                                           ConfigContainer.getMachineSlot("bakery_machine"), 
                                                           new Date().getTime(), false, req.x, req.y);
                        System.out.println("position " + machineModel.getX() + " " + machineModel.getY());
                        userInfo.getAsset().addMachine(machineModel);
                        if (userInfo.reduceGold(price)) {
                            System.out.println("OK Buy BAKERY " + machineModel.getStartBuildTime());
                            send(new ResponseErrorCode(ErrorLog.SUCCESS.getValue()), user);
                        } else {
                            send(new ResponseErrorCode(ErrorLog.ERROR_BUY_GOLD_NOT_REDUCE.getValue()), user);
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
    
    public void processBuyObjectByRuby(User user, RequestBuyMapObjectByRuby reqRuby) {
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
//        int price;
        int mapType;
        if (reqRuby.type.equals("field")) {
            width = ConfigContainer.mapConfig.Field.size.width;
            height = ConfigContainer.mapConfig.Field.size.height;
            mapType = MapItemEnum.FIELD;
        } else if (reqRuby.type.equals("bakery_machine")) {
            width = ConfigContainer.mapConfig.Machine.Bakery_Machine.size.width;
            height = ConfigContainer.mapConfig.Machine.Bakery_Machine.size.height;
            mapType = MapItemEnum.BAKERY;
        } else {
            return;
        }
        if (userInfo.getMap().checkValidBlock(reqRuby.x, reqRuby.y, width, height)) {
            if (reqRuby.ruby <= userInfo.getRuby()) {
                userInfo.getMap().addMapAlias(reqRuby.x, reqRuby.y, width, height, mapType);
                switch (mapType) {
                    case MapItemEnum.FIELD:
                        Field fieldModel = new Field(reqRuby.id, reqRuby.x, reqRuby.y);
                        if (userInfo.getAsset().addField(fieldModel)) {
                            if (userInfo.reduceRuby(reqRuby.ruby)) {
                                System.out.println("OK Buy");
                                send(new ResponseErrorCode(ErrorLog.SUCCESS.getValue()), user);
                            } else {
                                send(new ResponseErrorCode(ErrorLog.ERROR_BUY_RUBY_NOT_REDUCE.getValue()), user);
                                return;
                            }
                        } else {
                            //send error cant add field//////
                        //  System.out.println("Can't add field");
                            send(new ResponseErrorCode(ErrorLog.ERROR_BUY_CANT_ADD_FIELD.getValue()), user);
                            return;
                        }
                        break;
                    case MapItemEnum.BAKERY:
                        Machine machineModel = new Machine(reqRuby.id, MachineTypeEnum.bakery_machine, 
                                                           ConfigContainer.getMachineSlot("bakery_machine"), 
                                                           new Date().getTime(), false, reqRuby.x, reqRuby.y);
                        userInfo.getAsset().addMachine(machineModel);
                        if (userInfo.reduceRuby(reqRuby.ruby)) {
                            System.out.println("OK Buy BAKERY");
                            send(new ResponseErrorCode(ErrorLog.SUCCESS.getValue()), user);
                        } else {
                            send(new ResponseErrorCode(ErrorLog.ERROR_BUY_RUBY_NOT_REDUCE.getValue()), user);
                            return;
                        }
                        break;
                }  
            } else {
        //                System.out.println("Not enough gold");
                send(new ResponseErrorCode(ErrorLog.ERROR_BUY_RUBY_NOT_ENOUGH.getValue()), user);
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
