package cmd.send.demo;

import bitzero.server.extensions.data.BaseMsg;

import cmd.CmdDefine;

import java.awt.Point;

import java.nio.ByteBuffer;
import java.util.Date;
import model.Field;

public class ResponseFieldStatus extends BaseMsg {
    
    public short error;
    public Field field;
    
    public ResponseFieldStatus(short error, Field field) {
        super(CmdDefine.RESPONSE_FIELD_STATUS, error);
        
        this.error = error;
        this.field = field;
    }
    
    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        
        if (field != null){
            bf.putShort(error);
            bf.putInt(field.getFieldId());
            putStr(bf, field.getPlantType());
            putLong(bf, field.getPlantedTime().getTime());
            
        } else {    //success
            bf.putShort(error);
            bf.putInt(-1);
            putStr(bf, "");
            putLong(bf, new Date().getTime());

        }
        
        return packBuffer(bf);
    }
}
