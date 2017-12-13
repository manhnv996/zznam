package cmd.send.gameshop;

import bitzero.server.extensions.data.BaseMsg;

import cmd.CmdDefine;

import java.nio.ByteBuffer;

public class ResponseBuyObject extends BaseMsg {
    public short error;
    public ResponseBuyObject(short error) {
        super(CmdDefine.RESPONSE_BUY_OBJECT, error);
        this.error = error;
    }
    
    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        bf.putShort(this.error);
        return packBuffer(bf);
    }
}
