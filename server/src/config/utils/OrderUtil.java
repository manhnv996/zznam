/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package config.utils;

import config.enums.ProductCategory;

import config.jsonobject.ProductConfig;

import java.sql.SQLException;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.sql.RowSet;
import javax.sql.rowset.Predicate;

import model.StorageItem;
import model.ZPUserInfo;


/**
 *
 * @author nguyenvanmanh
 */
public class OrderUtil {
    
    public static int getRemainTime(int level){
        if (level < 11){
            return 3;
        } else if (level < 16){
            return 5;
        } else if (level < 21){
            return 10;
        } else if (level < 26){
            return 15;
        } else {
            return 30;
        }
    }
    
    public static int getNumberOfOrderByLevel(int level){
        if (level < 2){
            return 3;
        } else if (level < 12){
            return 4;
        } else if (level < 15){
            return 5;
        } else if (level < 17){
            return 6;
        } else if (level < 19){
            return 7;
        } else if (level < 22){
            return 8;
        } else {
            return 9;
        }

    }

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
    
    
    
    public static List<ProductConfig> filterProductByLevel(int level, List<ProductConfig> productList){
        
        List<ProductConfig> list = new ArrayList<>();
        for (int i = 0; i < productList.size(); i++){
            if (level >= productList.get(i).levelUnlock){
                list.add(productList.get(i));
            }
        }
        return list;
    }
    
    
//    public static List<ProductConfig> randomTypeProduct(int level){    
    public static List<ProductConfig> randomTypeProduct(ZPUserInfo user, int level){
        
        List<ProductConfig> productList = new ArrayList<>();
        
        int typeNumber = randomTypeNumber(level);
        for (int i = 0; i < typeNumber; i++){
            ProductCategory category = randomCategory(level);
            
//            List<ProductConfig> productCategory = ProductUtil.getProductConfObjByCategory(category);
//            productCategory = ProductUtil.sortProductListByRandomProduct(productCategory);
            List<ProductConfig> productCategory = ProductUtil.randomSortProductConfByCategory(user, category);
//            List<ProductConfig> productCategory = ProductUtil.randomSortProductConfByCategory(category);
            //
            productCategory = filterProductByLevel(level, productCategory);
            
            if (!productCategory.isEmpty()){
                if (productList.size() == 0){
                    productList.add(productCategory.get(0));
                    continue;
                }
                
                for (int j = 0; j < productCategory.size(); j++){
                    if (!productCategory.get(j).containsId(productList)){
                        productList.add(productCategory.get(j));
                        break;
                    }
                }
                
            }
            
        }
        return productList;
    }
    
    
    ///
    public static List<StorageItem> randomQuantityOfProductList(int level, List<ProductConfig> productList){
        List<StorageItem> itemList = new ArrayList<>();
        
        /*
         * Done
         */
        if (productList == null){
            return itemList;    //empty
        }
        
        int typeNumber = productList.size();
        for (int i = 0; i < typeNumber; i++){
            int quantity = randomQuantity(level, typeNumber);
            
            itemList.add(new StorageItem(productList.get(i).id, quantity));
        }
        
        return itemList;
    }
    
    
    public static int randomQuantity(int level, int typeNumber /*so loai mat hang trong order*/){
        //return percent of capacity current
        
        float random = (float) Math.random();
        
//        switch (productList.size()){
        switch (typeNumber){
            case 1:
            case 2:
                if (level < 10){
                    if (random < 0.2){
                        return 1;
                    } else if (random < 0.4){
                        return 2;
                    } else if (random < 0.7){
                        return 3;
                    } else {
                        return 4;
                    }
                } else if (level < 30){
                    if (random < 2 / 70){
                        return 1;
                    } else if (random < 4 / 70){
                        return 2;
                    } else if (random < 7 / 70){
                        return 3;
                    } else if (random < 1 / 7){
                        return 4;
                    } else if (random < 2 / 7){
                        return 5;
                    } else if (random < 4 / 7){
                        return 6;
                    } else {
                        return 7;
                    }
                } else {
                    if (random < 0.02){
                        return 1;
                    } else if (random < 0.04){
                        return 2;
                    } else if (random < 0.07){
                        return 3;
                    } else if (random < 0.1){
                        return 4;
                    } else if (random < 0.2){
                        return 5;
                    } else if (random < 0.4){
                        return 6;
                    } else if (random < 0.7){
                        return 7;
                    } else if (random < 0.85){
                        return 8;
                    } else if (random < 0.95){
                        return 9;
                    } else {
                        return 10;
                    }
                }
//                break;
            case 3:
                if (random < 0.6){
                    return 1;
                } else if (random < 0.8){
                    return 2;
                } else if (random < 0.9){
                    return 3;
                } else {
                    return 4;
                }
//                break;
            case 4:
                if (random < 0.8){
                    return 1;
                } else if (random < 0.95){
                    return 2;
                } else {
                    return 3;
                }
//                break;
            case 5:
            case 6:
            default:
                if (random < 0.9){
                    return 1;
                } else {
                    return 2;
                }
                
            
        }
        
    }
    
    
    ////
    public static int getOrderPrice(int level, List<StorageItem> itemList){
        if(itemList.isEmpty()){
            return 0;
        }
        
        int sumPrice = 0;
        ProductConfig product = null;
        for (int i = 0; i < itemList.size(); i++){
            /*
             * giá t?ng lo?i ??n hàng = (Giá max c?a v?t ph?m / 3.5)x s? l??ng ??n v? yêu c?u x tham s? level
             */
            product = ProductUtil.getProductConfObjByType(itemList.get(i).getTypeItem());
            if (product.maxPrice < 4){
                sumPrice += Math.floor(product.maxPrice * itemList.get(i).getQuantity());
            } else {
                sumPrice += Math.floor((product.maxPrice / 3.5) * itemList.get(i).getQuantity());
            }
        }
        return (int) (sumPrice * getLevelParam(level));
    }
    
    
    public static float getLevelParam(int level){
        if (level < 11){
            return 1f;
        } else if (level < 21){
            return (float) (level * 1.0 / 10);
        } else if (level < 50 ){
            return (float) (Math.floor(level * 1.0 / 10));
        } else {
            return 4.5f;
        }
        
//        return 0f;
    }
    
    
    //
    public static int getOrderExp(int level, List<StorageItem> itemList){
        if(itemList.isEmpty()){
            return 0;
        }
        
        ProductConfig product = null;
        List<ProductConfig> list = new ArrayList<>();
        for (int i = 0; i < itemList.size(); i++){
            /*
             * exp  G?c = exp 1 phút x th?i gian max 
             * exp = exp G?c x random exp bonus
             */
            product = ProductUtil.getProductConfObjByType(itemList.get(i).getTypeItem());
            list.add(product);
        }
        
        Collections.sort(list, new Comparator<ProductConfig>() {
            @Override
            public int compare(ProductConfig a, ProductConfig b) {
                // TODO Implement this method
                return a.timeMin > b.timeMin ? -1 : (a.timeMin < b.timeMin) ? 1 : 0;    //timeMin desc
            }
        });
        
        return (int) (1.3 * list.get(0).timeMin * randomOrderExpBonus(level, itemList.size()));
    }
    
    public static float randomOrderExpBonus(int level, int typeNumber){
        float random = (float) Math.random();
        
        //        switch (productList.size()){
        switch (typeNumber){
            case 1:
            case 2:
                if (level < 11){
                    if (random < 0.3){
                        return 1f;
                    } else if (random < 0.6){
                        return 1.3f;
                    } else if (random < 0.9){
                        return 1.5f;
                    } else {
                        return 1.7f;
                    }
                } else if (level < 26){
                    if (random < 0.2){
                        return 0.5f;
                    } else if (random < 0.8){
                        return 0.7f;
                    } else {
                        return 1f;
                    }
                } else {
                    if (random < 0.2){
                        return 0.3f;
                    } else if (random < 0.4){
                        return 0.5f;
                    } else if (random < 0.8){
                        return 0.7f;
                    } else {
                        return 1f;
                    }
                }
        //                break;
            case 3:
            case 4:
            case 5:
            case 6:
            default:
                if (level < 11){
                    if (random < 0.1){
                        return 1f;
                    } else if (random < 0.4){
                        return 1.3f;
                    } else if (random < 0.7){
                        return 1.5f;
                    } else {
                        return 1.7f;
                    }
                } else if (level < 26){
                    if (random < 0.2){
                        return 0.5f;
                    } else if (random < 0.4){
                        return 0.7f;
                    } else if (random < 0.6){
                        return 1f;
                    } else if (random < 0.8){
                        return 1.3f;
                    } else {
                        return 1.5f;
                    }
                } else {
                    if (random < 0.1){
                        return 0.3f;
                    } else if (random < 0.3){
                        return 0.5f;
                    } else if (random < 0.65){
                        return 0.7f;
                    } else if (random < 0.95){
                        return 1f;
                    } else {
                        return 1.3f;
                    }
                }
            
        }
    }
    
    
    
    
//    public static ProductCategory getCategoryByProductType(String productType){
//        
//        
//        
//        return ProductCategory.CROP_PRODUCT;
//    }
}
