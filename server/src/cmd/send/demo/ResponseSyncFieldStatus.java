package cmd.send.demo;

import bitzero.server.extensions.data.BaseMsg;

import cmd.CmdDefine;

import config.enums.ErrorLog;

import java.awt.Point;

import java.nio.ByteBuffer;
import java.util.Date;
import model.Field;

public class ResponseSyncFieldStatus extends BaseMsg {
    
//    public short error;
    public Field field;
    
    public ResponseSyncFieldStatus(short error, Field field) {
        super(CmdDefine.RESPONSE_SYNC_FIELD_STATUS, error);
        
//        this.error = error;
        this.field = field;
    }
    
    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        
        if (field != null){
//            bf.putShort(error);
            bf.putInt(field.getFieldId());
            putStr(bf, field.getPlantType());
//            putLong(bf, field.getPlantedTime().getTime());
            bf.putLong(field.getPlantedTime());
            
        } else {    //success
//            bf.putShort(error);
            bf.putInt(-1);
            putStr(bf, "");
//            putLong(bf, new Date().getTime());
            bf.putLong(0);

        }
        
        
        
        return packBuffer(bf);
    }
}
