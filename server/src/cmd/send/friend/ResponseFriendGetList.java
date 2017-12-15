package cmd.send.friend;

import bitzero.server.extensions.data.BaseMsg;

import cmd.CmdDefine;


import java.nio.ByteBuffer;

import java.util.List;

public class ResponseFriendGetList  extends BaseMsg {
    public List<Integer> idList;
    
    public ResponseFriendGetList(List<Integer> idList) {
        super(CmdDefine.FRIEND_GET_LIST);
        this.idList = idList;
    }
    
    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        bf.putInt(idList.size());
        for (int i = 0; i < idList.size(); i++) {
            bf.putInt(idList.get(i));   
        }
        return packBuffer(bf);
    }
}