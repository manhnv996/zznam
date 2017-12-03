package cmd.send.demo;

import bitzero.server.extensions.data.BaseMsg;

import cmd.CmdDefine;

import config.enums.ErrorLog;

import config.utils.ProductUtil;

import java.awt.Point;

import java.nio.ByteBuffer;
import java.util.Date;
import java.util.List;

import model.Field;
import model.Storage;
import model.StorageItem;

public class ResponseSyncStorage extends BaseMsg {
    
    public Storage storage;
    private ByteBuffer bf; // Buffer to send
    
    public ResponseSyncStorage(short error, Storage storage) {
        super(CmdDefine.RESPONSE_SYNC_STORAGE, error);
        
        this.storage = storage;
    }
    
    @Override
    public byte[] createData() {
        this.bf = makeBuffer();
        
//        //put jsonstring
//        String storageInfoJson = ProductUtil.convertStorageToJsonString(this.storage);
//        putStr(bf, storageInfoJson);
        
        //
        this.packStorage(storage);
        
        return packBuffer(this.bf);
    }
    
    
    /**
     * Pack a storage
     */
    private void packStorage(Storage storage) {
        this.bf.putInt(storage.getX());
        this.bf.putInt(storage.getY());
        putStr(this.bf, storage.getStorageStringType());
        this.bf.putInt(storage.getCapacity());
        this.bf.putInt(storage.getLevel());
        // Put storage Item List
        List<StorageItem> itemList = storage.getItemList();
        // First put length of list
        this.bf.putInt(itemList.size());
        // put each item
        for (int i = 0; i < itemList.size(); i++) {
            this.packStorageItem(itemList.get(i));    
        }
    }
    
    /**
     * Put storage item
     */
    
    private void packStorageItem(StorageItem item) {
        putStr(this.bf, item.getTypeItem());
        this.bf.putInt(item.getQuantity());
    }
    
}
