package config.utils;

import com.google.gson.Gson;

import config.jsonobject.CropProduct;
import config.jsonobject.LevelupConfig;

import config.jsonobject.ProductConfig;

import java.util.Arrays;
import java.util.List;

public class LevelupUtil {
    
    //
    public static List<LevelupConfig> toLevelupList(/*String jsonFile*/){
        
        Gson gson = new Gson();
        LevelupConfig[] cps = gson.fromJson(ProductUtil.readFile("src\\config\\json\\levelupconfig.json"), LevelupConfig[].class);

        return Arrays.asList(cps);
    }
    
    
    public static LevelupConfig getLevelupConfObjByLevel(int level){
        
        List<LevelupConfig> list = toLevelupList();
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).Level == level) {
                return list.get(i);
            }
        }

        return list.get(list.size() - 1);
    }
    
}
