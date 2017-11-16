package cmd.receive.demo;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;


public class RequestPlant extends BaseCmd{
    
    public short fieldId;
    public String productType;
    
    public RequestPlant(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
