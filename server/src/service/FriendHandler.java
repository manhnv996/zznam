package service;

import bitzero.server.entities.User;
import bitzero.server.extensions.BaseClientRequestHandler;
import bitzero.server.extensions.data.DataCmd;

import cmd.CmdDefine;

import cmd.receive.friend.RequestFriendGetList;

import cmd.send.friend.ResponseFriendGetList;

import model.Users;

public class FriendHandler extends BaseClientRequestHandler {
    public static short FRIEND_MULTI_IDS = 14000;
    
    @Override
    public void handleClientRequest(User user, DataCmd dataCmd) {
        switch (dataCmd.getId()) {
        case CmdDefine.FRIEND_GET_LIST:
            RequestFriendGetList req = new RequestFriendGetList(dataCmd);
            this.processFriendGetList(req, user);
            break;
        }
    }
    
    private void processFriendGetList(RequestFriendGetList req, User user) {
        Users users = Users.getUsers();
        send(new ResponseFriendGetList(users.getIdList()), user);
    }
}
