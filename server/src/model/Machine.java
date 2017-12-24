package model;

import config.enums.AnimalLodgeEnum;
import config.enums.MachineTypeEnum;

import config.jsonobject.MachineConfig;

import config.jsonobject.ProductConfig;
import config.jsonobject.machine.RawMaterial;

import config.utils.ConfigContainer;

import config.utils.ProductUtil;

import java.text.Format;
import java.text.SimpleDateFormat;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


public class Machine extends ConstructedObject {

   
    private int id;
    private MachineTypeEnum type;
    private int slot;
    private long startTime;
    private List<String> productQueue;

    public Machine(int id, MachineTypeEnum type, int slot, long startBuildTime, 
                   boolean boostBuild, boolean completed, int x, int y) {
        super(startBuildTime, boostBuild, completed, x, y);
        
        this.productQueue = new ArrayList<>();
        this.id = id;
        this.type = type;
        this.slot = slot;
        this.startTime = 0;
    }
    
    public List<String> getProductQueue() {
        return this.productQueue;
    }
    
    public int getId () {
        return this.id;
    }
    
    public void setId (int id) {
        this.id = id;
    }
    
    public MachineTypeEnum getType () {
        return this.type;
    }
    
    public int getSlot () {
        return this.slot;
    }
    
    public long getStartTime () {
        return this.startTime;
    }
    
    public int getRemainTime() {
        MachineConfig machineConfig = ConfigContainer.getMachineConfigByType(this.type.toString());
        long curTime = new Date().getTime();
        int buildTime = (int) Math.floor((curTime - getStartBuildTime()) / 1000);
        int remainTime = machineConfig.time - buildTime;
        if (remainTime > 0) {
            return remainTime;
        } 
        return 0;
    }
    public boolean addProduct(String productType){
          int length = this.getProductQueueLength();
          int currFinishedProducts = this.getCurrentFinishedProducts();
          int currNotFinishedProducts = length - currFinishedProducts;
          if ( currNotFinishedProducts >= this.slot) return false;
              if (productType != null ) {
                long timeNow = System.currentTimeMillis();
                if ( length == 0) {
                  this.setStartTime(timeNow);
                }
                if (length > 0 && currNotFinishedProducts == 0){
                    for (int i = 0; i < length; i++){
                        ProductConfig product = ProductUtil.getProductConfObjByType(this.productQueue.get(i));
                        long currProductTime = 60*1000*  product.timeMin; 
                        timeNow -= currProductTime;
                    }
                    this.setStartTime(timeNow);
                }
                return this.productQueue.add(productType);
              }
          return false;
        }
        public boolean unlockSlot(){
          if (this.slot < 9){
            this.slot += 1;
            return true;
          }
          return false;
        }
        public int getProductQueueLength(){
          return this.productQueue.size();
        }
        public int getCurrentFinishedProducts(){
          int count = 0;
          long timeNow = System.currentTimeMillis();
          long tempTime = this.startTime;
          int length = this.getProductQueueLength();
          for (int i = 0; i < length; i++){
//            long currProductTime = 60*1000*5; //Todo function getProductTimeByType(this.productQueue.get(i));
            ProductConfig product = ProductUtil.getProductConfObjByType(this.productQueue.get(i));
            long currProductTime = 60*1000*  product.timeMin; 
            tempTime += currProductTime;
            if (timeNow >= tempTime ){
              count++;
            } else {
              break;
            }
          }
          return count;    
        }
        public void setStartTime (long startTime) {
            this.startTime = startTime;
        }
        public long getFirstProductRemainingTime(){
          int length = this.getProductQueueLength();
          int currFinishedProducts = this.getCurrentFinishedProducts();
          if (currFinishedProducts < length){
                long timeNow = System.currentTimeMillis();
                long tempTime = this.startTime;
                Date date = new Date(tempTime);
                  Format format = new SimpleDateFormat("yyyy MM dd HH:mm:ss");
                 System.out.println("startTime 454 " + format.format(date));
              System.out.println("timeNow 454 " + format.format(timeNow));
                for (int i = 0 ; i < currFinishedProducts + 1; i++){
    //              long currProductTime = 60*1000*5; //Todo function getProductTimeByType(this.productQueue.get(i));
                  ProductConfig product = ProductUtil.getProductConfObjByType(this.productQueue.get(i));
                    System.out.println("productConfig " + product.timeMin);
                  long currProductTime = 60*1000*  product.timeMin; 
                  tempTime+= currProductTime;
                }
                long remainingTime = tempTime - timeNow;
                if (remainingTime > 0){
                  return remainingTime;
                } 
                return 0;
          } else {
            return 0;
          }
        }
        public boolean boostProduct(){
            System.out.println("curr_finished " +this.getCurrentFinishedProducts());
            System.out.println("productQueue Size " +this.productQueue.size());
            long remainingTime = this.getFirstProductRemainingTime();
            System.out.println("remainingTime " + remainingTime);
            if (remainingTime != 0){
                long newStartTime = this.getStartTime() - remainingTime;
                this.setStartTime(newStartTime);
                Date date = new Date(this.startTime);
                  Format format = new SimpleDateFormat("yyyy MM dd HH:mm:ss");
                 System.out.println("new 2 startTime " + format.format(date));
                System.out.println(this.getCurrentFinishedProducts());
                return true;
            }
            return false;
        }
        public String collectProduct(){
            int currFinishedProducts = this.getCurrentFinishedProducts();
            if (currFinishedProducts > 0){
                
                ProductConfig product = ProductUtil.getProductConfObjByType(this.productQueue.get(0));
                long firstProductTime = 60*1000*  product.timeMin; 
                long newStartTime = this.getStartTime() + firstProductTime;
                this.setStartTime(newStartTime);
                String productType = this.getProductQueue().get(0);
                this.productQueue.remove(0);
                return productType;
            }
            return null;
        }
//    if (user.getAsset().getFoodStorage().addItem(this.plantType, 2)){
        
}
