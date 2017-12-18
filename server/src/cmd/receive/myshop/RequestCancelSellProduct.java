package cmd.receive.myshop;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;


public class RequestCancelSellProduct extends BaseCmd {

    public int slot;

    public RequestCancelSellProduct(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
