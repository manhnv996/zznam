package cmd.send.demo;

import bitzero.server.extensions.data.BaseMsg;

import cmd.CmdDefine;

import java.awt.Point;

import java.nio.ByteBuffer;

public class ResponsePlant extends BaseMsg {
    
    public short t;
    
    public ResponsePlant(short t) {
        super(CmdDefine.PLANT);
        this.t = t;
    }
    
    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        
        bf.putShort(t);
        
        return packBuffer(bf);
    }
}
