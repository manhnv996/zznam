package cmd.receive.order;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;


public class RequestMakeOrder extends BaseCmd{
    
    public int orderId;
    public int rubyBuy;
    
    public RequestMakeOrder(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
