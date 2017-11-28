package service;

import bitzero.server.entities.User;
import bitzero.server.extensions.BaseClientRequestHandler;
import bitzero.server.extensions.data.DataCmd;

import cmd.CmdDefine;

import cmd.receive.demo.RequestCrop;
import cmd.receive.demo.RequestMove;

import cmd.receive.demo.RequestPlant;

import cmd.receive.map.RequestMoveField;
import cmd.receive.map.RequestMoveStorage;

import cmd.send.demo.ResponseMove;


import cmd.send.demo.ResponseSyncFoodStorageItem;

import cmd.send.map.ResponseMoveBlock;

import config.enums.MapItemEnum;

import config.utils.ConfigContainer;

import java.awt.Point;

import model.Field;
import model.MapAlias;
import model.Storage;
import model.ZPUserInfo;

import org.apache.commons.lang.exception.ExceptionUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MapHandler extends BaseClientRequestHandler {
    
    public static short MAP_MULTI_IDS = 6000;
    private final Logger logger = LoggerFactory.getLogger("MapHandler");
    
    public MapHandler() {
        super();
    }

    @Override
    public void handleClientRequest(User user, DataCmd dataCmd) {
        try {
            switch (dataCmd.getId()) {
            case CmdDefine.MOVE_STORAGE:
                RequestMoveStorage reqMoveStorage = new RequestMoveStorage(dataCmd);
                processMoveStorage(user, reqMoveStorage);
                break;
            case CmdDefine.MOVE_FIELD:
                RequestMoveField reqMoveField = new RequestMoveField(dataCmd);
                processMoveField(user, reqMoveField);
                break;
            }
                
        } catch (Exception e) {
            logger.warn("DEMO HANDLER EXCEPTION " + e.getMessage());
            logger.warn(ExceptionUtils.getStackTrace(e));
        }

    }
    
    private void processMoveStorage(User user, RequestMoveStorage reqMoveStorage) {
        short type = reqMoveStorage.type;
        int x = reqMoveStorage.x;
        int y = reqMoveStorage.y;
        ZPUserInfo userInfo = null;
        try {
            userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
        } catch (Exception e) {
            e.printStackTrace();  
        }
        if (userInfo == null) {
            return;    
        }
        MapAlias map = userInfo.getMap();
        Storage storage;
        int width;
        int height;
        if (type == MapItemEnum.SILO) {
            // Update silo
            storage = userInfo.getAsset().getFoodStorage();
            width = ConfigContainer.mapConfig.Silo.size.width;
            height = ConfigContainer.mapConfig.Silo.size.height;
        } else if (type == MapItemEnum.WAREHOUSE) {
            // Update warehouse
            storage = userInfo.getAsset().getWarehouse();
            width = ConfigContainer.mapConfig.Warehouse.size.width;
            height = ConfigContainer.mapConfig.Warehouse.size.height;
        } else {
            // Not valid
            send(new ResponseMoveBlock((short)0, -1), user);
            return;
        }
        // Try to remove position on map to check
        map.removeMapAlias(storage.getX(), storage.getY(), width, height);
        if (!map.checkValidBlock(storage.getX(), storage.getY(), width, height)) {
            // Recovery last position
            map.addMapAlias(storage.getX(), storage.getY(), width, height, type);
            // Invalid position
            send(new ResponseMoveBlock((short)0, -2), user);
            return;
        }
        map.addMapAlias(x, y, width, height, type);
        storage.setX(x);
        storage.setY(y);
        System.out.println("[+] Request move storage " + type + " x = " + x + " y = " + y);
        try {
            userInfo.saveModel(user.getId());
        } catch (Exception e) {
            e.printStackTrace();
        }
        send(new ResponseMoveBlock((short)0, 0), user);
    }
    
    private void processMoveField(User user, RequestMoveField req) {
        System.out.println("[+] Request move Field " + req.id + " x = " + req.x + " y = " + req.y);
        ZPUserInfo userInfo = null;
        try {
            userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
        } catch (Exception e) {
            e.printStackTrace();  
        }
        if (userInfo == null) {
            return;    
        }
        Field field = userInfo.getAsset().getFieldById(req.id);
        MapAlias map = userInfo.getMap();
        if (field == null) {
            // Not found
            send(new ResponseMoveBlock((short)0, -1), user);
        }
        int width = ConfigContainer.mapConfig.Field.size.width;
        int height = ConfigContainer.mapConfig.Field.size.height;
        int type = MapItemEnum.FIELD;
        map.removeMapAlias(field.getX(), field.getY(), width, height);
        if (!map.checkValidBlock(req.x, req.y, width, height)) {
            // Recovery block
            map.addMapAlias(field.getX(), field.getY(), width, height, type);
            // Invalid position
            send(new ResponseMoveBlock((short)0, -2), user);
            return;
        }
        map.addMapAlias(req.x, req.y, width, height, type);
        field.setX(req.x);
        field.setY(req.y);
        try {
            userInfo.saveModel(user.getId());
        } catch (Exception e) {
            e.printStackTrace();
        }
        send(new ResponseMoveBlock((short)0, 0), user);
    }
}
