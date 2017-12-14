package service;

import bitzero.server.entities.User;
import bitzero.server.extensions.BaseClientRequestHandler;
import bitzero.server.extensions.data.DataCmd;

import bitzero.util.socialcontroller.bean.UserInfo;

import cmd.CmdDefine;

import cmd.receive.demo.RequestBuyItemByRubi;
import cmd.receive.demo.RequestCrop;
import cmd.receive.demo.RequestPlant;
import cmd.receive.demo.RequestPlantBoost;

import cmd.receive.gameshop.RequestBuyAnimal;
import cmd.receive.gameshop.RequestBuyMapObject;

import cmd.send.demo.ResponseErrorCode;

import cmd.send.gameshop.ResponseBuyObject;

import config.enums.AnimalEnum;
import config.enums.AnimalLodgeEnum;
import config.enums.ErrorLog;
import config.enums.MachineTypeEnum;
import config.enums.MapItemEnum;

import config.jsonobject.animal.AnimalObject;

import config.utils.ConfigContainer;

import java.util.Date;

import model.Animal;
import model.AnimalLodge;
import model.Field;
import model.Machine;
import model.ZPUserInfo;

import org.apache.commons.lang.exception.ExceptionUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GameShopHandler extends BaseClientRequestHandler {

    public static short GAMESHOP_MULTI_IDS = 7000;
    private final Logger logger = LoggerFactory.getLogger("GameShopBuyHandler");

    private int width;
    private int height;
    private int price;
    private int mapType;
    private MachineTypeEnum machineType;
    private AnimalLodgeEnum animalLodgeType;

    public GameShopHandler() {
        super();
    }

    @Override
    public void handleClientRequest(User user, DataCmd dataCmd) {
        try {
            switch (dataCmd.getId()) {
                //
            case CmdDefine.BUY_MAP_OBJECT_REQUEST:
                RequestBuyMapObject req = new RequestBuyMapObject(dataCmd);
                processBuyMapObjectByGold(user, req);
                break;
            case CmdDefine.BUY_MAP_OBJECT_BY_RUBY:
                RequestBuyMapObject reqRuby = new RequestBuyMapObject(dataCmd);
                processBuyObjectByRuby(user, reqRuby);
                break;
            case CmdDefine.BUY_ANIMAL:
                RequestBuyAnimal reqAnimal = new RequestBuyAnimal(dataCmd);
                processBuyAnimalByGold(user, reqAnimal);
                break;
            case CmdDefine.BUY_ANIMAL_BY_RUBY:
                RequestBuyAnimal reqAnimalRuby = new RequestBuyAnimal(dataCmd);
                processBuyAnimalRuby(user, reqAnimalRuby);
                break;
            }


        } catch (Exception e) {
            logger.warn("PLANT HANDLER EXCEPTION " + e.getMessage());
            logger.warn(ExceptionUtils.getStackTrace(e));
        }

    }

    private void processBuyMapObjectByGold(User user, RequestBuyMapObject req) {
        ZPUserInfo userInfo = null;
        try {
            userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (userInfo == null) {
            return;
        }
        //Process
        if (!processBuyMapObject(user, userInfo, req) || !checkGold(user, userInfo, this.price)) {
            return;
        }
        //OK
        addObject(userInfo, req.type, req.id, req.x, req.y);
        send(new ResponseBuyObject(ErrorLog.SUCCESS.getValue()), user);
        //Save info
        try {
            userInfo.saveModel(user.getId());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void processBuyObjectByRuby(User user, RequestBuyMapObject req) {
        ZPUserInfo userInfo = null;
        try {
            userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (userInfo == null) {
            return;
        }
        //Process
        if(!processBuyMapObject(user, userInfo, req) || !checkRuby(user, userInfo, this.price)) {
            return;
        }
        //OK
        addObject(userInfo, req.type, req.id, req.x, req.y);
        send(new ResponseBuyObject(ErrorLog.SUCCESS.getValue()), user);
        //Save Info
        try {
            userInfo.saveModel(user.getId());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void processBuyAnimalByGold(User user, RequestBuyAnimal reqAnimal) {
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
         * Process
         */
        AnimalLodge animalLodge = userInfo.getAsset().getAnimalLodgeById(reqAnimal.lodgeId);
        //Check gold
        int priceAnimal = getPriceAnimal(userInfo, reqAnimal.animalType);
        if (!(priceAnimal > 0)) {
            send(new ResponseBuyObject(ErrorLog.ERROR_BUY_ANIMAL_FAIL.getValue()), user);
            return;
        }
        if (!processBuyAnimal(user, reqAnimal, animalLodge) || !checkGold(user, userInfo, priceAnimal)) {
//        if (!processBuyAnimal(user, reqAnimal, animalLodge)) {
            return;
        }
        //Add model
        if(!addAnimalObject(reqAnimal.animalId, reqAnimal.animalType, animalLodge)) {
            send(new ResponseBuyObject(ErrorLog.ERROR_BUY_ANIMAL_FAIL.getValue()), user);
            return;
        }
        send(new ResponseBuyObject(ErrorLog.SUCCESS.getValue()), user);
        //Save info
        try {
            userInfo.saveModel(user.getId());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void processBuyAnimalRuby(User user, RequestBuyAnimal reqAnimal) {
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
         * Process
         */
        AnimalLodge animalLodge = userInfo.getAsset().getAnimalLodgeById(reqAnimal.lodgeId);
        //Check Ruby
        int priceAnimal = getPriceAnimal(userInfo, reqAnimal.animalType);
        if (!(priceAnimal > 0)) {
            send(new ResponseBuyObject(ErrorLog.ERROR_BUY_FAIL.getValue()), user);
            return;
        }
        if (!processBuyAnimal(user, reqAnimal, animalLodge) || !checkRuby(user, userInfo, priceAnimal)) {
            return;
        }
        //Add Model 
        if(!addAnimalObject(reqAnimal.animalId, reqAnimal.animalType, animalLodge)) {
            send(new ResponseBuyObject(ErrorLog.ERROR_BUY_ANIMAL_FAIL.getValue()), user);
            return;
        }
        //OK
        send(new ResponseBuyObject(ErrorLog.SUCCESS.getValue()), user);
        
        //Save info
        try {
            userInfo.saveModel(user.getId());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    private boolean processBuyMapObject(User user, ZPUserInfo userInfo, RequestBuyMapObject req) {
        if (!getInfoObj(req.type)) {
            send(new ResponseBuyObject(ErrorLog.ERROR_BUY_FAIL.getValue()), user);
            return false;
        }
        //Check collision
        if (!userInfo.getMap().checkValidBlock(req.x, req.y, this.width, this.height)) {
            send(new ResponseBuyObject(ErrorLog.ERROR_BUY_MAP_OBJECT_COLLISION.getValue()), user);
            return false;
        }
        return true;
    }
    
    private boolean processBuyAnimal(User user, RequestBuyAnimal reqAnimal, AnimalLodge animalLodge) {
        //Check type
        if (!animalLodge.getType().toString().equals(reqAnimal.animalType + "_habitat")) {
            send(new ResponseBuyObject(ErrorLog.ERROR_BUY_ANIMAL_FAIL.getValue()), user);
            return false;
        }
        //Check position
        if (!checkLodgePosition(animalLodge, reqAnimal.x, reqAnimal.y)) {
            send(new ResponseBuyObject(ErrorLog.ERROR_BUY_ANIMAL_FAIL.getValue()), user);
            return false;
        }
        return true;
    }

    private void addObject(ZPUserInfo userInfo, String typeObj, int id, int x, int y) {
        userInfo.getMap().addMapAlias(x, y, this.width, this.height, this.mapType);
        switch (this.mapType) {
        case MapItemEnum.FIELD:
            Field fieldModel = new Field(id, x, y);
            userInfo.getAsset().addField(fieldModel);
            break;
        case MapItemEnum.MACHINE:
            Machine machineModel =
                new Machine(id, this.machineType, ConfigContainer.getMachineSlot(typeObj), new Date().getTime(), false,
                            false, x, y);
            userInfo.getAsset().addMachine(machineModel);
            break;
        case MapItemEnum.LODGE:
            AnimalLodge animalLodge = new AnimalLodge(id, this.animalLodgeType, x, y);
            userInfo.getAsset().addAnimalLodge(animalLodge);
            break;
        }
    }
    
    private boolean addAnimalObject(int animalId, String animalType, AnimalLodge animalLodge) {
        //Add model
        Animal animal;
        if (animalType.equals(AnimalEnum.chicken.toString())) {
            animal = new Animal(animalId, AnimalEnum.chicken);
        } else if (animalType.equals(AnimalEnum.cow.toString())) {
            animal = new Animal(animalId, AnimalEnum.cow);
        } else {
//            send(new ResponseBuyObject(ErrorLog.ERROR_BUY_ANIMAL_FAIL.getValue()), user);
            return false;
        }
        animalLodge.addAnimal(animal);
        return true;
    }

    private int fromGoldToRuby(int gold) {
        int ruby = (int) Math.floor((gold / 15));
        if ((gold % 15) != 0) {
            return ruby + 1;
        } else {
            return ruby;
        }
    }

    private boolean getInfoObj(String typeObj) {
        if (typeObj.equals("field")) {
            this.width = ConfigContainer.mapConfig.Field.size.width;
            this.height = ConfigContainer.mapConfig.Field.size.height;
            this.mapType = MapItemEnum.FIELD;
        } else if (typeObj.equals("bakery_machine")) {
            this.width = ConfigContainer.mapConfig.Machine.Bakery_Machine.size.width;
            this.height = ConfigContainer.mapConfig.Machine.Bakery_Machine.size.height;
            this.machineType = MachineTypeEnum.bakery_machine;
            this.mapType = MapItemEnum.MACHINE;
        } else if (typeObj.equals("food_machine")) {
            this.width = ConfigContainer.mapConfig.Machine.Food_Machine.size.width;
            this.height = ConfigContainer.mapConfig.Machine.Food_Machine.size.height;
            this.machineType = MachineTypeEnum.food_machine;
            this.mapType = MapItemEnum.MACHINE;
        } else if (typeObj.equals("butter_machine")) {
            this.width = ConfigContainer.mapConfig.Machine.Butter_Machine.size.width;
            this.height = ConfigContainer.mapConfig.Machine.Butter_Machine.size.height;
            this.machineType = MachineTypeEnum.butter_machine;
            this.mapType = MapItemEnum.MACHINE;
        } else if (typeObj.equals("sugar_machine")) {
            width = ConfigContainer.mapConfig.Machine.Sugar_Machine.size.width;
            height = ConfigContainer.mapConfig.Machine.Sugar_Machine.size.height;
            this.machineType = MachineTypeEnum.sugar_machine;
            mapType = MapItemEnum.MACHINE;
        } else if (typeObj.equals("popcorn_machine")) {
            this.width = ConfigContainer.mapConfig.Machine.Popcorn_Machine.size.width;
            this.height = ConfigContainer.mapConfig.Machine.Popcorn_Machine.size.height;
            this.machineType = MachineTypeEnum.popcorn_machine;
            this.mapType = MapItemEnum.MACHINE;
        } else if (typeObj.equals("chicken_habitat")) {
            this.width = ConfigContainer.mapConfig.ChickenLodge.size.width;
            this.height = ConfigContainer.mapConfig.ChickenLodge.size.height;
            this.animalLodgeType = AnimalLodgeEnum.chicken_habitat;
            this.mapType = MapItemEnum.LODGE;
        } else if (typeObj.equals("cow_habitat")) {
            this.width = ConfigContainer.mapConfig.CowLodge.size.width;
            this.height = ConfigContainer.mapConfig.CowLodge.size.height;
            this.animalLodgeType = AnimalLodgeEnum.cow_habitat;
            this.mapType = MapItemEnum.LODGE;
        } else {
            System.out.println("[!] Can't find type object");
            return false;
        }
        this.price = ConfigContainer.getPrice(typeObj);
        return true;
    }

    private boolean checkLodgePosition(AnimalLodge animalLodge, int x, int y) {
        AnimalLodgeEnum lodgeType = animalLodge.getType();
        int width;
        int height;
        int lodgeX = animalLodge.getX();
        int lodgeY = animalLodge.getY();
        if (lodgeType == AnimalLodgeEnum.chicken_habitat) {
            width = ConfigContainer.mapConfig.ChickenLodge.size.width;
            height = ConfigContainer.mapConfig.ChickenLodge.size.height;
        } else if (lodgeType == AnimalLodgeEnum.cow_habitat) {
            width = ConfigContainer.mapConfig.CowLodge.size.width;
            height = ConfigContainer.mapConfig.CowLodge.size.height;
        } else {
            System.out.println("[E] Unhandled animal lodge type " + lodgeType);
            return false;
        }

        for (int i = 0; i < width; i++) {
            for (int j = 0; j < height; j++) {
                if ((lodgeX + i) == x && (lodgeY + j) == y) {
                    return true;
                }
            }
        }

        return false;
    }

    private int getPriceAnimal(ZPUserInfo userInfo, String animalType) {
        int numberAnimal = userInfo.getAsset().getNumberAnimalByType(animalType);
        AnimalObject animalConfig = ConfigContainer.getAnimalConfigByType(animalType);
        int lodgeCapacity = ConfigContainer.getLodgeCapacityByType(animalType + "_habitat");
        if (numberAnimal < lodgeCapacity) {
            return animalConfig.price[0];
        } else {
            for (int i = 1; i < animalConfig.price.length - 1; i++) {
                if ((lodgeCapacity * i) <= numberAnimal && numberAnimal < (lodgeCapacity * (i + 1))) {
                    return animalConfig.price[i];
                }
            }
        }
        return 0;
    }
    
    private boolean checkGold(User user, ZPUserInfo userInfo, int price) {
        System.out.println("buy buy buy gold " + price);
        //Check gold enough
        if ((price > userInfo.getGold())) {
            send(new ResponseBuyObject(ErrorLog.ERROR_GOLD_NOT_ENOUGH.getValue()), user);
            return false;
        }
        //Reduce gold
        if (!userInfo.reduceGold(price)) {
            send(new ResponseBuyObject(ErrorLog.ERROR_GOLD_NOT_REDUCE.getValue()), user);
            return false;
        }
        return true;
    }
    
    private boolean checkRuby(User user, ZPUserInfo userInfo, int price) {
        int gold = userInfo.getGold();
        if ((price <= gold)) {
            send(new ResponseBuyObject(ErrorLog.ERROR_BUY_FAIL.getValue()), user);
            return false;
        }
        int ruby = fromGoldToRuby(price - gold);
        if (!(ruby <= userInfo.getRuby())) {
            send(new ResponseBuyObject(ErrorLog.ERROR_RUBY_NOT_ENOUGH.getValue()), user);
            return false;
        }
        //Reduce ruby
        if (!userInfo.reduceRuby(ruby)) {
            send(new ResponseBuyObject(ErrorLog.ERROR_RUBY_NOT_REDUCE.getValue()), user);
            return false;
        }
        return true;
    }
}
