package cmd.receive.user;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;

public class RequestAddMoney extends BaseCmd {
    
    public int number;
    public int type;
    
    public RequestAddMoney(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
