package cmd.receive.authen;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;

import java.nio.ByteBuffer;

public class RequestLogin extends BaseCmd {
    public RequestLogin(DataCmd dataCmd) {
        super(dataCmd);
    }

    
    @Override
    public void unpackData() {
        ByteBuffer bf = makeBuffer();
        try {
            
        } catch (Exception e) {
        }
    }
    
}
