package cmd.receive.demo;


import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;

public class RequestBuyGold extends BaseCmd{
    public short gold;
    public RequestBuyGold(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
