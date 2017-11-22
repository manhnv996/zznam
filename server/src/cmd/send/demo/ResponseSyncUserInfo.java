package cmd.send.demo;

import bitzero.server.extensions.data.BaseMsg;

import cmd.CmdDefine;

import config.enums.ErrorLog;

import java.awt.Point;

import java.nio.ByteBuffer;
import java.util.Date;
import model.Field;
import model.Storage;
import model.ZPUserInfo;

public class ResponseSyncUserInfo extends BaseMsg {
    
//    public short error;
    public ZPUserInfo userInfo;
    
    public ResponseSyncUserInfo(short error, ZPUserInfo userInfo) {
        super(CmdDefine.RESPONSE_SYNC_USER_INFO, error);
        
//        this.error = error;
        this.userInfo = userInfo;
    }
    
    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        
        bf.putInt(userInfo.getLevel());        
        bf.putInt(userInfo.getGold());        
        bf.putInt(userInfo.getRuby());        
        bf.putLong(userInfo.getExp());
        
        return packBuffer(bf);
    }
}
