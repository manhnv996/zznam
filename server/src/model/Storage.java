package model;

import bitzero.server.entities.User;

import config.enums.StorageType;
import java.util.ArrayList;
import java.util.List;

public class Storage extends CoordinateObject {
    
    private StorageType storageType;
    private int capacity;
    private List<StorageItem> itemList;
    private int level;
    
    public Storage(StorageType storageType, int capacity, int x, int y) {
        super(x, y);
        
        this.storageType = storageType;
        this.capacity = capacity;
        this.level = 0;
        itemList = new ArrayList<>();
    }

    
    public int getCapacity() {
        return capacity;
    }
    
    public int getLevel() {
        return level;
    }
    
    public boolean upgradeLevel (ZPUserInfo userInfo, String product1, int number1, String product2, int number2, String product3, int number3) {
        if (userInfo.getAsset().getWarehouse().takeItem(product1, number1) && 
            userInfo.getAsset().getWarehouse().takeItem(product2, number2) &&
            userInfo.getAsset().getWarehouse().takeItem(product3, number3)) {
//            System.out.println("OKOKOKOK");
            this.level++;
            System.out.println("level " + level);
            return true;
        }
        return false;
    }

    public List<StorageItem> getItemList() {
        return itemList;
    }
    
    
    
    public int getItemQuantity(String productType){
        for (int i = 0; i < this.getItemList().size(); i++){
            if (this.getItemList().get(i).getTypeItem().equals(productType)){
                return this.getItemList().get(i).getQuantity();
                
            }

        }
        return 0;

    }
    
    public int getStorageItem(String productType){
        for (int i = 0; i < this.getItemList().size(); i++){
            if (this.getItemList().get(i).getTypeItem().equals(productType)){
                return i;
                
            }

        }
        return -1;
    }
    
    public boolean addItem(String productType, int number){
        if ((this.getCurrentQuantity() + number) <= this.capacity){

            int index = this.getStorageItem(productType);
            if (index >= 0){
                this.itemList.get(index).addQuantity(number);

            } else {
                this.itemList.add(new StorageItem(productType, number));
            }

            return true;
        }
        
        return false;
    }
    
    public boolean takeItem(String productType, int number){
        int index = this.getStorageItem(productType);
        if (index >= 0){
            if (this.getItemQuantity(productType) > number){
                this.itemList.get(index).reduceQuantity(number);
                return true;

            } else if (this.getItemQuantity(productType) == number){
                this.itemList.get(index).reduceQuantity(number);

                this.itemList.remove(index);//remove productType of list if quantity == 0
                return true;

            } else {
                return false;
            }
        }
        return false;
    }
    
    public int getCurrentQuantity(){
        int total = 0;
        for (int i = 0; i < this.itemList.size(); i++){
            total += this.itemList.get(i).getQuantity();
        
        }

        return total;
    }
    
    
    
//    ////
    public boolean upgrade(){
        /*
        NOT YET STARTED
        */
        return false;
    }
    
    public void setCapacity (int capacity) {
        this.capacity = capacity;
    }
    
    public StorageType getStoragetype() {
        return this.storageType;
    }
    
    public String getStorageStringType() {
        if (this.storageType == StorageType.FOOD_STORAGE) {
            return "FOOD_STORAGE";    
        } else {
            return "WAREHOUSE";
        }
    }
    
}
