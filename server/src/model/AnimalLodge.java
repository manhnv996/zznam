package model;

import config.enums.AnimalLodgeEnum;

import java.util.ArrayList;
import java.util.List;

public class AnimalLodge extends CoordinateObject {
    private List<Animal> animalList;
    private int id;
    private AnimalLodgeEnum type;
    
    public AnimalLodge(int id, AnimalLodgeEnum type, int x, int y) {
        super(x, y);
        this.animalList = new ArrayList<>();
        this.id = id;
        this.type = type;
    }
    
    public AnimalLodge(AnimalLodgeEnum type, int x, int y) {
        super(x, y);
        this.animalList = new ArrayList<>();
        this.id = 0;
        this.type = type;
    }
    
    public List<Animal> getAnimalList() {
        return this.animalList;
    }
    
    public void addAnimal(Animal animal) {
        this.animalList.add(animal);
        if (animal.getId() == 0) {
            animal.setId(animalList.size());    
        }
    }
    
    public int getCurrentSlot() {
        return this.animalList.size();    
    }
    
    public int getId() {
        return this.id;    
    }
    
    public void setId(int id) {
        this.id = id;    
    }
    
    public AnimalLodgeEnum getType() {
        return this.type;    
    }
}
