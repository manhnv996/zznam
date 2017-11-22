package cmd.send.demo;

import bitzero.server.extensions.data.BaseMsg;

import cmd.CmdDefine;

import java.awt.Point;

import java.nio.ByteBuffer;

public class ResponseErrorCode extends BaseMsg {
    
    public short error;
    
    public ResponseErrorCode(short error) {
        super(CmdDefine.RESPONSE_ERROR_CODE, error);
        
        this.error = error;
    }
    
    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        
        bf.putShort(error);
        
        return packBuffer(bf);
    }
}
