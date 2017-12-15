package cmd.send.animal;

import bitzero.server.extensions.data.BaseMsg;
import cmd.CmdDefine;
import java.nio.ByteBuffer;

public class ResponseAnimalBoost extends BaseMsg {
	public int errNo;
    public ResponseAnimalBoost(int errNo) {
        super(CmdDefine.ANIMAL_BOOST, (short)0);
        this.errNo = errNo;
    }
    
    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        bf.putInt(errNo);
        return packBuffer(bf);
    }
}
