package model;

import config.utils.OrderUtil;

import java.util.ArrayList;
import java.util.List;

import util.database.DataModel;

public class Asset {
    
    private Storage foodStorage;
    private Storage warehouse;
    private List<Field> fieldList;
    private List<NatureThing> natureThingList;
    private List<AnimalLodge> animalLodgeList;
    private List<Order> orderList;
    private List<OrderNPC> orderNPCList;
    private List<Machine> machineList;
    
    public Asset(Storage foodStorage,
                 Storage warehouse, 
                 List<Field> fieldList,
                 List<NatureThing> natureThingList,
                 List<AnimalLodge> animalLodgeList,
                 List<Machine> machineList
                 ) {
        super();
        
        this.foodStorage = foodStorage;
        this.warehouse = warehouse;
        
        this.orderList = new ArrayList<>();
        this.orderNPCList = new ArrayList<>();
        
        this.fieldList = fieldList == null ? new ArrayList<Field>() : fieldList;
        this.natureThingList = natureThingList == null ? new ArrayList<NatureThing>() : natureThingList;
        this.animalLodgeList = animalLodgeList == null ? new ArrayList<AnimalLodge>() : animalLodgeList;
        this.machineList = machineList == null ? new ArrayList<Machine>() : machineList;
    }

    
    public Storage getFoodStorage() {
        return foodStorage;
    }

    public Storage getWarehouse() {
        return warehouse;
    }

    public List<Field> getFieldList() {
        return fieldList;
    }
    
    public List<Machine> getMachineList ()  {
        return this.machineList;
    }
    
    
    
    //
    public boolean addField(Field field){
        this.fieldList.add(field);
        if (field.getFieldId() == 0) {
            field.setFieldId(fieldList.size());
        }
        return true;
    }
    
    public Field getFieldById(int fieldId){
        for (int i = 0; i < this.fieldList.size(); i++){
            if (this.fieldList.get(i).getFieldId() == fieldId){
                return this.fieldList.get(i);
            }
        }
        
        return null;
    }
    
    public Field getFieldByPosition(int xl, int yl){
        for (int i = 0; i < this.fieldList.size(); i++){
            if (this.fieldList.get(i).getX() == xl && 
                this.fieldList.get(i).getY() == yl ){
                
                return this.fieldList.get(i);
                
            }
        }
        
        return null;
    }
    
    public List<NatureThing> getNatureThingList() {
        return this.natureThingList;    
    }
    
    public List<AnimalLodge> getAnimalLodgeList() {
        return this.animalLodgeList;
    }


    public List<Order> getOrderList() {
        return orderList;
    }

    public List<OrderNPC> getOrderNPCList() {
        return orderNPCList;
    }

    //
    public List<StorageItem> getAllProductInStock(){
        List<StorageItem> productList = new ArrayList<>();
        
        productList.addAll(this.getFoodStorage().getItemList());        
        productList.addAll(this.getWarehouse().getItemList());
        
        return productList;
    }
    
    public boolean addItemToStorageById(String productId, int quantity){
        if (productId.contains("crop_")) {
            return this.getFoodStorage().addItem(productId, quantity);
        } else {
            return this.getWarehouse().addItem(productId, quantity);
        }
    }
    
    
    public boolean addOrder(int level, Order order){
        if (this.orderList == null){
            return false;
        }
        if (this.orderList.size() < OrderUtil.getNumberOfOrderByLevel(level)){
            this.orderList.add(order);
            this.orderList.get(this.orderList.size() - 1).setOrderId(this.orderList.size() - 1);
            
            return true;
        }
        /*
         * inprogress
         */
        return false;
    }
    
    public Order getOrderdById(int orderId){
        for (int i = 0; i < this.orderList.size(); i++){
            if (this.orderList.get(i).getOrderId() == orderId){
                return this.orderList.get(i);
                
            }
        }
        
        return null;
    }
    
    
    public int getQuantityOfTwoStorageByProductId(String productId){
        int qFoodStorage = this.getFoodStorage().getItemQuantity(productId);
        int qWarehouse = this.getWarehouse().getItemQuantity(productId);

        return (qFoodStorage > qWarehouse) ? qFoodStorage : qWarehouse;
    }
    
    
    public boolean addOrderNPC(OrderNPC order){
        if (this.orderNPCList == null){
            return false;
        }
        if (this.orderNPCList.size() < 2){
            this.orderNPCList.add(order);
            this.orderNPCList.get(this.orderNPCList.size() - 1).setOrderId(this.orderNPCList.size() - 1);
            
            return true;
        }
        /*
         * inprogress
         */
        return false;
    }
    
    public OrderNPC getOrderdNPCById(int orderId){
        for (int i = 0; i < this.orderNPCList.size(); i++){
            if (this.orderNPCList.get(i).getOrderId() == orderId){
                return this.orderNPCList.get(i);
                
            }
        }
        
        return null;
    }
    ////
    
    public void addAnimalLodge(AnimalLodge lodge) {
        this.animalLodgeList.add(lodge);
        if (lodge.getId() == 0) {
            lodge.setId(animalLodgeList.size());    
        }
    }
    
    public void addMachine (Machine machine) {
        this.machineList.add(machine);
        if (machine.getId() == 0) {
            machine.setId(machineList.size());
        }
    }
}
