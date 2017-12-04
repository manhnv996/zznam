package cmd.receive.map;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;

public class RequestMoveMapBlock  extends BaseCmd {
    public int type;
    public int id;
    public int x;
    public int y;
    
    public RequestMoveMapBlock(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
