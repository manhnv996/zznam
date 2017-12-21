package cmd.send.constructed;

import bitzero.server.extensions.data.BaseMsg;

import cmd.CmdDefine;

import java.nio.ByteBuffer;

public class ResponseBoostBuild extends BaseMsg {
    public short error;
    
    public ResponseBoostBuild(short error) {
        super(CmdDefine.RESPONSE_BOOST_BUILD, error);
        this.error = error;
    }
    
    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        bf.putShort(this.error);
        return packBuffer(bf);
    }
}
