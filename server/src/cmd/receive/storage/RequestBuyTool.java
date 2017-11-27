package cmd.receive.storage;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;

public class RequestBuyTool extends BaseCmd{
    public String productType;
    public int number;
    
    public RequestBuyTool(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
