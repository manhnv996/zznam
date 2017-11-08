package service;

import bitzero.server.entities.User;
import bitzero.server.extensions.BaseClientRequestHandler;
import bitzero.server.extensions.data.DataCmd;

import cmd.CmdDefine;

import cmd.receive.demo.RequestMove;

import cmd.send.demo.ResponseMove;

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
            }
        } catch (Exception e) {
            logger.warn("DEMO HANDLER EXCEPTION " + e.getMessage());
            logger.warn(ExceptionUtils.getStackTrace(e));
        }

    }
    
    public void processMove(User user, RequestMove move){
        try {
            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
            if (userInfo==null)
                send(new ResponseMove(DemoError.ERROR.getValue(), new Point()), user);
            
            userInfo.move(move.direction);
            userInfo.saveModel(user.getId());            
            send(new ResponseMove(DemoError.SUCCESS.getValue(), userInfo.position), user);
            
        } catch (Exception e) {
        }
    }
    
    public static final int UP = 1;
    
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
