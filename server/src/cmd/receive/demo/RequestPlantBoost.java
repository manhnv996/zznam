package cmd.receive.demo;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;


public class RequestPlantBoost extends BaseCmd{
    
    public short fieldId;
    
    public RequestPlantBoost(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
