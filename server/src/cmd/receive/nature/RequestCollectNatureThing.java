package cmd.receive.nature;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;


public class RequestCollectNatureThing extends BaseCmd{
    
    public int id;
    
    public RequestBuyItemByRubi(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
