package model;

import java.util.ArrayList;
import java.util.List;

public class AnimalLodge extends ConstructedObject {
    private List<Animal> animalList;
    
    public AnimalLodge(int id, long startBuildTime, boolean completed, int x, int y) {
        super(id, startBuildTime, completed, x, y);
        this.animalList = new ArrayList<>();
    }
    
    public List<Animal> getAnimalList() {
        return this.animalList;
    }
    
    public void addAnimal(Animal animal) {
        this.animalList.add(animal);
    }
    
    public int getCurrentSlot() {
        return this.animalList.size();    
    }
}
