package cmd.receive.friend;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;

public class RequestFriendGetInfo  extends BaseCmd {
	public int id;
	
    public RequestFriendGetInfo(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
