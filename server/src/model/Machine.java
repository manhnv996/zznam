package model;

import config.enums.AnimalLodgeEnum;
import config.enums.MachineTypeEnum;

import config.jsonobject.MachineConfig;

import config.jsonobject.ProductConfig;
import config.jsonobject.machine.RawMaterial;

import config.utils.ConfigContainer;

import config.utils.ProductUtil;

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
          if (true ){
              if (productType != null ) {
                if ( length == 0) {
                  long timeNow = System.currentTimeMillis();
                  this.setStartTime(timeNow);
                }
                return this.productQueue.add(productType);
              }
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
            if (timeNow >= tempTime){
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
            for (int i = 0 ; i < currFinishedProducts; i++){
//              long currProductTime = 60*1000*5; //Todo function getProductTimeByType(this.productQueue.get(i));
              ProductConfig product = ProductUtil.getProductConfObjByType(this.productQueue.get(i));
              long currProductTime = 60*1000*  product.timeMin; 
              tempTime+= currProductTime;
            }
            long remainingTime = timeNow - tempTime;
            if (remainingTime > 0){
              return remainingTime;
            } 
            return 0;
          } else {
            return 0;
          }
        }
        public boolean boostProduct(){
            long remainingTime = this.getFirstProductRemainingTime();
            if (remainingTime != 0){
                long newStartTime = this.getStartTime() - remainingTime;
                this.setStartTime(newStartTime);
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
