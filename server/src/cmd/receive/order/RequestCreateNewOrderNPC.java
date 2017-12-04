package cmd.receive.order;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;


public class RequestCreateNewOrderNPC extends BaseCmd{
    
    public int orderId;
    
    public RequestCreateNewOrderNPC(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
