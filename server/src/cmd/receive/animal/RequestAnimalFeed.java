package cmd.receive.animal;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;

public class RequestAnimalFeed extends BaseCmd {
	public int lodgeId;
	public int animalId;

	public RequestAnimalFeed(DataCmd dataCmd) {
		super(dataCmd);
		unpackData();
	}
}
