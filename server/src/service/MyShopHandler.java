package service;

import bitzero.server.entities.User;
import bitzero.server.extensions.BaseClientRequestHandler;
import bitzero.server.extensions.data.DataCmd;

import cmd.CmdDefine;

import cmd.receive.demo.RequestPlant;
import cmd.receive.myshop.RequestBuyProduct;
import cmd.receive.myshop.RequestReceiveMoneyFromSoldProduct;
import cmd.receive.myshop.RequestSellProduct;

import cmd.send.demo.ResponseErrorCode;
import cmd.send.demo.ResponseSyncFieldStatus;
import cmd.send.demo.ResponseSyncFoodStorageItem;

import config.enums.ErrorLog;

import model.ProductSale;
import model.StorageItem;
import model.ZPUserInfo;

import org.apache.commons.lang.exception.ExceptionUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MyShopHandler extends BaseClientRequestHandler {
    
    public static short MYSHOP_MULTI_IDS = 12000;
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

                //                    processBuy(user, buy);
                    break;

                case CmdDefine.RECEIVE_MONEY_FROM_SOLD_PRODUCT:
                    RequestReceiveMoneyFromSoldProduct receive = new RequestReceiveMoneyFromSoldProduct(dataCmd);

                    processReceive(user, receive);
                    break;
                
            }
            
                
        } catch (Exception e) {
            logger.warn("PLANT HANDLER EXCEPTION " + e.getMessage());
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
            short errorCode = userInfo.getAsset().getMyShop().sell(userInfo, sell.slot, new ProductSale(new StorageItem(sell.productType, sell.quantity), sell.price));

            //
            if (errorCode == ErrorLog.SUCCESS.getValue()){
                send(new ResponseErrorCode(ErrorLog.SUCCESS.getValue()), user);

                userInfo.saveModel(user.getId());
            } else {
                /*
                 * NOT YET STARTED
                 */
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
                 * NOT YET STARTED
                 */
            }
            
            
        } catch (Exception e) {
        }
    }
    
    
}
