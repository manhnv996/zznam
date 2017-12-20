package service;

import bitzero.server.entities.User;
import bitzero.server.extensions.BaseClientRequestHandler;
import bitzero.server.extensions.data.DataCmd;

import cmd.CmdDefine;

import cmd.receive.demo.RequestPlant;
import cmd.receive.myshop.RequestBuyProduct;
import cmd.receive.myshop.RequestCancelSellProduct;
import cmd.receive.myshop.RequestReceiveMoneyFromSoldProduct;
import cmd.receive.myshop.RequestSellProduct;

import cmd.receive.myshop.RequestUnlockSlotMyShop;

import cmd.send.demo.ResponseErrorCode;
import cmd.send.demo.ResponseSyncFieldStatus;
import cmd.send.demo.ResponseSyncFoodStorageItem;

import cmd.send.demo.ResponseSyncUserInfo;
import cmd.send.myshop.ResponseSyncProductSale;

import config.enums.ErrorLog;

import model.ProductSale;
import model.StorageItem;
import model.ZPUserInfo;

import org.apache.commons.lang.exception.ExceptionUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MyShopHandler extends BaseClientRequestHandler {
    
    public static short MYSHOP_MULTI_IDS = 13000;
    private final Logger logger = LoggerFactory.getLogger("MyShopHandler");
    
    public MyShopHandler() {
        super();
    }

    @Override
    public void handleClientRequest(User user, DataCmd dataCmd) {
        // TODO Implement this method
        try {
            switch (dataCmd.getId()) {
                //
                case CmdDefine.SELL_PRODUCT:
                    RequestSellProduct sell = new RequestSellProduct(dataCmd);
                    
                    processSell(user, sell);
                    break;

                case CmdDefine.BUY_PRODUCT:
                    RequestBuyProduct buy = new RequestBuyProduct(dataCmd);

                    processBuy(user, buy);
                    break;

                case CmdDefine.RECEIVE_MONEY_FROM_SOLD_PRODUCT:
                    RequestReceiveMoneyFromSoldProduct receive = new RequestReceiveMoneyFromSoldProduct(dataCmd);

                    processReceive(user, receive);
                    break;

                case CmdDefine.CANCEL_SELL_PRODUCT:
                    RequestCancelSellProduct cancel = new RequestCancelSellProduct(dataCmd);

                    processCancel(user, cancel);
                    break;
                
                case CmdDefine.UNLOCK_SLOT_MY_SHOP:
                    RequestUnlockSlotMyShop unlock = new RequestUnlockSlotMyShop(dataCmd);
                    
                    processUnlock(user, unlock);
                    break;
            }
            
                
        } catch (Exception e) {
            logger.warn("MYSHOP HANDLER EXCEPTION " + e.getMessage());
            logger.warn(ExceptionUtils.getStackTrace(e));
        }
    }
    
    
    ////
    public void processSell(User user, RequestSellProduct sell){
        try {
            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
            if (userInfo == null){
                return;
            }
            
            /*
             * INPROGRESS
             */
            short errorCode = userInfo.getAsset().getMyShop().sell(userInfo, sell.slot, 
                    new StorageItem(sell.productType, sell.quantity), sell.price);

            //
            if (errorCode == ErrorLog.SUCCESS.getValue()){
                send(new ResponseErrorCode(ErrorLog.SUCCESS.getValue()), user);

                userInfo.saveModel(user.getId());
            } else {
                /*
                 * inprogress
                 */
                send(new ResponseSyncProductSale(errorCode, userInfo.getAsset().getMyShop().getProductBySlot(sell.slot)), user);
            }
            
            
        } catch (Exception e) {
        }
    }

    public void processBuy(User user, RequestBuyProduct buy){
        try {
            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
            ZPUserInfo userSell = (ZPUserInfo) ZPUserInfo.getModel(buy.userId, ZPUserInfo.class);
            if (userInfo == null || userSell == null){
                return;
            }
            
            /*
             * INPROGRESS
             */
            short errorCode = userInfo.getAsset().getMyShop().buy(userInfo, userSell, buy.slot);

            //
            if (errorCode == ErrorLog.SUCCESS.getValue()){
                send(new ResponseErrorCode(ErrorLog.SUCCESS.getValue()), user);
                userInfo.saveModel(user.getId());
                
                //
                userSell.getAsset().getMyShop().getProductBySlot(buy.slot).setIsSold(true);
                userSell.saveModel(buy.userId);
                /*
                 * ?/
                 */
//                send(new ResponseSyncProductSale(errorCode, userSell.getAsset().getMyShop().getProductBySlot(buy.slot)), userSell);
                //
            } else {
                /*
                 * inprogress
                 */
                send(new ResponseSyncProductSale(errorCode, userInfo.getAsset().getMyShop().getProductBySlot(buy.slot)), user);
            }
            
            
        } catch (Exception e) {
        }
    }
    
    //
    public void processReceive(User user, RequestReceiveMoneyFromSoldProduct receive){
        try {
            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
            if (userInfo == null){
                return;
            }
            
            
            /*
             * INPROGRESS
             */
            short errorCode = userInfo.getAsset().getMyShop().receiveMoneyFromSoldProduct(userInfo, receive.slot);

            //
            if (errorCode == ErrorLog.SUCCESS.getValue()){
                send(new ResponseErrorCode(ErrorLog.SUCCESS.getValue()), user);

                userInfo.saveModel(user.getId());
            } else {
                /*
                 * inprogress
                 */
                send(new ResponseSyncProductSale(errorCode, userInfo.getAsset().getMyShop().getProductBySlot(receive.slot)), user);
                send(new ResponseSyncUserInfo(errorCode, userInfo), user);
            }
            
            
        } catch (Exception e) {
        }
    }

    public void processCancel(User user, RequestCancelSellProduct cancel){
        try {
            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
            if (userInfo == null){
                return;
            }
            
            
            /*
             * INPROGRESS
             */
            short errorCode = userInfo.getAsset().getMyShop().cancelSell(userInfo, cancel.slot);

            //
            if (errorCode == ErrorLog.SUCCESS.getValue()){
                send(new ResponseErrorCode(ErrorLog.SUCCESS.getValue()), user);

                userInfo.saveModel(user.getId());
            } else {
                /*
                 * inprogress
                 */
                send(new ResponseSyncProductSale(errorCode, userInfo.getAsset().getMyShop().getProductBySlot(cancel.slot)), user);
            }
            
            
        } catch (Exception e) {
        }
    }

    public void processUnlock(User user, RequestUnlockSlotMyShop unlock){
        try {
            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
            if (userInfo == null){
                return;
            }
            
            
            /*
             * INPROGRESS
             */
            short errorCode = userInfo.getAsset().getMyShop().unlockSlot(userInfo);

            //
            if (errorCode == ErrorLog.SUCCESS.getValue()){
                send(new ResponseErrorCode(ErrorLog.SUCCESS.getValue()), user);

                userInfo.saveModel(user.getId());
            } else {
                /*
                 * not yet started
                 * sync listproductsale
                 */
                send(new ResponseSyncUserInfo(errorCode, userInfo), user);
            }
            
            
        } catch (Exception e) {
        }
    }
    
    
}
