package cmd.receive.gameshop;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;

public class RequestBuyMapObjectByRuby extends BaseCmd{
    
    public int id;
    public String type;
    public int x;
    public int y;
    public int ruby;
    
    public RequestBuyMapObjectByRuby(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
