package service;

import bitzero.server.entities.User;
import bitzero.server.extensions.BaseClientRequestHandler;
import bitzero.server.extensions.data.DataCmd;

import cmd.CmdDefine;
import cmd.receive.animal.RequestAnimalHarvest;
import cmd.receive.animal.RequestAnimalFeed;
import model.ZPUserInfo;
import model.AnimalLodge;
import model.Animal;
import config.utils.ConfigContainer;
import config.enums.AnimalEnum;
import cmd.send.animal.ResponseAnimalFeed;
import cmd.send.animal.ResponseAnimalHarvest;

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
        	harvestTime = ConfigContainer.animalConfig.cow.time;
        } else if (animal.getType() == AnimalEnum.chicken) {
        	harvestTime = ConfigContainer.animalConfig.chicken.time;
        }

        long duration = currentTime - animal.getFeededTime();
        if (duration < harvestTime) {
        	// Send status
        	send(new ResponseAnimalHarvest(-3), user);
        	return;
        }

        animal.feed();
        // Add to storage

        // End add to storage
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

        // Check if warehouse is enough foods
        if (!true) {
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
}
