package service;

import bitzero.server.entities.User;
import bitzero.server.extensions.BaseClientRequestHandler;
import bitzero.server.extensions.data.DataCmd;

import cmd.CmdDefine;

import cmd.receive.animal.RequestAnimalBoost;
import cmd.receive.animal.RequestAnimalHarvest;
import cmd.receive.animal.RequestAnimalFeed;

import cmd.send.animal.ResponseAnimalBoost;

import model.ZPUserInfo;
import model.AnimalLodge;
import model.Animal;
import config.utils.ConfigContainer;
import config.enums.AnimalEnum;
import cmd.send.animal.ResponseAnimalFeed;
import cmd.send.animal.ResponseAnimalHarvest;
import config.enums.ProductType;

public class AnimalHandler extends BaseClientRequestHandler {
    public static short ANIMAL_MULTI_IDS = 12000;

    @Override
    public void handleClientRequest(User user, DataCmd dataCmd) {
        switch (dataCmd.getId()) {
            case CmdDefine.ANIMAL_HARVEST:
                RequestAnimalHarvest reqAnimalHarvest = new RequestAnimalHarvest(dataCmd);
                this.processAnimalHarvest(reqAnimalHarvest, user);
                break;
            case CmdDefine.ANIMAL_FEED:
                RequestAnimalFeed reqAnimalFeed = new RequestAnimalFeed(dataCmd);
                this.processAnimalFeed(reqAnimalFeed, user);
                break;
            case CmdDefine.ANIMAL_BOOST:
                RequestAnimalBoost reqAnimalBoost = new RequestAnimalBoost(dataCmd);
                this.processAnimalBoost(reqAnimalBoost, user);
                break;
        }
    }

    private void processAnimalHarvest(RequestAnimalHarvest req, User user) {
        ZPUserInfo userInfo = null;
        try {
            userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
        } catch (Exception e) {
            e.printStackTrace();  
        }
        if (userInfo == null) {
            return;    
        }

        AnimalLodge lodge = userInfo.getAsset().getAnimalLodgeById(req.lodgeId);
        if (lodge == null) {
            // Send status
            send(new ResponseAnimalHarvest(-1), user);
            return;
        }
        Animal animal = lodge.getAnimalById(req.animalId);
        if (animal == null) {
            // Send status
            send(new ResponseAnimalHarvest(-2), user);
            return;
        }

        int harvestTime = 0;
        long currentTime = System.currentTimeMillis();
        if (animal.getType() == AnimalEnum.cow) {
            harvestTime = ConfigContainer.animalConfig.cow.time * 1000;
        } else if (animal.getType() == AnimalEnum.chicken) {
            harvestTime = ConfigContainer.animalConfig.chicken.time * 1000;
        } else {
            System.out.println("Unhandled " + animal.getType().toString());
            return;
        }

        long duration = currentTime - animal.getFeededTime();
//        System.out.println(duration + " " + harvestTime);
        if (duration < harvestTime) {
            // Send status
            send(new ResponseAnimalHarvest(-3), user);
            return;
        }

        animal.harvest();
        // Add to storage
        String product = "";
        int exp = 0;
        if (animal.getType() == AnimalEnum.chicken) {
            product = ProductType.GOOD_EGG;
            exp = ConfigContainer.animalConfig.chicken.harvestExp;
        } else if (animal.getType() == AnimalEnum.cow) {
            product = ProductType.GOOD_MILK;
            exp = ConfigContainer.animalConfig.cow.harvestExp;
        } else {
            System.out.println("Unhandled " + animal.getType().toString());
            return;
        }

        // try to add item
        if (!userInfo.getAsset().getWarehouse().addItem(product, 1)) {
            send(new ResponseAnimalHarvest(-4), user);
            return;
        }

        // Add exp
        userInfo.addExp(exp);

        // Save model
        try {
            userInfo.saveModel(user.getId());
        } catch (Exception e) {
            e.printStackTrace();
        }
        // Send OK status
        send(new ResponseAnimalHarvest(0), user);
    }

    private void processAnimalFeed(RequestAnimalFeed req, User user) {
        ZPUserInfo userInfo = null;
        try {
            userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
        } catch (Exception e) {
            e.printStackTrace();  
        }
        if (userInfo == null) {
            return;
        }

        AnimalLodge lodge = userInfo.getAsset().getAnimalLodgeById(req.lodgeId);
        if (lodge == null) {
            // Send status
            System.out.println("Lodge not found " + req.lodgeId);
            send(new ResponseAnimalHarvest(-1), user);
            return;
        }
        Animal animal = lodge.getAnimalById(req.animalId);
        if (animal == null) {
            System.out.println("Animal not found " + req.animalId);
            // Send status
            send(new ResponseAnimalHarvest(-2), user);
            return;
        }
        
        if (animal.isFeeded()) {
            System.out.println("Animal is feeded " + req.animalId);
            send(new ResponseAnimalHarvest(-4), user);
            return;
        }

        String product = "";
        if (animal.getType() == AnimalEnum.chicken) {
            product = ProductType.FOOD_CHICKEN;
        } else if (animal.getType() == AnimalEnum.cow) {
            product = ProductType.FOOD_COW;
        } else {
            System.out.println("Unhandled " + animal.getType().toString());
            return;
        }

        // Check if warehouse is enough foods
        if (!userInfo.getAsset().getWarehouse().takeItem(product, 1)) {
            // Send status
            send(new ResponseAnimalHarvest(-3), user);
            return;
        }

        animal.feed();

        try {
            userInfo.saveModel(user.getId());
        } catch (Exception e) {
            e.printStackTrace();
        }
        send(new ResponseAnimalHarvest(0), user);
    }
    
    private int calculateRubyByTime() {
        return 1;    
    }
    
    private void processAnimalBoost(RequestAnimalBoost req, User user) {
        ZPUserInfo userInfo = null;
        try {
            userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
        } catch (Exception e) {
            e.printStackTrace();  
        }
        if (userInfo == null) {
            return;
        }
        
        AnimalLodge lodge = userInfo.getAsset().getAnimalLodgeById(req.lodgeId);
        if (lodge == null) {
            // Send status
            System.out.println("Lodge not found " + req.lodgeId);
            send(new ResponseAnimalBoost(-1), user);
            return;
        }
        
        Animal animal = lodge.getAnimalById(req.animalId);
        if (animal == null) {
            System.out.println("Animal not found " + req.animalId);
            // Send status
            send(new ResponseAnimalBoost(-2), user);
            return;
        }
        
        if (!animal.isFeeded()) {
            System.out.println("Animal is feeded " + req.animalId);
            send(new ResponseAnimalBoost(-3), user);
            return;
        }
        
        if (!userInfo.reduceRuby(this.calculateRubyByTime())) {
            System.out.println("Not enough Ruby");
            send(new ResponseAnimalBoost(-4), user);
            return;
        }
        
        animal.boost();
        
        try {
            userInfo.saveModel(user.getId());
        } catch (Exception e) {
            e.printStackTrace();
        }
        send(new ResponseAnimalBoost(0), user);
    }
}
