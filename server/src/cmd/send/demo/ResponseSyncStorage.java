package cmd.send.demo;

import bitzero.server.extensions.data.BaseMsg;

import cmd.CmdDefine;

import config.enums.ErrorLog;

import config.utils.ProductUtil;

import java.awt.Point;

import java.nio.ByteBuffer;
import java.util.Date;
import model.Field;
import model.Storage;

public class ResponseSyncStorage extends BaseMsg {
    
    public short error;
    public Storage storage;
    
    public ResponseSyncStorage(short error, Storage storage) {
        super(CmdDefine.RESPONSE_SYNC_STORAGE, error);
        
        this.error = error;
        this.storage = storage;
    }
    
    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        
        //put jsonstring
        String storageInfoJson = ProductUtil.convertStorageToJsonString(this.storage);
        putStr(bf, storageInfoJson);
        
        
        return packBuffer(bf);
    }
}
