/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package config.utils;

import com.google.gson.Gson;

import config.enums.ErrorLog;

import config.enums.ProductCategory;

import config.jsonobject.CropProduct;
import config.jsonobject.ProductConfig;

import java.io.BufferedReader;
import java.io.FileReader;

import java.util.ArrayList;
import java.util.List;
import java.util.zip.ZipEntry;

import model.Storage;
import model.ZPUserInfo;

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
    
    
    public static String convertGameInfoToJsonString(ZPUserInfo gameInfo){
        
        Gson gson = new Gson();
        String jsonstring = gson.toJson(gameInfo);
        
        return jsonstring;
    }
    
    
    //
    public static CropProduct[] toCropProductArray(/*String jsonFile*/){
        
        Gson gson = new Gson();
        CropProduct[] cps = gson.fromJson(readFile("src\\config\\json\\cropconfig.json"), CropProduct[].class);
        
        return cps;
    }
    
    public static CropProduct getProductObjByType(String productId){
        
        CropProduct[] cropProducts = toCropProductArray();
        
        for (int i = 0; i < cropProducts.length; i++) {
            if (cropProducts[i].id.equals(productId)) {
                return cropProducts[i];
            }
        }

        return null;
    }
    
    
    //
    public static ProductConfig[] toProductConfigArray(/*String jsonFile*/){
        
        Gson gson = new Gson();
        ProductConfig[] cps = gson.fromJson(readFile("src\\config\\json\\productconfig.json"), ProductConfig[].class);
        
        return cps;
    }
    
    public static ProductConfig getProductConfObjByType(String productId){
        
        ProductConfig[] products = toProductConfigArray();
        
        for (int i = 0; i < products.length; i++) {
            if (products[i].id.equals(productId)) {
                return products[i];
            }
        }

        return null;
    }
    
    public static List<ProductConfig> getProductConfObjByCategory(ProductCategory category){
        
        ProductConfig[] products = toProductConfigArray();
        List<ProductConfig> list = new ArrayList<>();
        
        switch (category){
            case CROP_PRODUCT:
                for (int i = 0; i < products.length; i++) {
                    if (products[i].id.contains("crop_")) {
                        list.add(products[i]);
                    }
                }
                break;
            case MACHINE_PRODUCT:
                for (int i = 0; i < products.length; i++) {
                    if (products[i].id.contains("product_")) {
                        list.add(products[i]);
                    }
                }
                break;
            case LIVESTOCK_PRODUCT:
                for (int i = 0; i < products.length; i++) {
                    if (products[i].id.contains("good_")) {
                        list.add(products[i]);
                    }
                }
                break;
            default:
                
        }

        return list;
    }
    
    //
    public static String convertStorageToJsonString(Storage storage){
        
        Gson gson = new Gson();
        String jsonstring = gson.toJson(storage);
        
        return jsonstring;
    }
    
    
    
    
    public static void response(short errorCode){
        
        if (errorCode == ErrorLog.SUCCESS.getValue()){     //Success
            
        } 
        else {
            if (errorCode >= 10 && errorCode < 20){     //Error about field status
                //
                
            }
            if (errorCode >= 20 && errorCode < 30){       //Error about storage
                //
            }
            if (errorCode >= 30 && errorCode < 40){       //Error about rubi, gold..
                //
                
            }
        }
    }
    
}
