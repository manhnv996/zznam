/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package config.utils;

import config.enums.ProductCategory;

import config.jsonobject.ProductConfig;

import java.util.ArrayList;
import java.util.List;

import model.StorageItem;


/**
 *
 * @author nguyenvanmanh
 */
public class OrderUtil {
    
    
    public static int randomTypeNumber(int level){
        float random = (float) Math.random();
        if (level < 7){
//            random *= 2;
            if (random > 0.6){
                return 2;
            }
            return 1;
        } else if (level < 10){
//            random *= 3;
            if (random > 0.6){
                return 3;
            } else if (random > 0.3){
                return 2;
            } else {
                return 1;
            }
        } else if (level < 16){
//            random *= 4;
            if (random > 0.7){
                return 4;
            } else if (random > 0.4){
                return 3;
            } else if (random > 0.2){
                return 2;
            } else {
                return 1;
            }
        } else if (level < 21){
//            random *= 5;
            if (random > 0.8){
                return 5;
            } else if (random > 0.5){
                return 4;
            } else if (random > 0.2){
                return 3;
            } else if (random > 0.1){
                return 2;
            } else {
                return 1;
            }
        } else if (level < 31){
//            random *= 6;
            if (random > 0.8){
                return 6;
            } else if (random > 0.5){
                return 5;
            } else if (random > 0.3){
                return 4;
            } else if (random > 0.15){
                return 3;
            } else if (random > 0.05){
                return 2;
            } else {
                return 1;
            }
        } if (level < 41){
//            random *= 6;
            if (random > 0.8){
                return 6;
            } else if (random > 0.55){
                return 5;
            } else if (random > 0.35){
                return 4;
            } else if (random > 0.10){
                return 3;
            } else if (random > 0.05){
                return 2;
            } else {
                return 1;
            }
        } else {
//            random *= 6;
            if (random > 0.75){
                return 6;
            } else if (random > 0.50){
                return 5;
            } else if (random > 0.30){
                return 4;
            } else if (random > 0.10){
                return 3;
            } else if (random > 0.05){
                return 2;
            } else {
                return 1;
            }
        }
        
//        return 1;
    }
    
    
    public static ProductCategory randomCategory(int level){
        
        float random = (float) Math.random();
        if (level < 13){
            if (random > 0.6){
                return ProductCategory.CROP_PRODUCT;
            } else if (random > 0.4){
                return ProductCategory.MACHINE_PRODUCT;
            } else {
                return ProductCategory.LIVESTOCK_PRODUCT;
            }
        } else if (level < 17){
            if (random > 0.7){
                return ProductCategory.CROP_PRODUCT;
            } else if (random > 0.35){
                return ProductCategory.MACHINE_PRODUCT;
            } else if (random > 0.05){
                return ProductCategory.LIVESTOCK_PRODUCT;
            } else {
                return ProductCategory.LIVESTOCK_PRODUCT;   //fruit_tree_product not in scope
            }
        } else if (level < 25){
            if (random > 0.7){
                return ProductCategory.CROP_PRODUCT;
            } else if (random > 0.2){
                return ProductCategory.MACHINE_PRODUCT;
            } else if (random > 0.1){
                return ProductCategory.LIVESTOCK_PRODUCT;
            } else {
                return ProductCategory.LIVESTOCK_PRODUCT;   //fruit_tree_product not in scope
            }
        } else {
            if (random > 0.8){
                return ProductCategory.CROP_PRODUCT;
            } else if (random > 0.4){
                return ProductCategory.MACHINE_PRODUCT;
            } else if (random > 0.25){
                return ProductCategory.LIVESTOCK_PRODUCT;
            } else if (random > 0.05){
                return ProductCategory.LIVESTOCK_PRODUCT;   //fruit_tree_product not in scope
            } else {
                return ProductCategory.LIVESTOCK_PRODUCT;   //metal_product not in scope
            }
        }
        
//        return ProductCategory.CROP_PRODUCT;
    }
    
    
    public static List<ProductConfig> randomTypeProduct(int level){
        
        List<ProductConfig> productList = new ArrayList<>();
        
        int typeNumber = randomTypeNumber(level);
        for (int i = 0; i < typeNumber; i++){
//            ProductCategory category = randomCategory(level);
            ProductCategory category = ProductCategory.LIVESTOCK_PRODUCT;
            
            List<ProductConfig> productCategory = ProductUtil.getProductConfObjByCategory(category);
            productCategory = ProductUtil.sortProductListByRandomProduct(productCategory);
            
            if (productList.size() == 0){
                productList.add(productCategory.get(0));
                continue;
            }
            for (int k = 0; k < productCategory.size(); k++){
                for (int j = 0; j < productList.size(); j++){
                    if (productList.get(j).id.equals(productCategory.get(k).id)){
                        
                        break;
                    }
                    productList.add(productCategory.get(k));
                    break;
                }
//                if (productList.size() >= i + 1){
                    for (int j = 0; j < productList.size() - 1; j++){
                        if (productList.get(j).id.equals(productList.get(productList.size() - 1))){
                            productList.remove(productList.size() - 1);
                            break;
                        }
                    }
//                    break;
//                }
            }
            
            
            
//            for (int j = 0; j < productList.size(); j++){
//                for (int k = 0; k < productCategory.size(); k++){
//                    if (!productList.get(j).id.equals(productCategory.get(k).id)){
//                        
//                        productList.add(productCategory.get(k));
//                        break;
//                    }
//                    
//                }
//                if (productList.size() >= i + 1){
//                    break;
//                }
//            }
            
            for (int k = 0; k < productCategory.size(); k++){
                
                
            }
            
            
        }
        return productList;
    }
    
    
    
    
    
    
    
    
    public static ProductCategory getCategoryByProductType(String productType){
        
        
        
        return ProductCategory.CROP_PRODUCT;
    }
}
