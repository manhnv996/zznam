package extension;


import bitzero.engine.sessions.ISession;

import bitzero.server.config.ConfigHandle;
import bitzero.server.core.BZEventType;
import bitzero.server.entities.User;
import bitzero.server.entities.managers.ConnectionStats;
import bitzero.server.extensions.BZExtension;
import bitzero.server.extensions.data.DataCmd;

import bitzero.util.ExtensionUtility;
import bitzero.util.common.business.Debug;
import bitzero.util.datacontroller.business.DataController;
import bitzero.util.socialcontroller.bean.UserInfo;

import bitzero.util.socialcontroller.exceptions.SocialControllerException;

import cmd.receive.authen.RequestLogin;

import config.enums.ProductType;
import config.enums.StorageType;

import config.jsonobject.ProductConfig;

import config.utils.ConfigContainer;

import config.utils.OrderUtil;

import eventhandler.LoginSuccessHandler;
import eventhandler.LogoutHandler;

import java.util.List;

import model.GameInfo;

import model.Users;

import org.apache.commons.lang.exception.ExceptionUtils;

import org.json.JSONObject;

import service.ConstructedHandler;
import service.DemoHandler;
import service.AnimalHandler;

import service.FriendHandler;
import service.GameShopHandler;
import service.MapHandler;
import service.MyShopHandler;
import service.OrderHandler;
import service.PlantHandler;
import service.StorageHandler;
import service.UserHandler;
import service.NatureHandler;

import util.GuestLogin;

import util.metric.LogObject;
import util.metric.MetricLog;

import util.server.ServerConstant;
import util.server.ServerLoop;



/*

import bitzero.engine.sessions.ISession;

import bitzero.server.config.ConfigHandle;
import bitzero.server.core.BZEventType;
import bitzero.server.entities.User;
import bitzero.server.entities.managers.ConnectionStats;
import bitzero.server.extensions.BZExtension;
import bitzero.server.extensions.data.DataCmd;

import bitzero.util.ExtensionUtility;
import bitzero.util.common.business.Debug;
import bitzero.util.datacontroller.business.DataController;
import bitzero.util.socialcontroller.bean.UserInfo;

import cmd.receive.authen.RequestLogin;

import config.enums.ProductType;
import config.enums.StorageType;

import eventhandler.LoginSuccessHandler;
import eventhandler.LogoutHandler;

import java.util.List;

import model.Asset;
import model.Field;
import model.Storage;
import model.ZPUserInfo;

import org.apache.commons.lang.exception.ExceptionUtils;

import org.json.JSONObject;

import service.DemoHandler;
import service.PlantHandler;
import service.UserHandler;

import util.GuestLogin;

import util.metric.LogObject;
import util.metric.MetricLog;

import util.server.ServerLoop;
*/

public class FresherExtension extends BZExtension {
    private static String SERVERS_INFO =
        ConfigHandle.instance().get("servers_key") == null ? "servers" : ConfigHandle.instance().get("servers_key");

    private ServerLoop svrLoop;
    private Users users;
    
    public FresherExtension() {
        super();
        setName("Fresher");
        svrLoop = new ServerLoop();
		
		
		//
//        setupUserInfo();
        
    }

    public void init() {
        trace("  Register Handler ");
        addRequestHandler(UserHandler.USER_MULTI_IDS, UserHandler.class);
        addRequestHandler(DemoHandler.DEMO_MULTI_IDS, DemoHandler.class);

		
        //  
        addRequestHandler(PlantHandler.PLANT_MULTI_IDS, PlantHandler.class);
        addRequestHandler(OrderHandler.ORDER_MULTI_IDS, OrderHandler.class);
        addRequestHandler(MyShopHandler.MYSHOP_MULTI_IDS, MyShopHandler.class);
        //
        addRequestHandler(MapHandler.MAP_MULTI_IDS, MapHandler.class);
        
        addRequestHandler(GameShopHandler.GAMESHOP_MULTI_IDS, GameShopHandler.class);
        addRequestHandler(StorageHandler.STORAGE_MULTI_IDS, StorageHandler.class);
        addRequestHandler(ConstructedHandler.CONSTRUCTED_MULTI_IDS, ConstructedHandler.class);
        addRequestHandler(AnimalHandler.ANIMAL_MULTI_IDS, AnimalHandler.class);
        addRequestHandler(NatureHandler.NATURE_MULTI_IDS, NatureHandler.class);
        addRequestHandler(FriendHandler.FRIEND_MULTI_IDS, FriendHandler.class);
        
        trace(" Event Handler ");
        addEventHandler(BZEventType.USER_LOGIN, LoginSuccessHandler.class);
        addEventHandler(BZEventType.USER_LOGOUT, LogoutHandler.class);
        addEventHandler(BZEventType.USER_DISCONNECT, LogoutHandler.class);
        ConfigContainer.init();
        // System.out.println("[+] Value " + ConfigContainer.mapConfig.Init.height);
//        doTest();
        // Init usersInfo
        this.users = Users.getUsers();
        
        if (this.users == null) {
            this.users = new Users();
            this.users.save();
        }
    }
	
	
	
//    public static void setupUserInfo(){
//        Storage foodStorage = new Storage(StorageType.FOOD_STORAGE, 50, 10, 10);
//        Storage warehouse = new Storage(StorageType.WAREHOUSE, 50, 8, 8);
//        foodStorage.addItem(ProductType.CROP_CARROT, 5);
//        foodStorage.addItem(ProductType.CROP_SOYBEAN, 10);
//        
//        Asset asset = new Asset(foodStorage, warehouse, null, null);        
//        for (int i = 0; i < 6; i++){
//            Field field = new Field(0, 18, 10 + i);
//            asset.addField(field);
//        }
//        asset.getFieldById(1).setPlantType("crop_corn");
//
////        user = new ZPUserInfo(asset);
//        System.out.println("Setup!!!!!!!!!");
//    }
//	
//	public static void setupUserInfo(){
//        Storage foodStorage = new Storage(StorageType.FOOD_STORAGE, 50, 10, 10);
//        Storage warehouse = new Storage(StorageType.WAREHOUSE, 50, 8, 8);
//        foodStorage.addItem(ProductType.CROP_CARROT, 5);
//        foodStorage.addItem(ProductType.CROP_SOYBEAN, 10);
//        
//        Asset asset = new Asset(foodStorage, warehouse, null, null, null);        
//        for (int i = 0; i < 6; i++){
//            Field field = new Field(0, 18, 10 + i);
//            asset.addField(field);
//        }
//        asset.getFieldById(1).setPlantType("crop_corn");
//
////        user = new ZPUserInfo(asset);
//        System.out.println("Setup!!!!!!!!!");
//    }
    
    
/*
    public ServerLoop getServerLoop() {
        return svrLoop;
    }

    @Override
    public void monitor() {
        try {
            ConnectionStats connStats = bz.getStatsManager().getUserStats();
            JSONObject data = new JSONObject();

            data.put("totalInPacket", bz.getStatsManager().getTotalInPackets());
            data.put("totalOutPacket", bz.getStatsManager().getTotalOutPackets());
            data.put("totalInBytes", bz.getStatsManager().getTotalInBytes());
            data.put("totalOutBytes", bz.getStatsManager().getTotalOutBytes());

            data.put("connectionCount", connStats.getSocketCount());
            data.put("totalUserCount", bz.getUserManager().getUserCount());

            DataController.getController().setCache(SERVERS_INFO, 60 * 5, data.toString());
        } catch (Exception e) {
            trace("Ex monitor");
        }
    }

    @Override
    public void destroy() {
        List<User> allUser = ExtensionUtility.globalUserManager.getAllUsers();
        if (allUser.size() == 0)
            return;

        User obj = null;

        for (int i = 0; i < allUser.size(); i++) {
            obj = allUser.get(i);
            // do sth with user
            LogObject logObject = new LogObject(LogObject.ACTION_LOGOUT);
            logObject.zingId = obj.getId();
            logObject.zingName = obj.getName();
            //System.out.println("Log logout = " + logObject.getLogMessage());
            MetricLog.writeActionLog(logObject);
        }
    }


    public void doLogin(short cmdId, ISession session, DataCmd objData) {
        RequestLogin reqGet = new RequestLogin(objData);
        reqGet.unpackData();

       
        try {
            UserInfo uInfo = getUserInfo("", "", session.getAddress(), true);
            User u;

            if (uInfo == null) {
                //trace(" objuinfo or userinfo null");
                u = ExtensionUtility.instance().canLogin(null, "", session);
            } else {
                //trace(" objuinfo userinfo id = " + objUInfo.userInfo.getUserId());
                u = ExtensionUtility.instance().canLogin(uInfo, "", session);
                u.setProperty("userId", uInfo.getUserId());
            }
        } catch (Exception e) {
            Debug.warn("DO LOGIN EXCEPTION " + e.getMessage());
            Debug.warn(ExceptionUtils.getStackTrace(e));
        }

    }

    private UserInfo getUserInfo(String username, String password, String ipAddress,
                                 boolean useCache) throws Exception {
        return GuestLogin.newGuest();
    }
*/

	
	

    public ServerLoop getServerLoop() {
        return svrLoop;
    }

    @Override
    public void monitor() {
        try {
            ConnectionStats connStats = bz.getStatsManager().getUserStats();
            JSONObject data = new JSONObject();

            data.put("totalInPacket", bz.getStatsManager().getTotalInPackets());
            data.put("totalOutPacket", bz.getStatsManager().getTotalOutPackets());
            data.put("totalInBytes", bz.getStatsManager().getTotalInBytes());
            data.put("totalOutBytes", bz.getStatsManager().getTotalOutBytes());

            data.put("connectionCount", connStats.getSocketCount());
            data.put("totalUserCount", bz.getUserManager().getUserCount());

            DataController.getController().setCache(SERVERS_INFO, 60 * 5, data.toString());
        } catch (Exception e) {
            trace("Ex monitor");
        }
    }

    @Override
    public void destroy() {
        List<User> allUser = ExtensionUtility.globalUserManager.getAllUsers();
        if (allUser.size() == 0)
            return;

        User obj = null;

        for (int i = 0; i < allUser.size(); i++) {
            obj = allUser.get(i);
            // do sth with user
            LogObject logObject = new LogObject(LogObject.ACTION_LOGOUT);
            logObject.zingId = obj.getId();
            logObject.zingName = obj.getName();
            //System.out.println("Log logout = " + logObject.getLogMessage());
            MetricLog.writeActionLog(logObject);
        }
    }


    public void doLogin(short cmdId, ISession session, DataCmd objData) {
        RequestLogin reqGet = new RequestLogin(objData);
        reqGet.unpackData();
       
        try {
            
            UserInfo uInfo = getUserInfo(reqGet.sessionKey, reqGet.userId, session.getAddress());
            User u = ExtensionUtility.instance().canLogin(uInfo, "", session);
            if (u!=null)
                u.setProperty("userId", uInfo.getUserId());
            users.findAndAdd(u.getId());
            users.save();
        } catch (Exception e) {
            Debug.warn("DO LOGIN EXCEPTION " + e.getMessage());
            Debug.warn(ExceptionUtils.getStackTrace(e));
        }

    }

    private UserInfo getUserInfo(String username, int userId, String ipAddress) throws Exception {
        int customLogin = ServerConstant.CUSTOM_LOGIN;
        switch(customLogin){
            case 1: // login zingme
                return ExtensionUtility.getUserInfoFormPortal(username);
            case 2: // set direct userid
                return GuestLogin.setInfo(userId, "Fresher_" + userId);
            default: // auto increment
                return GuestLogin.newGuest();
        }        
    }

    private void doTest(){
        String ss = "aWQ9NDgzNjk4NzI2JnVzZXJuYW1lPWZyZXNoZXIwMDEmc29jaWFsPXppbmdtZSZzb2NpYWxuYW1lPWZyZXNoZXIwMDEmYXZhdGFyPWh0dHAlM0ElMkYlMkZ6aW5ncGxheS5zdGF0aWMuZzYuemluZy52biUyRmltYWdlcyUyRnpwcCUyRnpwZGVmYXVsdC5wbmcmdGltZT0xNTExMzE2OTg3Jm90aGVyPWRlZmF1bHQlM0ElM0ElM0ElM0E0ODM2OTg3MjYlM0ElM0ExMDAmdG9rZW5LZXk9ZDdiM2U1ZDBjYjhjNThhMjJiNzRjNTdlYTlhYjNiNmE==";
        try {
            UserInfo uInfo = ExtensionUtility.getUserInfoFormPortal(ss);
            System.out.println(uInfo.getUsername());
        } catch (Exception e) {
            System.out.println(ExceptionUtils.getStackTrace(e));
        }

    }





}
