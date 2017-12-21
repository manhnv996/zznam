package cmd.receive.constructed;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;

public class RequestUnlockSlot extends BaseCmd {
    public short machineId;
    public RequestUnlockSlot(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
    
}
