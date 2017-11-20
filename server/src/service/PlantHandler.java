package service;

import bitzero.server.entities.User;
import bitzero.server.extensions.BaseClientRequestHandler;
import bitzero.server.extensions.data.DataCmd;

import cmd.CmdDefine;

import cmd.receive.demo.RequestCrop;
import cmd.receive.demo.RequestMove;

import cmd.receive.demo.RequestPlant;

import cmd.send.demo.ResponseMove;

import cmd.send.demo.ResponsePlant;

import java.awt.Point;

import model.ZPUserInfo;

import org.apache.commons.lang.exception.ExceptionUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class PlantHandler extends BaseClientRequestHandler {
    
    public static short PLANT_MULTI_IDS = 5000;
    private final Logger logger = LoggerFactory.getLogger("PlantHandler");
    
    public PlantHandler() {
        super();
    }

    @Override
    public void handleClientRequest(User user, DataCmd dataCmd) {
        try {
            switch (dataCmd.getId()) {
            
            //
            case CmdDefine.PLANT:
                RequestPlant plant = new RequestPlant(dataCmd);
                
                System.out.println("get plant");
                processPlant(user, plant);
                break;
            
            case CmdDefine.CROP:
                RequestCrop crop = new RequestCrop(dataCmd);
                
                
                break;
            }
            
                
        } catch (Exception e) {
            logger.warn("PLANT HANDLER EXCEPTION " + e.getMessage());
            logger.warn(ExceptionUtils.getStackTrace(e));
        }

    }
    
//    /////////////
    public void processPlant(User user, RequestPlant plant){
        try {
            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
            if (userInfo==null){
//                send(new ResponseMove(DemoError.ERROR.getValue(), new Point()), user);
                send(new ResponsePlant((short) 14), user);
                
            }
            
            
            /*
             * INPROGRESS
             *  Check status
             *  if status == EMPTY
             *      takeItem -> if true (saveModel) 
             *  
             *  send Response
             */
//            userInfo.move(move.direction);
//            userInfo.saveModel(user.getId());            
//            send(new ResponseMove(DemoError.SUCCESS.getValue(), userInfo.position), user);
            send(new ResponsePlant((short) 12), user);
            
        } catch (Exception e) {
        }
    }
    
    public void processCrop(User user, RequestCrop crop){
        try {
            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
            if (userInfo==null){
    //                send(new ResponseMove(DemoError.ERROR.getValue(), new Point()), user);
                
            }
            /*
             * INPROGRESS
             *  Check status
             *  if status == DONE
             *      addItem -> if true (saveModel) 
             *  
             *  send Response
             */
            
        } catch (Exception e) {
        }
    }
//    /////////
    
    
    
    
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
