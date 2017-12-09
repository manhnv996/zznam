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
            
        } else if (req.type.equals("food_machine")) {
            width = ConfigContainer.mapConfig.Machine.Food_Machine.size.width;
            height = ConfigContainer.mapConfig.Machine.Food_Machine.size.height;
            price = ConfigContainer.getCoopPrice(req.type);
            mapType = MapItemEnum.FOOD_GRINDER;
            
        } else if (req.type.equals("butter_machine")) {
            width = ConfigContainer.mapConfig.Machine.Butter_Machine.size.width;
            height = ConfigContainer.mapConfig.Machine.Butter_Machine.size.height;
            price = ConfigContainer.getCoopPrice(req.type);
            mapType = MapItemEnum.BUTTER;
            
        } else if (req.type.equals("sugar_machine")) {
            width = ConfigContainer.mapConfig.Machine.Sugar_Machine.size.width;
            height = ConfigContainer.mapConfig.Machine.Sugar_Machine.size.height;
            price = ConfigContainer.getCoopPrice(req.type);
            mapType = MapItemEnum.SUGAR_MAKER;
            
        } else if (req.type.equals("popcorn_machine")) {
            width = ConfigContainer.mapConfig.Machine.Popcorn_Machine.size.width;
            height = ConfigContainer.mapConfig.Machine.Popcorn_Machine.size.height;
            price = ConfigContainer.getCoopPrice(req.type);
            mapType = MapItemEnum.POPCORN_MAKER;
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
            send(new ResponseErrorCode(ErrorLog.ERROR_GOLD_NOT_ENOUGH.getValue()), user);
            return;
        }

        //Reduce gold
        if (!userInfo.reduceGold(price)) {
            send(new ResponseErrorCode(ErrorLog.ERROR_GOLD_NOT_REDUCE.getValue()), user);
            return;
        }

        //OK
        addObject(user, userInfo, mapType, req.id, req.x, req.y, width, height);

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
        } else if (reqRuby.type.equals("food_machine")) {
            width = ConfigContainer.mapConfig.Machine.Food_Machine.size.width;
            height = ConfigContainer.mapConfig.Machine.Food_Machine.size.height;
            price = ConfigContainer.getCoopPrice(reqRuby.type);
            mapType = MapItemEnum.FOOD_GRINDER;
        } else if (reqRuby.type.equals("butter_machine")) {
            width = ConfigContainer.mapConfig.Machine.Butter_Machine.size.width;
            height = ConfigContainer.mapConfig.Machine.Butter_Machine.size.height;
            price = ConfigContainer.getCoopPrice(reqRuby.type);
            mapType = MapItemEnum.BUTTER;
        } else if (reqRuby.type.equals("sugar_machine")) {
            width = ConfigContainer.mapConfig.Machine.Sugar_Machine.size.width;
            height = ConfigContainer.mapConfig.Machine.Sugar_Machine.size.height;
            price = ConfigContainer.getCoopPrice(reqRuby.type);
            mapType = MapItemEnum.SUGAR_MAKER;
        } else if (reqRuby.type.equals("popcorn_machine")) {
            width = ConfigContainer.mapConfig.Machine.Popcorn_Machine.size.width;
            height = ConfigContainer.mapConfig.Machine.Popcorn_Machine.size.height;
            price = ConfigContainer.getCoopPrice(reqRuby.type);
            mapType = MapItemEnum.POPCORN_MAKER;
        } else {
            return;
        }
        //Check collision
        if (!userInfo.getMap().checkValidBlock(reqRuby.x, reqRuby.y, width, height)) {
            send(new ResponseErrorCode(ErrorLog.ERROR_BUY_MAP_OBJECT_COLLISION.getValue()), user);
            return;
        }
        
//        System.out.println("abcxyz");

        //Check ruby
        
        int gold = userInfo.getGold();
        if (!(price > gold)) {
            send(new ResponseErrorCode(ErrorLog.ERROR_BUY_FAIL.getValue()), user);
            return;
        }
        int ruby = fromGoldToRuby(price - gold);
        System.out.println("fromGoldToRuby " + ruby);
        if (!(ruby <= userInfo.getRuby())) {
            send(new ResponseErrorCode(ErrorLog.ERROR_RUBY_NOT_ENOUGH.getValue()), user);
            return;
        }

        //Reduce ruby
        if (!userInfo.reduceRuby(ruby)) {
            send(new ResponseErrorCode(ErrorLog.ERROR_RUBY_NOT_REDUCE.getValue()), user);
            return;
        }

        //OK
        addObject(user, userInfo, mapType, reqRuby.id, reqRuby.x, reqRuby.y, width, height);

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
                    send(new ResponseErrorCode(ErrorLog.ERROR_CANT_ADD_FIELD.getValue()), user);
                    return;
                }
                break;
            case MapItemEnum.BAKERY:
                Machine bakeryModel =
                    new Machine(id, MachineTypeEnum.bakery_machine, ConfigContainer.getMachineSlot("bakery_machine"),
                                new Date().getTime(), false, false, x, y);
                userInfo.getAsset().addMachine(bakeryModel);
                break;
            case MapItemEnum.FOOD_GRINDER:
                Machine foodMachineModel =
                    new Machine(id, MachineTypeEnum.food_machine, ConfigContainer.getMachineSlot("food_machine"),
                                new Date().getTime(), false, false, x, y);
                userInfo.getAsset().addMachine(foodMachineModel);
                break;
            case MapItemEnum.BUTTER:
                Machine butterMachineModel =
                    new Machine(id, MachineTypeEnum.butter_machine, ConfigContainer.getMachineSlot("butter_machine"),
                                new Date().getTime(), false, false, x, y);
                userInfo.getAsset().addMachine(butterMachineModel);
                break;
            case MapItemEnum.SUGAR_MAKER:
                Machine sugarMachineModel =
                    new Machine(id, MachineTypeEnum.sugar_machine, ConfigContainer.getMachineSlot("sugar_machine"),
                                new Date().getTime(), false, false, x, y);
                userInfo.getAsset().addMachine(sugarMachineModel);
                break;
            case MapItemEnum.POPCORN_MAKER:
                Machine popcornMachineModel =
                    new Machine(id, MachineTypeEnum.popcorn_machine, ConfigContainer.getMachineSlot("popcorn_machine"),
                                new Date().getTime(), false, false, x, y);
                userInfo.getAsset().addMachine(popcornMachineModel);
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
