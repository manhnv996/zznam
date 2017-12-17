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
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.zip.ZipEntry;

import model.Storage;
import model.StorageItem;
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
    
    public static List<ProductConfig> toProductConfigList(){
        
        ProductConfig[] products = toProductConfigArray();
        List<ProductConfig> productList = new ArrayList<>();
        
        for (int i = 0; i < products.length; i++){
            productList.add(products[i]);
        }
        
        return productList;
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
        
        
            //
            case TOOL_PRODUCT:
                for (int i = 0; i < products.length; i++) {
                    if (products[i].id.contains("tool_")) {
                        list.add(products[i]);
                    }
                }
                break;
            
            
            default:
                
        }

        return list;
    }
    
    
//    public static List<ProductConfig> randomSortProductConfByCategory(ProductCategory category){    
    public static List<ProductConfig> randomSortProductConfByCategory(ZPUserInfo user, ProductCategory category){
        
        List<ProductConfig> productCategory = ProductUtil.getProductConfObjByCategory(category);
        
        float random = (float) Math.random();
        if (random > 0.3){
            //random all product
            productCategory = ProductUtil.sortProductListByRandomProduct(productCategory);
            
        } else if (random > 0.15){
            //orderby level
            productCategory = ProductUtil.sortProductListByLevelUnlock(productCategory);
            
        } else {
//            productCategory = ProductUtil.sortProductListByRandomProduct(productCategory);
            /*
             * not yet started
             */
            //orderby itemStorage (quantity)
            List<StorageItem> storageItemList = OrderNPCUtil.getItemListInStockByCategory(user, category);
            storageItemList = sortProductListByQuantityOfStorageItem(storageItemList);
            productCategory = new ArrayList<>();
            for (int i = 0; i < storageItemList.size(); i++){
                productCategory.add(getProductConfObjByType(storageItemList.get(i).getTypeItem()));
            }
            
        }
        
        return productCategory;
    }
    
    
    
    
    public static List<ProductConfig> sortProductListByRandomProduct(List<ProductConfig> productList){

        Collections.sort(productList, new Comparator<ProductConfig>() {
            @Override
            public int compare(ProductConfig a, ProductConfig b) {
                // -1 - less than, 1 - greater than, 0 - equal, all inversed for descending
                return (int) Math.floor(Math.random() * 2) - 1;
            }
        });
        
        return productList;
    }
    
    public static List<ProductConfig> sortProductListByLevelUnlock(List<ProductConfig> productList){
        
        Collections.sort(productList, new Comparator<ProductConfig>() {
            @Override
            public int compare(ProductConfig a, ProductConfig b) {
                // -1 - less than, 1 - greater than, 0 - equal, all inversed for descending
                return b.levelUnlock > a.levelUnlock ? -1 : (b.levelUnlock < a.levelUnlock) ? 1 : 0;    //level inc
            }
        });
        
        return productList;
    }
    
    public static List<StorageItem> sortProductListByQuantityOfStorageItem(List<StorageItem> storageItemList){

        Collections.sort(storageItemList, new Comparator<StorageItem>() {
            @Override
            public int compare(StorageItem a, StorageItem b) {
                // -1 - less than, 1 - greater than, 0 - equal, all inversed for descending
                return b.getQuantity() > a.getQuantity() ? -1 : (b.getQuantity() < a.getQuantity()) ? 1 : 0;    //quantity inc
                
                /*
                 * NOT YET STARTED
                 */
                
            }
        });
        
        return storageItemList;
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
