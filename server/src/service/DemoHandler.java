package service;

import bitzero.server.entities.User;
import bitzero.server.extensions.BaseClientRequestHandler;
import bitzero.server.extensions.data.DataCmd;

import cmd.CmdDefine;

import cmd.receive.demo.RequestBuyGold;
import cmd.receive.demo.RequestBuyRuby;
import cmd.receive.demo.RequestCrop;
import cmd.receive.demo.RequestMove;

import cmd.receive.demo.RequestPlant;

import cmd.send.demo.ResponseErrorCode;
import cmd.send.demo.ResponseMove;


import cmd.send.demo.ResponseSyncUserInfo;

import config.enums.ErrorLog;

import java.awt.Point;

import model.ZPUserInfo;

import org.apache.commons.lang.exception.ExceptionUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DemoHandler extends BaseClientRequestHandler {
    
    public static short DEMO_MULTI_IDS = 2000;
    private final Logger logger = LoggerFactory.getLogger("DemoHandler");
    
    public DemoHandler() {
        super();
    }

    @Override
    public void handleClientRequest(User user, DataCmd dataCmd) {
        try {
            switch (dataCmd.getId()) {
            case CmdDefine.MOVE:                
                RequestMove move = new RequestMove(dataCmd);
                processMove(user, move);
                break;
            case CmdDefine.BUY_GOLD:                
                RequestBuyGold buy_gold = new RequestBuyGold(dataCmd);
                processBuyGold(user, buy_gold);
                break;
            case CmdDefine.BUY_RUBY:
                RequestBuyRuby buy_ruby = new RequestBuyRuby(dataCmd);
                processBuyRuby(user, buy_ruby);
                break;
        
            
            }
                
        } catch (Exception e) {
            logger.warn("DEMO HANDLER EXCEPTION " + e.getMessage());
            logger.warn(ExceptionUtils.getStackTrace(e));
        }

    }
        
    
    public void processBuyGold(User user, RequestBuyGold buy_gold){
        try {
            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
        //            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(1, ZPUserInfo.class);  
            if (userInfo == null){
        //                send(new ResponseFieldStatus(ErrorLog.ERROR_USER_NOT_FOUND.getValue(), null), user);
                return;
            }
            
            /*
             * DONE
             */
            int gold = buy_gold.gold;
            
            if (userInfo.increaseGold(gold)){
                   

                    userInfo.saveModel(user.getId());
            //                    userInfo.saveModel(1);
                    
                    send(new ResponseErrorCode(ErrorLog.SUCCESS.getValue()), user);
                    return;
                } 
            System.out.println("before send");
            send(new ResponseSyncUserInfo(ErrorLog.ERROR_GOLD_NOT_INCREASE.getValue(), userInfo), user);
            System.out.println("after send");    
        } 
        catch (Exception e) {
            System.out.println("exception 98");    
        }
    }
 
    public void processMove(User user, RequestMove move){
        try {
            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
            if (userInfo==null)
                send(new ResponseMove(DemoError.ERROR.getValue(), new Point()), user);
            
    //            userInfo.move(move.direction);
    //            userInfo.saveModel(user.getId());
    //            send(new ResponseMove(DemoError.SUCCESS.getValue(), userInfo.position), user);
            
        } catch (Exception e) {
        }
    }
    
    public static final int UP = 1;

    private void processBuyRuby(User user, RequestBuyRuby buy_ruby) {
        try {
            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
        //            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(1, ZPUserInfo.class);
            if (userInfo == null){
        //                send(new ResponseFieldStatus(ErrorLog.ERROR_USER_NOT_FOUND.getValue(), null), user);
                return;
            }
            
            /*
             * Process here babe
             */
            int ruby = buy_ruby.ruby;
            
            if (userInfo.increaseRuby(ruby)){
                    userInfo.saveModel(user.getId());
            //                    userInfo.saveModel(1);
                    send(new ResponseErrorCode(ErrorLog.SUCCESS.getValue()), user);
                    return;
                } 
            System.out.println("before send");
            send(new ResponseSyncUserInfo(ErrorLog.ERROR_RUBY_NOT_INCREASE.getValue(), userInfo), user);
            System.out.println("after send");    
        } 
        catch (Exception e) {
            System.out.println("exception 143");   
        }
    }

    public enum DemoDirection{
        UP((short)1),
        DOWN((short)2),
        LEFT((short)3),
        RIGHT((short)4);
        
        private final short value;
        private DemoDirection(short value){
            this.value = value;
        }
        
        public short getValue(){
            return this.value;
        }
    }
    
    public class MaxPosition{
        public static final int X = 3;
        public static final int Y = 3;
    }
    
    public enum DemoError{
        SUCCESS((short)0),
        ERROR((short)1);
        
        private final short value;
        private DemoError(short value){
            this.value = value;
        }
        
        public short getValue(){
            return this.value;
        }
    }
}
