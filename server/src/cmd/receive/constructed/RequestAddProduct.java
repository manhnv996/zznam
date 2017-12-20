package cmd.receive.constructed;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;


public class RequestAddProduct extends BaseCmd{
    
    public short machineId;
    public String productType; 
    public RequestAddProduct(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}


