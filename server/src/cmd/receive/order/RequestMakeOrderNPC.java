package cmd.receive.order;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;


public class RequestMakeOrderNPC extends BaseCmd{
    
    public int orderId;
    
    public RequestMakeOrderNPC(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
