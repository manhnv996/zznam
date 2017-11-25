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

import config.jsonobject.ShopCoopConfig;

import config.utils.ConfigContainer;

import model.ZPUserInfo;

import org.apache.commons.lang.exception.ExceptionUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GameShopBuyHandler extends BaseClientRequestHandler{
    
    public static short PLANT_MULTI_IDS = 7000;
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
        if (req.type.equals("field")) {
            width = ConfigContainer.mapConfig.Field.size.width;
            height = ConfigContainer.mapConfig.Field.size.height;
            price = ConfigContainer.getCoopPrice(req.type);
        } else {
            return;
        }
        
        if (userInfo.getMap().checkValidBlock(req.x, req.y, width, height)) {
            if (price > userInfo.getGold()) {
                
            } else {
                
            }
        } else {
            send(new ResponseErrorCode((short)-1), user);
            return;
        }
        
        try {
            userInfo.saveModel(user.getId());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
