package service;

import bitzero.server.entities.User;
import bitzero.server.extensions.BaseClientRequestHandler;

import bitzero.server.extensions.data.DataCmd;

import cmd.CmdDefine;

import cmd.receive.constructed.RequestBuildCompleted;
import cmd.receive.gameshop.RequestBuyMapObject;
import cmd.receive.gameshop.RequestBuyMapObjectByRuby;

import cmd.send.demo.ResponseErrorCode;

import config.enums.ErrorLog;
import config.enums.MapItemEnum;

import config.jsonobject.MachineConfig;

import config.utils.ConfigContainer;

import java.util.Date;

import model.Machine;
import model.ZPUserInfo;

import org.apache.commons.lang.exception.ExceptionUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ConstructedHandler extends BaseClientRequestHandler{
    
    public static short CONSTRUCTED_MULTI_IDS = 9000;
    private final Logger logger = LoggerFactory.getLogger("ConstructedHandler");
    
    public ConstructedHandler() {
        super();
    }

    @Override
    public void handleClientRequest(User user, DataCmd dataCmd) {
        try {
            switch (dataCmd.getId()) {
                //
                case CmdDefine.BUILD_COMPLETED_REQUEST:
                    RequestBuildCompleted req = new RequestBuildCompleted(dataCmd);
                    
                    processBuildCompleted(user, req);
                    break;
            }
            
                
        } catch (Exception e) {
            logger.warn("PLANT HANDLER EXCEPTION " + e.getMessage());
            logger.warn(ExceptionUtils.getStackTrace(e));
        }

    }
    
    public void processBuildCompleted (User user, RequestBuildCompleted req) {
        ZPUserInfo userInfo = null;
        try {
            userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
        } catch (Exception e) {
            e.printStackTrace();  
        }
        if (userInfo == null) {
            return;    
        }
        /**
         *  Process in here
         */
        System.out.println("Build Completed");

        switch (req.typeBuilding) {
            case MapItemEnum.MACHINE:
                Machine machineModel = userInfo.getAsset().getMachineById(req.id);
                MachineConfig machineConfig = ConfigContainer.getMachineConfigByType(machineModel.getType().toString());
                int totalTime = machineConfig.time * 1000;
                long startBuildTime = machineModel.getStartBuildTime();
                long curTime = new Date().getTime();
                
                if ((curTime - startBuildTime) >= totalTime) {
                    machineModel.setCompleted();
//                    System.out.println("Build Completed");
                    send(new ResponseErrorCode(ErrorLog.SUCCESS.getValue()), user);
                } else {
                    send(new ResponseErrorCode(ErrorLog.ERROR_COMPLETED_BUIDING_FAIL.getValue()), user);
                    return;
                }
                break;
        }
        
        
        try {
            userInfo.saveModel(user.getId());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
