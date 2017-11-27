package cmd.send.map;

import bitzero.server.extensions.data.BaseMsg;

import cmd.CmdDefine;

import java.awt.Point;

import java.nio.ByteBuffer;

public class ResponseMoveBlock extends BaseMsg {
    public int errNo;
    public ResponseMoveBlock(short error, int errNo) {
        super(CmdDefine.RESPONSE_MOVE, error);
        this.errNo = errNo;
    }
    
    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        bf.putInt(errNo);
        return packBuffer(bf);
    }
}
