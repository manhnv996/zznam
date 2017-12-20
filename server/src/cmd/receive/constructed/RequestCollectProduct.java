package cmd.receive.constructed;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;

public class RequestCollectProduct extends BaseCmd {
    public short machineId;
    public RequestCollectProduct(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
    
}


