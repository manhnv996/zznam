package cmd.receive.storage;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;

public class RequestUpgradeStorage extends BaseCmd{
    
    public String storageType;
    public int level;
    
    public RequestUpgradeStorage(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
