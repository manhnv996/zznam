package cmd.send.storage;

import bitzero.server.extensions.data.BaseMsg;

import cmd.CmdDefine;

import java.nio.ByteBuffer;

public class ResponseBuyToolUpgrade extends BaseMsg {
    public short error;
    public ResponseBuyToolUpgrade(short error) {
        super(CmdDefine.RESPONSE_BUY_TOOL_UPGRADE, error);
        this.error = error;
    }
    
    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        bf.putShort(this.error);
        return packBuffer(bf);
    }
}
