package cmd.receive.myshop;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;


public class RequestReceiveMoneyFromSoldProduct extends BaseCmd {

    public int slot;

    public RequestReceiveMoneyFromSoldProduct(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
