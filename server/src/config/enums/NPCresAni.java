package config.enums;

import config.jsonobject.ProductConfig;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import javax.sql.rowset.Predicate;

public class NPCresAni {
    
    public static final String NPC_CO_GAI = "Bagia";    
    public static final String NPC_BA_GIA = "Cogai1";    
    public static final String NPC_ONG_GIA = "Onggia1";    
    public static final String NPC_THANH_NIEN = "Thanhnien";    
    public static final String NPC_TRUNG_NIEN = "Trungnien";
    
    
    public static List<String> getListNPCresAni(){
//        String[] arr = new String[] {NPC_CO_GAI, NPC_BA_GIA, NPC_ONG_GIA, NPC_THANH_NIEN, NPC_TRUNG_NIEN};
        String[] arr = new String[] {NPC_CO_GAI, NPC_BA_GIA, NPC_ONG_GIA, NPC_THANH_NIEN};
        return Arrays.asList(arr);
    }
    
    
    public static <T> Collection<T> filterRes(Collection<T> target, Collection<T> filter) {
        Collection<T> result = new ArrayList<T>();
        for (T element: target) {
            if (!filter.contains(element)) {
                result.add(element);
            }
        }
        return result;
    }
    
}
