package cmd.send.constructed;

import bitzero.server.extensions.data.BaseMsg;

import cmd.CmdDefine;

import java.nio.ByteBuffer;

public class ResponseBuildComplete  extends BaseMsg {
    public short error;
    
    public ResponseBuildComplete(short error) {
        super(CmdDefine.RESPONSE_BUILD_COMPLETE, error);
        this.error = error;
    }
    
    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        bf.putShort(this.error);
        return packBuffer(bf);
    }
}
