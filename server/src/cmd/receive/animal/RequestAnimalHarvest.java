package cmd.receive.animal;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;

public class RequestAnimalHarvest extends BaseCmd {
	public int lodgeId;
	public int animalId;

	public RequestAnimalHarvest(DataCmd dataCmd) {
		super(dataCmd);
		unpackData();
	}
}
