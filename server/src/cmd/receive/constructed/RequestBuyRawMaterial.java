package cmd.receive.constructed;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;


public class RequestBuyRawMaterial extends BaseCmd{
    
    public short machineId;
    public String productType; 
    public RequestBuyRawMaterial(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
