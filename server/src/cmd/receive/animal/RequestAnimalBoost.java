package cmd.receive.animal;
import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;

public class RequestAnimalBoost extends BaseCmd {
    public int lodgeId;
    public int animalId;
    
    public RequestAnimalBoost(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
