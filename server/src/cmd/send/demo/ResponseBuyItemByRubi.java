package cmd.send.demo;

import bitzero.server.extensions.data.BaseMsg;

import cmd.CmdDefine;

import java.awt.Point;

import java.nio.ByteBuffer;

public class ResponseBuyItemByRubi extends BaseMsg {
    
    public short error;
    public String productType;
    
    public ResponseBuyItemByRubi(short error, String productType) {
        super(CmdDefine.BUY_ITEM_BY_RUBI, error);
        
        this.error = error;
        this.productType = productType;
    }
    
    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        
        bf.putShort(error);
        putStr(bf, productType);
        
        return packBuffer(bf);
    }
}
