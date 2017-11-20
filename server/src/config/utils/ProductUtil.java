/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package config.utils;

import com.google.gson.Gson;
import config.jsonobject.CropProduct;
import java.io.BufferedReader;
import java.io.FileReader;

/**
 *
 * @author nguyenvanmanh
 */
public class ProductUtil {
    
    public static String readFile(String filename) {
        String result = "";
        try {
            BufferedReader br = new BufferedReader(new FileReader(filename));
            StringBuilder sb = new StringBuilder();
            String line = br.readLine();
            while (line != null) {
                sb.append(line);
                line = br.readLine();
            }
            result = sb.toString();
        } catch(Exception e) {
            e.printStackTrace();
        }
        return result;
    }
    
    
    public static CropProduct[] toCropProductArray(/*String jsonFile*/){
        
        Gson gson = new Gson();
        CropProduct[] cps = gson.fromJson(readFile("src\\config\\json\\cropconfig.json"), CropProduct[].class);
        
        return cps;
    }
    
    
    public static CropProduct getProductObjByType(String productId){
        
        CropProduct[] cropProducts = toCropProductArray();
        
        for (int i = 0; i < cropProducts.length; i++) {
            if (cropProducts[i].id == productId) {
                return cropProducts[i];
            }
        }

        return null;
    }
}
