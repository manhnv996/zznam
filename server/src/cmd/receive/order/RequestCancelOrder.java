package cmd.receive.order;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;


public class RequestCancelOrder extends BaseCmd{
    
    public int orderId;
    
    public RequestCancelOrder(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
