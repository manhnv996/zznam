package service;

import bitzero.server.entities.User;
import bitzero.server.extensions.BaseClientRequestHandler;

import bitzero.server.extensions.data.DataCmd;

import cmd.CmdDefine;

import cmd.receive.constructed.RequestBoostBuild;
import cmd.receive.constructed.RequestBuildCompleted;

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
                case CmdDefine.BOOST_BUILD_REQUEST:
                    RequestBoostBuild reqBoost = new RequestBoostBuild(dataCmd);
                    
                    proccessBoostBuild(user, reqBoost);
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

        switch (req.typeBuilding) {
            case MapItemEnum.MACHINE:
                Machine machineModel = userInfo.getAsset().getMachineById(req.id);
                MachineConfig machineConfig = ConfigContainer.getMachineConfigByType(machineModel.getType().toString());
                int totalTime = machineConfig.time * 1000;
                long startBuildTime = machineModel.getStartBuildTime();
                long curTime = new Date().getTime();
                System.out.println("((curTime - startBuildTime) >= totalTime || machineModel.isBoostBuild()) " + ((curTime - startBuildTime) >= totalTime || machineModel.isBoostBuild()));
                
                if ((curTime - startBuildTime) >= totalTime || machineModel.isBoostBuild()) {
                    machineModel.setCompleted();
                    System.out.println("Build Completed");
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
    
    public void proccessBoostBuild (User user, RequestBoostBuild reqBoost) {
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
         * Process in here
         */
        
        switch (reqBoost.typeBuilding) {
            case MapItemEnum.MACHINE:
                Machine machineModel = userInfo.getAsset().getMachineById(reqBoost.id);
                MachineConfig machineConfig = ConfigContainer.getMachineConfigByType(machineModel.getType().toString());
                long startTime = machineModel.getStartBuildTime();
                long curTime = new Date().getTime();
                
                int rubyReduce = (int) Math.floor((curTime - startTime) / (machineConfig.reduceRubyTime * 1000));
                int ruby = machineConfig.buildExpress - rubyReduce;
                System.out.println("(machineConfig.reduceRubyTime * 1000) " + (machineConfig.reduceRubyTime * 1000));
                System.out.println("(curTime - startTime) " + (curTime - startTime));

                System.out.println("machineConfig.reduceRubyTime " + ruby);
                System.out.println("user Ruby  " + userInfo.getRuby());

                if (ruby > userInfo.getRuby()) {
                    send(new ResponseErrorCode(ErrorLog.ERROR_RUBY_NOT_ENOUGH.getValue()), user);
                    return;
                } 
                
                if (!userInfo.reduceRuby(ruby)) {
                    send(new ResponseErrorCode(ErrorLog.ERROR_RUBY_NOT_REDUCE.getValue()), user);
                    return;
                }
                System.out.println("user Ruby after  " + userInfo.getRuby());
                machineModel.setBoostBuild();
                send(new ResponseErrorCode(ErrorLog.SUCCESS.getValue()), user);
            break;
        }

        try {
            userInfo.saveModel(user.getId());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
