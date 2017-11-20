package cmd.receive.demo;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;


public class RequestCrop extends BaseCmd{
    
    public short fieldId;
//    public String productType;
    
    public RequestCrop(DataCmd dataCmd) {
        super(dataCmd);
        
        unpackData();
    }
}
