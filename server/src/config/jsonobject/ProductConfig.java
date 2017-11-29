package config.jsonobject;

import java.util.List;

public class ProductConfig {
    public String id;
    public String name;
    public int speedUp;
    public int rubiMuaNgay;
    public int timeMin;
    public int exp;
    public int maxPrice;
    public int levelUnlock;
    
    
    
    public boolean containsId(List<ProductConfig> list) {
        for (ProductConfig object : list) {
            if (this.id.equals(object.id)) {
                return true;
            }
        }
        return false;
    }
}
