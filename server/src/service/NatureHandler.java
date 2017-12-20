package service;

import bitzero.server.entities.User;
import bitzero.server.extensions.BaseClientRequestHandler;
import bitzero.server.extensions.data.DataCmd;

import cmd.CmdDefine;
import cmd.send.nature.ResponseCollectNatureThing;
import cmd.receive.nature.RequestCollectNatureThing;

import model.NatureThing;
import model.ZPUserInfo;
import config.enums.NaturalThingEnum;
import config.enums.ProductType;

import config.utils.ConfigContainer;

public class NatureHandler extends BaseClientRequestHandler {
	public static short NATURE_MULTI_IDS = 15000;

	@Override
	public void handleClientRequest(User user, DataCmd dataCmd) {
		switch (dataCmd.getId()) {
			case CmdDefine.NATURE_COLLECT:
				RequestCollectNatureThing reqCollect = new RequestCollectNatureThing(dataCmd);
				this.processCollectNatureThing(reqCollect, user);
				break;
		}
	}

	private void processCollectNatureThing(RequestCollectNatureThing req, User user) {
		ZPUserInfo userInfo = null;
        try {
            userInfo = (ZPUserInfo) ZPUserInfo.getModel(user.getId(), ZPUserInfo.class);
        } catch (Exception e) {
            e.printStackTrace();  
        }
        if (userInfo == null) {
            return;    
        }

        NatureThing nt = userInfo.getAsset().getNatureThingById(req.id);
        if (nt == null) {
        	System.out.println("Nature thing not found " + req.id);
            send(new ResponseCollectNatureThing(-1), user);
            return;
        }

        String tool = "";
        switch (nt.getType()) {
        	case NaturalThingEnum.ROCK_BIG:
        		tool = ProductType.TOOL_DEMOLITION_CHARGE;
        		break;
        	case NaturalThingEnum.ROCK_SMALL:
        		tool = ProductType.TOOL_DYNOMITE;
        		break;
        	case NaturalThingEnum.PINE_BIG:
        	case NaturalThingEnum.PINE_SMALL:
        		tool = ProductType.TOOL_SAW;
        		break;
        	case NaturalThingEnum.TREE_BIG:
        	case NaturalThingEnum.TREE_SMALL:
        		tool = ProductType.TOOL_AXE;
        		break;
        	case NaturalThingEnum.VUNG_NUOC:
        		tool = ProductType.TOOL_SHOVEL;
        		break;
        	default:
        		System.out.println("[E] Unhandled Nature thing type");
        }

        if (!userInfo.getAsset().getWarehouse().takeItem(tool, 1)) {
            send(new ResponseCollectNatureThing(-2), user);
        }

        
        int width = 1;
        int height = 1;
        if (nt.getType().equals(NaturalThingEnum.ROCK_BIG) 
                || nt.getType().equals(NaturalThingEnum.VUNG_NUOC)) {
            width = 2;
            height = 2;
        }

        // System.out.println(nt.getType() + " " + NaturalThingEnum.VUNG_NUOC + " width " + width + "height " + height);
        
        userInfo.getMap().removeMapAlias(nt.getX(), nt.getY(), width, height);
        userInfo.getAsset().getNatureThingList().remove(nt);
        userInfo.addExp(5);
        // Save model
        try {
            userInfo.saveModel(user.getId());
        } catch (Exception e) {
            e.printStackTrace();
        }
        // Send OK status
        send(new ResponseCollectNatureThing(0), user);
	}
}