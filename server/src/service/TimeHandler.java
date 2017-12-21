package service;

import bitzero.server.entities.User;
import bitzero.server.extensions.BaseClientRequestHandler;
import bitzero.server.extensions.data.BaseMsg;
import bitzero.server.extensions.data.DataCmd;

import cmd.CmdDefine;

import java.nio.ByteBuffer;

class ResponseServerTime extends BaseMsg {
    public long time;
    public ResponseServerTime(long time) {
        super(CmdDefine.GET_SERVER_TIME);
        this.time = time;
    }
    
    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        bf.putLong(this.time);
        return packBuffer(bf);    
    }
}

public class TimeHandler  extends BaseClientRequestHandler {
    public static final short TIME_MULTI_IDS = 20000;
    
    @Override
    public void handleClientRequest(User user, DataCmd dataCmd) {
        switch (dataCmd.getId()) {
        case CmdDefine.GET_SERVER_TIME:
            this.processGetServerTime(user);
            break;
        }
    }
    
    private void processGetServerTime(User user) {
        long time = System.currentTimeMillis();;
        send(new ResponseServerTime(time), user);
    }
}
