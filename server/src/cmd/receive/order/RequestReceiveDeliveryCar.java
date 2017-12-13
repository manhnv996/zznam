package cmd.receive.order;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;


public class RequestReceiveDeliveryCar extends BaseCmd{
    
    public int price;
    public int exp;
    
    public RequestReceiveDeliveryCar(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
