package cmd.send.user;

import bitzero.server.extensions.data.BaseMsg;

import cmd.CmdDefine;

import config.enums.AnimalEnum;
import config.enums.AnimalLodgeEnum;

import config.utils.ConfigContainer;

import java.nio.ByteBuffer;

import java.util.List;

import model.Animal;
import model.AnimalLodge;
import model.Field;
import model.NatureThing;
import model.Storage;
import model.StorageItem;
import model.ZPUserInfo;

public class ResponseUser extends BaseMsg {
    ZPUserInfo user;
    ByteBuffer bf; // Buffer to send
    
    public ResponseUser(ZPUserInfo user) {
        super(CmdDefine.GET_USER);
        this.user = user;
        this.bf = this.makeBuffer();
    }
    
    @Override
    public byte[] createData() {
        
        this.packBasicInfo();
        this.packMap();
        this.packFieldList();
        this.packNatureThingList();
        this.packStorages();
        this.packAnimalLodges();
        
        return packBuffer(this.bf);
    }
    
    /**
     * Pack basic info: id, name, level, gold, ruby, exp
     */
    private void packBasicInfo() {
        bf.putInt(user.getId()); // ID
        putStr(bf, user.getName()); // Name
        bf.putInt(user.getLevel()); // Level
        bf.putInt(user.getGold()); // Gold
        bf.putInt(user.getRuby()); // Ruby
        bf.putLong(user.getExp()); // Exp
    }
    
    /**
     * Pack map: 32x32
     */
    private void packMap() {
        int[][] map = user.getMap().getMap();
        for (int i = 0; i < ConfigContainer.mapConfig.Init.width; i++) {
            for (int j = 0; j < ConfigContainer.mapConfig.Init.height; j++) {
                bf.putInt(map[i][j]);    
            }    
        }
    }
    
    /**
     * Put fieldlist: [number of field] [field][field][field]
     */
    private void packFieldList() {
        List<Field> fieldList = user.getAsset().getFieldList();
        // [IMPORTANT] Put length of field list first
        bf.putInt(fieldList.size());
        // Put each field
        for (int i = 0; i < fieldList.size(); i++) {
            this.packField(fieldList.get(i));
        }
    }
    
    /**
     * Put field
     */
    private void packField(Field field) {
        bf.putInt(field.getX()); // Location x
        bf.putInt(field.getY()); // Location y
        bf.putInt(field.getFieldId()); // ID
        if (field.getPlantType() == null) { // Check if model null
            putStr(bf, ""); // plantType
        } else {
            putStr(bf, field.getPlantType()); // plantType
        }
        bf.putLong(field.getPlantedTime()); // PlantedTime
    }
    
    /**
     * Put nature thing list: [Number of things] [thing][thing][thing]
     */
    private void packNatureThingList() {
        List<NatureThing> natureThingList = user.getAsset().getNatureThingList();
        // [IMPORTANT] Put length of list first
        bf.putInt(natureThingList.size());
        // Put each naturething
        for (int i = 0; i < natureThingList.size(); i++) {
            this.packNatureThing(natureThingList.get(i));    
        }
    }
    
    /**
     * Put nature thing [thing]
     */
    private void packNatureThing(NatureThing natureThing) {
        bf.putInt(natureThing.getX());
        bf.putInt(natureThing.getY());
        bf.putInt(natureThing.getId());
        putStr(bf, natureThing.getType());
    }
    
    /**
     * Pack silo and warehouse
     */
    private void packStorages() {
        Storage silo = user.getAsset().getFoodStorage();
        Storage warehouse = user.getAsset().getWarehouse();
        this.packStorage(silo);
        this.packStorage(warehouse);
    }
    
    /**
     * Pack a storage
     */
    private void packStorage(Storage storage) {
        bf.putInt(storage.getX());
        bf.putInt(storage.getY());
        putStr(bf, storage.getStorageStringType());
        bf.putInt(storage.getCapacity());
        bf.putInt(storage.getLevel());
        // Put storage Item List
        List<StorageItem> itemList = storage.getItemList();
        // First put length of list
        bf.putInt(itemList.size());
        // put each item
        for (int i = 0; i < itemList.size(); i++) {
            this.packStorageItem(itemList.get(i));    
        }
    }
    
    /**
     * Put storage item
     */
    
    private void packStorageItem(StorageItem item) {
        putStr(bf, item.getTypeItem());
        bf.putInt(item.getQuantity());
    }
    
    // pack ALL animal lodges
    private void packAnimalLodges() {
        List<AnimalLodge> animalLodgeList = user.getAsset().getAnimalLodgeList();
        int size = animalLodgeList.size();
        // Pack size
        bf.putInt(size);
        // Pack each AnimalLodges
        for (int i = 0; i < size; i++) {
            this.packAnimalLodge(animalLodgeList.get(i));        
        }
    }
    
    // Pack AN animal lodge
    private void packAnimalLodge(AnimalLodge lodge) {
        putStr(bf, lodge.getType().toString());
        bf.putInt(lodge.getX());
        bf.putInt(lodge.getY());
        bf.putInt(lodge.getId());
        // Pack animal list
        List<Animal> animalList = lodge.getAnimalList();
        int size = animalList.size();
        bf.putInt(size);
        for (int i = 0; i < size; i++) {
            this.packAnimal(animalList.get(i));    
        }
    }
    
    private void packAnimal(Animal animal) {
        putStr(bf, animal.getType().toString());    
        bf.putInt(animal.getId());
        bf.putInt(animal.isFeeded() ? 1 : 0);
        bf.putLong(animal.getFeededTime());
    }
}
