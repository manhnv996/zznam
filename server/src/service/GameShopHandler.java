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

        //Check Collision
        if (!userInfo.getMap().checkValidBlock(req.x, req.y, width, height)) {
            System.out.println("Collision");
            send(new ResponseErrorCode(ErrorLog.ERROR_BUY_MAP_OBJECT_COLLISION.getValue()), user);
            return;
        }

        //Check gold enough
        if (!(price <= userInfo.getGold())) {
            //                System.out.println("Not enough gold");
            send(new ResponseErrorCode(ErrorLog.ERROR_BUY_GOLD_NOT_ENOUGH.getValue()), user);
            return;
        }

        //Reduce gold
        if (!userInfo.reduceGold(price)) {
            send(new ResponseErrorCode(ErrorLog.ERROR_BUY_GOLD_NOT_REDUCE.getValue()), user);
            return;
        }

        //OK
        addObject(user, userInfo, mapType, req.id, req.x, req.y, width, height);

        //        userInfo.getMap().addMapAlias(req.x, req.y, width, height, mapType);
        //        switch (mapType) {
        //            case MapItemEnum.FIELD:
        //                Field fieldModel = new Field(req.id, req.x, req.y);
        //                if (!userInfo.getAsset().addField(fieldModel)) {
        //                    send(new ResponseErrorCode(ErrorLog.ERROR_BUY_CANT_ADD_FIELD.getValue()), user);
        //                    return;
        //                }
        //                break;
        //            case MapItemEnum.BAKERY:
        //                Machine machineModel = new Machine(req.id, MachineTypeEnum.bakery_machine,
        //                                                   ConfigContainer.getMachineSlot("bakery_machine"),
        //                                                   new Date().getTime(), false, req.x, req.y);
        //                System.out.println("position " + machineModel.getX() + " " + machineModel.getY());
        //                userInfo.getAsset().addMachine(machineModel);
        //                break;
        //        }
        send(new ResponseErrorCode(ErrorLog.SUCCESS.getValue()), user);
        
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
        int price;
        int mapType;
        if (reqRuby.type.equals("field")) {
            width = ConfigContainer.mapConfig.Field.size.width;
            height = ConfigContainer.mapConfig.Field.size.height;
            price = ConfigContainer.getCoopPrice(reqRuby.type);
            mapType = MapItemEnum.FIELD;
        } else if (reqRuby.type.equals("bakery_machine")) {
            width = ConfigContainer.mapConfig.Machine.Bakery_Machine.size.width;
            height = ConfigContainer.mapConfig.Machine.Bakery_Machine.size.height;
            price = ConfigContainer.getCoopPrice(reqRuby.type);
            mapType = MapItemEnum.BAKERY;
        } else {
            return;
        }
        //Check collision
        if (!userInfo.getMap().checkValidBlock(reqRuby.x, reqRuby.y, width, height)) {
            send(new ResponseErrorCode(ErrorLog.ERROR_BUY_MAP_OBJECT_COLLISION.getValue()), user);
            return;
        }

        //Check ruby
        int ruby = fromGoldToRuby(price);
        if (!(ruby <= userInfo.getRuby())) {
            send(new ResponseErrorCode(ErrorLog.ERROR_BUY_RUBY_NOT_ENOUGH.getValue()), user);
            return;
        }

        //Reduce ruby
        if (!userInfo.reduceRuby(ruby)) {
            send(new ResponseErrorCode(ErrorLog.ERROR_BUY_RUBY_NOT_REDUCE.getValue()), user);
            return;
        }

        //OK
        addObject(user, userInfo, mapType, reqRuby.id, reqRuby.x, reqRuby.y, width, height);
        //        userInfo.getMap().addMapAlias(reqRuby.x, reqRuby.y, width, height, mapType);
        //        switch (mapType) {
        //            case MapItemEnum.FIELD:
        //                Field fieldModel = new Field(reqRuby.id, reqRuby.x, reqRuby.y);
        //                if (!userInfo.getAsset().addField(fieldModel)) {
        //                    send(new ResponseErrorCode(ErrorLog.ERROR_BUY_CANT_ADD_FIELD.getValue()), user);
        //                    return;
        //                }
        //                break;
        //            case MapItemEnum.BAKERY:
        //                Machine machineModel =
        //                    new Machine(reqRuby.id, MachineTypeEnum.bakery_machine,
        //                                ConfigContainer.getMachineSlot("bakery_machine"), new Date().getTime(), false, reqRuby.x,
        //                                reqRuby.y);
        //                userInfo.getAsset().addMachine(machineModel);
        //                break;
        //        }

        send(new ResponseErrorCode(ErrorLog.SUCCESS.getValue()), user);
        
        try {
            userInfo.saveModel(user.getId());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void addObject(User user, ZPUserInfo userInfo, int mapType, int id, int x, int y, int width, int height) {
        userInfo.getMap().addMapAlias(x, y, width, height, mapType);
        switch (mapType) {
        case MapItemEnum.FIELD:
            Field fieldModel = new Field(id, x, y);
            if (!userInfo.getAsset().addField(fieldModel)) {
                send(new ResponseErrorCode(ErrorLog.ERROR_BUY_CANT_ADD_FIELD.getValue()), user);
                return;
            }
            break;
        case MapItemEnum.BAKERY:
            Machine machineModel =
                new Machine(id, MachineTypeEnum.bakery_machine, ConfigContainer.getMachineSlot("bakery_machine"),
                            new Date().getTime(), false, x, y);
            userInfo.getAsset().addMachine(machineModel);
            break;
        }
    }
    
    public int fromGoldToRuby (int gold) {
        int ruby = (int) Math.floor((gold / 15));
        if ((gold % 15) != 0) {
            return ruby + 1;
        } else {
            return ruby;
        }
    }
}
