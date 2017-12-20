package cmd.receive.demo;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;

public class RequestBuyRuby extends BaseCmd{
    public short ruby;
    public RequestBuyRuby(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}

