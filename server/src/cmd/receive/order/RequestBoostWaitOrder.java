package cmd.receive.order;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;


public class RequestBoostWaitOrder extends BaseCmd{
    
    public int orderId;
    
    public RequestBoostWaitOrder(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
