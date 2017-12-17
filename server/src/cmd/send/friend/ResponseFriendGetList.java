package cmd.send.friend;

import bitzero.server.extensions.data.BaseMsg;

import cmd.CmdDefine;


import java.nio.ByteBuffer;

import java.util.List;

public class ResponseFriendGetList  extends BaseMsg {
    public List<Integer> idList;
    public int currentId;
    
    public ResponseFriendGetList(List<Integer> idList, int currentId) {
        super(CmdDefine.FRIEND_GET_LIST);
        this.idList = idList;
        this.currentId = currentId;
    }
    
    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        bf.putInt(idList.size() - 1);
        for (int i = 0; i < idList.size(); i++) {
            if (idList.get(i) != this.currentId) {
                bf.putInt(idList.get(i));   
            }
        }
        return packBuffer(bf);
    }
}