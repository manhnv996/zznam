package cmd.receive.friend;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;

public class RequestFriendGetList  extends BaseCmd {
    public RequestFriendGetList(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
