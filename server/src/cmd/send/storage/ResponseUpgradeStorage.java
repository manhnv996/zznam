package cmd.send.storage;

import bitzero.server.extensions.data.BaseMsg;

import cmd.CmdDefine;

import java.nio.ByteBuffer;

public class ResponseUpgradeStorage extends BaseMsg {
    public short error;
    public ResponseUpgradeStorage(short error) {
        super(CmdDefine.RESPONSE_UPGRADE_STORAGE, error);
        this.error = error;
    }
    
    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        bf.putShort(this.error);
        return packBuffer(bf);
    }
}
