package cmd.receive.demo;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;


public class RequestBuyItemByRubi extends BaseCmd{
    
    public String productType;
    public int quantity;
    
    public RequestBuyItemByRubi(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
