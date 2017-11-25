package cmd.receive.map;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;

public class RequestMoveField extends BaseCmd{
    
    public int id;
    public int x;
    public int y;
    
    public RequestMoveField(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
