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
import model.StorageItem;

public class ResponseSyncFoodStorageItem extends BaseMsg {
    
//    public short error;
    public StorageItem item;
    
    public ResponseSyncFoodStorageItem(short error, StorageItem item) {
        super(CmdDefine.RESPONSE_SYNC_FOOD_STORAGE_ITEM, error);
        
        this.item = item;
    }
    
    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        //
        putStr(bf, item.getTypeItem());
        bf.putInt(item.getQuantity());  
        
        return packBuffer(bf);
    }
}
