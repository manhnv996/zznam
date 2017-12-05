package cmd.receive.constructed;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;


public class RequestBuildCompleted extends BaseCmd{

    public int id;
    public int typeBuilding;
    
    public RequestBuildCompleted(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
