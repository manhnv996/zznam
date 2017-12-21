package cmd.receive.constructed;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;


public class RequestBoostProduct extends BaseCmd{
    
    public short machineId;
//    public String productType; 
    public RequestBoostProduct(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
