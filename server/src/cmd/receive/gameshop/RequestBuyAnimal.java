package cmd.receive.gameshop;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;

public class RequestBuyAnimal extends BaseCmd{
    
    public int lodgeId;
    public int animalId;
    public String animalType;
    public int x;
    public int y;
    
    public RequestBuyAnimal(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
