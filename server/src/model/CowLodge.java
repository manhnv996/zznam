package model;

public class CowLodge extends AnimalLodge {
    public CowLodge(int id, long startBuildTime, boolean completed, int x, int y) {
        super(id, startBuildTime, completed, x, y);
    }
    
    public void addCow(Cow cow) {
        this.addAnimal(cow);
    }
}
