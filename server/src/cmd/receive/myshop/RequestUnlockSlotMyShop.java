package cmd.receive.myshop;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;


public class RequestUnlockSlotMyShop extends BaseCmd {

    public RequestUnlockSlotMyShop(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
