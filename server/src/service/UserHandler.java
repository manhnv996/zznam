package service;

import bitzero.server.core.BZEventParam;
import bitzero.server.core.BZEventType;
import bitzero.server.core.IBZEvent;
import bitzero.server.entities.User;
import bitzero.server.extensions.BaseClientRequestHandler;
import bitzero.server.extensions.data.DataCmd;

import cmd.CmdDefine;

import cmd.receive.user.RequestUserInfo;

import cmd.send.demo.ResponseGameInfo;

import cmd.send.user.ResponseUser;

import config.enums.AnimalEnum;
import config.enums.AnimalLodgeEnum;
import config.enums.ProductType;
import config.enums.StorageType;

import config.jsonobject.ProductConfig;
import config.jsonobject.map.NaturalObject;

import config.utils.ConfigContainer;

import config.utils.OrderUtil;

import config.utils.ProductUtil;

import extension.FresherExtension;

import java.util.ArrayList;
import java.util.Date;

import java.util.List;

import model.Animal;
import model.AnimalLodge;
import model.Asset;
import model.Field;
import model.NatureThing;
import model.Order;
import model.Storage;
import model.StorageItem;
import model.ZPUserInfo;

import org.apache.commons.lang.exception.ExceptionUtils;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UserHandler extends BaseClientRequestHandler {
    public static short USER_MULTI_IDS = 1000;
    private final Logger logger = LoggerFactory.getLogger("UserHandler");
    
    public UserHandler() {
        super();
    }

    public void init() {
        getExtension().addEventListener(BZEventType.USER_DISCONNECT, this);
        getExtension().addEventListener(BZEventType.USER_RECONNECTION_SUCCESS, this);
    }

    private FresherExtension getExtension() {
        return (FresherExtension) getParentExtension();
    }

    public void handleServerEvent(IBZEvent ibzevent) {
        if (ibzevent.getType() == BZEventType.USER_DISCONNECT)
            this.userDisconnect((User) ibzevent.getParameter(BZEventParam.USER));
    }

    public void handleClientRequest(User user, DataCmd dataCmd) {
        try {
            switch (dataCmd.getId()) {
            case CmdDefine.GET_USER_INFO: // Old. Do not use
                RequestUserInfo reqInfo = new RequestUserInfo(dataCmd);                
                getUserInfo(user);
                break;
            case CmdDefine.GET_USER: // New get user
                returnUser(user);
                break;
            }
            
        } catch (Exception e) {
            logger.warn("USERHANDLER EXCEPTION " + e.getMessage());
            logger.warn(ExceptionUtils.getStackTrace(e));
        }

    }

    private void getUserInfo(User user) {
        try {
            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
//            ZPUserInfo userInfo = (ZPUserInfo) ZPUserInfo.getModel(1, ZPUserInfo.class);
            if (userInfo == null) {
                
//                createUser(userInfo, user.getId());                
                userInfo = createUser(user.getId());
                
                userInfo.saveModel(user.getId());                
//                userInfo.saveModel(1);
            }
            
            
            send(new ResponseGameInfo(userInfo), user);
            
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
    
    // Return all user information as Binary
    private void returnUser(User user) {
        ZPUserInfo userInfo = null;
        try {
            userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
            if (userInfo == null) {
                userInfo = createUser(user.getId());
                userInfo.saveModel(user.getId());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        
        
        /*
         * test
         */
//        List<ProductConfig> productList2 = ProductUtil.toProductConfigList();
//        
//        List<ProductConfig> productList = OrderUtil.randomTypeProduct(18);
//        
//        List<StorageItem> itemList = OrderUtil.randomQuantityOfProductList(18, null);
//        for (int i = 0; i < itemList.size(); i++){
//            System.out.println(itemList.get(i).getTypeItem() + ", " + itemList.get(i).getQuantity());
//        }
//        System.out.println(OrderUtil.getOrderPrice(18, null));
//        System.out.println(OrderUtil.getOrderExp(18, null));
        
        
//        Order order = new Order(15);
//        for (int i = 0; i < order.getItemList().size(); i++){
//            System.out.println(order.getItemList().get(i).getTypeItem() + ", " + order.getItemList().get(i).getQuantity());
//        }
//        System.out.println(order.getOrderPrice());
//        System.out.println(order.getOrderExp());
        
        System.out.println("here is log");
        //
        send(new ResponseUser(userInfo), user);
    }

    private void userDisconnect(User user) {
        // log user disconnect
    }




    public static ZPUserInfo createUser(int userId){
        
        Storage foodStorage = new Storage(StorageType.FOOD_STORAGE, 50, 
                ConfigContainer.mapConfig.Silo.position.x,
                ConfigContainer.mapConfig.Silo.position.y);
        Storage warehouse = new Storage(StorageType.WAREHOUSE, 50, 
                ConfigContainer.mapConfig.Warehouse.position.x,
                ConfigContainer.mapConfig.Warehouse.position.y);

        foodStorage.addItem(ProductType.CROP_CARROT, 5);
        foodStorage.addItem(ProductType.CROP_SOYBEAN, 10);
        foodStorage.addItem(ProductType.CROP_WHEAT, 10);
        
        warehouse.addItem(ProductType.GOOD_EGG, 10);        
        warehouse.addItem(ProductType.GOOD_MILK, 10);
        //
        
//        warehouse.addItem(ProductType.TOOL_NAIL, 5);
        warehouse.addItem(ProductType.TOOL_SCREW, 3);
        warehouse.addItem(ProductType.TOOL_WOODPANEL, 5);
        
//        warehouse.addItem(ProductType.TOOL_BOLT, 1);
        warehouse.addItem(ProductType.TOOL_PLANK, 4);
        warehouse.addItem(ProductType.TOOL_DUCTTAPE, 2);
        
        
        // Load natural thingList
        List<NatureThing> natureThingList = new ArrayList<>();
        for (int i = 0; i < ConfigContainer.defaultNatural.size(); i++) {
            NaturalObject nObj = ConfigContainer.defaultNatural.get(i);
            NatureThing nt = new NatureThing(nObj.id, nObj.type, nObj.x, nObj.y);
            natureThingList.add(nt);
//            System.out.println("id" + nObj.id + " type" + nObj.type);
        }
        
        Asset asset = new Asset(foodStorage, warehouse, null, natureThingList, null, null);
        
        // Add some fields
        for (int i = 1; i < 5; i++){
            Field field = new Field(18, 10 + i);
            asset.addField(field);
        }
//        System.out.println("Field number" + asset.getFieldList().size());
        asset.getFieldById(1).setPlantType(ProductType.CROP_CARROT);
        asset.getFieldById(1).setPlantedTime(new Date().getTime());
        
        // Add some animal lodges  
        AnimalLodge lodge = new AnimalLodge(AnimalLodgeEnum.chicken_habitat, 0L, true, 20, 20);
        asset.addAnimalLodge(lodge);
        
        Animal animal = new Animal(AnimalEnum.chicken);
        lodge.addAnimal(animal);
        
        // Last
        ZPUserInfo userInfo = new ZPUserInfo(userId, asset); // ...Update map alias
        
//        for (int i = 0; i < 3; i++){
//            System.out.println("field" + asset.getFieldById(i).getFieldId() + ", " + asset.getFieldById(i).getPlantType() + ", " + asset.getFieldById(i).getPlantedTime());
//        }
        
        
        //
        for (int i = 0; i < OrderUtil.getNumberOfOrderByLevel(userInfo.getLevel()); i++){
            asset.addOrder(userInfo.getLevel(), new Order(userInfo.getLevel()));
        }
        
        
        return userInfo;
    }
    
}
