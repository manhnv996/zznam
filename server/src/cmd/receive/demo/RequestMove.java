package cmd.receive.demo;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;


public class RequestMove extends BaseCmd{
    public short direction;
    public RequestMove(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
