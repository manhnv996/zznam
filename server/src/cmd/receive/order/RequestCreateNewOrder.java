package cmd.receive.order;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;


public class RequestCreateNewOrder extends BaseCmd{
    
    public int orderId;
    
    public RequestCreateNewOrder(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
