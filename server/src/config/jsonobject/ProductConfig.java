package config.jsonobject;

import config.enums.AnimalEnum;

import java.util.List;

import model.Animal;

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
