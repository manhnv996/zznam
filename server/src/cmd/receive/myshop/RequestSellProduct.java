package cmd.receive.myshop;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;


public class RequestSellProduct extends BaseCmd {

    public int slot;
    public String productType;
    public int quantity;
    public int price;

    public RequestSellProduct(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
