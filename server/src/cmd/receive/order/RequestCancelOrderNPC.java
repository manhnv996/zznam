package cmd.receive.order;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;


public class RequestCancelOrderNPC extends BaseCmd{
    
    public int orderId;
    
    public RequestCancelOrderNPC(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
