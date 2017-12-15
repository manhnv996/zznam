package cmd.receive.myshop;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;


public class RequestBuyProduct extends BaseCmd {

    public int slot;

    public RequestBuyProduct(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
