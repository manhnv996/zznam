package service;

import bitzero.server.entities.User;
import bitzero.server.extensions.BaseClientRequestHandler;
import bitzero.server.extensions.data.DataCmd;

import cmd.CmdDefine;

import cmd.receive.friend.RequestFriendGetList;

import cmd.send.friend.ResponseFriendGetList;

import model.Users;
import cmd.receive.friend.RequestFriendGetInfo;
import cmd.send.user.ResponseUser;
import model.ZPUserInfo;

public class FriendHandler extends BaseClientRequestHandler {
    public static short FRIEND_MULTI_IDS = 14000;
    
    @Override
    public void handleClientRequest(User user, DataCmd dataCmd) {
        switch (dataCmd.getId()) {
        case CmdDefine.FRIEND_GET_LIST:
            RequestFriendGetList reqFrGetList = new RequestFriendGetList(dataCmd);
            this.processFriendGetList(reqFrGetList, user);
            break;
        case CmdDefine.FRIEND_GET_INFO:
            RequestFriendGetInfo reqFrGetInfo = new RequestFriendGetInfo(dataCmd);
            this.processFriendGetInfo(reqFrGetInfo, user);
        }
    }
    
    private void processFriendGetList(RequestFriendGetList req, User user) {
        Users users = Users.getUsers();
        send(new ResponseFriendGetList(users.getIdList()), user);
    }

    private void processFriendGetInfo(RequestFriendGetInfo req, User user) {
        ZPUserInfo userInfo = null;
        try {
            userInfo = (ZPUserInfo) ZPUserInfo.getModel(req.id, ZPUserInfo.class);
        } catch (Exception e) {
            e.printStackTrace();  
        }
        if (userInfo == null) {
            return;    
        }
        send(new ResponseUser(userInfo, CmdDefine.FRIEND_GET_INFO), user);
    }
}
