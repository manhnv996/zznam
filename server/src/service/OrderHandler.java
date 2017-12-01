package service;

import bitzero.server.entities.User;
import bitzero.server.extensions.BaseClientRequestHandler;
import bitzero.server.extensions.data.DataCmd;

import bitzero.util.socialcontroller.bean.UserInfo;

import cmd.CmdDefine;

import cmd.receive.demo.RequestPlant;

import cmd.receive.order.RequestCancelOrder;
import cmd.receive.order.RequestCreateNewOrder;
import cmd.receive.order.RequestMakeOrder;

import cmd.send.demo.ResponseErrorCode;

import cmd.send.demo.ResponseMove;

import cmd.send.demo.ResponseSyncFoodStorageItem;

import cmd.send.demo.ResponseSyncStorage;
import cmd.send.demo.ResponseSyncUserInfo;

import cmd.send.order.ResponseSyncOrder;

import config.enums.ErrorLog;
import config.utils.ProductUtil;

import extension.FresherExtension;

import model.Storage;
import model.StorageItem;
import model.ZPUserInfo;

import org.apache.commons.lang.exception.ExceptionUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class OrderHandler extends BaseClientRequestHandler {
    
    public static short ORDER_MULTI_IDS = 10000;
    private final Logger logger = LoggerFactory.getLogger("OrderHandler");
    
    public OrderHandler() {
        super();
    }

    @Override
    public void handleClientRequest(User user, DataCmd dataCmd) {
        try {
            switch (dataCmd.getId()) {
                //
                case CmdDefine.MAKE_ORDER:
                    RequestMakeOrder makeOrder = new RequestMakeOrder(dataCmd);
                    
                    processMakeOrder(user, makeOrder);
                    break;
                case CmdDefine.CANCEL_ORDER:
                    RequestCancelOrder cancelOrder = new RequestCancelOrder(dataCmd);
                    
                    processCancelOrder(user, cancelOrder);
                    break;
                case CmdDefine.CREATE_NEW_ORDER:
                    RequestCreateNewOrder createNewOrder = new RequestCreateNewOrder(dataCmd);
                    
                    processCreateNewOrder(user, createNewOrder);
                    break;
                
            }
            
                
        } catch (Exception e) {
            logger.warn("ORDER HANDLER EXCEPTION " + e.getMessage());
            logger.warn(ExceptionUtils.getStackTrace(e));
        }

    }
    
//    /////////////
    public void processMakeOrder(User user, RequestMakeOrder order){
        try {
            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
            if (userInfo == null){
                
                return;
            }
            
            /*
             * DONE
             */
            short errorCode = userInfo.getAsset().getOrderdById(order.orderId).makeOrder(userInfo);
            
            //
            if (errorCode == ErrorLog.SUCCESS.getValue()){
                send(new ResponseErrorCode(ErrorLog.SUCCESS.getValue()), user);

                userInfo.saveModel(user.getId());
                //
                send(new ResponseSyncOrder(errorCode, userInfo.getAsset().getOrderdById(order.orderId)), user);
                
            } else {
                
                send(new ResponseSyncOrder(errorCode, userInfo.getAsset().getOrderdById(order.orderId)), user);
                
                if (errorCode == ErrorLog.ERROR_STORAGE_NOT_REDUCE.getValue()){
                    Storage foodStorage = userInfo.getAsset().getFoodStorage();
                    Storage warehouse = userInfo.getAsset().getWarehouse();
                    
                    send(new ResponseSyncStorage(errorCode, foodStorage), user);
                    send(new ResponseSyncStorage(errorCode, warehouse), user);
                }
            }
            
            
        } catch (Exception e) {
        }
    }
    
    public void processCancelOrder(User user, RequestCancelOrder order){
        try {
            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
            if (userInfo == null){
                
                return;
            }
            
            /*
             * DONE
             */
            short errorCode = userInfo.getAsset().getOrderdById(order.orderId).cancelOrder();
            
            //
            if (errorCode == ErrorLog.SUCCESS.getValue()){
                send(new ResponseErrorCode(ErrorLog.SUCCESS.getValue()), user);

                userInfo.saveModel(user.getId());                
                //
                send(new ResponseSyncOrder(errorCode, userInfo.getAsset().getOrderdById(order.orderId)), user);
                
            } else {
                
                send(new ResponseSyncOrder(errorCode, userInfo.getAsset().getOrderdById(order.orderId)), user);
            }
            
            
        } catch (Exception e) {
        }
    }
    
    
    public void processCreateNewOrder(User user, RequestCreateNewOrder order){
        try {
            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
            if (userInfo == null){
                
                return;
            }
            
            /*
             * DONE
             */
            short errorCode = userInfo.getAsset().getOrderdById(order.orderId).createOrder(userInfo.getLevel());
            
            //
            if (errorCode == ErrorLog.SUCCESS.getValue()){
                send(new ResponseErrorCode(ErrorLog.SUCCESS.getValue()), user);

                userInfo.saveModel(user.getId());                
                //
                send(new ResponseSyncOrder(errorCode, userInfo.getAsset().getOrderdById(order.orderId)), user);
                
            } else {
                
                send(new ResponseSyncOrder(errorCode, userInfo.getAsset().getOrderdById(order.orderId)), user);
            }
            
            
        } catch (Exception e) {
        }
    }
    
    
//    /////////
    
    
    
    
}
