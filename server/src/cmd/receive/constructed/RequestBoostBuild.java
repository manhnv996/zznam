package cmd.receive.constructed;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;

public class RequestBoostBuild extends BaseCmd{

    public int id;
    public int typeBuilding;
    
    public RequestBoostBuild(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
