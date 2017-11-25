package cmd.receive.map;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;

public class RequestMoveStorage extends BaseCmd{
    
    public short type;
    public int x;
    public int y;
    
    public RequestMoveStorage(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
