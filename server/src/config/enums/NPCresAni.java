package config.enums;

import java.util.ArrayList;
import java.util.List;

public class NPCresAni {
    
    public static final String NPC_CO_GAI = "Bagia";    
    public static final String NPC_BA_GIA = "Cogai1";    
    public static final String NPC_ONG_GIA = "Onggia1";    
    public static final String NPC_THANH_NIEN = "Thanhnien";    
    public static final String NPC_TRUNG_NIEN = "Trungnien";
    
    
    public static String[] getListNPCresAni(){
        return new String[] {NPC_CO_GAI, NPC_BA_GIA, NPC_ONG_GIA, NPC_THANH_NIEN, NPC_TRUNG_NIEN};
//        return new String[] {NPC_CO_GAI, NPC_BA_GIA, NPC_ONG_GIA, NPC_THANH_NIEN};
    }
    
}
